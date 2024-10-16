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
	//* Baby Shark
	{
		time: 1.5,
		move_right: 10,
		move_left: 9
	},
	{
		time: 3,
		move_right: 8,
		move_left: 7
	},
	{
		time: 3,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	{
		time: .7,
		move_right: 5,
		move_left: 6
	},
	//* Mommy shark
	{
		time: .8,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	{
		time: .7,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	//* Daddy Shark
	{
		time: .8,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	{
		time: .7,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	//* Grandma Shark
	{
		time: .8,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	{
		time: .7,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	//* Grandpa Shark
	{
		time: .8,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	{
		time: .7,
		move_right: 5,
		move_left: 6
	},
	{
		time: .7,
		move_right: 8,
		move_left: 7
	},
	//* The End
	{
		time: .8,
		move_right: 9,
		move_left: ''
	},
	{
		time: .7,
		move_right: '',
		move_left: 10
	},
	{
		time: .7,
		move_right: 9,
		move_left: ''
	},
	{
		time: .7,
		move_right: '',
		move_left: 10
	},
	
]
let isGameStarted = false;

let handPose;
let video;
let hands = [];

let handThumb, handIndex, rightHand, leftHand;
let handParticles;
let headCalibrate;

//? Animação ao fazer movimento de pinça
let clickStartTime;
let clickDuration = 2000;
let clickRadius = 10;

let gameState = 'start';
let startButton, instructionsButton, backgroundSprite;

let music1, bgMusic, isPlayingMusic = false;

let score = 0, pixelatedFont;

let startButtonAnimation, instructionsButtonAnimation,
	selectedCursor, notSelectedCursor,
	backgroundStart, backgroundInstructions, backgroundGame,
	move01, move02, move03, move04, move05;

// Under the Sea, I Will Survive, Shape of You, Kulikitaka, Chacarron

function preload(){
	handPose = ml5.handPose();
	bgMusic = loadSound('./sounds/bg-sound.mp3');
	music1 = loadSound('./sounds/baby_shark_short.mp3');
	startButtonAnimation = loadAnimation('./arts/start-button.png', {frameSize: [250, 75], frames: 5});
	instructionsButtonAnimation = loadAnimation('./arts/instructions-button.png', {frameSize: [250, 75], frames: 5});
	selectedCursor = loadImage('./arts/selected.png');
	notSelectedCursor = loadImage('./arts/not-selected.png');
	backgroundStart = loadImage('./arts/background.png');
	backgroundInstructions = loadImage('./arts/instructions-background.png');
	backgroundGame = loadImage('./arts/game-background.png');
	move01 = loadImage('./arts/dance-move-01.png');
	move02 = loadImage('./arts/dance-move-02.png');
	move03 = loadImage('./arts/dance-move-03.png');
	move04 = loadImage('./arts/dance-move-04.png');
	move05 = loadImage('./arts/dance-move-05.png');
	pixelatedFont = loadFont('./arts/pixelated.ttf');
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
		// moveSpawnerGroup.addAni('move01', move01);
		// moveSpawnerGroup.addAni('move02', move02);
		// moveSpawnerGroup.addAni('move03', move03);
		// moveSpawnerGroup.addAni('move04', move04);
		// moveSpawnerGroup.addAni('move05', move05);

	danceMoveController = new Sprite(width/2, height-50, 10, 100, 'static');
		danceMoveController.visible = false;
	textSize(20)

	handIndex = new Sprite();
		handIndex.w = handIndex.h = 25;
	handThumb = new Sprite();
		handThumb.w = handThumb.h = 25;
		handThumb.collider = handIndex.collider = 'none'
	rightHand = new Sprite();
	leftHand = new Sprite();
		rightHand.diameter = leftHand.diameter = 40;
		//rightHand.collider = leftHand.collider = 'none';
	handParticles = new Group();
	handParticles.collider = 'none';
	handParticles.direction = () => random(0, 360);
	handParticles.vel.y = -6;
	handParticles.life = 15;
	handParticles.fill = 'white';
	handParticles.layer = 0;

	backgroundSprite = new Sprite(width/2, height/2, 960, 540, 'none');
		backgroundSprite.fill = 'black';
		backgroundSprite.layer = -2
		backgroundSprite.image = backgroundStart;
	startButton = new Sprite(width/2, height/2, 250, 75, 'none');
		startButton.layer = -1;
		startButton.addAni('start', startButtonAnimation);
	instructionsButton = new Sprite(width/2, 350, 250, 75, 'none');
		instructionsButton.layer = -1;
		instructionsButton.addAni('instructions', instructionsButtonAnimation);

	headCalibrate = new Sprite(width/2, height/2 - 200, 50, 50, 'none');
		headCalibrate.visible = false;

	clickStartTime = millis();

	allSprites.pixelPerfect = true;
	bgMusic.loop();
	textFont(pixelatedFont);
	//allSprites.debug = true
}

function draw() {
	noSmooth()
	//background('skyblue');

	//? ===== CAMERA =====
	push();
		translate(video.width, 0);
		scale(-1, 1);
		image(video, -1, 1);
    pop();

	
	
	//? ===== CAMERA =====

	push()
		if(handIndex.overlapping(handThumb)){
			if(handIndex.overlapping(startButton) && handThumb.overlapping(startButton)){
				clickAnimation() > 360 ? gameState = 'game' : null;
			} else if(handIndex.overlapping(instructionsButton) && handThumb.overlapping(instructionsButton)){
				clickAnimation() > 360 ? gameState = 'instructions' : null;
			}
			new handParticles.Sprite(handIndex.x, handIndex.y, 5);
			handIndex.image = selectedCursor;
		} else {
			handIndex.image = notSelectedCursor;
			clickStartTime = millis();
		}
	pop()

	if(gameState == 'main-menu'){
		//background('black')
		startButton.x = width/2
		startButton.y = height/2
		new handParticles.Sprite(backgroundSprite.x, backgroundSprite.y, 10);
		
	}
	else if(gameState == 'instructions'){
		backgroundSprite.image = backgroundInstructions;
		instructionsButton.remove();
		startButton.x = width - 140;
		startButton.y = height - 75;
	} 
	else if(gameState == 'game'){
		bgMusic.stop();
		backgroundSprite.visible = false;
		background(backgroundGame);

		if(!isPlayingMusic){
			music1.play();
			isPlayingMusic = true;
			startButton.x = -1000
			instructionsButton.x = -1000
		}
		timeCount = round(frameCount/60, 2);
		
		push()
		fill('white')
		textSize(48)
		text(timeCount, 200, height-25);
		textSize(24)
		text('PONTOS:', 10, height-70)
		text('TEMPO:', 200, height-70)
		textSize(80);
		text(score, 10, height-10);
		pop()

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
				spawnerSprite.sequence = {time: item.time, move_right: item.move_right, move_left: item.move_left}
				//* Sprites
				if(item.move_right == 5 && item.move_left == 6) spawnerSprite.image = move02;
				else if(item.move_right == 8 && item.move_left == 7) spawnerSprite.image = move01;
				else if(item.move_right == 10 && item.move_left == 9) spawnerSprite.image = move03;
				else if(item.move_right == 9 && item.move_left == '') spawnerSprite.image = move04;
				else if(item.move_right == '' && item.move_left == 10) spawnerSprite.image = move05;
			})
		}

		if(moveSpawnerGroup.length <= 0) text('Jogo Completo', 150, 150);

		if(moveSpawnerGroup.length > 0){
			if(moveSpawnerGroup[0].overlaps(danceMoveController)){
				moveSpawnerGroup[0].life = 60*moveSpawnerGroup[0].sequence.time
				leftTargets.removeAll()
				rightTargets.removeAll();
				let getMovementRight = moveSpawnerGroup[0].sequence.move_right;
				let getMovementLeft = moveSpawnerGroup[0].sequence.move_left;
				//console.log(getMovement);
				setTimeout(() => { 
					generatePath(leftTargets, getMovementLeft) 
					generatePath(rightTargets, getMovementRight)
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
				moveSpawnerGroup[0].vel.x = -15;
			}
			//(moveSpawnerGroup[0].x < - 20) ? moveSpawnerGroup.shift() : null;
			if(leftTargets.length > 0 && rightTargets.length > 0 && moveSpawnerGroup[0].overlapping(danceMoveController)){
				if(leftHand.overlaps(leftTargets[0])) leftTargets[0].remove();
				if(rightHand.overlaps(rightTargets[0])) rightTargets[0].remove();
				
			}
		}

	}

	if(hands.length == 1){
		//console.log(hands)
		let { thumb_tip, index_finger_tip, middle_finger_mcp } = hands[0];
		//let { right_middle_finger_mcp } = hands[0];
		//let { left_middle_finger_mcp } = hands[1];

		//* Movimento de pinça
		handThumb.x = width - thumb_tip.x;
		handThumb.y = thumb_tip.y;
		handIndex.x = width - index_finger_tip.x;
		handIndex.y = index_finger_tip.y;

		handIndex.visible = true
	} else {
		handThumb.visible = handIndex.visible = false
	}

	if(hands.length == 2){
		let right_middle_finger_mcp = hands[0].wrist;
		let left_middle_finger_mcp = hands[1].wrist;

		rightHand.visible = leftHand.visible = true;

		rightHand.x = width - right_middle_finger_mcp.x;
		leftHand.x = width - left_middle_finger_mcp.x;
		rightHand.y = right_middle_finger_mcp.y;
		leftHand.y = left_middle_finger_mcp.y;

		new handParticles.Sprite(rightHand.x, rightHand.y, 5);
		new handParticles.Sprite(leftHand.x, leftHand.y, 5);
		rightHand.color = (random(0, 255), random(0, 255), random(0, 255));
		leftHand.color = (random(0, 255), random(0, 255), random(0, 255));		
	} else{
		rightHand.visible = leftHand.visible = false;
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
		//? ESQUERDA - CIMA
		case 5:
			while(targets.length < 10){
				let target = new targets.Sprite()
				target.text = targets.length;
				if(targets.length < 5) target.y = headCalibrate.y + (targets.length * 25)
					else target.y = headCalibrate.y - ((targets.length-10) * 25);
				
				target.x = headCalibrate.x - 200
			}
			break;
		//? ESQUERDA - BAIXO
		case 6:
			while(targets.length < 10){
				let target = new targets.Sprite()
				target.text = targets.length;
				
				if(targets.length < 5) target.y = headCalibrate.y + 300 - (targets.length * 25)
				else target.y = headCalibrate.y + 300 + ((targets.length-10) * 25)
				
				target.x = headCalibrate.x - 200
			}
			break;
		//? DIREITA - CIMA
		case 7:
			while(targets.length < 10){
				let target = new targets.Sprite()
				target.text = targets.length;
				if(targets.length < 5) target.y = headCalibrate.y + (targets.length * 25)
					else target.y = headCalibrate.y - ((targets.length-10) * 25);
				
				target.x = headCalibrate.x + 200
			}
			break;
		//? DIREITA - CIMA
		case 8:
			while(targets.length < 10){
				let target = new targets.Sprite()
				target.text = targets.length;
				
				if(targets.length < 5) target.y = headCalibrate.y + 300 - (targets.length * 25)
				else target.y = headCalibrate.y + 300 + ((targets.length-10) * 25)
				
				target.x = headCalibrate.x + 200
			}
			break;
		//? ESQUERDA - DESCENDO BRAÇO
		case 9:
			while(targets.length < 10){
				let target = new targets.Sprite()
				target.text = targets.length;
				target.y = headCalibrate.y + (targets.length * 25)
				target.x = headCalibrate.x - 200
			}
			break;
		//? DIREITA - DESCENDO BRAÇO
		case 10:
			while(targets.length < 10){
				let target = new targets.Sprite()
				target.text = targets.length;
				target.y = headCalibrate.y + (targets.length * 25)
				target.x = headCalibrate.x + 200
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
