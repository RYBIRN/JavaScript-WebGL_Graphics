class Character
{
	constructor()
	{
		this.maxHealth = 100;
		this.health = 100;
		this.atk = 7;
		this.def = 2;
	}	
}

class Player extends Character
{
	constructor(xCoord, yCoord, tileSz, pic)
	{
		super();
		this.x = xCoord;
		this.y = yCoord;
		this.xPrev = this.x;
		this.yPrev = this.y;
		this.tileSize = tileSz;
		this.img = new Image();
		this.img.src = pic; 
		this.playerDead = false;
	}
	
		takeDamage(enemyAtk)
	{
		var damage = (enemyAtk - this.def) * (Math.floor(Math.random() * 6)+1);
		console.log("Damage dealt is "+damage);
		this.health = this.health - damage;
		console.log("players new health is "+this.health);
		if(this.health < 0)
			this.playerDead = true;
		this.update();
	}
	
	restoreHealth(){
		console.log("restoring players health...")
		this.health = this.health + 50;
		if(this.health > 100)
			this.health = this.maxHealth;
		this.update();
	}
	
	update()
	{
		if(this.playerDead)
		{
			this.eraseThis();
			
		}
		else 
		{
			this.eraseThis();
			this.render();
		}
	}


	render()
	{	
		//console.log("x and y are "+this.x+" "+this.y+"\n");
		//console.log("tileSize = " + this.tileSize + "\n");
	/* 	ctx.fillStyle = "#00F";
		ctx.beginPath();
		ctx.arc(this.x*this.tileSize + (this.tileSize/2)-5,this.y*this.tileSize + (this.tileSize/2)-10,20,0,2*Math.PI, false);
		ctx.fill(); */
		
		var xpos = this.x;
		var ypos = this.y
		var xprev = this.xPrev;
		var yprev = this.yPrev;
		var tileSz = this.tileSize;
		var health = this.health;
		var maxHealth = this.maxHealth;
		
		var playerPic = this.img;
		
		playerPic.onload = function(){
			//ctx.clearRect(xprev * tileSz, yprev * tileSz, tileSz ,tileSz);
			//ctx.strokeRect(xpos*tileSz, ypos*tileSz, tileSz, tileSz);
			//ctx.fillRect(xpos*tileSz, ypos*tileSz, tileSz, tileSz);
			draw();
			drawHealthBar();
		
		}; playerPic.src = this.img.src;
	
		
	function draw()
	{
		ctx.drawImage(playerPic,xpos * tileSz, ypos * tileSz);
		
	}
	
	function drawHealthBar()
	{
		ctx.beginPath();
		ctx.fillStyle = "#F00";
		ctx.fillRect(xpos * tileSz, ypos * tileSz + tileSz - 10, tileSz * (health/maxHealth), 8);
	}
	
	}
	
	eraseThis(){	
			var playerPic = new Image();
			var xprev = this.x;
			var yprev = this.y;
			var tileSz = this.tileSize;
			console.log("Erasing position " + xprev + " " + yprev + "\n");
			playerPic.onload = function(){
			
			ctx.beginPath();
			ctx.fillStyle = "#0F0";
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1;
			ctx.lineCap = "square";
			ctx.lineJoin = "miter";
			ctx.clearRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			//console.log("Drawing border...\n");
			ctx.strokeRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			//console.log("Filling square...\n")
			ctx.fillRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			};playerPic.src = this.img.src;
		}
		
	 erasePrevious(){
		
		var playerPic = new Image();
		var xprev = this.xPrev;
		var yprev = this.yPrev;
		var tileSz = this.tileSize;
		//console.log("Erasing position " + xprev + " " + yprev + "\n");
		playerPic.onload = function(){
		ctx.beginPath();
		ctx.fillStyle = "#0F0";
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 1;
		ctx.lineCap = "square";
		//console.log("Clearing square...\n");
		ctx.clearRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
		//console.log("Drawing border...\n");
		ctx.strokeRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
		//console.log("Filling square...\n")
		ctx.fillRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
		};playerPic.src = this.img.src;
	}
		
	}
	


class Enemy extends Character
{
	constructor(xCoord, yCoord, tileSz, plyAtk, pic)
	{
		super();
		this.x = xCoord;
		this.y = yCoord;
		this.xPrev = this.x;
		this.yPrev = this.y
		this.tileSize = tileSz;
		this.img = new Image();
		this.img.src = pic
		
		this.playerAtk = plyAtk;
		
		this.atk = Math.floor(Math.random() * (11-3))+3;
		this.def = Math.floor(Math.random() * 5)+1;
		this.maxHealth = Math.floor(Math.random() * (120 - 51)) + 50;
		this.health = this.maxHealth;
		console.log("new enemy created with these stats\n ATK = " +this.atk+"\nDef = "+this.def+"\nHP = "+this.maxHealth);
		
		this.enemyDead = false;
	}
	
