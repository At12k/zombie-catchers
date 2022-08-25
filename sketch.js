
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine;
let world;
var cloud;
var ground;
var invisibleGround;
var zombie;
var gameState = "play";


function preload(){
  gameoverImage = loadImage("gameover.jpg");
  zombieImage1 = loadImage("zombie-1.png");
  startImage = loadImage("start.png");
  playerImage1 = loadImage("player-5.png");
  bulletImage = loadImage("bullet.png");
  cloudImage = loadImage("cloud.png");
  zombieImage = loadAnimation("zombie-1.png", "zombie-2.png", "zombie-3.png", "zombie-4.png", "zombie-5.png", "zombie-6.png", "zombie-7.png", "zombie-8.png", "zombie-9.png", "zombie-10.png", "zombie-11.png", "zombie-12.png", "zombie-13.png", "zombie-14.png", "zombie-15.png", "zombie-16.png", "zombie-17.png", "zombie-18.png", "zombie-19.png", "zombie-20.png", "zombie-21.png", );
  playerImage = loadAnimation("player-1.png", "player-2.png", "player-3.png", "player-4.png", "player-5.png", );
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;
  
  invisibleGround = createSprite(windowWidth/2,windowHeight-80,width,25);
  invisibleGround.shapeColor = "#181818"
  //invisibleGround.visible = fasle;
  
  player = createSprite(50,windowHeight-150);

  player.addAnimation("playermoving", playerImage);
  player.addAnimation("playermoving1", playerImage1);
  player.scale = 0.4
  player.setCollider("rectangle",0,0,150,200);

  gameover = createSprite(windowWidth/2,windowHeight/2);
  gameover.addImage(gameoverImage);
  gameover.scale = 2
  gameover.visible = false;

  start = createSprite(windowWidth/2,windowHeight/2-300);
  start.addImage(startImage);
  start.scale = 1.5
  start.visible = false;

  zombieGroup = new Group();
  bulletGroup = new Group();
  cloudGroup = new Group();
  rectMode(CENTER);
  ellipseMode(RADIUS);
}


function draw() 
{
  background("#2e2d2d");
  Engine.update(engine);
  
  if(gameState === "play"){
    if(keyDown("space")){
      Spawnbullet();
    }
    
    if(zombieGroup.isTouching(bulletGroup)){
      zombieGroup.destroyEach();
      bulletGroup.destroyEach();
    }
  
  
    spawnZombies();
    spawnClouds();
    if(zombieGroup.isTouching(player)){
      gameState = "end"
    }
  }

  if(gameState === "end"){
    zombieGroup.setVelocityXEach(0)
    player.changeAnimation("playermoving1", playerImage1);
    fill("white")
    text("PRESS 'SPACE' TO RESTART THE GAME",width/2, 100);
    zombie.changeAnimation("zombie1", zombieImage1);
    zombieGroup.destroyEach();
    player.visible = false;
    cloudGroup.destroyEach();
    gameover.visible = true;
    start.visible = true;
    if(keyDown("space")){
      restart();
    }
  }
  
  

  drawSprites();
}


function restart(){
  gameState = "play"
  gameover.visible = false;
  start.visible = false;
  player.visible = true;
  player.changeAnimation("playermoving", playerImage);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 2) {
    cloud = createSprite(windowWidth,120,40,10);
    cloud.y = Math.round(random(80,windowHeight/2-250));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = Math.round(random(-1,-3));
    
     //assign lifetime to the variable
    cloud.lifetime = windowWidth;
  
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
  
}

  function Spawnbullet(){
    bullet = createSprite(100,windowHeight-142);
    bullet.addImage(bulletImage);
    bullet.scale = 0.05
    bullet.velocityX = 20
   
    bulletGroup.add(bullet);

    bullet.lifetime = windowWidth
  }

function spawnZombies() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 1) {
    zombie = createSprite(windowWidth,windowHeight-155,40,10);
    zombie.addAnimation("zombie", zombieImage);
    zombie.addAnimation("zombie1", zombieImage1);
    zombie.scale = 0.5;
    zombie.velocityX = Math.round(random(-1,-20));
    zombie.setCollider("rectangle",0,0,100,180);
    player.depth = zombie.depth+1;
     //assign lifetime to the variable
    zombie.lifetime = windowWidth;
    
    zombieGroup.add(zombie);
  }
  
}