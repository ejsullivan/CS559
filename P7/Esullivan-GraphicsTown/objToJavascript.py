#!/usr/bin/env python

import os
import sys

# TODO: Try to make it easier for the javascript programmer to access each group without 
#	knowing the name or just part of the name.
def toJavascript(vertexList, normalList, vertexIndexList, normalIndexList, name):
	count = 0;
	javascript = "var " + name + "Vertex = ["
	for triangle in vertexIndexList:
		for vIndex in triangle:
			count += 1
			vertex = vertexList[int(vIndex) - 1]
			javascript += vertex[0] + ", " + vertex[1] + ", " + vertex[2] + ",\n"
	javascript += "];\n\n"
	javascript += "var " + name + "Normal = ["
	for triangle in normalIndexList:
                 for vIndex in triangle:
                         vertex = normalList[int(vIndex) - 1]
			 #vertex = ['0', '0', '0']
                         javascript += vertex[0] + ", " + vertex[1] + ", " + vertex[2] + ",\n"
	javascript += "];\n\n"
	javascript += "var " + name + "Color = ["
	for triangle in normalIndexList:
                 for vIndex in triangle:
                         vertex = normalList[int(vIndex) - 1]
                         javascript += "1.0" + ", " + "1.0" + ", " + "1.0" + ",\n"
	javascript += "];\n"
	javascript += "var " + name + "Count = " + str(count) + "\n"
	
	return javascript	

def javascriptObjectInit(name):
	javascript = ""
	javascript += "var " + name + "_data = {"
	return javascript

def javascriptObjectEnd():
	javascript = ""
	javascript += "};"	
	return javascript

def toJavascriptObject(vertexList, normalList, texList, vertexIndexList, normalIndexList, texIndexList, name):
	if name != None:
		javascript = name + " : {\n"
	else: 
		javascript = "object : {\n"
	javascript += "vertex : { numComponents : 3,\n"
	javascript += "data : ["
	for triangle in vertexIndexList:
        	for vIndex in triangle:
                 	vertex = vertexList[int(vIndex) - 1]
                 	javascript += vertex[0] + ", " + vertex[1] + ", " + vertex[2] + ",\n"
	javascript += "]},\n"
	javascript += "normal: { numComponents : 3,\n"
	javascript += "data : ["
	for triangle in normalIndexList:
		for vIndex in triangle:
			vertex = normalList[int(vIndex) - 1]
			javascript += vertex[0] + ", " + vertex[1] + ", " + vertex[2] + ",\n"
	javascript += "]},\n"
	javascript += "texcoord : { numComponents : 2,\n"
	javascript += "data : ["
	for triangle in texIndexList:
		for vIndex in triangle:
			texCord = texList[int(vIndex) - 1]
			# Top left of obj is (0,0) not (0,1) R.I.P 3 hrs of my time
			javascript += texCord[0] + ", " + str(1 - float(texCord[1])) + ",\n"
	javascript += "]},\n"
	javascript += "color : {numComponents : 3,\n"
	javascript += "data : ["
	for triangle in normalIndexList:
		for vIndex in triangle:
			vertex = normalList[int(vIndex) - 1]
			javascript += "1.0" + ", " + "1.0" + ", " + "1.0" + ",\n"
	javascript += "]},\n}"
	return javascript

# TODO: Add support for indexed lists
def toIndexedJavascript(vertexList, normalList, vertexIndexList, normalIndexList, name):
	javascript = "var " + name + "Vertex = ["
	for v in vertexList:
		javascript += v[0] + ", " + v[1] + ", " + v[2] + ",\n"
	javascript += "];\n\n"
	javascript += "var " + name + "Normal = ["
	for n in normalList:
		javascript += n[0] + ", " + n[1] + ", " + n[2] + ",\n"
	javascript += "];\n\n"
	javascript += "var " + name + "Index = ["
	for i in vertexIndexList:
		javascript += i[0] + ", " + i[1] + ", " + i[2] + ",\n"
	javascript += "];\n"
	return javascript

def main():
	vertexList = []
	normalList = []
	texList = []
	vertexIndexList = []
	normalIndexList = []
	texIndexList = []
	curr = []
	name = None
	filename = sys.argv[1]
	try:
		f = open(filename, 'r')
		print javascriptObjectInit(filename.split(".")[0])
		for line in f:
			curr = line.split()
			if (len(curr) == 0):
				continue
			elif (curr[0] == 'v'):
				vertexList.append([curr[1], curr[2], curr[3]])
			elif (curr[0] == 'vn'):
				normalList.append([curr[1], curr[2], curr[3]])
			elif (curr[0] == 'vt'):
				texList.append([curr[1], curr[2]])
			elif (curr[0] == 'f'):
				vertexIndexList.append([curr[1].split("/")[0],
						  	curr[2].split("/")[0],
						  	curr[3].split("/")[0]])
				texIndexList.append([curr[1].split("/")[1],
						     curr[2].split("/")[1],
						     curr[3].split("/")[1]])
				normalIndexList.append([curr[1].split("/")[2],
                                                        curr[2].split("/")[2],
                                                        curr[3].split("/")[2]])
			elif (curr[0] == 'g'):
				# For the first group we won't have any vertex data
				if name != None:
					print toJavascriptObject(vertexList, normalList, texList, vertexIndexList, normalIndexList, texIndexList, name)
				# Create an empty set for the new group verticies and normals
				vertexIndexList = []
				normalIndexList = []
				texIndexList = []
				name = curr[1]
			else:
				continue
				
	
	except IOError:
		print "ERROR: file " + filename + " does not exist"
		exit(0)

	# Make sure to include the data in the last group of the obj
	print toJavascriptObject(vertexList, normalList, texList, vertexIndexList, normalIndexList, texIndexList, name)
	print javascriptObjectEnd()

if __name__ == '__main__':
	if (len(sys.argv) != 2):
		print "USAGE: ./objToJavascript.py <filename>"
		exit(0)
	main()
