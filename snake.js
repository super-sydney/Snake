//draw a rotated image
function drawImage(src, x, y, angle) {
  let image = new Image();
  image.src = src;

  let cx = x + (squareSize / 2); //coords for center of the square
  let cy = y + (squareSize / 2);

  if (angle == -1) { //decide angle based on last pressed key
    switch (key) {
      case 119: //W
        angle = 0;
        break;
      case 115: //S
        angle = 180;
        break
      case 97: //A
        angle = 270;
        break;
      case 100: //D
        angle = 90;
        break;
    }
  }

  //a mess, but it works
  c.translate(cx, cy);
  c.rotate(angle * (Math.PI / 180));

  c.drawImage(image, -squareSize / 2, -squareSize / 2, squareSize, squareSize);

  c.rotate(-angle * (Math.PI / 180));
  c.translate(-cx, -cy);
}

class Body {
  constructor(x, y, age, angle) {
    this.x = x;
    this.y = y;
    this.age = age;
    this.angle = angle;
  }

  update() {
    this.age--;
  }

  draw() {
    if (this.age == 0) {
      drawImage("img/butt.png", this.x, this.y, this.angle);
    } else {
      drawImage("img/body.png", this.x, this.y, this.angle);
    }
  }
}

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 2; //starting score/body length
  }

  update() {
    let angle = 0;
    switch (key) { //what angle should the next body part be?
      case 119: //W, default is 0
        break;
      case 115: //S
        angle = 180;
        break
      case 97: //A
        angle = 270;
        break;
      case 100: //D
        angle = 90;
        break;
    }

    body.push(new Body(this.x, this.y, this.score, angle));

    switch (key) { //moving
      case 119: //W
        this.y -= squareSize;
        break;
      case 115: //S
        this.y += squareSize;
        break
      case 97: //A
        this.x -= squareSize;
        break;
      case 100: //D
        this.x += squareSize;
        break;
    }

    for (let a of food) { //check if youre touching an apple
      if (this.x == a.x && this.y == a.y && !a.collected) {
        this.score++;
        a.newFish(squareSize * random(0, gridSize - 1), squareSize * random(0, gridSize - 1));
      }
    }

    let lost = false; //check if youre touching a body part
    for (let b of body) {
      if (b.x == this.x && b.y == this.y) {
        lost = true;
      }
    }

    if (this.x < 0 || this.y < 0 || this.x >= canvas.width || this.y >= canvas.height || lost) { //out of bounds or touhcing self
      window.alert("You lost!\nReload to play again");
    }

  }

  draw() {
    drawImage("img/head.png", this.x, this.y, -1);
  }
}

class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collected = false;
  }

  draw() {
    drawImage("img/fish.png", this.x, this.y, 0);
  }

  newFish(x, y) {
    this.collected = true;

    if (this.coordsWrong(x, y)) {
      this.newFish(squareSize * random(0, gridSize - 1), squareSize * random(0, gridSize - 1)); //try again
    } else {
      food.push(new Fish(x, y));
    }
  }

  coordsWrong(x, y) { //make sure not to spawn inside the head/body
    if (x == snake.x && y == snake.y) {
      return true;
    }

    for (let b of body) {
      if (x == b.x && y == b.y) {
        return true;
      }
    }

    return false;
  }
}