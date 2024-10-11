let handController;
let timerController;
let moveSpawner;
let leftTargets, rightTargets;
let dots;
let indexStart = 0;
let timeCount = 0;
let directions = [line, diagonal, diagonal2, up]
let moveSpawnerGroup;
let danceMoveController;
let spawnerController = [
	{
		time: 1,
		move: 0
	},
	{
		time: 2,
		move: 2
	},
	{
		time: 4,
		move: 1
	}
]
let isGameStarted = false;

let handPose;
let video;
let hands = [];

let handThumb, handIndex;

//? Animação ao fazer movimento de pinça
let clickStartTime;
let clickDuration = 2000;
let clickRadius = 10;

let gameState = 'main-menu';
let startButton, instructionsButton;

// Under the Sea, I Will Survive, Shape of You, Kulikitaka, Chacarron

function preload(){
	handPose = ml5.handPose();
}

function setup() {
	new Canvas(960, 540);

	frameRate(60);
	
	//? ===== CAMERA =====
	video = createCapture(video);
	video.size(960, 540);
	video.hide();
	// start detecting hands from the webcam video
	handPose.detectStart(video, gotHands);
	//? ===== CAMERA =====

	handController =  new Sprite();
		handController.width = 20;
		handController.height = 20;
		handController.visible = false

	leftTargets = new Group();
		leftTargets.color = 'yellow';
		leftTargets.y = 150;
		leftTargets.diameter = 10;
		leftTargets.collider = 'none'

	rightTargets = new Group();
		rightTargets.color = 'purple';
		rightTargets.y = 50;
		rightTargets.x = 150;
		rightTargets.diameter = 10;
		rightTargets.collider = 'none'

	moveSpawnerGroup = new Group();
		moveSpawnerGroup.sequence = spawnerController;

	danceMoveController = new Sprite(width/5, height-50, 10, 100, 'static');
		danceMoveController.visible = false;
	textSize(20)

	handIndex = new Sprite();
		handIndex.w = handIndex.h = 25;
	handThumb = new Sprite();
		handThumb.w = handThumb.h = 25;
		handThumb.collider = handIndex.collider = 'none'

	startButton = new Sprite(width/2, height/2, 250, 75, 'none');
		startButton.layer = -1;
	instructionsButton = new Sprite();
		instructionsButton.w = 250;
		instructionsButton.h = 75;
		instructionsButton.y = 350;
		instructionsButton.collider = 'none'
		instructionsButton.layer = -1

	clickStartTime = millis();
}

