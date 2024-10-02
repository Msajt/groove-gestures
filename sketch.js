let handController;
let timerController;
let moveSpawner;
let targets;
let dots;
let indexStart = 0;
let timeCount = 0;
let directions = [line, diagonal, diagonal2, up]
let moveSpawnerGroup;
let spawnerController = [
	{
		time: 1,
		move: 0
	},
	{
		time: 2,
		move: 3
	},
	{
		time: 4,
		move: 1
	}
]

function preload(){
	
}

function setup() {
	new Canvas(500, 500);

	frameRate(60);
	

	handController =  new Sprite();
		handController.width = 20;
		handController.height = 20;

	timerController = new Sprite();
		timerController.width = 150;
		timerController.height = 75
		timerController.y = width-timerController.h/2
		timerController.collider = 'none'

	targets = new Group();
		targets.color = 'yellow';
		targets.y = 250;
		targets.diameter = 10;
		targets.collider = 'none'

	moveSpawner = new Sprite(width, height-25, 50, 50, 'none');
		moveSpawner.vel.x = -3
		moveSpawner.sequence = [0, 1, 1, 1, 3, 3, 2, 2];

	moveSpawnerGroup = new Group();
		moveSpawnerGroup.vel.x = -2;
		moveSpawnerGroup.sequence = spawnerController;
	textSize(20)
	// while(targets.length < 10){
	// 	let target = new targets.Sprite();
	// 	target.x = targets.length * 25;
	// }

	
}

function draw() {
	background('skyblue');
	timeCount = round(frameCount/60, 2);
	text(timeCount, 100, 100);
	handController.x = mouse.x
	handController.y = mouse.y

	// if(moveSpawnerGroup.length == 0){
	// 	spawnerController.forEach((time, move) => {
	// 		let spawnerSprite = new moveSpawnerGroup.Sprite();
	// 	})
	// }

	// if(targets.length > 0){
	// 	if(handController.overlaps(targets[0])){
	// 		targets[0].remove();
	// 		console.log(targets)
	// 		console.log(indexStart)
	// 	}
	// } else{
	// 	randomNumber = floor(random(0, directions.length))
	// 	setTimeout(() => generatePath(targets), 250)	
	// }

	if(handController.overlaps(timerController)) console.log('teste')
	
	if(targets.length > 0 && moveSpawner.overlapping(timerController)){
		if(handController.overlaps(targets[0])){
			targets[0].remove();
		}
	}

	if(moveSpawner.overlaps(timerController)){
		targets.removeAll()
		console.log(moveSpawner.sequence)
		let getMovement = moveSpawner.sequence.shift();
		setTimeout(() => generatePath(targets, getMovement), 250)
		targets.life = 60;
	}

	if(moveSpawner.x < -25) moveSpawner.x = width
	console.log(targets.life)

	



	
}

function generatePath(targets, value){
	let randomNumber = floor(random(0, 4));
	switch(value){
		case 0:
			while(targets.length < 10){
				let target = new targets.Sprite();
				target.x = targets.length * 25;
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

function line(targets){
	while(targets.length < 10){
		let target = new targets.Sprite();
		target.x = targets.length * 25;
		target.y = 250;
	}
}

function diagonal(targets){
	while(targets.length < 10){
		let target = new targets.Sprite();
		target.x = targets.length * 25;
		target.y = 250 + (targets.length*5)
	}
}

function diagonal2(targets){
	while(targets.length < 10){
		let target = new targets.Sprite();
		target.x = targets.length * 25;
		target.y = 250 - (targets.length*5)
	}
}

function up(targets){
	while(targets.length < 10){
		let target = new targets.Sprite();
		target.y = targets.length * 25;
		target.x = 250 + (targets.length*5)
	}
}

