var trex, trex_running;
var ground, groundImage;
var cloud, cloudImage;
var obstacle, obs1Image;
var obs2Image;
var obs3Image;
var obs4Image;
var obs5Image;
var obs6Image;
var Invisibleground;
var cloudsgroup, obstaclesgroup;
var gamestate;
var gameover
var PLAY = 0;
var END = 1;
var trex_collided;
var score = 0;

function preload(){
  
 trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obs1Image = loadImage("obstacle1.png");
obs2Image = loadImage("obstacle2.png");
obs3Image = loadImage("obstacle3.png");
obs4Image = loadImage("obstacle4.png");
obs5Image = loadImage("obstacle5.png");
obs6Image = loadImage("obstacle6.png");
gameover = loadImage("gameOver.png");
  
trex_collided = loadImage("trex_collided.png");
}


function setup(){
  
  createCanvas(600,200);
  
  trex = createSprite(50, 160, 20,20);
  trex.addAnimation("trex runner", trex_running );
  trex.scale = 0.5;
  ground = createSprite(600,180,1500,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = -4;
Invisibleground = createSprite(600,195,1500,20);
  Invisibleground.visible = false
  //cloudsgroup and obstaclesgroup variables is defined to store groups of sprite
  cloudsgroup = new Group();
  obstaclesgroup = new Group();
  gamestate = PLAY;
}

 
function draw(){
  
  background("white");
  
  text("Score: " + score,500,20);
  
   drawSprites();

  //add gravity
  trex.velocityY = trex.velocityY+1;
  
  trex.collide(Invisibleground);
  

 if(gamestate===PLAY) {
  
     //infinte scroll of the ground
    if(ground.x<0){
      ground.x = 600;
    }
   
   
    if(keyDown("space")&&trex.y>150) { 
       trex.velocityY = -10;
    }
  
  spawnClouds();
  spawnobstacles();
   
    if(trex.isTouching(obstaclesgroup)) {
    gamestate = END; 
  }
   
  score = frameCount;
  
 } 
 else if(gamestate===END) {
   gameover1 = createSprite(280,50,20,20)
   gameover1.addImage(gameover);
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
   
    ground.velocityX = 0;
   trex.addImage("collided", trex_collided);
   trex.changeImage("collided", trex_collided);

}
  
}

function spawnClouds(){
  //frameRate() is frames per second or fbs //frameCount is the current frame number
  if(frameCount % 60 === 0)
  { cloud = createSprite(600,20);
   cloud.velocityX = -5; 
   cloud.addImage("cloud",cloudImage); 
   cloud.scale = 0.7;  
   cloud.y = random(15,100); 
   cloud.lifetime = 200
   cloudsgroup.add(cloud );
  }

  
  
}





function spawnobstacles() {
  if(frameCount % 100 === 0)
  { obstacle = createSprite(600,170);
  var randomnum = round(random(1,6));
   switch(randomnum) {
     case 1: obstacle.addImage("obs1",obs1Image);
     break;
     case 2: obstacle.addImage("obs2",obs2Image);
     break;
       case 3: obstacle.addImage("obs3",obs3Image);
     break;
     case 4: obstacle.addImage("obs4",obs4Image);
     break;
     case 5: obstacle.addImage("obs5",obs5Image);
     break;
     case 6: obstacle.addImage("obs6",obs6Image);
     break;
     
  }
  obstacle.velocityX = -4
  obstacle.scale = 0.5
   obstacle.lifetime = 300;
  obstaclesgroup.add(obstacle);
} 
  
  
}