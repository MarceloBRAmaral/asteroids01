//Asteroids v. 01
//This tutorial shows how to create a triangular ship controlled by the arrow keys;
//UP ARROW =    thrust
//LEFT ARROW =  rotate ship left
//RIGHT ARROW = rotate ship right
//
//This release adds:
//1. 
//
//BUGS:
//1. 
//
//TO DO:
//1. add friction
//2. add firing bullets
//
//By Marcelo Silva

//canvas definition
var document;var window;var init;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//get canvas dimensions
var canvasWidth = canvas.width;
var canvasHeigth = canvas.height;

// var definitions
ctx.font = '20px Arial';//font size
var ship = particle.create(canvasWidth/2,canvasHeigth/2,0,0,0,0.95);
var thrust = vector.create(0,0);
var angle = 0;
var turningLeft = false;
var turningRight = false;
var thrusting = false;

//keyboard controls
document.body.addEventListener("keydown",function(event){
    console.log(event.keyCode);
    switch(event.keyCode){
        case 38://up
            thrusting=true;
            break;
        case 37://left
            turningLeft=true;
            break;
        case 39://right
            turningRight=true;
            break;
        default:
            break;
    }
});
document.body.addEventListener("keyup",function(event){
    switch(event.keyCode){
        case 38://up
            thrusting=false;
            break;
        case 37://left
            turningLeft=false;
            break;
        case 39://right
            turningRight=false;
            break;
        default:
            break;
    }
});

var clearCanvas = function () {
	ctx.clearRect(0,0,canvasWidth,canvasHeigth);
};

function main() {
    init = window.requestAnimationFrame(main);
    // Whatever your main loop needs to do    
    clearCanvas();//clear the canvas
    if(turningLeft){
        angle-=0.05;}
    if(turningRight){
        angle+=0.05;}
    thrust.setAngle(angle);//sets the angle of the thrust equals the ship angle
    //changes the thrust value accordingly to the UP arrow pressed or not
    if(thrusting){
        thrust.setLength(0.1);
    }else {thrust.setLength(0);
    }
    
    ship.accelerate(thrust);
    ship.testBounds(canvasWidth,canvasHeigth,10,10);//the ship returns when hit the canvas boundaries
    ctx.fillText('ship velocity lenght = ' + ship.velocity.getLength(),50,50);
    ctx.fillText('ship velocity angle = ' + ship.velocity.getAngle(),50,70);
    ctx.fillText('ship x position = ' + ship.position.getX(),50,90);
    ctx.fillText('ship y position = ' + ship.position.getY(),50,110);
    ship.update();
    
    ctx.save();//saves the canvas context
    ctx.translate(ship.position.getX(),ship.position.getY());//position of the ship
    ctx.rotate(angle);//angle of the ship
    //draws the ship
    ctx.beginPath();
    ctx.moveTo(10,0);
    ctx.lineTo(-10,-7);
    ctx.lineTo(-10,7);
    ctx.lineTo(10,0);
    ctx.stroke();
    ctx.restore();//restores the canvas context
    
    
}

main();