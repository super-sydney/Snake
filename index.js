canvas = document.getElementById("canvas");
c = canvas.getContext("2d");
key = 97;

const gridSize = 20; //amount of blocks that make up the canvas
const spd = canvas.width / gridSize; //length of one block
if (spd != Math.round(spd)) {
  window.alert("canvas size should be divisible by length of each block");
}
const snake = new Snake(spd * gridSize / 2, spd * gridSize / 2);
var apples = [new Apple(spd * random(0, gridSize - 1), spd * random(0, gridSize - 1))]
var body = [];
var tmp = [];

function updateKey(e) {
  if (e.keyCode == 97 || e.keyCode == 100 || e.keyCode == 115 || e.keyCode == 119) {
    key = e.keyCode;
  }
}

function random(begin, end) { //rounded
  return Math.round(begin + Math.random() * (end - begin));
}

setInterval(function() {
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.strokeStyle = "black";
    c.beginPath();

    apples = apples.filter(a => !a.collected);

    for (var i = 0; i < gridSize; i++) {
      c.moveTo(i * spd, 0);
      c.lineTo(i * spd, canvas.height);
    }
    for (var i = 0; i < gridSize; i++) {
      c.moveTo(0, i * spd);
      c.lineTo(canvas.width, i * spd);
    }
    c.stroke();


    snake.update();
    snake.draw();

    for (var b of body) {
      b.update();
      b.draw();
    }

    for (var a of apples) {
      a.draw();
    }

    for (var b of body) {
      if (b.age > 0) {
        tmp.push(b);
      }
    }

    body = tmp;
    tmp = [];
  },
  500);