/**
 * Created by esullivan on 10/10/16.
 */

// Cube is a wrapper class for a set of triangles
function Cube (x, y, z, size, color, rotate) {
    var x = x;
    var y = y;
    var z = z;
    
    var cubeTx;
    var color1 = getRandomColor();
    var color2 = getRandomColor();
    var triangles = [];
    var theta = 0;
    var rotate = rotate;
    var scale = 1;

    this.update = function () {

        theta += rotate;
        cubeTx = m4.translate(m4.identity(), [x,y,z]);
        cubeTx = m4.multiply(m4.rotationZ(theta), cubeTx);
        cubeTx = m4.multiply(m4.scaling([Math.abs(.5*Math.cos(theta)) + .5, Math.abs(.5*Math.cos(theta)) + .5, Math.abs(.5*Math.cos(theta)) + .5]), cubeTx);
        //cubeTx = m4.multiply(m4.rotationY(theta), cubeTx);
        triangles = [];

        // Bottom
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, 0, 0]), m4.transformPoint(cubeTx, [size, 0, 0]), m4.transformPoint(cubeTx, [0, size, 0]), color2));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, 0, 0]), m4.transformPoint(cubeTx, [-size, 0, 0]), m4.transformPoint(cubeTx, [0, size, 0]), color2));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, 0, 0]), m4.transformPoint(cubeTx, [size, 0, 0]), m4.transformPoint(cubeTx, [0, -size, 0]), color1));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, 0, 0]), m4.transformPoint(cubeTx, [-size, 0, 0]), m4.transformPoint(cubeTx, [0, -size, 0]), color1));

        // Top
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, 0, size]), m4.transformPoint(cubeTx, [size, 0, size]), m4.transformPoint(cubeTx, [0, size, size]), color1));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, 0, size]), m4.transformPoint(cubeTx, [-size, 0, size]), m4.transformPoint(cubeTx, [0, size, size]), color2));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, 0, size]), m4.transformPoint(cubeTx, [size, 0, size]), m4.transformPoint(cubeTx, [0, -size, size]), color1));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, 0, size]), m4.transformPoint(cubeTx, [-size, 0, size]), m4.transformPoint(cubeTx, [0, -size, size]), color2));

        // Side
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [size, 0, 0]), m4.transformPoint(cubeTx, [size, 0, size]), m4.transformPoint(cubeTx, [0, size, size]), color1));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, size, 0]), m4.transformPoint(cubeTx, [0, size, size]), m4.transformPoint(cubeTx, [size, 0, 0]), color2));

        // Side
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [-size, 0, 0]), m4.transformPoint(cubeTx, [-size, 0, size]), m4.transformPoint(cubeTx, [0, -size, size]), color1));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, -size, 0]), m4.transformPoint(cubeTx, [0, -size, size]), m4.transformPoint(cubeTx, [-size, 0, 0]), color2));

        // Side
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [size, 0, 0]), m4.transformPoint(cubeTx, [size, 0, size]), m4.transformPoint(cubeTx, [0, -size, size]), color1));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, -size, 0]), m4.transformPoint(cubeTx, [0, -size, size]), m4.transformPoint(cubeTx, [size, 0, 0]), color2));

        // Side
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, size, size]), m4.transformPoint(cubeTx, [0, size, 0]), m4.transformPoint(cubeTx, [-size, 0, 0]), color1));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [0, -size, 0]), m4.transformPoint(cubeTx, [0, -size, size]), m4.transformPoint(cubeTx, [-size, 0, 0]), color2));

        // Side
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [-size, 0, 0]), m4.transformPoint(cubeTx, [-size, 0, size]), m4.transformPoint(cubeTx, [0, -size, size]), color1));
        triangles.push(new Triangle(m4.transformPoint(cubeTx, [-size, 0, 0]), m4.transformPoint(cubeTx, [-size, 0, size]), m4.transformPoint(cubeTx, [0, size, size]), color2));

    }

    this.primitives = function () {
        return triangles;
    }
    
    this.position = function () {
        return m4.transformPoint(cubeTx, [0, 0, 0]);
    }
    
}
