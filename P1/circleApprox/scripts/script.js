function setup() {

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");

    // Point data
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    function drawCircle() {

        var radius = slider1.value; // Circle radius value
        var numOfPoints = slider2.value; // Number of points on the circle we will draw lines between
        var stepSize = (2.0 * Math.PI)/numOfPoints; // Number of degrees in radians to rotate between points
        var point = []; // The current point that has been calculated
        var center = new Point(200, 200); // The center of the circle

        document.getElementById("radius").innerHTML = radius;
        document.getElementById("numOfPoints").innerHTML = numOfPoints;

        // Clears the canvas
        canvas.width = canvas.width;
        context.beginPath();

        // Calculate all of the points on the circle we will use and then draw a line
        for (var i = 0; i < numOfPoints + 1; i++) {
            point = new Point(Math.floor(center.x + Math.cos(i * stepSize)*radius),
                Math.floor(center.y + Math.sin(i * stepSize)*radius));
            context.lineTo(point.x, point.y);
            context.stroke();
        }

        context.closePath();

    }

    slider1.addEventListener("input", drawCircle);
    slider2.addEventListener("input", drawCircle);
    drawCircle();

}

window.onload = setup();


