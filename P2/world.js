
// Definition of the world class which will contain
// all of the objects we need to update and draw
// and handle any interactions between them
function World(context) {
    this.elements = []; // The list of elements in the world
    this.context = context; // Where to draw
}

// Adds a new element to the list of elements
World.prototype.addElement = function(element) {
    this.elements.push(element);
}

// Removes the element at the top of the list
World.prototype.removeElement = function () {
    this.elements.pop();
}

// Draws all of the elements on the canvas
// each element in the list needs to implement
// the draw function
World.prototype.draw = function() {
    this.context.beginPath();
    this.context.save();
    this.elements.forEach(function(element) {element.draw(this.context)});
    this.context.restore();
}

// Calls the update function for each
// element in the world and checks to see if any of the
// objects need to be removed
// It now implements an awful collision system
World.prototype.update = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].update();

        var distanceSq;
        for (var j = 0; j < this.elements.length; j++) {
            if (i != j) {
                distanceSq = Math.pow(this.elements[i].x - this.elements[j].x, 2) +
                    Math.pow(this.elements[i].y - this.elements[j].y, 2);
                if (distanceSq < Math.pow(RADIUS + 30, 2)) {
                    this.elements[i].collide();
                    this.elements[j].collide();
                }
            }
        }

        if (this.elements[i].remove)
            this.elements.splice(i, 1);
    }
}