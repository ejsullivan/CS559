
// Definition of the world class which will contain
// all of the objects we need to update and draw
// and handle any interactions between them
function World(context) {
    
    var elements = []; // The list of elements in the world
    var drawBuffer = [];
    var context = context; // Where to draw
    var eye = [0, 0, 0]; // Location of the eye in world space
    var up = [0,0,1]; // Unit vector pointing up
    var currTarget = 0; // Index of the target we are looking at
    var target = [0, 0, 0]; // Where the eye is looking
    var Tcamera = m4.inverse(m4.lookAt(eye, target, up)); // Transform from world->camera coordinates
    //var Tprojection = m4.identity();
    var Tprojection = m4.perspective(Math.PI/3,1,5,2000);
    var Tviewport=m4.multiply(m4.scaling([600, 600,600]),m4.translation([0,0,0]));
    var Tcpv=m4.multiply(m4.multiply(Tcamera,Tprojection),Tviewport);

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
        Tcamera = m4.inverse(m4.lookAt(eye, target, up)); // Transform from world->camera coordinates
        //Tprojection = m4.identity();
        Tprojection = m4.perspective(Math.PI/3,1,5,2000);
        Tviewport=m4.multiply(m4.scaling([600,600,600]),m4.translation([0,0,0]));
        Tcpv=m4.multiply(m4.multiply(Tcamera,Tprojection),Tviewport);
    }

    this.moveEyeDown = function (distance) {
        this.setEye(eye[0], eye[1], eye[2] - distance);
    }

    this.moveEyeUp = function (distance) {
        this.setEye(eye[0], eye[1], eye[2] + distance);
    }

    this.pathLeft = function (distance) {
        angle += distance;
        this.setEye(1000*Math.cos(angle),1000*Math.sin(angle),eye[2]);
    }

    this.pathRight = function (distance) {
        angle -= distance;
        this.setEye(1000*Math.cos(angle),1000*Math.sin(angle),eye[2]);
    }

    this.nextTarget = function () {
        target = elements[currTarget++ % elements.length].position();
    }

    this.updateTarget = function () {
        target = elements[currTarget % elements.length].position();
        Tcamera = m4.inverse(m4.lookAt(eye, target, up)); // Transform from world->camera coordinates
        //Tprojection = m4.identity();
        Tprojection = m4.perspective(Math.PI/3,1,5,2000);
        Tviewport=m4.multiply(m4.scaling([600,600,600]),m4.translation([0,0,0]));
        Tcpv=m4.multiply(m4.multiply(Tcamera,Tprojection),Tviewport);
    }

    // Draws all of the elements on the canvas
    // each element in the list needs to implement
    // the draw function
    this.draw = function () {
        drawBuffer.forEach(function(element) {element.draw(Tcpv)});
    }

    function getPrimitives () {
        var primitives = [];
        for (var i = 0; i < elements.length; i++) {
            primitives = primitives.concat(elements[i].primitives());
        }
        return primitives;
    }

    // Calls the update function for each
    // element in the world and checks to see if any of the
    // objects need to be removed
    // It now implements an awful collision system
    this.update = function () {

        this.updateTarget();
        angle += .01;
        for (var i = 0; i < elements.length; i++) {
            elements[i].update();
        }

        drawBuffer = getPrimitives();

        for (var i = 0; i < drawBuffer.length; i++) {
            drawBuffer[i].calcDistance(eye);
        }

        // Sort the elements by distance
        drawBuffer.sort(function(a, b) {
            if (a.distance() > b.distance())
                return -1;
            else
                return 1;
        });
    }

}