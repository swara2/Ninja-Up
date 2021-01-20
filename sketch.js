var ninja,pole;
var bg,poleimg,ninjaimg1,ninjaimg2,starimg;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
bg = loadImage("bg.jpg");
poleimg = loadImage("poleimg.png");
ninjaimg1 = loadImage("ninja1.png");
ninjaimg2 = loadImage("ninja2.png");
starimg = loadImage("star.png");
}
function setup(){
  createCanvas(500,600);
  score = 0;
  pole = createSprite(250,300,20,600);
  pole.addImage(poleimg);
  ninja = createSprite(223,400,44,48);
  ninja.addImage(ninjaimg1);
  ObstaclesGroup = new Group();
  
}
function draw() {
  rectMode(CENTER);
  background(bg,250,300);
  drawSprites();

  if(gameState === PLAY){
    if( keyWentDown("RIGHT_ARROW")){
      ninja.x = 282;
      ninja.y = 400;
      ninja.addImage(ninjaimg2);
    }
      if( keyWentDown("LEFT_ARROW")){
        ninja.x = 223;
        ninja.y = 400;
        ninja.addImage(ninjaimg1);
      }
 spawnObstacles(); 
 if(ObstaclesGroup.isTouching(ninja)){
  gameState = END;
}
  }
  else if(gameState === END) {
    ObstaclesGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
  }
}
function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(218,0,44,48);
    obstacle.addImage(starimg);
obstacle.velocityY = 5;
var obstacle2 = createSprite(280,-200,44,48);
obstacle2.addImage(starimg);
obstacle2.velocityY = 5;
    obstacle.lifetime = 300;
  }
}

