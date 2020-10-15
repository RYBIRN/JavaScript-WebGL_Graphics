
 class Hex
 {
	 constructor()
	 {
		this.buffer=gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
			-.5,-.5,-.25,.54,.27,.07,
			-.5, .5,-.25,.54,.27,.07,
			-.25,-.5,-.5,.54,.27,.07,
			-.25, .5,-.5,.54,.27,.07,
			.25,-.5,-.5,.54,.27,.07,
			.25,.5,-.5,.54,.27,.07,
			.5,-.5,-.25,.54,.27,.07,
			.5, .5,-.25,.54,.27,.07,
			.5,-.5,.25,.54,.27,.07,
			.5, .5,.25,.54,.27,.07,
			.25,-.5,.5,.54,.27,.07,
			.25, .5,.5,.54,.27,.07,
			-.25,-.5,.5,.54,.27,.07,
			-.25, .5,.5,.54,.27,.07,
			-.5,-.5,.25,.54,.27,.07,
			-.5, .5,.25,.54,.27,.07,
			-.5, -.5,-.25,.54,.27,.07,
			-.5, .5,-.25,.54,.27,.07
		];
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];
	 
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
	 
	 //var ibuffer = gl.createBuffer();
	 //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
	 //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
	 //gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
	 gl.drawArrays(gl.TRIANGLE_STRIP, 0, 18);
	 }
 }
 
 class Ground
{
	constructor()
	{
		this.buffer=gl.createBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
		-500,0,-500,0,1,0,
		500, 0,-500,0,1,0,
		-500,0,500,0,1,0,
		500, 0,-500,0,1,0,
		500,0,500,0,1,0,
		-500,0,500,0,1,0
		];

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];

	}

	render(program)
	{
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3; // 2 components per iteration
		var type = gl.FLOAT; // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT; //Size in bytes of each element // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0; // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT; //Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT; //size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);

		var tranLoc = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));

		//var ibuffer = gl.createBuffer();
		//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
		//gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
		//gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
}



 class TreeBase
 {
	 constructor()
	 {
		this.buffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
		-.2,1.5,.2,	.54,.27,.07,	//0
		.2,1.5,.2,	.54,.27,.07,	//1
		.2,-.5,.2,	.54,.27,.07,	//2
		-.2,-.5,.2,	.54,.27,.07,	//3	
		-.2,1.5,-.2, .54,.27,.07,	//4
		.2,1.5,-.2,	.54,.27,.07,	//5
		.2,-.5,-.2,	.54,.27,.07,	//6
		-.2,-.5,-.2, .54,.27,.07,	//7
		
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
		
		this.radius = .3;
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


  	   class TreeTop
 {
	 constructor()
	 {
		 this.buffer=gl.createBuffer();
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		 
		 //Now we want to add color to our vertices information.
		 this.vertices = this.calcCircle();
		 this.indexOrder = this.calcIndices();
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0,0.0,0.0];
		this.rot = [0.0,0.0,0.0];
		
	 }
	 //Again this could be inherited ... but not always...not all objects
				calcCircle(){
			
				var vertices = [];
				
				
				var div = 12;
				var i, ai, si, ci;
				var j, aj, sj, cj;
							
				var R = 0;
				var G = 1;
				var B = 0;
				
				for(var j = 0; j <= div; j++)
				{
					 aj = j * Math.PI / div;
					 sj = Math.sin(aj);
					 cj = Math.cos(aj);
					 for(i = 0; i <= div; i++){
					ai = i * 2 * Math.PI/div;
					si = Math.cos(ai);
					ci = Math.sin(ai);
					
					vertices.push(si * sj *.5); //x
					vertices.push(cj *.5); //y
					vertices.push(ci * sj *.5) // z
					vertices.push(R);
					vertices.push(G);
					vertices.push(B);
					 }
				}
				//console.log("returning vertices");
				return vertices;
				
				}
				
				calcIndices(){
					var indices = [];
					var i,j,p1,p2;
					var div = 12;
					
					for(j = 0; j < div; j++){
						for(i = 0; i < div; i++){
							p1 = j*(div+1) + i;
							p2 = p1 +(div+1);
							indices.push(p1);
							indices.push(p2);
							indices.push(p1 + 1);
							indices.push(p1 + 1);
							indices.push(p2);
							indices.push(p2 + 1);
						}
					}
					return indices;
				}
				
				update(){
					
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
		
		
		 var ibuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
		gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
	 }
 }
 
 class spotLight
 {
		constructor(){
			this.loc = [0.0,0.0,0.0];
			this.radius = .5;
			this.changeDirection = false;
		}
		
		update(){
		 if(!this.changeDirection){
			this.loc[0] += 0.03
			if(this.loc[0] >= 10)
				this.changeDirection = true;
		 }
		 else if(this.changeDirection){
			 this.loc[0] -= .03;
			 if(this.loc[0] <= -10)
				 this.changeDirection = false;
		}
		}
		
	render(program)
	 {	
		
		var tranLoc  = gl.getUniformLocation(program,'lightPosition');
		//console.log(tranLoc);
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
  }

 }
 
   	   class Rock
 {
	 constructor()
	 {
		 this.buffer=gl.createBuffer();
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		 
		 //Now we want to add color to our vertices information.
		 this.vertices = this.calcCircle();
		 this.indexOrder = this.calcIndices();
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0,0.0,0.0];
		this.rot = [0.0,0.0,0.0];
		this.radius = .5;
	 }
	 //Again this could be inherited ... but not always...not all objects
				calcCircle(){
			
				var vertices = [];
				
				
				var div = 8;
				var i, ai, si, ci;
				var j, aj, sj, cj;
							
				var R = .7;
				var G = .7;
				var B = .7;
				
				for(var j = 0; j <= div; j++)
				{
					 aj = j * Math.PI / div;
					 sj = Math.sin(aj);
					 cj = Math.cos(aj);
					 for(i = 0; i <= div; i++){
					ai = i * 2 * Math.PI/div;
					si = Math.cos(ai);
					ci = Math.sin(ai);
					
					vertices.push(si * sj *.7 + this.randomNum()); //x
					vertices.push(cj *.7 + this.randomNum()); //y
					vertices.push(ci * sj *.5 + this.randomNum()) // z
					vertices.push(R);
					vertices.push(G);
					vertices.push(B);
					 }
				}
				console.log("returning vertices" + vertices);
				return vertices;
				
				}
				
				randomNum(){
					return (Math.random()*.1)-.1;
				}
				
				calcIndices(){
					var indices = [];
					var i,j,p1,p2;
					var div = 8;
					
					for(j = 0; j < div; j++){
						for(i = 0; i < div; i++){
							p1 = j*(div+1) + i;
							p2 = p1 +(div+1);
							indices.push(p1);
							indices.push(p2);
							indices.push(p1 + 1);
							indices.push(p1 + 1);
							indices.push(p2);
							indices.push(p2 + 1);
						}
					}
					return indices;
				}
				
	
				
				update(){
					
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
		
		
		 var ibuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
		gl.drawElements(gl.TRIANGLE_STRIP,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
	 }
 }