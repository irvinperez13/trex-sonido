var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nube ;
var nubemg;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var score = 0;
var restart;
var restart2;
var gameOver;
var gameover2;
var PLAY =1;
var END =0;
var gameState =PLAY;
var obstaclesgroup;
var nubesgroup;
var sonido1;
var sonido2;
var sonido3;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  nubemg = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restart = loadImage("restart.png");
  gameOver = loadImage("gameOver.png");
  sonido1 = loadSound("checkpoint.mp3");
  sonido2 = loadSound("die.mp3");
  sonido3 = loadSound("jump.mp3");
}
function setup() {
createCanvas(600, 200);

//crear sprite de Trex
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided",trex_collided);
trex.scale = 0.5;
  
//crear sprite de suelo
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;

invisibleGround = createSprite(205,200,400,20);
invisibleGround.visible = false;

gameover2 = createSprite(300,50,30,30);
gameover2.addImage("gameOver",gameOver);

restart2 = createSprite(300,105);
restart2.addImage("restart",restart);
restart2.scale =0.5;

obstaclesgroup = new Group();
nubesgroup = new Group();

trex.setCollider("circle",0,0,40)
trex.debug = false;

}

function draw() {
background("black");

text("puntuacion" + score ,470,30);
score = score + Math.round(frameCount/85);

if(score >0 && score%100 === 0){
  sonido1.play();
}

if (gameState === PLAY){
  ground.velocityX = -(4 + 3* score/100);

  //hacer que el Trex salte al presionar la barra espaciadora
if (keyDown("space")& trex.y >= 120) {
  trex.velocityY = -10;
  sonido3.play();
  
}

trex.velocityY = trex.velocityY + 0.8;

if (ground.x < 0) {
  ground.x = ground.width / 2;
}

if (obstaclesgroup.isTouching(trex)){
  sonido2.play();
  gameState = END;
}
gameover2.visible = false;
restart2.visible = false;
nubes();
obstacle();
}

else if (gameState === END){
  ground.velocityX = 0;
  gameover2.visible = true;
  restart2.visible = true;
  trex.changeAnimation("collided",trex_collided);
  nubesgroup.setVelocityXEach(0);
  obstaclesgroup.setVelocityXEach(0);
  obstaclesgroup.setLifetimeEach(-1);
  nubesgroup.setLifetimeEach(-1);
  trex.velocityY = 0;
}
trex.collide(invisibleGround);

if(mousePressedOver(restart2)){
restart3();
}
function restart3(){
  gameState = PLAY;
  obstaclesgroup.destroyEach();
  nubesgroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
}

drawSprites();
}
function nubes(){
  if (frameCount %60 === 0){
    nube = createSprite(580,30,20,20);
    nube.addImage(nubemg);
    nube.velocityX = -4;
    nube.scale =0.1;
    nube.y =Math.round(random (10,60));
    nube.lifetime =200;
    nube.depth = trex.depth;
    trex.depth = trex.depth +1;
    nubesgroup.add(nube);
  }
}
  
function obstacle(){
  if (frameCount %100 === 0){
obstacles =createSprite(550,155,10,50);

obstacles.velocityX = -(7 + score/100);

var rand =Math.round(random (1,6));

switch(rand){
  case 1: obstacles.addImage(obstacle1);
  break;
  case 2: obstacles.addImage(obstacle2);
  break;
  case 3: obstacles.addImage(obstacle3);
  break;
  case 4: obstacles.addImage(obstacle4);
  break;
  case 5: obstacles.addImage(obstacle5);
  break;
  case 6: obstacles.addImage(obstacle6);
  default:break;

}
obstacles.scale =0.1;
obstaclesgroup.add(obstacles);
  }
}
