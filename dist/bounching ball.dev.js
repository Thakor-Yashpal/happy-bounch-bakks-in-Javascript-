"use strict";

console.log("Hello World");
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty; //c.lineWidth= 5;
//c.globalAlpha = 0.5;

var mousex = 0;
var mousey = 0;
addEventListener("mousemove", function () {
  mousex = event.clientX;
  mousey = event.clientY;
});
var grav = 0.99;
c.strokeWidth = 5;

function randomColor() {
  return "rgba(" + Math.round(Math.random() * 250) + "," + Math.round(Math.random() * 250) + "," + Math.round(Math.random() * 250) + "," + Math.ceil(Math.random() * 10) / 10 + ")";
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startradius = this.radius;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() / 5;

  this.update = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill(); //c.stroke();
  };
}

var bal = [];

for (var i = 0; i < 50; i++) {
  bal.push(new Ball());
}

function animate() {
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }

  requestAnimationFrame(animate);
  c.clearRect(0, 0, tx, ty);

  for (var _i = 0; _i < bal.length; _i++) {
    bal[_i].update();

    bal[_i].y += bal[_i].dy;
    bal[_i].x += bal[_i].dx;

    if (bal[_i].y + bal[_i].radius >= ty) {
      bal[_i].dy = -bal[_i].dy * grav;
    } else {
      bal[_i].dy += bal[_i].vel;
    }

    if (bal[_i].x + bal[_i].radius > tx || bal[_i].x - bal[_i].radius < 0) {
      bal[_i].dx = -bal[_i].dx;
    }

    if (mousex > bal[_i].x - 20 && mousex < bal[_i].x + 20 && mousey > bal[_i].y - 50 && mousey < bal[_i].y + 50 && bal[_i].radius < 70) {
      //bal[i].x += +1;
      bal[_i].radius += 5;
    } else {
      if (bal[_i].radius > bal[_i].startradius) {
        bal[_i].radius += -5;
      }
    } //forloop end

  } //animation end

}

animate();
setInterval(function () {
  bal.push(new Ball());
  bal.splice(0, 1);
}, 400);
//# sourceMappingURL=bounching ball.dev.js.map