function draw() {
	background('skyblue');

	//? ===== CAMERA =====
	push();
		translate(video.width, 0);
		scale(-1, 1);
		image(video, -1, 1, width, height);
    pop();

	
	//? ===== CAMERA =====

	push()
		if(handIndex.overlapping(handThumb)){
			if(handIndex.overlapping(startButton) && handThumb.overlapping(startButton)){
				clickAnimation() > 360 ? gameState = 'game' : null;
			} else if(handIndex.overlapping(instructionsButton) && handThumb.overlapping(instructionsButton)){
				clickAnimation() > 360 ? gameState = 'instructions' : null;
			}

		} else clickStartTime = millis();
	pop()

	if(gameState == 'main-menu'){
		startButton.x = width/2
		startButton.y = height/2
	}
	else if(gameState == 'instructions'){
		instructionsButton.remove();
		startButton.x = width - 140;
		startButton.y = height - 75;
	} 
	else if(gameState == 'game'){
		timeCount = round(frameCount/60, 2);
		text(timeCount, 100, 100);

		//* Controle do usuário
		//^		Fazer controle utilizando as mãos
		//^		Fazer movimento de pinça para seleção
		handController.x = mouse.x
		handController.y = mouse.y

		if(moveSpawnerGroup.length <= 0 && isGameStarted == false){
			isGameStarted = true
			spawnerController.forEach((item) => {
				let spawnerSprite = new moveSpawnerGroup.Sprite();
				spawnerSprite.x = width + 25
				spawnerSprite.y = height - 50
				spawnerSprite.collider = 'none'
				spawnerSprite.sequence = {time: item.time, move: item.move}
			})
		}

		if(moveSpawnerGroup.length <= 0) text('Jogo Completo', 150, 150);

		if(moveSpawnerGroup.length > 0){
			if(moveSpawnerGroup[0].overlaps(danceMoveController)){
				moveSpawnerGroup[0].life = 60*moveSpawnerGroup[0].sequence.time
				leftTargets.removeAll()
				rightTargets.removeAll();
				let getMovement = moveSpawnerGroup[0].sequence.move
				setTimeout(() => { 
					generatePath(leftTargets, getMovement) 
					generatePath(rightTargets, 3)
					//console.log('teste');
				}, 250)
				leftTargets.life = 60*moveSpawnerGroup[0].sequence.time
				rightTargets.life = 60*moveSpawnerGroup[0].sequence.time
			}
			if(moveSpawnerGroup[0].overlapping(danceMoveController)){
				moveSpawnerGroup[0].vel.x = 0
				// if(handController.overlaps(leftTargets[0])){
				// 	leftTargets[0].remove();
				// }
			} else {
				moveSpawnerGroup[0].vel.x = -5;
			}
			//(moveSpawnerGroup[0].x < - 20) ? moveSpawnerGroup.shift() : null;
			if(leftTargets.length > 0 && moveSpawnerGroup[0].overlapping(danceMoveController)){
				if(handController.overlaps(leftTargets[0])){
					leftTargets[0].remove();
				}
			}
		}

	}

	if(hands.length > 0){
		//console.log(hands)
		let { thumb_tip, index_finger_tip } = hands[0];
		handThumb.x = width - thumb_tip.x;
		handThumb.y = thumb_tip.y;
		handIndex.x = width - index_finger_tip.x;
		handIndex.y = index_finger_tip.y;
	}
}

function generatePath(targets, value){
	let randomNumber = floor(random(0, 4));
	switch(value){
		case 0:
			while(targets.length < 10){
				let target = new targets.Sprite();
				target.x = leftTargets.length * 25;
				target.y = 250;
			}
		case 1:
			while(targets.length < 10){
				let target = new targets.Sprite();
				target.x = targets.length * 25;
				target.y = 250 + (targets.length*5)
			}
			break;
		case 2:
			while(targets.length < 10){
				let target = new targets.Sprite();
				target.x = targets.length * 25;
				target.y = 250 + (targets.length*5)
			}
			break;
		case 3:
			while(targets.length < 10){
				let target = new targets.Sprite();
				target.x = targets.length * 25;
				target.y = 250 - (targets.length*5)
			}
			break;
		case 4:
			while(targets.length < 10){
				let target = new targets.Sprite();
				target.y = targets.length * 25;
				target.x = 250 + (targets.length*5)
			}
			break;
	}
}

function line(leftTargets){
	while(leftTargets.length < 10){
		let target = new leftTargets.Sprite();
		target.x = leftTargets.length * 25;
		target.y = 250;
	}
}

function diagonal(leftTargets){
	while(leftTargets.length < 10){
		let target = new leftTargets.Sprite();
		target.x = leftTargets.length * 25;
		target.y = 250 + (leftTargets.length*5)
	}
}

function diagonal2(leftTargets){
	while(leftTargets.length < 10){
		let target = new leftTargets.Sprite();
		target.x = leftTargets.length * 25;
		target.y = 250 - (leftTargets.length*5)
	}
}

function up(leftTargets){
	while(leftTargets.length < 10){
		let target = new leftTargets.Sprite();
		target.y = leftTargets.length * 25;
		target.x = 250 + (leftTargets.length*5)
	}
}

function gotHands(results) {
	// save the output to the hands variable
	hands = results;
}

function clickAnimation(){
	let elapsedTime = millis() - clickStartTime;
  
	// Calcula a fração do tempo até o máximo de 2 segundos
	//let progress = min(elapsedTime / clickDuration, 1);
	let progress = handIndex.overlapping(handThumb);
	
	// Converte o progresso em um ângulo
	let endAngle = progress * PI;
	
	// Desenha a circunferência parcialmente
	fill('white');
	stroke(0);
	strokeWeight(5);
	arc(30, 30, 25 * 2, 25 * 2, 0, endAngle);
	
	return endAngle;
}

