 
 class NewShape
 {
	 constructor()
	 {
		 this.isFinished = false;
		 this.numPoints = 0;
		 this.lastPoint = 3;
		 this.isPolygon = false;
		 
		 this.primType = gl.TRIANGLE_STRIP;
		 //Initialize vertices
		 //Load bufers!  - ONLY HERE
		 this.positions = [];
			//Create a position buffer;
			this.positionBuffer = gl.createBuffer();
			//Bind "ARRAY_BUFFER type to the positionBuffer";
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
						//load the points.
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);	 
	 }
	 addPoint(x,y,r,g,b)//I could send in my color
	 {
		// console.log("rgb in addpoint is "+r+ " " +g + " "+ b);
		 this.positions.push(x);
		 this.positions.push(y);
		 this.positions.push(0); //Z
		 this.positions.push(r);//R
		 this.positions.push(g);//G
		 this.positions.push(b); //B
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		 //load the points.
		 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);	 	
		 this.numPoints +=1
		if(this.isPolygon){
			if(this.numPoints > 2){
				 this.tempFinished = true;
				
			 }
		}
		else if(this.numPoints == this.lastPoint)
		 {
			 this.isFinished = true;
		 }
		 
	 }
	 	 addPointTemp(x,y,r,g,b)//I could send in my color
	 {
		// console.log("rgb in addpoint is "+r+ " " +g + " "+ b);
		
			  
		 this.positions.push(x);
		 this.positions.push(y);
		 this.positions.push(0); //Z
		 this.positions.push(r);//R
		 this.positions.push(g);//G
		 this.positions.push(b); //B
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		 //load the points.
		 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);	 	
		  this.numPoints +=1;
		   if(this.isPolygon){
			 if(this.numPoints > 2){
				 this.tempFinished = true;
				 
			 }
		 }
		   else if(this.numPoints == this.lastPoint)
		 {
			 this.tempFinished = true;
		 }
	 }
	 draw(program)
	 {
		 
		 //Bind the correct buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		 //Set my attributes properties
		 //Draw shape
		 var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		 //Now we specify HOW TO read our vertices
		 gl.enableVertexAttribArray(positionAttributeLocation);
		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		var size = 3;          // 3 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = true; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(positionAttributeLocation, size, 
		type, normalize, stride, offset)
		
		 var colorAttributeLocation = gl.getAttribLocation(program, "a_color");
		 //Now we specify HOW TO read our vertices
		 gl.enableVertexAttribArray(colorAttributeLocation);
		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		size = 3;          // 3 components per iteration
		type = gl.FLOAT;   // the data is 32bit floats
		normalize = false; // don't normalize the data
		stride = 6*Float32Array.BYTES_PER_ELEMENT;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		offset = 3*Float32Array.BYTES_PER_ELEMENT;        // start at the beginning of the buffer
		gl.vertexAttribPointer(colorAttributeLocation, size, 
		type, normalize, stride, offset)		
		
		if(this.isFinished || this.tempFinished)
		{
		var primitiveType = this.primType;
		var offset = 0;
		var count = this.numPoints;
		gl.drawArrays(primitiveType, offset, count);	
		}
	/* 	else if(this.isPolygon){
		var primitiveType = this.primType;
		var offset = 0;
		var count = this.numPoints;
		gl.drawArrays(primitiveType, offset, count);
		} */
		else
		{
			var primitiveType = gl.LINE_STRIP
			var offset =0;
			gl.drawArrays(primitiveType,offset,this.numPoints);
		}
	 }
	 update()
	 {
		 //Do cool stuff.
		 
	 }
	 
 }
 
 class Line extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 2;
		 this.primType = gl.LINE_STRIP;
	 }
	 
 }
 
  class Triangle extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 3;
	 }
	 
 }
 
 class TriangleOutline extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 3;
		 this.primType = gl.LINE_LOOP;
	 }
	 
 }
	  
 
  class Rectangle extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 4;
		// this.isPolygon = true;
	 }
	 
 }
 
   class RectangleOutline extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 4;
		 this.primType = gl.LINE_LOOP;
		// this.isPolygon = true;
	 }
	 
 }
 
  class NPointPolygon extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 3;
		 this.isPolygon = true;
		
	 }
	 
 }
 
  class NPointPolygonOutline extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 3;
		 this.isPolygon = true;
		 this.primType = gl.LINE_LOOP;
	 }
	 
 }
 
  class Circle extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 360;
		 this.primType = gl.TRIANGLE_FAN;
			
	 }
	 
 }
 
   class CircleOutline extends NewShape{
	 
	 constructor(){
		 super();
		 this.lastPoint = 360;
		 this.primType = gl.LINE_STRIP;
	 }
	 
 }