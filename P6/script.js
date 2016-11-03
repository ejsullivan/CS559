
var canvas;
var gl;
var twglCtx;
var width;
var height;
var nextTarget;
var m4 = twgl.m4;
var vector3 = twgl.v3;
// Read shader source
var vertexSource = document.getElementById("vs").text;
var fragmentSource = document.getElementById("fs").text;
var shaderProgram;
var world;

function getRandomColor() {
    var i;
    var hex = '0123456789ABCDEF';
    var color = '#'
    for (i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Compile the vertex and fragment shader then link them
function webGlInit() {
    // Compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertexShader));
        return null;
    }

    // Compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShader));
        return null;
    }

    // Attach the shaders and link
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialize shaders");
        return null;
    }
    gl.useProgram(shaderProgram);
}

function initAttributes() {
    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);
    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    // this gives us access to the matrix uniform
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");
    shaderProgram.NormalMatrix = gl.getUniformLocation(shaderProgram, "tNormal");
}

function moveEye(event) {

    // UP
    if (event.keyCode == 38) {
        console.log("MOVE UP");
        //world.moveEyeUp(50);
        world.moveForward(5);
    }

    // DOWN
    if (event.keyCode == 40) {
        console.log("MOVE DOWN");
        world.moveEyeDown(50);
    }

    // LEFT
    if (event.keyCode == 37) {
        console.log("LEFT PRESS");
        world.pathLeft(.1);
    }

    // RIGHT
    if (event.keyCode == 39) {
        world.pathRight(.1);
    }
}

// Contains the main loop we will use
var app = function() {
	canvas = document.getElementById("canvas");
    gl = canvas.getContext('webgl');
    world = new World(gl);
    //world.addElement(new Cube(0, 0, 0, 100.0,'red', 0.01, shaderProgram));

    //world.addElement(new Cube(0, 0, 50, 25.0,'red', 0.01, shaderProgram));
    //world.addElement(new Cube(0, 0, -50, 25.0,'red', 0.01, shaderProgram));

    world.setEye(500,500,500);

    /*
    world.addElement(new Cube(200, 0, 0, 100,'purple', 0.01, shaderProgram));
    world.addElement(new Cube(0, 0, 200, 100,'purple', 0.01, shaderProgram));
    world.addElement(new Cube(-200, 0, 0, 100,'purple', 0.01, shaderProgram));
    world.addElement(new Cube(0, 0, -200, 100,'purple', 0.01, shaderProgram));
    world.addElement(new Cube(0, 0, 0, 100,'purple', 0.01, shaderProgram));
    */

    /*
    world.addElement(new Pyramid(0, 150, 0, 50, 'red', 0.01, shaderProgram));
    world.addElement(new Pyramid(100, 150, 0, 50, 'red', 0.01, shaderProgram));
    world.addElement(new Pyramid(0, 150, 100, 50, 'red', 0.01, shaderProgram));
    world.addElement(new Pyramid(-100, 150, 0, 50, 'red', 0.01, shaderProgram));
    world.addElement(new Pyramid(0, 150, -100, 50, 'red', 0.01, shaderProgram));

    world.addElement(new Pyramid(0, 150, 0, -50, 'red', 0.01, shaderProgram));
    world.addElement(new Pyramid(100, 150, 0, -50, 'red', 0.01, shaderProgram));
    world.addElement(new Pyramid(0, 150, 100, -50, 'red', 0.01, shaderProgram));
    world.addElement(new Pyramid(-100, 150, 0, -50, 'red', 0.01, shaderProgram));
    world.addElement(new Pyramid(0, 150, -100, -50, 'red', 0.01, shaderProgram));
    */

    for (var k = 0; k < 15; k++) {
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                world.addElement(new Pyramid(i * 15, 15*k, j * 15, 10, 'red', 0.01, shaderProgram));
            }
        }
    }

    webGlInit();
    initAttributes();

    function loop () {
        canvas.width = canvas.width;
        world.update();
        world.draw();
        window.requestAnimationFrame(loop);
    }

    loop();

}

document.addEventListener("keydown", moveEye);
window.onload = app;
