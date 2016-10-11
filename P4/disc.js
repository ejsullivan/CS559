
function Disc (x, y, z, radius) {
    var x = x;
    var y = y;
    var z = z;
    var distToCamera;
    var radius = radius;
    var rotation = 0;
    var axes = new Axes(0, 0, 0, 50);
    var discTx;

    this.draw = function(Tx) {
        context.beginPath();
        context.lineWidth = 10;
        context.strokeStyle = "black";
        context.fillStyle = "purple";

        //console.log(m4.translate(Tx, [x,y,z]));
        Tx = m4.multiply(discTx, Tx);
        moveToTx(0, 0 + radius, 0, Tx);
        for (var i = 0; i < 2*Math.PI; i += Math.PI/100) {
            lineToTx(0 + radius*Math.sin(i), 0 + radius*Math.cos(i), 0, Tx);
        }
        context.stroke();
        context.fill();
        axes.draw(Tx);

        moveToTx(0, 0, 0, Tx);
        var newTx = m4.multiply(m4.identity(), Tx);
        for (var i = 0; i < 4; i++) {
            newTx = m4.multiply(m4.rotationZ((i*Math.PI/2)), newTx);
            drawDisc(10, m4.translate(newTx, [75, 0, 0]));
        }
    }

    this.update = function () {
        rotation += .01;
        discTx = m4.translate(m4.rotationZ(rotation), [x,y,z]);
        discTx = m4.multiply(m4.rotationY(rotation), discTx);
    }

    this.position = function () {
        return m4.transformPoint(discTx, [0, 0, 0]);
    }

    this.primitives = function () {
        return [this];
    }

    this.setDistanceToCamera = function (distance) {
        distToCamera = distance;
    }

    this.calcDistance = function (eye) {
        var position;
        var distVector;
        position = this.position();
        distVector = [eye[0]-position[0], eye[1]-position[1], eye[2]-position[2]];
        //console.log("position = " + position + " eye = " + eye + " distVector = " + distVector[0]);
        distToCamera = vector3.length(distVector);
        //console.log(distToCamera);
    }

    this.distance = function () {
        return distToCamera;
    }
}

function drawDisc(radius, Tx) {
    moveToTx(0, 0 + radius, 0, Tx);
    for (var i = 0; i < 2*Math.PI; i += Math.PI/100) {
        lineToTx(0 + radius*Math.sin(i), 0 + radius*Math.cos(i), 0, Tx);
    }
    context.strokeStyle = "black";
    context.fillStyle = "orange";
    context.stroke();
    context.fill();
}
