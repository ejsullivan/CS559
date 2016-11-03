
// Cube is a wrapper class for a set of triangles
function Cube (x, y, z, size, color, rotate, shader) {

    // Positions in world space
    var x = x;
    var y = y;
    var z = z;

    var color1 = getRandomColor();
    var color2 = getRandomColor();
    var theta = 0;
    var rotate = rotate;

    // Keep a list of all of the vertices in the cube
    var vertexList = new Float32Array([
        // Bottom
        0.0, 0.0, 0.0, size, 0.0, 0.0, 0.0, 0.0, size,
        0.0, 0.0, 0.0, size, 0.0, 0.0, 0.0, 0.0, -size,
        0.0, 0.0, 0.0, -size, 0.0, 0.0, 0.0, 0.0, -size,
        0.0, 0.0, 0.0, -size, 0.0, 0.0, 0.0, 0.0, size,

        // Top
        0.0, size, 0.0, size, size, 0.0, 0.0, size, size,
        0.0, size, 0.0, size, size, 0.0, 0.0, size, -size,
        0.0, size, 0.0, -size, size, 0.0, 0.0, size, -size,
        0.0, size, 0.0, -size, size, 0.0, 0.0, size, size,

        // Side
        size, 0.0, 0.0, size, size, 0.0, 0.0, size, size,
        size, 0.0, 0.0, 0.0, size, size, 0.0, 0.0, size,

        // Side
        -size, 0.0, 0.0, 0.0, size, -size, 0.0, 0.0, -size,
        -size, 0.0, 0.0, -size, size, 0.0, 0.0, size, -size,

        // Side
        0.0, size, size, -size, 0.0, 0.0, 0.0, 0.0, size,
        -size, 0.0, 0.0, -size, size, 0.0, 0.0, size, size,

        // Side
        size, 0.0, 0.0, 0.0, size, -size, 0.0, 0.0, -size,
        0.0, size, -size, size, size, 0.0, size, 0.0, 0.0
    ]);

    // List of vertex normals
    var normalList = new Float32Array([
        // Bottom
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

        // Top
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

        // Side
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

        // Side
        -1.0, 0.0, -1.0, -1.0, 0.0, -1.0, -1.0, 0.0, -1.0,
        -1.0, 0.0, -1.0, -1.0, 0.0, -1.0, -1.0, 0.0, -1.0,

        // Side
        -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0,
        -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0,

        // Side
        1.0, 0.0, -1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0,
        1.0, 0.0, -1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0,
    ]);

    // Keep a list of all of the vertex colors
    var colorList = new Float32Array([
        // Bottom
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

        // Top
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

        // Side
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,

        // Side
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,

        // Side
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,

        // Side
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,
    ]);

    var tModel = m4.translate(m4.identity(), [x,y,z]); // Model Space -> World Space
    tModel = m4.multiply(m4.rotationY(theta), tModel);
    tModel = m4.multiply(m4.scaling([Math.abs(.5*Math.cos(theta)) + .5, Math.abs(.5*Math.cos(theta)) + .5, Math.abs(.5*Math.cos(theta)) + .5]), tModel);

    // Vertex buffer creation
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexList, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 48;

    // Normal buffer creation
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normalList, gl.STATIC_DRAW);
    normalBuffer.itemSize = 3;
    normalBuffer.numItems = 48;

    // a buffer for colors
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorList, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 48;

    this.update = function () {
        theta += rotate;
        tModel = m4.translate(m4.identity(), [x,y,z]);
        tModel = m4.multiply(m4.rotationY(theta), tModel);
        tModel = m4.multiply(m4.scaling([Math.abs(.5*Math.cos(theta)) + .5, Math.abs(.5*Math.cos(theta)) + .5, Math.abs(.5*Math.cos(theta)) + .5]), tModel);
    }

    this.draw = function (gl, tVP, tCamera) {
        var tMVP=m4.multiply(tModel, tVP);
        var tNormal = m4.transpose(m4.inverse(m4.multiply(tModel, tCamera)));
        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);
        gl.uniformMatrix4fv(shaderProgram.NormalMatrix,false,tNormal);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize,
            gl.FLOAT,false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize,
            gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, normalBuffer.itemSize,
            gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.TRIANGLES, 0, trianglePosBuffer.numItems);
    }
    
    this.position = function () {
        return m4.transformPoint(tModel, [0, 0, 0]);
    }
    
}
