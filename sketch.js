// Ajlal Paracha -- July 27, 2021
// Title: Generic Space Dodger

// Controls:

// Movement with arrow keys W/D/A

// Objective: Gain points from touching the colourful circles
// while avoiding the floating particles

// Lines 62-73, 284-309, and 391-406 are copied and modified from: 
// https://openprocessing.org/sketch/636502


// Enjoy!

let backgroundMusic, clickSound, hurtSound, spaceFont, numberOfParticles;
let spaceImage, marioSound;
let speed,
  orspeed,
  maxspeed,
  angle,
  vel,
  x,
  y,
  left,
  right,
  up,
  giro,
  posx,
  posy,
  tam;

// To determing what page's respective function to run, start at title page (1)
let pageIndex = 1;

let score = 0;
let parts = [];
let health = 3;

function preload() {
  backgroundMusic = loadSound("sounds/gravity_falls.mp3");
  clickSound = loadSound("sounds/mouse_click.mp3");
  hurtSound = loadSound("sounds/roblox_hurt.mp3");
  marioSound = loadSound("sounds/super_mario.mp3");

  spaceFont = loadFont("fonts/space_font1.otf");

  spaceImage = loadImage("images/space_background.jpg");
}

function setup() {
  createCanvas(700, 700);
  backgroundMusic.play();
  frameRate(30);

  rectMode(CENTER);
  textAlign(CENTER);

  numberOfParticles = round(random(15, 25));

  tam = 15;
  giro = 0.1;
  speed = 5;
  orspeed = speed;
  maxspeed = speed * 2;
  angle = 0;
  left = 0;
  right = 0;
  up = 0;
  posx = width / 2;
  posy = height / 2;
  tg = new obj(tam * 4);

  // Generating particles and puttin in array
  for (let i = 0; i < numberOfParticles; i++) {
    parts[i] = new particle();
  }
}

function draw() {
  clear();

  image(spaceImage, 0, 0);

  // Checking if ~2 min 51 sec have passed to restart song
  if (frameCount % 3350 == 0) {
    backgroundMusic.stop();
    backgroundMusic.play();
  }

  // Determing which page to load
  if (pageIndex == 1) {
    page1();
  } else if (pageIndex == 2) {
    page2();
  } else if (pageIndex == 3) {
    page3Game();
  } else if (pageIndex == 4) {
    page4();
  }

  stroke(0);
  
  // Looping through particle array and doing particle methods
  for (let i = 0; i < parts.length; i++) {
    
    // Experimental code for lines between particles
    
    // for (let u = 0; u < parts.length; u++) {
    //   stroke(parts[i].colour, 2);
    //   line(parts[i].xPos, parts[i].yPos, parts[u].xPos, parts[u].yPos);
    //   stroke(0);
    // }

    parts[i].move();
    parts[i].display();
    parts[i].atEdge();

    // Experimental but failing code for particle-to-goal
    // and particle-to-particle collision

    //     if (dist(parts[i].xPos, parts[i].yPos, tg.pos.x, tg.pos.y) <= 60-parts[i].size) {
    //       parts[i].speed.x *= -1;
    //       parts[i].speed.y *= -1;
    // }

    //     for (let u = 0; u < parts.length; u++) {
    // //       if (
    // //         dist(parts[i].xPos, parts[i].yPos, parts[u].xPos, parts[u].yPos) <=
    // //           parts[i].size ||
    // //         dist(parts[i].xPos, parts[i].yPos, parts[u].xPos, parts[u].yPos) <=
    // //           parts[u].size
    // //       ) {
    // //         parts[i].speed.x *= -1;
    // //         parts[i].speed.y *= -1;
    // //         parts[u].speed.x *= -1;
    // //         parts[u].speed.y *= -1;
    // //       }
    //     }

    // If on page 3, then add spaceship hitting particle logic
    if (pageIndex == 3) {
      if (dist(parts[i].xPos, parts[i].yPos, posx, posy) <= parts[i].size) {
        parts[i] = new particle();
        health--;
        hurtSound.play();
      }
    }
  }

  // If page 3, show health hearts
  if (pageIndex == 3) {
    textSize(20);
    fill(256, 0, 0);
    textFont("Arial");
    if (health >= 1) {
      text("❤", (width / 5) * 4 - 60, (height / 10) * 9);
    }
    if (health >= 2) {
      text("❤", (width / 5) * 4 - 30, (height / 10) * 9);
    }
    if (health >= 3) {
      text("❤", (width / 5) * 4, (height / 10) * 9);
    }
  }

  fill(256);
}

// Title screen
function page1() {
  // Title
  textFont(spaceFont);
  textSize(80);
  fill(256);
  text("Generic\nSpace Dodger", width / 2, height / 5);

  // Name
  textSize(20);
  text(
    "By: Ajlal Paracha\nFor: Mr. Guida CS 12 Class July 27, 2021",
    width / 2,
    (height / 7) * 5
  );

  // Button rectangles
  fill(256);
  rect(width / 2, height / 2 - 7, 140, 30, 30);
  rect(width / 2, height / 2 + 33, 140, 30, 30);

  // Button text
  fill(0);
  textSize(20);
  text("Controls", width / 2, height / 2);
  text("Play", width / 2, height / 2 + 40);

  // Button clicking logic
  if (mouseIsPressed == true) {
    // Clicking control button
    if (
      mouseX >= width / 2 - 70 &&
      mouseX <= width / 2 + 70 &&
      mouseY >= height / 2 - 22 &&
      mouseY <= height / 2 + 8
    ) {
      clickSound.play();

      // Shadow button animation
      fill(0, 0, 0, 100);
      rect(width / 2, height / 2 - 7, 140, 30, 30);

      pageIndex = 2;
    }

    // Clicking play button
    if (
      mouseX >= width / 2 - 70 &&
      mouseX <= width / 2 + 70 &&
      mouseY >= height / 2 + 18 &&
      mouseY <= height / 2 + 48
    ) {
      clickSound.play();

      // Shadow button animation
      fill(0, 0, 0, 100);
      rect(width / 2, height / 2 + 33, 140, 30, 30);

      pageIndex = 3;
    }
  }
}

