
  class Triangle1
 {
	 constructor()
	 {
		 this.buffer=gl.createBuffer();
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		 
		 //Now we want to add color to our vertices information.
		 this.vertices =
		 [	
		 -.5,-.5,0,0,0,0,
		 .5,-.5,0,1,0,0,
		 0,.5,0,1,0,0,
		 
		 -.5,-.5,0,0,1,0,
		 0,0,-.5,0,1,0,
		 .5,-.5,0,0,1,0,
		 
		 0,0,-.5,0,0,1,
		 .5,-.5,0,0,0,1,
		 0,.5,0,0,0,1,
		 
		 0,.5,0,1,1,0,
		 0,0,-.5,1,1,0,
		 -.5,-.5,0,1,1,0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0,0.0,0.0];
		this.rot = [0.0,0.0,0.0];
	 }
	 //Again this could be inherited ... but not always...not all objects
	 
	 render(program)
	 {
		//First we bind the buffer for triangle 1
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		var primitiveType = gl.TRIANGLES;
		offset = 0;
		var count = 12;
		gl.drawArrays(primitiveType, offset, count);
	 }
 }
 class Wall
 {
	 constructor()
	 {
		this.buffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
		-.05,.05,0,	0,0,1,	//0
		.05,.05,0,	0,0,1,	//1
		.05,-.05,0,	0,0,1,	//2
		-.05,-.05,0,	0,0,1,	//3	
		-.05,.05,-.1,	1,0,0,	//4
		.05,.05,-.1,	1,0,0,	//5
		.05,-.05,-.1,	1,0,0,	//6
		-.05,-.05,-.1,	1,0,0	//7
		
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
		this.rot=[.3,.3,0];
		
		this.minX = 0;
		this.maxX = 0;
		this.minY = 0;
		this.maxY = 0;
	 }
	 
	 
	 setCollider(){
		this.minX = -0.05 + this.loc[0];
		this.maxX = 0.05 + this.loc[0];
		this.minY = -0.05 + this.loc[1];
		this.maxY = 0.05 + this.loc[1];
	 }
	 
	 render(program)
	 {
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
	 
	 var ibuffer = gl.createBuffer();
	 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibuffer);
	 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
	 gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
	 
	 }
 }
	   class Player
 {
	 constructor()
	 {
		 this.buffer=gl.createBuffer();
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		 
		 //Now we want to add color to our vertices information.
		 this.vertices =
		 [	
		-.05,-.05,0,0,0,1,
		 -.025,-.025,0,0,1,0,
		 -.025,0.0,0,0,1,0,
		 0,-.05,0,0,1,0,
		 0,0.05,0,0,0,1,
		 .025,-.025,0,0,1,0,
		  .025,0.0,0,0,1,0,
		  .05,-.05,0,0,0,1,
		  
		
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.5,0.5,0.0];
		this.rot = [0.0,0.0,0.0];
	 }
	 //Again this could be inherited ... but not always...not all objects
	 
	 render(program)
	 {
		//First we bind the buffer for triangle 1
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		var primitiveType = gl.TRIANGLE_STRIP;
		offset = 0;
		var count = this.vertices.length / 6;
		gl.drawArrays(primitiveType, offset, count);
	 }
	 
 }
 
 	   class Coin
 {
	 constructor()
	 {
		 this.buffer=gl.createBuffer();
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		 
		 //Now we want to add color to our vertices information.
		 this.vertices = this.calcCircle();
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0,0.0,0.0];
		this.rot = [0.0,0.0,0.0];
		
		this.radius = 0.05;
		this.isMonster = false;
	 }
	 //Again this could be inherited ... but not always...not all objects
				calcCircle(){
			
				var vertices = [];
				var x = 0;
				var y = 0;
				var R = 1;
				var G = .85;
				var B = 0;
				var radius = 0.05
				for(var i = 0; i <= 360; i++)
				{
					var j = i * Math.PI / 180;
					
					var vert1 = [
					Math.sin(j)*radius + x,
					Math.cos(j)*radius + y,
					0,
					R,G,B,
				];
					 var vert2 = [
					
					Math.sin(j)*radius + x,
					Math.cos(j)*radius + y,
					0.01,
					R,G,B,
				];
				
				vertices = vertices.concat(vert1);
				vertices = vertices.concat(vert2);
				}
				//console.log("returning vertices");
				return vertices;
				
				}
				
				update(){
					this.rot[1] += 0.01
				}
	 render(program)
	 {
		//First we bind the buffer for triangle 1
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		var primitiveType = gl.TRIANGLE_FAN;
		offset = 0;
		var count = this.vertices.length / 6;
		gl.drawArrays(primitiveType, offset, count);
	 }
 }
 
 	   class Monster
 {
	 constructor()
	 {
		 this.buffer=gl.createBuffer();
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		 
		 //Now we want to add color to our vertices information.
		 this.vertices =
		 [	
		 -.1,-.1,0,1,0,0,
		 0,-.05,0,1,0,0,
		 0,0,-.1,0,0,0,
		 0,-.05,0,1,0,0,
		0,0,-.1,0,0,0,
		 .1,-.1,0,1,0,0,
		 
		 0,0,0,0,0,0,
		 .1,-.1,0,0,0,0,
		 0.02,0.04,0,1,0,0,
		 0,0,0,0,0,0,
		 0.02,0.04,0,1,0,0,
		 0,.1,0,1,0,0,
		 
		 0,.1,0,1,0,0,
		 0,0,0,0,0,0,
		 -.02,0.04,0,1,0,0,
		 0,0,0,0,0,0,
		  -.02,0.04,0,1,0,0,
		 -.1,-.1,0,0,0,0,
		 ];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0,0.0,0.0];
		this.rot = [0.0,0.0,0.0];
		this.changeDirection = false;
		this.isMonster = true;
		this.radius = 0.1;
	 }
	 //Again this could be inherited ... but not always...not all objects
	 update(){
		 if(!this.changeDirection){
			 this.rot[2] = -1.5;
			this.loc[0] += 0.003
			if(this.loc[0] >= 1)
				this.changeDirection = true;
		 }
		 else if(this.changeDirection){
			 this.rot[2] = 1.5;
			 this.loc[0] -= .003;
			 if(this.loc[0] <= -1)
				 this.changeDirection = false;
		 }
	 }
	 
	 
	 render(program)
	 {
		//First we bind the buffer for triangle 1
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		var primitiveType = gl.TRIANGLES;
		offset = 0;
		var count = this.vertices.length / 6;
		gl.drawArrays(primitiveType, offset, count);
	 }
	 
 }