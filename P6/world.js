
// Definition of the world class which will contain
// all of the objects we need to update and draw
// and handle any interactions between them
function World(gl) {

    var gl = gl; // The WebGl context
    var elements = []; // The list of elements in the world
    var eye = [0, 0, 0]; // Position of the eye
    var up = [0, 1, 0]; // Have the z axis point up
    var target = [0, 0, 0]; // What the eye is looking at
    var tWorld = m4.lookAt(eye,target,up);
    var tCamera = m4.inverse(tWorld); // World Space -> Camera Space
    var tProjection = m4.perspective(Math.PI/4,1,10,100000); // Camera -> NDC
    var tVP = m4.multiply(tCamera, tProjection); // World Space -> NDC
    var angle = 0; // Where is the eye currently?
    var currTarget = 0; // What is the current element we are looking at?
    
    // Adds the given element to the world
    this.addElement = function(element) {
        elements.push(element);
    }

    // Removes the element at the top of the list
    this.removeElement = function () {
        elements.pop();
    }

    // Sets the eye position and updates Tcamera
    this.setEye = function(x, y, z) {
        eye = [x, y, z];
        // Calculate the transforms again
        tWorld = m4.lookAt(eye,target,up);
        tCamera = m4.inverse(tWorld); // World Space -> Camera Space // Transform from world -> camera coordinates
        tVP = m4.multiply(tCamera, tProjection); // World Space -> NDC
    }

    this.moveForward = function (distance) {
        var dir = m4.transformPoint(tWorld, [0, 0, 1]);
        console.log(dir);
        var translation = m4.translate(m4.identity(), vector3.normalize(dir));
        var newPosition = m4.transformPoint(translation, eye);
        this.setEye(newPosition[0], newPosition[1], newPosition[2]);
    }

    this.moveBack = function (distance) {

    }

    this.moveRight = function (distance) {

    }

    this.moveLeft = function (distance) {

    }

    this.moveEyeDown = function (distance) {
        this.setEye(eye[0], eye[1] - distance, eye[2]);
    }

    this.moveEyeUp = function (distance) {
        this.setEye(eye[0], eye[1] + distance, eye[2]);
    }

    this.pathLeft = function (distance) {
        angle += distance;
        this.setEye(500*Math.cos(angle),eye[1],500*Math.sin(angle));
    }

    this.pathRight = function (distance) {
        angle -= distance;
        this.setEye(500*Math.cos(angle),eye[1],500*Math.sin(angle));
    }

    this.nextTarget = function () {
        currTarget++;
    }

    this.updateTarget = function () {
        target = [0,0,0]//elements[currTarget % elements.length].position();
        tCamera = m4.inverse(m4.lookAt(eye, target, up)); // Transform from world->camera coordinates
        tVP = m4.multiply(tCamera, tProjection); // World Space -> NDC
    }

    // Draws all of the elements on the canvas
    // each element in the list needs to implement
    // the draw function
    this.draw = function () {
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // clear the screen
        gl.enable(gl.DEPTH_TEST); // z buffer test
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (var i = 0; i < elements.length; i++) {
            elements[i].draw(gl, tVP, tCamera);
        }
    }

    // Calls the update function for each
    // element in the world and checks to see if any of the
    // objects need to be removed
    // It now implements an awful collision system
    this.update = function () {
        this.updateTarget(); // update the target we are looking at
        // Update each element in the world
        for (var i = 0; i < elements.length; i++) {
            elements[i].update();
        }
    }

}