
// Definition of the world class which will contain
// all of the objects we need to update and draw
// and handle any interactions between them
function World(context) {
    
    var elements = []; // The list of elements in the world
    var context = context; // Where to draw
    var eye = [0, 0, 0]; // Location of the eye in world space
    var up = [0,0,1]; // Unit vector pointing up
    var currTarget = 0; // Index of the target we are looking at
    var target = [0, 0, 0]; // Where the eye is looking
    var Tcamera = m4.inverse(m4.lookAt(eye, target, up)); // Transform from world->camera coordinates
    var angle = 0;

    // Adds a new element to the list of elements
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
        Tcamera = m4.inverse(m4.lookAt(eye,target,up));
    }

    this.moveEyeDown = function (distance) {
        this.setEye(eye[0], eye[1], eye[2] - distance);
    }

    this.moveEyeUp = function (distance) {
        this.setEye(eye[0], eye[1], eye[2] + distance);
    }

    this.pathLeft = function (distance) {
        angle += distance;
        this.setEye(500*Math.cos(angle),500*Math.sin(angle),eye[2]);
    }

    this.pathRight = function (distance) {
        angle -= distance;
        this.setEye(500*Math.cos(angle),500*Math.sin(angle),eye[2]);
    }

    this.nextTarget = function () {
        target = elements[currTarget++ % elements.length].position();
    }

    this.updateTarget = function () {
        target = elements[currTarget % elements.length].position();
        Tcamera = m4.inverse(m4.lookAt(eye,target,up));
    }

    // Draws all of the elements on the canvas
    // each element in the list needs to implement
    // the draw function
    this.draw = function() {
        elements.forEach(function(element) {element.draw(Tcamera)});
    }

    // Calls the update function for each
    // element in the world and checks to see if any of the
    // objects need to be removed
    // It now implements an awful collision system
    this.update = function () {
        this.updateTarget();
        angle += .01;
        //this.setEye(eye[0]*Math.cos(angle),eye[1]*Math.sin(angle),eye[2]);
        for (var i = 0; i < elements.length; i++) {
            elements[i].update();
        }
    }

}