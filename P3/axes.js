/**
 * Created by esullivan on 9/30/16.
 */

function Axes(x, y, z, size) {
    var x = x;
    var y = y;
    var z = z;
    var size = size;

    this.draw = function (twglTx) {
        // A little cross on the front face, for identification
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "red";
        moveToTx(x,y,z,twglTx);lineToTx(x+size,y,z,twglTx);context.stroke();
        context.beginPath();
        context.strokeStyle = "green";
        moveToTx(x,y,z,twglTx);lineToTx(x,y+size,z,twglTx);context.stroke();
        context.beginPath();
        context.strokeStyle = "blue";
        moveToTx(x,y,z,twglTx);lineToTx(x,y,z+size,twglTx);context.stroke();
        context.closePath();
    }

    // does nothing
    this.update = function () {
        return;
    }

    this.position = function () {
        return [x, y, z];
    }

}