function drawImage(src, x, y, angle) {
  let image = new Image();
  image.src = src;

  let cx = x + (spd / 2);
  let cy = y + (spd / 2);

  if (angle == -1) {
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

  c.translate(cx, cy);
  c.rotate(angle * (Math.PI / 180));

  c.drawImage(image, -spd / 2, -spd / 2, spd, spd);

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
    this.score = 5;
  }

  update() {
    let angle = 0;
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

    body.push(new Body(this.x, this.y, this.score, angle));

    switch (key) {
      case 119: //W
        this.y -= spd;
        break;
      case 115: //S
        this.y += spd;
        break
      case 97: //A
        this.x -= spd;
        break;
      case 100: //D
        this.x += spd;
        break;
    }

    for (var a of apples) {
      if (this.x == a.x && this.y == a.y && !a.collected) {
        this.score++;
        a.collected = true;
        apples.push(new Apple(spd * random(0, gridSize - 1), spd * random(0, gridSize - 1)));
      }
    }

    let lost = false;
    for (var b of body) {
      if (b.x == this.x && b.y == this.y) {
        lost = true;
      }
    }

    if (this.x < 0 || this.y < 0 || this.x >= canvas.width || this.y >= canvas.height || lost) {
      //window.alert("You lost!\nReload to play again");
    }

  }

  draw() {
    drawImage("img/head.png", this.x, this.y, -1);
  }
}

class Apple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collected = false;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.x, this.y, spd, spd);
  }
}