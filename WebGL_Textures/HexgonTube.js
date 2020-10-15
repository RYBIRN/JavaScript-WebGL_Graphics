
class Box
{
	constructor()
	{
	this.tex = createBrick();
	this.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
	this.vertices = 
	[	//x		y		z        s        t
		-1,		-1,		0,		 0,		  0,
		1,		-1,		0,		 1,		  0,
		-1,		1,		0,		 0,		  1,
		1,		1,		0,		 1,		  1
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	this.loc=[0,0,0];
	this.rot=[0,0,0];
	
	this.myTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
	//We only want to do this once.
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	}
	render(program)
	{
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		

		var texCoordAttributeLocation = gl.getAttribLocation(program,'vertTexCoord');
		gl.vertexAttribPointer(
		texCoordAttributeLocation, //ATTRIBUTE LOCATION
		2, //NUMBER of elements per attribute
		gl.FLOAT, //TYPES OF ELEMENTS
		gl.FALSE,
		5*Float32Array.BYTES_PER_ELEMENT, //SIZE OF AN INDIVIDUAL VERTEX
		3*Float32Array.BYTES_PER_ELEMENT //OFFSET
		);		
			
		gl.enableVertexAttribArray(texCoordAttributeLocation);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		
		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);	
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	 }
}

 class Wall1
 {
	 constructor()
	 {
		 this.tex = createCheckered();
		this.buffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
		-2,2,2,		0,0,	//0
		2,2,2,		0,0,	//1
		2,-2,2,		0,1,	//2
		-2,-2,2,	0,1,	//3	
		-2,2,-2,	1,0,	//4
		2,2,-2,		1,0,	//5
		2,-2,-2,	1,1,	//6
		-2,-2,-2,	1,1	//7
		
		];
		this.indexOrder =
		[
		0,1,2,	//front face
		0,2,3,	
		0,1,5,	//Top Face
		5,4,1,
		4,5,6,	//Back Face
		4,6,7,
		1,2,5,	//Right face
		2,5,6,
		2,3,6,	//Bottom Face
		3,6,7,
		0,3,4,	//left face
		3,4,7
		]
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];
		this.radius = 2.5;
		
		this.myTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
	//We only want to do this once.
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	 }
	 
	render(program)
	{
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		

		var texCoordAttributeLocation = gl.getAttribLocation(program,'vertTexCoord');
		gl.vertexAttribPointer(
		texCoordAttributeLocation, //ATTRIBUTE LOCATION
		2, //NUMBER of elements per attribute
		gl.FLOAT, //TYPES OF ELEMENTS
		gl.FALSE,
		5*Float32Array.BYTES_PER_ELEMENT, //SIZE OF AN INDIVIDUAL VERTEX
		3*Float32Array.BYTES_PER_ELEMENT //OFFSET
		);		
			
		gl.enableVertexAttribArray(texCoordAttributeLocation);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		
		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);	
		 var ibuffer = gl.createBuffer();
	 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibuffer);
	 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
	 gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
	 }
 }
 
  class Wall2
 {
	 constructor()
	 {
		 this.tex = createBrick();
		this.buffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
		-2,2,2,		0,0,	//0
		2,2,2,		1,0,	//1
		2,-2,2,		0,1,	//2
		-2,-2,2,	1,1,	//3	
		-2,2,-2,	0,0,	//4
		2,2,-2,		1,0,	//5
		2,-2,-2,	0,1,	//6
		-2,-2,-2,	1,1	//7
		
		];
		this.indexOrder =
		[
		0,1,2,	//front face
		0,2,3,	
		0,1,5,	//Top Face
		5,4,1,
		4,5,6,	//Back Face
		4,6,7,
		1,2,5,	//Right face
		2,5,6,
		2,3,6,	//Bottom Face
		3,6,7,
		0,3,4,	//left face
		3,4,7
		]
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];
		this.radius = 2.5;
		
		this.myTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
	//We only want to do this once.
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	 }
	 
	render(program)
	{
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		

		var texCoordAttributeLocation = gl.getAttribLocation(program,'vertTexCoord');
		gl.vertexAttribPointer(
		texCoordAttributeLocation, //ATTRIBUTE LOCATION
		2, //NUMBER of elements per attribute
		gl.FLOAT, //TYPES OF ELEMENTS
		gl.FALSE,
		5*Float32Array.BYTES_PER_ELEMENT, //SIZE OF AN INDIVIDUAL VERTEX
		3*Float32Array.BYTES_PER_ELEMENT //OFFSET
		);		
			
		gl.enableVertexAttribArray(texCoordAttributeLocation);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		
		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);	
		 var ibuffer = gl.createBuffer();
	 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibuffer);
	 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
	 gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
	 }
 }

 class Ground
{
	constructor()
	{
		this.tex = createGround();
		this.buffer=gl.createBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
		-500,0,-500,0,0,
		500, 0,-500,0,10,
		-500,0,500,10,0,
		500, 0,-500,10,10,
		500,0,500,0,0,
		-500,0,500,0,10
		];

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];

		this.myTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	}

	render(program)
	{
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		

		var texCoordAttributeLocation = gl.getAttribLocation(program,'vertTexCoord');
		gl.vertexAttribPointer(
		texCoordAttributeLocation, //ATTRIBUTE LOCATION
		2, //NUMBER of elements per attribute
		gl.FLOAT, //TYPES OF ELEMENTS
		gl.FALSE,
		5*Float32Array.BYTES_PER_ELEMENT, //SIZE OF AN INDIVIDUAL VERTEX
		3*Float32Array.BYTES_PER_ELEMENT //OFFSET
		);		
			
		gl.enableVertexAttribArray(texCoordAttributeLocation);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		
		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);	
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
	 }
}

 class Hex
 {
	 constructor()
	 {
		this.buffer=gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		this.tex = createCheckered();
		gl.bindBuffer(gl.RRAY_BUFFER, this.buffer);
		this.vertices =
		[
			//X, Y,  Z,  U,  V,
			-.5,-.5,-.25,0,0,
			-.5, .5,-.25,0,10,
			-.25,-.5,-.5,10,0,
			-.25, .5,-.5,10,10,
			.25,-.5,-.5,0,0,
			.25,.5,-.5,0,10,
			.5,-.5,-.25,10,0,
			.5, .5,-.25,10,10,
			.5,-.5,.25,0,0,
			.5, .5,.25,0,10,
			.25,-.5,.5,10,0,
			.25, .5,.5,10,10,
			-.25,-.5,.5,0,0,
			-.25, .5,.5,0,10,
			-.5,-.5,.25,10,0,
			-.5, .5,.25,10,10,
			-.5, -.5,-.25,0,0,
			-.5, .5,-.25,0,10
		];
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];
		
	 	this.myTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));

	 }
	 
	 render(program)
	 {
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		

		var texCoordAttributeLocation = gl.getAttribLocation(program,'vertTexCoord');
		gl.vertexAttribPointer(
		texCoordAttributeLocation, //ATTRIBUTE LOCATION
		2, //NUMBER of elements per attribute
		gl.FLOAT, //TYPES OF ELEMENTS
		gl.FALSE,
		5*Float32Array.BYTES_PER_ELEMENT, //SIZE OF AN INDIVIDUAL VERTEX
		3*Float32Array.BYTES_PER_ELEMENT //OFFSET
		);		
			
		gl.enableVertexAttribArray(texCoordAttributeLocation);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		
		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);

		
	 gl.drawArrays(gl.TRIANGLE_STRIP, 0, 18);
	 }
 }
 
 
