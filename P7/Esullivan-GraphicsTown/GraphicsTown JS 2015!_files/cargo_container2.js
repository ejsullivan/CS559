// Cargo Container Object

// If grobjects has not been created do that
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var Cargo2 = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    var shaderProgram = undefined;
    var buffers = undefined;
    var texture = undefined;
	var image = new Image();

    // constructor for Car
    Cargo2 = function Cargo2(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
        this.orientation = 0;
        this.texture = texture || 0;
    }
    Cargo2.prototype.init = function(drawingState) {

    	var gl=drawingState.gl;

		function initTextureThenDraw()
		{
			texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
			/*
		    image = LoadedImageFiles["Cargo01_D.png"];
		    LoadTexture();
		    */
		    image.onload = LoadTexture;
		    image.crossOrigin = "anonymous";

		    image.src = "https://c6.staticflickr.com/6/5593/31319351805_504f0f82f6_z.jpg"
		    window.setTimeout(console.log("TIMEOUT"), 500);
		  
		}

		function LoadTexture()
		{
		      gl.bindTexture(gl.TEXTURE_2D, texture);
		      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		      // Option 1 : Use mipmap, select interpolation mode
		      gl.generateMipmap(gl.TEXTURE_2D);
		      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);


		      // Option 2: At least use linear filters
		      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

		      // Optional ... if your shader & texture coordinates go outside the [0,1] range
		      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}

        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cargo-vs", "cargo-fs"]);
        }
        if (!buffers) {
            var arrays = Cargo_container_01_data["object"];
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
            shaderProgram.program.tex = gl.getUniformLocation(shaderProgram.program, "tex");
            gl.useProgram(shaderProgram.program);
    		gl.uniform1i(shaderProgram.program.tex, 0);
            initTextureThenDraw();
        }
    };
    Cargo2.prototype.draw = function(drawingState) {
        advance(this, drawingState);
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM, normalM: twgl.m4.transpose(twgl.m4.inverse(modelM))});
        gl.bindTexture(gl.TEXTURE_2D, texture);
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Cargo2.prototype.center = function(drawingState) {
        return this.position;
    }

    var speed = 3/1000;          // units per milli-second
    var turningSpeed = 2/1000;         // radians per milli-second

    function advance(car, drawingState) {
    	return;
    }

})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.

