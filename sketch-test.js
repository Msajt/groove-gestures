let scene;
let image;
let handPose;

function preload(){
    image = loadImage('./images/pngegg.png');
    handPose = ml5.handPose();
}

function setup(){
    createCanvas(400, 400);
    scene = new SceneManager();
    scene.wire();
    scene.addScene(gameLevel2);
    scene.addScene(gameLevel);
    scene.addScene(gameLevel3);
    scene.showScene(gameLevel2);
}

function draw(){
    scene.draw();
}

