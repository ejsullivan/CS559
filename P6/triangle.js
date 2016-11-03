
function Triangle (vertex1, vertex2, vertex3, color) {
    var vertexList = [];
    var vertexColorList = color.concat(color.concat(color)); // Color for each vertex
    var tModel = m4.identity();
    vertexList = vertexList.concat(vertex1, vertex2, vertex3);
    console.log(vertexList);


    this.draw = function(tVP) {
        return;
    }

    this.update = function () {
        return;
    }

    this.getVertexList = function () {
        return vertexList;
    }

    this.getVertexColorList = function () {
        return vertexColorList;
    }

}
