var path,mainCyclist;
var player1,player2,player3;
var trafficCone,nails,hole
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var obstacle1Img,obstacle2Img,obstacle3Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");

  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.debug=true;
mainCyclist.setCollider("rectangle",0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
coneOG = new Group();
holeOG = new Group();
nailOG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  var select_obsObject = Math.round(random(1,3));
  if (World.frameCount % 150 == 0) {
    if (select_obsObject == 1) {
      trafficConeObstacle()
    } else if (select_obsObject == 2) {
      holeObstacle();
    } else {
      nailsObstacle();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(coneOG.isTouching(mainCyclist)){
      gameState = END;
      trafficCone.velocityY = 0;
     }

     if(holeOG.isTouching(mainCyclist)){
      gameState = END;
      hole.velocityY = 0;
     }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    coneOG.setVelocityXEach(0);
    coneOG.setLifetimeEach(-1);

    holeOG.setVelocityXEach(0);
    holeOG.setLifetimeEach(-1);

    nailOG.setVelocityXEach(0);
    nailOG.setLifetimeEach(-1);

    if(keyDown("UP_ARROW")) {
       reset();
      }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(7 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        player1.debug = true
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(7 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        player2.debug = true;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(7 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        player3.debug = true;
        redCG.add(player3);
}

function trafficConeObstacle(){
  trafficCone = createSprite(1100,Math.round(random(50, 250)));
  trafficCone.scale =0.06;
  trafficCone.velocityX = -(15 + 2*distance/150);
  trafficCone.addImage(obstacle1Img);
  trafficCone.setLifetime=170;
  trafficCone.debug = true;
  coneOG.add(trafficCone);
}

function holeObstacle(){
  hole = createSprite(1100,Math.round(random(50, 250)));
  hole.scale =0.06;
  hole.velocityX = -(15 + 2*distance/150);
  hole.addImage(obstacle2Img);
  hole.setLifetime=170;
  hole.debug = true;
  holeOG.add(hole);
}

function nailsObstacle(){
  nails = createSprite(1100,Math.round(random(50, 250)));
  nails.scale =0.06;
  nails.velocityX = -(15 + 2*distance/150);
  nails.addImage(obstacle3Img);
  nails.setLifetime=170;
  nails.debug = true;
  nailOG.add(nails);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  coneOG.destroyEach();
  holeOG.destroyEach();
  nailOG.destroyEach();
  
  distance = 0;
 }
