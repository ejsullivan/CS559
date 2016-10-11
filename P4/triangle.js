/**
 * Created by esullivan on 10/10/16.
 */

function Triangle (vertex1, vertex2, vertex3, color) {
    var v1 = vertex1;
    var v2 = vertex2;
    var v3 = vertex3;
    var centroid = [(v1[0] + v2[0] + v3[0])/3, (v1[1] + v2[1] + v3[1])/3, (v1[2] + v2[2] + v3[2])/3];
    var triangleTx = m4.identity();
    var fillType = color;
    var distToCamera;

    this.draw = function(Tx) {
        context.beginPath();
        Tx = m4.multiply(triangleTx, Tx);
        moveToTx(v1[0], v1[1], v1[2], Tx);
        lineToTx(v2[0], v2[1], v2[2], Tx);
        lineToTx(v3[0], v3[1], v3[2], Tx);
        lineToTx(v1[0], v1[1], v1[2], Tx);
        context.fillStyle = fillType;
        context.strokeStyle = 'black';
        context.fill();
        context.stroke();
    }

    this.update = function () {
        // Start at the first vertex
        triangleTx = m4.identity();//m4.translate(m4.identity(), [v1[0], v1[1], v2[2]]);
    }

    this.position = function () {
        return centroid;
    }

    this.calcDistance = function (eye) {
        var position;
        var distVector;
        position = this.position();
        distVector = [eye[0]-position[0], eye[1]-position[1], eye[2]-position[2]];
        distToCamera = vector3.length(distVector);
    }

    this.distance = function () {
        return distToCamera;
    }

}