	takeDamage()
	{
		var damage = (this.playerAtk - this.def) * (Math.floor(Math.random() * 6)+1);
		console.log("Damage dealt is "+damage);
		this.health = this.health - damage;
		console.log("enemies new health is "+this.health);
		if(this.health < 0)
			this.enemyDead = true;
		this.update();
	}
	
	update()
	{
		if(this.enemyDead)
		{
			this.eraseThis();
			
		}
		else 
		{
			this.eraseThis();
			this.render();
		}
	}
		eraseThis(){	
			var playerPic = new Image();
			var xprev = this.x;
			var yprev = this.y;
			var tileSz = this.tileSize;
			console.log("Erasing position " + xprev + " " + yprev + "\n");
			playerPic.onload = function(){
			
			ctx.beginPath();
			ctx.fillStyle = "#0F0";
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1;
			ctx.lineCap = "square";
			ctx.lineJoin = "miter";
			ctx.clearRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			//console.log("Drawing border...\n");
			ctx.strokeRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			//console.log("Filling square...\n")
			ctx.fillRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			};playerPic.src = this.img.src;
		}
	render()
	{	
	/* 	ctx.fillStyle = "#F00";
		ctx.beginPath();
		ctx.arc(this.x*this.tileSize + (this.tileSize/2)-5,this.y*this.tileSize + (this.tileSize/2)-10,20,0,2*Math.PI, false);
		ctx.fill(); */
		
			
		//console.log("x and y are "+this.x+" "+this.y+"\n");
		//console.log("tileSize = " + this.tileSize + "\n");
	/* 	ctx.fillStyle = "#00F";
		ctx.beginPath();
		ctx.arc(this.x*this.tileSize + (this.tileSize/2)-5,this.y*this.tileSize + (this.tileSize/2)-10,20,0,2*Math.PI, false);
		ctx.fill(); */
		
		var xpos = this.x;
		var ypos = this.y
		var xprev = this.xPrev;
		var yprev = this.yPrev;
		var tileSz = this.tileSize;
		var playerPic = this.img;
		var health = this.health;
		var maxHealth = this.maxHealth;
		 playerPic.onload = function(){
		
        draw();
		drawHealthBar();
		
    };playerPic.src = this.img.src;
	
		
		
	function draw()
	{
		ctx.drawImage(playerPic,xpos * tileSz, ypos * tileSz);
	}
	
	function drawHealthBar()
	{
		ctx.beginPath();
		ctx.fillStyle = "#F00";
		ctx.fillRect(xpos * tileSz, ypos * tileSz + tileSz - 10, tileSz * ((health/maxHealth)), 8);
	}
	}
	
	 erasePrevious(){
		
		var playerPic = new Image();
		var xprev = this.xPrev;
		var yprev = this.yPrev;
		var tileSz = this.tileSize;
		console.log("Erasing position " + xprev + " " + yprev + "\n");
		playerPic.onload = function(){
		
		ctx.beginPath();
		ctx.fillStyle = "#0F0";
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 1;
		ctx.lineCap = "square";
		ctx.lineJoin = "miter";
		ctx.clearRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
		//console.log("Drawing border...\n");
		ctx.strokeRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
		//console.log("Filling square...\n")
		ctx.fillRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
		};playerPic.src = this.img.src;
	}
	
	
}

class Potion extends Player
{
	constructor(xCoord,yCoord,tileSz,pic)
	{
		super();
		this.x = xCoord;
		this.y = yCoord;
		this.tileSize = tileSz;
		this.img = new Image();
		this.img.src = pic;
	}
	
	
	render()
	{	
		//console.log("x and y are "+this.x+" "+this.y+"\n");
		//console.log("tileSize = " + this.tileSize + "\n");
	/* 	ctx.fillStyle = "#00F";
		ctx.beginPath();
		ctx.arc(this.x*this.tileSize + (this.tileSize/2)-5,this.y*this.tileSize + (this.tileSize/2)-10,20,0,2*Math.PI, false);
		ctx.fill(); */
		
		var xpos = this.x;
		var ypos = this.y
		var tileSz = this.tileSize;
		var playerPic = this.img;
		
		 playerPic.onload = function(){
        draw();
    };playerPic.src = this.img.src;
	function draw()
	{
		ctx.drawImage(playerPic,xpos * tileSz, ypos * tileSz);
	}
	}
				eraseThis(){	
			var playerPic = new Image();
			var xprev = this.x;
			var yprev = this.y;
			var tileSz = this.tileSize;
			console.log("Erasing position " + xprev + " " + yprev + "\n");
			playerPic.onload = function(){
			
			ctx.beginPath();
			ctx.fillStyle = "#0F0";
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1;
			ctx.lineCap = "square";
			ctx.lineJoin = "miter";
			ctx.clearRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			//console.log("Drawing border...\n");
			ctx.strokeRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			//console.log("Filling square...\n")
			ctx.fillRect(xprev * tileSz, yprev * tileSz, tileSz-1 ,tileSz-1);
			};playerPic.src = this.img.src;
		}
}