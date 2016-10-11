/**
 * Created by esullivan on 9/14/16.
 */

var canvas;
var context;
var twglCtx;
var width;
var height;
var nextTarget;
var m4 = twgl.m4;
var vector3 = twgl.v3;

function moveToTx(x,y,z,Tx) {
    var loc = [x,y,z];
    var locTx = m4.transformPoint(Tx,loc);
    context.moveTo(locTx[0]+300,-locTx[1]+300);
}

function lineToTx(x,y,z,twglTx) {
    var loc = [x,y,z];
    var locTx = m4.transformPoint(twglTx,loc);
    context.lineTo(locTx[0]+300,-locTx[1]+300);
}

function getRandomColor() {
    var i;
    var hex = '0123456789ABCDEF';
    var color = '#'
    for (i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Contains the main loop we will use
var app = function() {
	canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    nextTarget = document.getElementById("target");
    width = canvas.width;
    height = canvas.height;
    var world = new World(context);
    var angle = 0;

    world.setEye(1000,1000,1000);
    world.addElement(new Axes(0, 0, 0, 300));
    
    world.addElement(new Cube(200, 0, 0, 100,'purple', 0.01));
    world.addElement(new Cube(0, 200, 0, 100,'purple', 0.01));
    world.addElement(new Cube(-200, 0, 0, 100,'purple', 0.01));
    world.addElement(new Cube(0, -200, 0, 100,'purple', 0.01));
    world.addElement(new Cube(0, 0, 0, 100,'purple', 0.01));

    world.addElement(new Cube(0, 0, 150, 50, 'red', 0.01));
    world.addElement(new Cube(100, 0, 150, 50, 'red', 0.01));
    world.addElement(new Cube(0, 100, 150, 50, 'red', 0.01));
    world.addElement(new Cube(-100, 0, 150, 50, 'red', 0.01));
    world.addElement(new Cube(0, -100, 150, 50, 'red', 0.01));


    function changeTarget () {
        world.nextTarget();
    }

    function moveEye(event) {

        // UP
        if (event.keyCode == 38) {
            console.log("MOVE UP");
            world.moveEyeUp(50);
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

    function loop () {
        canvas.width = canvas.width;
        world.update();
        world.draw();
        window.requestAnimationFrame(loop);
    }

    nextTarget.addEventListener("click", changeTarget);
    document.addEventListener("keydown", moveEye);

    loop();
}

window.onload = app;
