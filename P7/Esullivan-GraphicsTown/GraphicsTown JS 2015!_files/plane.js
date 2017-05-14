
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var Plane = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    Plane = function Plane(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [0,0,.9];
        this.orientation = 0;
        this.c1 = new HermiteCurve([[0, 1, -16], [-16, 2.5, 0], [50, 0, 0], [0, 0, 25]]);
        this.c2 = new HermiteCurve([[-16, 2.5, 0], [0, 5, 16], [0, 0, 25], [50, 0, 0]]);
        this.c3 = new HermiteCurve([[0, 5, 16], [16, 7.5, 0], [50, 0, 0], [0, 0, 25]]);
        this.c4 = new HermiteCurve([[16, 7.5, 0], [0, 1, -16], [0, 0, 25], [50, 0, 0]]);
        this.t = 0; // Curent position along the curve
        this.target = [0, 0, 0];
        this.lastTime;
    }
    Plane.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["car-vs", "car-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                    // Body of plane
                    -.5,-.25,-.25,  .5,-.25,-.25,  .5, .25,-.25,        -.5,-.25,-.25,  .5, .25,-.25, -.5, .25,-.25,    // z = 0
                    -.5,-.25, .25,  .5,-.25, .25,  .5, .25, .25,        -.5,-.25, .25,  .5, .25, .25, -.5, .25, .25,    // z = 1
                    -.5,-.25,-.25,  .5,-.25,-.25,  .5,-.25, .25,        -.5,-.25,-.25,  .5,-.25, .25, -.5,-.25, .25,    // y = 0
                    -.5, .25,-.25,  .5, .25,-.25,  .5, .25, .25,        -.5, .25,-.25,  .5, .25, .25, -.5, .25, .25,    // y = 1
                    -.5,-.25,-.25, -.5, .25,-.25, -.5, .25, .25,        -.5,-.25,-.25, -.5, .25, .25, -.5,-.25, .25,    // x = 0
                     .5,-.25,-.25,  .5, .25,-.25,  .5, .25, .25,         .5,-.25,-.25,  .5, .25, .25,  .5,-.25, .25,    // x = 1

                    // Wings of plane
                    -.25,-.125,-1,  .25,-.125,-1,  .25, .125,-1,        -.25,-.125,-1,  .25, .125,-1, -.25, .125,-1,    // z = 0
                    -.25,-.125, 1,  .25,-.125, 1,  .25, .125, 1,        -.25,-.125, 1,  .25, .125, 1, -.25, .125, 1,    // z = 1
                    -.25,-.125,-1,  .25,-.125,-1,  .25,-.125, 1,        -.25,-.125,-1,  .25,-.125, 1, -.25,-.125, 1,    // y = 0
                    -.25, .125,-1,  .25, .125,-1,  .25, .125, 1,        -.25, .125,-1,  .25, .125, 1, -.25, .125, 1,    // y = 1
                    -.25,-.125,-1, -.25, .125,-1, -.25, .125, 1,        -.25,-.125,-1, -.25, .125, 1, -.25,-.125, 1,    // x = 0
                    .25,-.125,-1,  .25, .125,-1,  .25, .125, 1,         .25,-.125,-1,  .25, .125, 1,  .25,-.125, 1,    // x = 1

                ] },
                vnormal : {numComponents:3, data: [
                    0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0, 

                    0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
                ]}
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }
        this.state = 0;
        this.lastTime = 0;
        this.wait = 1000;
    };
    Plane.prototype.draw = function(drawingState) {
        advance(this, drawingState);
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        modelM = twgl.m4.multiply(modelM, twgl.m4.rotationY(Math.PI/2));
        //twgl.m4.setTranslation(modelM,this.position,modelM);
        modelM = twgl.m4.multiply(modelM, twgl.m4.lookAt(this.position, this.target, [0, 1, 0]));
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Plane.prototype.center = function(drawingState) {
        return this.position;
    }

    function advance(plane, drawingState) {
        //plane.position = [6.0*(Math.sin(drawingState.realtime/1000)), 1.5*Math.sin(drawingState.realtime/1000) + 2.5, 6.0*(Math.cos(drawingState.realtime/1000))];
        //plane.orientation = drawingState.realtime/1000;
        if (plane.t < 1) {
            plane.position = plane.c1.value(plane.t);
            plane.target = plane.c1.dtValue(plane.t);
        }
        else if (plane.t >= 1 && plane.t < 2) {
            plane.position = plane.c2.value(plane.t - 1);
            plane.target = plane.c2.dtValue(plane.t - 1);
        }
        else if (plane.t >= 2 && plane.t < 3) {
            plane.position = plane.c3.value(plane.t - 2);
            plane.target = plane.c3.dtValue(plane.t - 2);
        }
        else if(plane.t >= 3 && plane.t < 4) {
            plane.position = plane.c4.value(plane.t - 3);
            plane.target = plane.c4.dtValue(plane.t - 3);
        }
        else {
            plane.t = 0;
            return;
        }
        plane.t += (drawingState.realtime - plane.lastTime)/3000;
        plane.lastTime = drawingState.realtime;
        return;
    }
})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.
//grobjects.push(new Plane("plane1",[0,2.5,6],1));

