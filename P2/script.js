/**
 * Created by esullivan on 9/14/16.
 */

const RADIUS = 20;
var canvas;
var context;
var add;
var remove;
var width;
var height;

// Get a random color string of the form #[0-9,A-F]x6
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
var game = function() {
	canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    add = document.getElementById("add");
    remove = document.getElementById("remove");
    width = canvas.width;
    height = canvas.height;
    var world = new World(context);

    function loop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        world.update();
        world.draw();
        window.requestAnimationFrame(loop);
    }

    function addBall() {
        world.addElement(new Ball(Math.floor(Math.random() * width), Math.floor(Math.random() * height),
            Math.random() * 2, Math.random() * 2, getRandomColor()));
    }

    function removeBall() {
        world.removeElement();
    }
    
    add.addEventListener("click", addBall);
    remove.addEventListener("click", removeBall);
    loop();
}

window.onload = game;
