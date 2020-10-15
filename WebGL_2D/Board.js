class Board
{
	constructor()
	{
	this.dimensions = 10;
	this.position = [this.dimensions];
	this.tileSize = 64;
	this.numTrees = 10;
	this.numRocks = 5;
	this.numEnemies = 3;
	this.numPotions = 2;
	this.numPlayer = 1;
	this.numEmptySpace = 84;
	
	this.player = new Player(0,0,this.tileSize,"img/player.png");
	this.enemy1 = new Enemy(0,0,this.tileSize,this.player.atk,"img/enemy1.png");
	this.enemy2 = new Enemy(0,0,this.tileSize,this.player.atk,"img/enemy2.png");
	this.enemy3 = new Enemy(0,0,this.tileSize,this.player.atk,"img/enemy3.png");
	this.potion1 = new Potion(0,0,this.tileSize,"img/potion.png");
	this.potion2 = new Potion(0,0,this.tileSize,"img/potion.png");
	
	
	//console.log("I am a new board!");
	
	}
	
	/* tester()
			{
				console.log("We can call functions!");
			} */
			
	
	
	setMap()
	{
		
		for(var x = 0; x < this.dimensions; x++){
			this.position[x] = [];
			for(var y = 0; y < this.dimensions; y++)
			{
				
				this.position[x][y] = this.pickRandom();
				
			}
		}
	console.log("Here's the array:\n" + this.position + "\n");	
	/* console.log("Here's whats leftover \n" + "emptySpace "+ this.numEmptySpace + "\n");
			console.log("numTrees "+ this.numTrees + "\n");
			console.log("numRocks "+ this.numRocks + "\n");
			console.log("numEnemies "+ this.numEnemies + "\n");
			console.log("numPlayer "+ this.numPlayer + "\n");
			console.log("numpotions "+ this.numPotions + "\n"); */
	}
	
	drawGrid()
	{	
		//console.log("drawing grid...\n");
		for(var i = 0; i < this.dimensions; i++){
			for(var j = 0; j < this.dimensions; j++)
			{
				var x = i * this.tileSize;
				var y = j * this.tileSize;
				ctx.beginPath();
				ctx.fillStyle = "#0F0";
				ctx.strokeStyle = "#000";
				ctx.lineWidth = 2;
				ctx.lineCap = "square";
				ctx.lineJoin = "miter";
				ctx.strokeRect(x, y, this.tileSize, this.tileSize);
				ctx.fillRect(x, y, this.tileSize, this.tileSize);
				//console.log("drawing rectangle at " + x + y + "\n");
			}
		}
			/* 	ctx.beginPath();	
				ctx.fillStyle = "#88F";
				//Parematers are x,y, width and height
				ctx.fillRect(5,210,50,50);
				//setLineColor("#000");
				ctx.strokeRect(5,270,40,40);
				//For Both fill and outline
				ctx.strokeRect(5,320,50,50);
				ctx.fillRect(5,320,50,50);
	 */		
	}
		
		
	pickRandom()
	{
		var rand;
		var doAgain = true;
		rand = Math.floor(Math.random() * 6);
		//console.log("random number is " + rand + "\n");
		while(doAgain == true){
			switch(rand) {
				case 0:
					if(this.numEmptySpace == 0)
						rand++;
					else {
						this.numEmptySpace--;
						doAgain = false;
					}
				break;
				case 1:
					if(this.numTrees == 0)
						rand++;
					else {
						this.numTrees--;
						doAgain = false;
					}
				break;
				case 2:
					if(this.numRocks == 0)
						rand++;
					else {
						this.numRocks--;
						doAgain = false;
					}
				break
				case 3:
					if(this.numEnemies == 0)
						rand++;
					else {
						this.numEnemies--;
						doAgain = false;
					}
				break;
				case 4:
					if(this.numPlayer == 0)
						rand++;
					else {
						this.numPlayer--;
						doAgain = false;
					}
				break;
					case 5:
					if(this.numPotions == 0)
						rand = 0;
					else {
						this.numPotions--;
						doAgain = false;
					}
				break;
				default:{
					console.error("This is an error! rand picked a bad number.\n");//Will display an error in the JS console
					rand = 0;
				}
			
			}
		}
	return rand;
	}	

		drawBrick(xPos,yPos,tilesz)
			{
				var x = xPos;
				var y = yPos;
				var tileSize = tilesz;
				var xPix = x * tileSize;
				var yPix = y * tileSize;
				ctx.beginPath();
				ctx.lineWidth = 5;
				ctx.fillStyle = "#AAA";
				ctx.lineCap = "round";
				ctx.fillRect(xPix + (tileSize/4)-8,yPix + (tileSize/4)+5,tileSize * 0.7,tileSize * 0.4);
				ctx.closePath();
			}
			
			 drawTree(xPos,yPos,tilesz)
			{
				var x = xPos;
				var y = yPos;
				var tileSize = tilesz;
				var xPix = x * tileSize;
				var yPix = y * tileSize;
				var xStart = xPix + (tileSize/4);
				var yStart =  yPix + ((tileSize/2) + 5);
				
				ctx.lineWidth = 5;
				ctx.fillStyle = "#AA0";
				ctx.lineCap = "round";
				// Tree base
				ctx.fillRect(xStart,yStart-5,tileSize/3,tileSize/2);
				//Tree top
				ctx.beginPath();
				//ctx.strokeStyle = "#0A0";
				ctx.fillStyle =  "#0A0";
				ctx.arc(xStart,yStart,10,0,2*Math.PI, false); ////CTX.arc(x,y,Radius, Start angle <Rad>, End angle <Rad>,counter-clockwise?)
				ctx.fill();
				ctx.beginPath();
				ctx.arc(xPix + (tileSize/2)-5,yPix + (tileSize/2)-10,20,0,2*Math.PI, false); 
				ctx.fill();
				ctx.beginPath();
				ctx.arc(xPix + (tileSize/2)-15,yPix + (tileSize/2)-5,18,0,2*Math.PI, false); 
				ctx.fill();
				ctx.beginPath();
				ctx.arc(xPix + (tileSize/2)+5,yPix + (tileSize/2)-5,15,0,2*Math.PI, false); 
				ctx.fill();
			}
			
			 placeObjects()
			{
				console.log("Heres the array: " + this.position);
				ctx.clearRect(0,0,canvas.width,canvas.height);
				this.drawGrid();
				var dimensions = this.dimensions;
				var tileSize = this.tileSize;
				var enemyId = 3;
				var numPotions = 2;
				
				for(var x = 0; x < dimensions; x++){
					for(var y = 0; y < dimensions; y++){
						switch(this.position[x][y]) {
							case 0:
							break;
							case 1:
								this.drawTree(x,y,tileSize);
							break;
							case 2:
								this.drawBrick(x,y,tileSize);
							break
							case 3:
								if(enemyId == 3){
								this.enemy1.x = x;
								this.enemy1.y = y;
								this.enemy1.xPrev = x;
								this.enemy1.yPrev = y;
								this.enemy1.render();
								enemyId--;
							
								}
								else if(enemyId == 2){
								this.enemy2.x = x;
								this.enemy2.y = y;
								this.enemy2.xPrev = x;
								this.enemy2.yPrev = y;
								this.enemy2.render();
								enemyId--;
								}
								else {
								this.enemy3.x = x;
								this.enemy3.y = y;
								this.enemy3.xPrev = x;
								this.enemy3.yPrev = y;
								this.enemy3.render();
								enemyId--;
								}
							break;
							case 4:
							console.log("sending x and y "+x+y+"\n");
							this.player.x = x;
							this.player.y = y;
							this.player.xPrev = x;
							this.player.yPrev = y;
							this.player.render();
							break;
								case 5:
								if(numPotions == 2)
								{
								this.potion1.x = x;
								this.potion1.y = y;
								this.potion1.render();
								numPotions--;
								}
								else
								{
								this.potion2.x = x;
								this.potion2.y = y;
								this.potion2.render();
								numPotions--;
								}
							break;
						}
					}
				}
					
			}
			
			
}

			