// Control screen
function page2() {
  // Control screen text
  textSize(35);
  fill(256);
  textFont("Arial");
  text(
    "Gain points by moving your ship\nto the white circles and avoid\nthe coloured particle asteroids",
    width / 2,
    height / 4
  );
  text(
    "Move forward with W\nMove right with D\nMove left with A\n\nHave Fun",
    width / 2,
    (height / 7) * 3.5
  );

  // Back button with arrow
  fill(0);
  stroke(256);
  textSize(15);
  circle(30, 30, 30);
  fill(256);
  text("←", 30, 35);

  // Back to page1/title screen logic
  if (mouseIsPressed == true && dist(mouseX, mouseY, 30, 30) <= 30) {
    clickSound.play();

    // Shadow button press animation
    fill(256, 256, 256, 80);
    circle(30, 30, 30);
    pageIndex = 1;
  }
}

function page3Game() {
  
  // Checking when health <= 0 and moving to page 4/death screen if so
  if (health <= 0) {
    pageIndex = 4;
  }

  noStroke();
  textFont(spaceFont);
  fill(256);
  textSize(120);
  text(score, width / 2, height / 3);

  // Copied and modified
  tg.spawn();
  if (speed > 0) {
    speed = speed - 0.5;
  }
  bordes();
  push();
  if (up != 0 && speed < maxspeed) {
    speed++;
    fill(255, 200, 50);
  } else if ((left != 0 || right != 0) && speed < orspeed) {
    speed = orspeed;

    fill(255, 200, 50);
  }
  angle = angle + (left + right);

  translate(posx, posy);

  rotate(angle);
  triangle(-tam, -tam, -tam, +tam, +tam, 0);
  posx = posx + speed * cos(angle);
  posy = posy + speed * sin(angle);

  pop();
}

function page4() {
  // Main message and score text and button
  fill(256);
  rect(width / 2, height / 2 + 15, 450, 200, 75);
  fill(0);
  textFont(spaceFont);
  textSize(50);
  text("You are Dead!\nFinal Score:" + score, width / 2, height / 2);

  // Thanks for playing message text
  textSize(25);
  fill(256);
  text("Thanks for playing!", width / 2, height / 3);

  // Replay button
  circle(width / 2, (height / 9) * 7, 80);
  textFont("Arial");
  fill(0);
  text("🔁", width / 2, (height / 9) * 7 + 10);

  // Replay button logic which resets health and score and brings back 
  // to title page
  if (
    mouseIsPressed == true &&
    dist(mouseX, mouseY, width / 2, (height / 9) * 7) <= 40
  ) {
    fill(0, 0, 0, 80);
    circle(width / 2, (height / 9) * 7, 80);
    clickSound.play();

    pageIndex = 1;
    health = 3;
    score = 0;
  }
}

// Moving when key is pressed
function keyPressed() {
  if (key == "A" || key == "a") {
    left = -giro;
  }
  if (key == "D" || key == "d") {
    right = giro;
  }
  if (key == "W" || key == "w") {
    up = 1;
  }
}

// Slowing down when key is released
function keyReleased() {
  if (key == "A" || key == "a") {
    left = 0;
  }
  if (key == "D" || key == "d") {
    right = 0;
  }
  if (key == "W" || key == "w") {
    up = 0;
  }
}

// Checking if player spaceship has ventured outside canvas
// and bringing to other side if so
function bordes() {
  if (posx > width) {
    posx = 0;
  }
  if (posx < 0) {
    posx = width;
  }
  if (posy > height) {
    posy = 0;
  }
  if (posy < 0) {
    posy = height;
  }
}

// Spaceship and goal OOP
class obj {
  constructor(t) {
    this.pos = createVector(random(width), random(height));
    this.t = t;
    this.health = 3;
  }
  spawn() {
    fill(255);
    if (dist(this.pos.x, this.pos.y, posx, posy) < this.t / 2 + tam / 2) {
      this.pos.set(random(width), random(height));
      score++;
      marioSound.play();
    }
    ellipse(this.pos.x, this.pos.y, this.t, this.t);
  }
}

// My OOP for particles
class particle {
  constructor() {
    // Setting attributes
    this.xPos = random(width);
    this.yPos = random(height);
    this.speed = createVector(random(-4, 4), random(-4, 4));
    this.size = random(5, 35);
    this.colour = color(random(0, 256), random(0, 256), random(0, 256));
  }

  // Simple functions to move, display, edge check

  // Move particle X and Y positions depending on speed
  move() {
    this.xPos += this.speed.x;
    this.yPos += this.speed.y;
  }

  display() {
    // Show particle on screen
    fill(this.colour);
    ellipse(this.xPos, this.yPos, this.size, this.size);
  }

  // When particle hits edge of canvas, inverse speed X or Y value
  // to change movement direction
  atEdge() {
    if (this.xPos <= 0 || this.xPos >= width) {
      this.speed.x *= -1;
    }
    if (this.yPos <= 0 || this.yPos >= height) {
      this.speed.y *= -1;
    }
  }
}
