
// Ball class definition
function Ball(x, y, dx, dy, color) {
    this.x = x; // current x position
    this.y = y; // current y postion
    this.theta = 0; // current offset angle
    this.dx = dx; // x position rate of change
    this.dy = dy; // y position rate of change
    this.dtheta = .1; // theta rate of change
    this.color = color; // center ball color
    this.remove = false; // remove the object from the world
    this.health = 8;
}

// Should be called every animation frame
Ball.prototype.draw = function(context) {
    context.save();
    context.beginPath();

    // Draw the center of the ball
    context.translate(this.x, this.y);
    context.arc(0, 0, RADIUS, 0, 2*Math.PI);
    context.fillStyle = this.color;
    context.fill();

    // Draw some stuff around the circle
    context.save();
    context.rotate(this.theta);
    for (var i = 0; i < this.health; i++) {
        context.beginPath();
        context.save();
        context.translate(RADIUS + 20, 0);
        context.arc(0, 0, 10, 0, 2*Math.PI);
        context.fillStyle = "black";
        context.fill();
        context.restore();
        context.rotate(Math.PI/4);
    }
    context.restore();

    context.restore();
}

// Update the position/velocity of the ball
Ball.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;

    if (Math.random() > 0.5 || this.dx > 4)
        this.dx -= Math.random();
    else
        this.dx += Math.random();

    if (Math.random() > 0.5 || this.dy > 4)
        this.dy -= Math.random();
    else
        this.dy += Math.random();

    this.theta += this.dtheta;

    if (this.x > width) {
        //this.remove = true;
        this.dx = -Math.abs(this.dx);
    } else if (this.x < 0) {
        //this.remove = true;
        this.dx = Math.abs(this.dx);
    }

    if (this.y > height) {
        //this.remove = true;
        this.dy = -Math.abs(this.dy);
    } else if (this.y < 0) {
        //this.remove = true;
        this.dy = Math.abs(this.dy);
    }
}

// Simple collision
Ball.prototype.collide = function() {
    this.dx = -this.dx;
    this.dy = -this.dy;
    this.x += 5;
    this.y += 5;
    this.health--;
    if (this.health == 0) {
        this.remove = true;
    }
}
