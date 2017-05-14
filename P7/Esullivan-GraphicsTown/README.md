#
# P7
#

For this part of graphics town I have implemented 3 objects
The first object is a block like truck, it uses specular and diffuse shading and 
drives back and forth along the Z direction

The second object is an airplane it uses specular and diffuse shading and flies 
in a circle

The third object is an updated helicopter that I loaded from an object file using
a custom python script called objToJavascript.py it only uses diffuse shading

#
# P8 
#

Graphics town now has two types of shipping containers. One of which has a nice texture that actually looks kind of cool. The other is one I made and it does not look that great.

I have also included my new and improved object loader. The changes are that now the loader puts all of the data into a javascript object which contains an object for each group in the obj file and each group object contains the vertex, normal and texture data.
The file is sill named objToJavascript.py

#
# P9
#

For this program I added a drone object that follows a path made from four hermite curves. I also added a bump map the the cargo container, a skybox, and a spotlight that is attached to the drone. I have also included my own custom obj model loader called objToJavascript.py
