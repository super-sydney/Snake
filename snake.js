class Body {
  constructor(x, y, age) {
    this.x = x;
    this.y = y;
    this.age = age;
  }

  update() {
    this.age--;
  }

  draw() {
    c.fillStyle = "green";
    c.fillRect(this.x, this.y, spd, spd);
  }
}

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 1;
  }

  update() {
    body.push(new Body(this.x, this.y, this.score));

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
    c.fillStyle = "green";
    c.fillRect(this.x, this.y, spd, spd);
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