var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime=0;
var score=0;

var invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  }

function setup() {
  createCanvas(400,400)
  
  monkey=createSprite(80,315,20,20);
  //monkey.velocityX=1;
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-2;
  //ground.x = ground.width /2;
  //ground.velocityX = -(6 + 3*score/100);
  
  obstacleGroup=new Group();
  bananaGroup=new Group();
}


function draw() {
  background("white");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score"+score,500,500);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME:"+survivalTime,100,50);
  
  if(keyDown("space")&& monkey.y >= 159){
    monkey.velocityY=-12;
  }
  monkey.velocityY+=0.5;
  
  if (ground.x < 400){
      ground.x = ground.width/2;
    }
  
  if (obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    survivalTime=0;
    monkey.changeAnimation("running",sprite_0.png);
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
  
  spawnOstacle();
  monkey.collide(ground);
  food();
  drawSprites();
  
}

function spawnOstacle(){
  
if(frameCount%100===0){
  obstacle=createSprite(400,330,1,1);
  obstacle.addImage(obstacleImage);
  
  obstacle.velocityX=-2;
  obstacle.x=ground.x;
  obstacle.scale=0.1;

  obstacleGroup.lifetime=600;
  obstacleGroup.add(obstacle);
}
}

function food(){
  if(frameCount%80===0){
    banana=createSprite(400,200,1,1);
    banana.addImage(bananaImage);
    
    banana.velocityX=-2;
    banana.scale=0.1;
    
    banana.lifetime=600;
    bananaGroup.add(banana);
    
  }
}