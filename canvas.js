var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// pay attention now
//TODO: lots of things
//variables
var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 250;

// var minRadius = 5

var colorArray = [
  '#198DBF',
  '#115E80',
  '#22BCFF',
  '#082F40',
  '#1EAAE6',
  '#6206C2',
  '#AC5CFF',
  '#9F42FF',
  '#9F1FFF',
  '#7EFF47',
];

//events
window.addEventListener('mousemove',
  function(event) { //this anonymous function always has an event argument
    mouse.x = event.x;
    mouse.y = event.y; //console.log this funnction and objects will be returned.
  });

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

//functions
function Circle(x, y, dx, dy, radius) {
  this.x = x; //Properties
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() { //this.drawwwww

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.stroke();
    c.fillStyle = this.color;
    c.fill();

  };

  this.update = function() {
    if (this.x + this.radius > innerWidth ||
      this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight ||
      this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //Interactivity

    if (mouse.x - this.x < 50 && mouse.x -
      this.x > -50 && mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {

      if (this.radius < maxRadius) { //so they cannot grow beyond a specified point
        this.radius += 1;

      }

    } else if (this.radius > this.minRadius) { //cannot shrink beyond a specified size
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

function init() {

  circleArray = [];

  for (var i = 0; i < 25; i++) {
    var radius = Math.random() * 40 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius; //make sure the circles are being spawned within the screen.
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 10; //negative then it travels to the left
    var dy = (Math.random() - 0.5) * 2;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();

  }
}


init()
animate();
