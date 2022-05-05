const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const death = new Audio("ölüm.mp3");
const audio = new Audio("ömer.mp3");

let keyPressed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    keyPressed = true;
    audio.play();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    keyPressed = false;
  }
});

class Dino {
  constructor(cactus) {
    this.height = 40;
    this.width = 30;
    this.x = 10;
    this.y = canvas.height - this.height;
    this.oldY = this.y;
    this.velocity = 10;
    this.jump = false;
    this.cactus = cactus;
    this.color = "black";
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.rgb();
    if (keyPressed) {
      if (!this.jump) {
        this.y -= this.velocity;
        if (this.y === this.oldY - 150) {
          this.y += this.velocity;
          this.jump = true;
        }
      } else if (this.jump) {
        if (this.y != this.oldY) {
          this.y += 5;
        } else {
          this.jump = false;
        }
      }
    } else {
      if (this.y != this.oldY) {
        this.y += 10;
      }
    }
    if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height;
    }

    if (
      this.x < this.cactus.x + this.cactus.width &&
      this.x + this.width > this.cactus.x &&
      this.y < this.cactus.y + this.cactus.height &&
      this.height + this.y > this.cactus.y
    ) {
      death.play();
      alert("You Died");
      document.location.reload();
      clearInterval(interval);
    }
  }
  rgb() {
    this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;
  }
}

class Cactus {
  constructor() {
    this.width = 30;
    this.height = 40;
    this.x = canvas.width - this.width;
    this.y = canvas.height - this.height;
    this.score = 1;
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (this.x < 0) {
      this.x = canvas.width;
      this.score++;
    }
    this.x -= (2 * Math.log(2 * this.score)) / Math.log(3) + 5;
    ctx.font = "48px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${this.score - 1}`, 10, 50);
  }
}

const cactus = new Cactus();
const dino = new Dino(cactus);

const interval = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dino.draw();
  cactus.draw();
  dino.update();
  cactus.update();
}, 10);
