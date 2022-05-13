const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var bgS
var ropecS
var cryS
var eatS
var airbS
var balloon
var mute
var button2
var button3

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bgS = loadSound("sound1.mp3")
  cryS = loadSound("sad.wav")
  ropecS = loadSound("rope_cut.mp3")
  eatS = loadSound("eating_sound.mp3")
  airbS = loadSound("air.wav")
 
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }
  
  frameRate(80);

  bgS.play()
  bgS.setVolume(0.05)

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(30,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png')
  button2.position(320,40)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3 = createImg('cut_btn.png');
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  balloon = createImg('balloon.png');
  balloon.position(70,260);
  balloon.size(100,70);
  balloon.mouseClicked(airBlow);
  
  mute = createImg('mute.png')
  mute.position(windowWidth-100,10)
  mute.size(50,50)
  mute.mouseClicked(muteF)
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:360,y:40});
  rope3 = new Rope(4,{x:400,y:220});
  ground = new Ground(width/2,canH,canW,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(400,canH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  link2 = new Link(rope2,fruit)
  link3 = new Link(rope3,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2, height/2,displayWidth+80,displayHeight);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eatS.play()
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     bgS.stop()
     cryS.play()
   }

   drawSprites();
}

function drop()
{
  ropecS.play()
  ropecS.setVolume(0.5)
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2(){
  ropecS.play()
  ropecS.setVolume(0.5)
  rope2.break()
  link2.dettach();
  link2 = null;
}

function drop3(){
  ropecS.play()
  ropecS.setVolume(0.5)
  rope3.break()
  link3.dettach()
  link3 = null
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
}

function muteF(){
  if(bgS.isPlaying()){
    bgS.stop()
  }
  else{
    bgS.play()
  }
}
