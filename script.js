"use srict";

//объявляем всякие переменные и прочие штуки

let posX = 0;
let posY = 0;
let snake = [0, 0, 0];
let targetCoord;
let left;
let right;
let up;
let down;
let score = 0;
let speed = 300;

//функции для точки которую нужно впоймать (потом напишу класс)

function getTarget() {
  targetCoord = Math.floor(Math.random() * Math.floor(1600));
  return targetCoord;
}

function setTarget() {
  getTarget();
  if (snake.indexOf(targetCoord) == -1) {
    document.getElementById('id' + targetCoord).classList.add('target');
  } else {
    getTarget();
    setTarget();
  }
}

function removeTarget () {
  document.getElementById('id' + targetCoord).classList.remove('target');
}

//функции для создания матрицы 40х40 клеток

function createMatrix() {
	
  let matrix = document.getElementById('matrix');
	let n = 1600;	
	
	for (let i = 0; i < n; i++)
	{
		let div = document.createElement('div');
		div.className = 'cell';
		div.id = 'id' + i;
    matrix.appendChild(div);
	}
}

function clearMatrix() {
  removeTarget();
  snake.forEach(function(item){
    document.getElementById('id' + item).classList.remove('active');
  }); 
}

//это функция которая определяет положение змейки (потом напишу класс змейки)

function getCell() {
  
  if (posY == -1 || posX == -1 || posY == 40 || posX == 40) {
    restartGame();
  } else {
    let coord = (posX * 40) + posY;
    if (snake.indexOf(coord) == -1) {
      snake.unshift(coord);
      snake.forEach(function(item){document.getElementById('id' + item).classList.add('active');}); 
    } else {
      restartGame();
    }
  
    if (coord !== targetCoord) {
      document.getElementById('id' + snake.pop()).classList.remove('active');
    } else {
      removeTarget();
      setTarget();
      score++;
      speedCheck();
      document.getElementById('score').innerHTML = '<span id="score">' + score + '</span>';
    }
  }
}

//функция которая проверяет прогресс и ускоряет змейку

function speedCheck () {
  if (score >= 70) {
    speed = 100;
  } else if (score >= 50) {
    speed = 120;
  } else if (score >= 35) {
    speed = 150;
  } else if (score >= 20) {
    speed = 180;
  } else if (score >= 10) {
    speed = 200;
  } else if (score >= 5) {
    speed = 230;
  } else if (score >= 3) {
    speed = 250;
  }
}

//функции определяющие движение змейки (потом напишу класс)

function moveLeft() {
  posY--;
  getCell();
};

function moveUp() {
  posX--;
  getCell();
};

function moveRight() {
  posY++;
  getCell();
};

function moveDown() {
  posX++;
  getCell();
};

function clearInt() {
  clearInterval(left);
  clearInterval(right);
  clearInterval(up);
  clearInterval(down);
}

//функция которая вызывается если ты проебал

function restartGame() {
  alert('u loose');
  clearInt();
  clearMatrix();
  posX = 0;
  posY = 0;
  snake = [0, 0, 0];
  score = 0;
  speed = 300;
  snake.forEach(function(item){
    document.getElementById('id' + item).classList.add('active');
  }); 
  document.getElementById('score').innerHTML = '<span id="score">' + score + '</span>';
  setTarget();
}

//начало

window.onload = function() {
  
  createMatrix(); 
  setTarget();
  snake.forEach(function(item){
    document.getElementById('id' + item).classList.add('active');
  }); 

  function moveBody(e) {
  
    switch(e.keyCode){
         
      case 37:  // если нажата клавиша влево
        if(posY > 0)
          clearInt();
          left = setInterval(moveLeft, speed);
        break;

      case 38:   // если нажата клавиша вверх
        if(posX > 0)
          clearInt();
          up = setInterval(moveUp, speed);
        break;

      case 39:   // если нажата клавиша вправо
        if(posY < 39)
          clearInt();
          right = setInterval(moveRight, speed);
        break;

      case 40:   // если нажата клавиша вниз
        if(posX < 39)
          clearInt();
          down = setInterval(moveDown, speed);
        break;

      case 32:
        clearInt();
        break;
    }
  }

  addEventListener("keydown", moveBody);

}				

