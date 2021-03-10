var balloon,bg,balloonImage;
var database;
var position;

function preload(){
    bg = loadImage("images/city.png");
    balloonImage = loadAnimation("images/balloon1.png","images/balloon2.png","images/balloon3.png");
}

function setup(){
    database = firebase.database();
    createCanvas(1500,700);
    balloon = createSprite(250,250,10,10);
    balloon.addAnimation("hi",balloonImage);
    var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value",readPosition,showError)
}

function draw(){
    background(bg);

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
        balloon.addAnimation("hi",balloonImage);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
        balloon.addAnimation("hi",balloonImage);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        balloon.addAnimation("hi",balloonImage);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        balloon.addAnimation("hi",balloonImage);
    }
    drawSprites();
}


function readPosition(data){
    position = data.val()
    balloon.x = position.x;
    balloon.y = position.y;
}
function writePosition(x,y){
    database.ref("balloon/position").set({
        'x' : position.x + x,
        'y' : position.y + y
    })
}
function showError(){
    console.log("error in writing the database....");
}