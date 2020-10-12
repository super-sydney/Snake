canvas = document.getElementById("canvas");
c = canvas.getContext("2d");
key = 97;

const gridSize = 10; //amount of blocks that make up the canvas
const squareSize = canvas.width / gridSize; //length of one block
if (squareSize != Math.round(squareSize)) {
  window.alert("canvas size should be divisible by length of each block");
}


const snake = new Snake(canvas.width / 2, canvas.height / 2);
var food = [new Fish(squareSize * random(0, gridSize - 1), squareSize * random(0, gridSize - 1))]
var body = [];
var tmp = [];

function updateKey(e) { //keep track of the last movement key that was pressed
  if (e.keyCode == 97 || e.keyCode == 100 || e.keyCode == 115 || e.keyCode == 119) {
    key = e.keyCode;
  }
}

function random(begin, end) { //rounded random number between begin and end (inclusive)
  return Math.round(begin + Math.random() * (end - begin));
}

function loop() {
  //clear the canvas
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //draw a grid
  c.strokeStyle = "black";
  c.beginPath();

  for (let i = 0; i < gridSize; i++) { //vertical lines
    c.moveTo(i * squareSize, 0);
    c.lineTo(i * squareSize, canvas.height);
  }

  for (let i = 0; i < gridSize; i++) { //horizontal lines
    c.moveTo(0, i * squareSize);
    c.lineTo(canvas.width, i * squareSize);
  }
  c.stroke();

  //update, then draw the head
  snake.update();
  snake.draw();

  //update, then draw the body parts
  for (let b of body) {
    b.update();
    b.draw();
  }

  //draw the food
  for (let a of food) {
    a.draw();
  }

  //remove all collected food
  food = food.filter(a => !a.collected);

  //remove body part with age == 0
  for (let b of body) {
    if (b.age > 0) {
      tmp.push(b);
    }
  }

  body = tmp;
  tmp = [];
}

setInterval(loop, 500);