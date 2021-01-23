var ninja,pole;

var bg,poleimg,ninjaimg1,ninjaimg2,starimg,goimg,rsimg,pointimg;

var ObstaclesGroup,PointGroup; 

var PLAY = 1;

var END = 0;

var gameState = PLAY;

var gameover, restart;

var Point;

function preload(){
bg = loadImage("bg.jpg");

poleimg = loadImage("poleimg.png");

ninjaimg1 = loadImage("ninja1.png");

ninjaimg2 = loadImage("ninja2.png");

starimg = loadImage("starimg.png");

goimg = loadImage("GO.png");

rsimg = loadImage("RS.png");

pointimg = loadImage("point.png");
}
function setup(){
  createCanvas(500,600);

  pole = createSprite(250,300,20,600);
  pole.addImage(poleimg);

  ninja = createSprite(223,400,44,48);
  ninja.addImage(ninjaimg1);

  gameover = createSprite(250,250,200,100);
  gameover.addImage(goimg);

  restart = createSprite(250,315,200,100);
  restart.addImage(rsimg);

  gameover.visible = false;
restart.visible = false;

  ObstaclesGroup = new Group();
  PointGroup = new Group();

  Point = 0;
}
function draw() {
  rectMode(CENTER);

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
      
      spawnpoint();
      for(var i =0; i< PointGroup.length;i++){
        if(PointGroup.isTouching(ninja)){
          Point = Point+1;
          PointGroup.get(i).destroy();
        }
      }
      spawnObstacles(); 
 if(ObstaclesGroup.isTouching(ninja)){
  gameState = END;
}
  }
  else if(gameState === END) {
     ObstaclesGroup.setVelocityYEach(0);
     ObstaclesGroup.setLifetimeEach(-1);  
     PointGroup.setVelocityYEach(0);
     PointGroup.setLifetimeEach(-1);
     restart.visible = true;
     gameover.visible = true;
}
background(bg,250,300);
drawSprites();
textSize(30);
fill("white");
text("Point: "+ Point,10,100); 
if(mousePressedOver(restart)) {
  reset();
}
}

function spawnObstacles() {
   if(frameCount % 60 === 0) { 
  var obstacle = createSprite(218,0,44,48); 
  var x = Math.round(random(1,2)); 
  switch(x){
     case 1: obstacle.x = 218;
      break;
       case 2: obstacle.x = 280; 
      }
      obstacle.debug = false;
        obstacle.addImage(starimg); 
        obstacle.velocityY = 5; 
        obstacle.lifetime = 300; 
        ObstaclesGroup.add(obstacle); 
      } 
    }
    function spawnpoint() {
      if(frameCount % 4 === 0) { 
      var point = createSprite(220,0,10,10);
       
      var x = Math.round(random(1,2)); 
      switch(x){
         case 1: point.x = 235;
          break;
           case 2: point.x = 264; 
          } 
            point.addImage(pointimg);
            point.scale = 0.2;
            point.velocityY = 5; 
            point.lifetime = 300; 
            PointGroup.add(point); 
      } 
    }
    function reset(){
      gameState = PLAY;
      
      gameover.visible = false;
      restart.visible = false;
      
      ObstaclesGroup.destroyEach();

      
      score = 0;
      
    }   