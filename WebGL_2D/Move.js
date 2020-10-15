class PlayerMove
{
	constructor()
	{
		this.newBoard = new Board();
	}
	
	gameLoop()
	{
		var board = this.newBoard;
		var enemy1Move = new EnemyMove(board,1);
		var enemy2Move = new EnemyMove(board,2);
		var enemy3Move = new EnemyMove(board,3);
		board.setMap();
		board.placeObjects();
		//ctx.clearRect(0,0,canvas.width,canvas.height);
		//newBoard.updateBoard();
		//var brd = this.brd;
		//var ply = this.ply;
		//console.log("Here's what I got. " +ply.x+ " " +ply.y);
		window.addEventListener("keydown", moveSomething, false);
	/* 	newBoard.player.erasePrevious();
		newBoard.enemy1.erasePrevious();
		newBoard.enemy2.erasePrevious();
		newBoard.enemy3.erasePrevious();
		newBoard.potion1.erasePrevious();
		newBoard.potion2.erasePrevious();
		
		newBoard.updateBoard();
		
		newBoard.player.render();
		newBoard.enemy1.render();
		newBoard.enemy2.render();
		newBoard.enemy3.render();
		newBoard.potion1.render();
		newBoard.potion2.render();  */
		
		function moveSomething(e) {
			function moveLeftRight(xVal){
				var newX = xVal;
				board.player.xPrev = board.player.x;
				board.player.yPrev = board.player.y;
				board.player.x = newX;
				board.player.y = board.player.y;
				board.position[newX][board.player.y] = 4;
				board.position[board.player.xPrev][board.player.yPrev] = 0;
				board.player.erasePrevious();
				board.player.render();
			}
			function moveUpDown(yVal){
				var newY = yVal;
				board.player.xPrev = board.player.x;
				board.player.yPrev = board.player.y;
				board.player.x = board.player.x;
				board.player.y = newY;
				board.position[board.player.x][newY] = 4;
				board.position[board.player.xPrev][board.player.yPrev] = 0;
				board.player.erasePrevious();
				board.player.render();
			}
			function enemiesMove(){
				if (!board.enemy1.enemyDead)
					enemy1Move.makeMove();
				if (!board.enemy2.enemyDead)
					enemy2Move.makeMove();
				if (!board.enemy3.enemyDead)
					enemy3Move.makeMove();
			}
			function checkForWin(){
				if (board.enemy1.enemyDead && board.enemy2.enemyDead && board.enemy3.enemyDead){
					console.log("You Win!!!!! *airhorn*" )
					board.player.eraseThis();
					//board.potion1.eraseThis();
					//board.potion2.eraseThis();
					ctx.beginPath();
					ctx.font = "128px Georgia";
					ctx.fillStyle = "#00F";
					ctx.fillText("You Win!!", 40, 320);
			}
			}
			function restoreHealth(xVal,yVal){
				var x = xVal;
				var y = yVal;
				if (board.position[x][y] == 5){
					board.player.restoreHealth();
					if(board.potion1.x == x && board.potion1.y == y)
						board.potion1.eraseThis()
					else 
						board.potion2.eraseThis();
				}
			}
			
			if(!board.player.playerDead || board.enemy1.enemyDead && board.enemy2.enemyDead && board.enemy3.enemyDead){
			switch(e.keyCode) {
				case 37:
					// left key pressed
					var newX = board.player.x - 1;
					if(board.player.x == 0)
						break;
					if(board.position[newX][board.player.y] == 0 || board.position[newX][board.player.y] == 5)
					{
						console.log("Left was pressed...\n");
						restoreHealth(newX,board.player.y);
						moveLeftRight(newX);
						enemiesMove();
					}
					else if(board.position[newX][board.player.y] == 3){
						console.log("Enemy is taking damage...");
						if(board.enemy1.x == newX && board.enemy1.y == board.player.y){
							board.enemy1.takeDamage();
							if(board.enemy1.enemyDead)
							{
								moveLeftRight(newX);
								checkForWin();
							}
						}
						else if(board.enemy2.x == newX && board.enemy2.y == board.player.y){
							board.enemy2.takeDamage();
								if(board.enemy2.enemyDead)
							{
								moveLeftRight(newX);
								checkForWin();
							}
						}
						else if(board.enemy3.x == newX && board.enemy3.y == board.player.y){
							board.enemy3.takeDamage();
								if(board.enemy3.enemyDead)
							{
								moveLeftRight(newX);
								checkForWin();
							}
						}
						enemiesMove();
					}
						
					break;
				case 38:
					// up key 
					var newY = board.player.y - 1;
					if(board.player.y == 0)
						break;
					if(board.position[board.player.x][newY] == 0 || board.position[board.player.x][newY] == 5)
					{
					 console.log("Up was pressed...\n");
						restoreHealth(board.player.x,newY);
						moveUpDown(newY);
						enemiesMove();
					}
					else if(board.position[board.player.x][newY] == 3){
						console.log("Enemy is taking damage...");
						if(board.enemy1.x == board.player.x && board.enemy1.y == newY){
							board.enemy1.takeDamage();
							if(board.enemy1.enemyDead){
								moveUpDown(newY);
								checkForWin();
							}
						}
						else if(board.enemy2.x == board.player.x && board.enemy2.y == newY){
							board.enemy2.takeDamage();
							if(board.enemy2.enemyDead){
								moveUpDown(newY);
								checkForWin();
							}
						}
						else if(board.enemy3.x == board.player.x && board.enemy3.y == newY){
							board.enemy3.takeDamage();
							if(board.enemy3.enemyDead){
								moveUpDown(newY);
								checkForWin();
							}
						}
						enemiesMove();
					}
					break;
				case 39:
					// right key pressed
					var newX = board.player.x + 1;
					if(board.player.x == 9)
						break;
					if(board.position[newX][board.player.y] == 0 || board.position[newX][board.player.y] == 5)
					{
						console.log("Right was pressed...\n");
						restoreHealth(newX,board.player.y);
						moveLeftRight(newX);
						enemiesMove();
						
					}
					else if(board.position[newX][board.player.y] == 3){
						console.log("Enemy is taking damage...");
							if(board.enemy1.x == newX && board.enemy1.y == board.player.y){
							board.enemy1.takeDamage();
							if(board.enemy1.enemyDead){
								moveLeftRight(newX);
								checkForWin();
							}
						}
						else if(board.enemy2.x == newX && board.enemy2.y == board.player.y){
							board.enemy2.takeDamage();
								if(board.enemy2.enemyDead){
								moveLeftRight(newX);
								checkForWin();
								}
						}
						else if(board.enemy3.x == newX && board.enemy3.y == board.player.y){
							board.enemy3.takeDamage();
								if(board.enemy3.enemyDead){
								moveLeftRight(newX);
								checkForWin();
								}
						}
						enemiesMove();
					}
					break;
				case 40:
					// down key pressed
					var newY = board.player.y + 1;
					if(board.player.y == 9)
						break;
					if(board.position[board.player.x][newY] == 0 || board.position[board.player.x][newY] == 5)
					{
						console.log("Down was pressed...\n");
						restoreHealth(board.player.x,newY);
						moveUpDown(newY);
						enemiesMove();
						
					}
					else if(board.position[board.player.x][newY] == 3){
						console.log("Enemy is taking damage...");
							if(board.enemy1.x == board.player.x && board.enemy1.y == newY){
							board.enemy1.takeDamage();
							if(board.enemy1.enemyDead){
								moveUpDown(newY);
								checkForWin();
							}
						}
						else if(board.enemy2.x == board.player.x && board.enemy2.y == newY){
							board.enemy2.takeDamage();
							if(board.enemy2.enemyDead){
								moveUpDown(newY);
								checkForWin();
							}
						}
						else if(board.enemy3.x == board.player.x && board.enemy3.y == newY){
							board.enemy3.takeDamage();
							if(board.enemy3.enemyDead){
								moveUpDown(newY);
								checkForWin();
							}
						}
						enemiesMove();
					}
					break;  
			}
			//console.log("heres our current player position in moveSomething "+board.player.x + board.player.y);
			}	//console.log("heres our previous player position in moveSomething "+board.player.xPrev + board.player.yPrev);		
		}
		
				//board.clearBoard();
				//board.updateBoard();
	}
	
	
	
}

