// Cargo Container Object

// If grobjects has not been created do that
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var Windmill = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    var shaderProgram = undefined;
    var buffers = undefined;
    var texture = null;
    var normalMap = null;
	//var image = new Image();

    // constructor for Car
    Windmill = function Windmill(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
        this.orientation = 0;
        this.texture = null;
        this.normalMap = null;
    }
    Windmill.prototype.init = function(drawingState) {

    	var gl=drawingState.gl;

    	// No need to init the texture multiple times
    	if (texture == null) {
            this.texture = new Texture("https://c1.staticflickr.com/1/743/31536690845_0254d188b1_o.png", gl, 0);
            texture = this.texture;
        }
        else {
            this.texture = texture;
        }

        // No need to init the normal map multiple times
        if (normalMap == null) {
            this.normalMap = new Texture("https://c1.staticflickr.com/1/690/30651358784_2cd11832ef_o.png", gl, 1);
            normalMap = this.normalMap;
        }
        else {
            this.normalMap = normalMap;
        }

        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cargo-vs", "cargo-fs"]);
        }
        if (!buffers) {
            var arrays = windmill_fix_data["object"];
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
            shaderProgram.program.tex = gl.getUniformLocation(shaderProgram.program, "tex");
            shaderProgram.program.normalMap = gl.getUniformLocation(shaderProgram.program, "normalMap");
            gl.useProgram(shaderProgram.program);
    		gl.uniform1i(shaderProgram.program.tex, 0);
            initTextureThenDraw(this.texture);
            gl.uniform1i(shaderProgram.program.normalMap, 1);
            initTextureThenDraw(this.normalMap);
            //finishTextureInit(gl);
        }
    };
    Windmill.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        console.log();
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            model: modelM, normalM: twgl.m4.transpose(twgl.m4.inverse(modelM)), spotlightPos:drawingState.spotlightPos});
        gl.activeTexture(gl.TEXTURE0);
        this.texture.bindTexture();
        gl.activeTexture(gl.TEXTURE1);
        this.normalMap.bindTexture();
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Windmill.prototype.center = function(drawingState) {
        return this.position;
    }

})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.

grobjects.push(new Windmill("windmill1",[0,0.001,-10],.01));