class EnemyMove
{
	constructor(brd, id)
	{
		this.board = brd;
		this.enNum = id;
	}
	
	makeMove()
	{
		this.moveTo(this.enNum);
	
	}
	
	pickRandom()
	{
		var rand = Math.floor(Math.random() * 4);
		return rand;
	}
	
	moveTo(enNum)
	{	
	var rand = this.pickRandom();
	var board = this.board;
	//console.log("Heres the enemies board: " +board.position);
	
	function moveLeftRight(xVal){
		var newX = xVal;
		enemy.xPrev = enemy.x;
		enemy.yPrev = enemy.y;
		enemy.x = newX;
		enemy.y = enemy.y;
		board.position[newX][enemy.y] = 3;
		board.position[enemy.xPrev][enemy.yPrev] = 0;
		enemy.erasePrevious();
		enemy.render();
	}
	
	function moveUpDown(yVal){
		newY = yVal;
		enemy.xPrev = enemy.x;
		enemy.yPrev = enemy.y;
		enemy.x = enemy.x;
		enemy.y = newY;
		board.position[enemy.x][newY] = 3;
		board.position[enemy.xPrev][enemy.yPrev] = 0;
		enemy.erasePrevious();
		enemy.render();
	}
	
	function checkForLoss(){
				if (board.player.playerDead){
					console.log("You Lose!!!!! Booooo!" );
					board.enemy1.eraseThis();
					board.enemy2.eraseThis();
					board.enemy3.eraseThis();
					//board.potion1.eraseThis();
					//board.potion2.eraseThis();
					ctx.beginPath();
					ctx.font = "128px Georgia";
					ctx.fillStyle = "#F00";
					ctx.fillText("You Lose!", 40, 320);
				}
			}
	
		if(enNum == 1){
		var enemy = board.enemy1;
		}
		else if(enNum == 2){
			var enemy = board.enemy2;
		}
		else
			var enemy = board.enemy3;
		switch(rand) {
				case 0:
					// left key pressed
					var newX = enemy.x - 1;
					if(enemy.x == 0)
						break;
					if(board.position[newX][enemy.y] == 0)
					{
						console.log("Enemy choose left\n");
						moveLeftRight(newX);
					}
					else if(board.position[newX][enemy.y] == 4){
						console.log("Player is taking damage...");
							board.player.takeDamage(enemy.atk);
							if(board.player.playerDead){
								moveUpDown(newY);
								checkForLoss();
							}
					}
							
					break;
				case 1:
					// up key 
					var newY = enemy.y - 1;
					if(enemy.y == 0)
						break;
					if(board.position[enemy.x][newY] == 0)
					{
					 console.log("Enemy choose Up...\n");
					moveUpDown(newY);
					}
					else if(board.position[enemy.x][newY] == 4){
						console.log("Player is taking damage...");
							board.player.takeDamage(enemy.atk);
							if(board.player.playerDead){
								moveUpDown(newY);
								checkForLoss();
							}
					}
					break;
				case 2:
					// right key pressed
					var newX = enemy.x + 1;
					if(enemy.x == 9)
						break;
					if(board.position[newX][enemy.y] == 0)
					{
						console.log("Enemy choose Right...\n");
						moveLeftRight(newX);
					}
					else if(board.position[newX][enemy.y] == 4){
						console.log("Player is taking damage...");
							board.player.takeDamage(enemy.atk);
							if(board.player.playerDead){
								moveUpDown(newY);
								checkForLoss();
							}
							}
					break;
				case 3:
					// down key pressed
					var newY = enemy.y + 1;
					if(enemy.y == 9)
						break;
					if(board.position[enemy.x][newY] == 0)
					{
						console.log("Enemy choose down...\n");
						moveUpDown(newY);
					}
					else if(board.position[enemy.x][newY] == 4){
						console.log("Player is taking damage...");
							board.player.takeDamage(enemy.atk);
							if(board.player.playerDead){
								moveUpDown(newY);
								checkForLoss();
							}
							}
					break;  
				
			}
		
					}
		}
