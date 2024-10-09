function gameLevel(){

    let handController;
    let timerController;
    let moveSpawner;
    let leftTargets, rightTargets;
    let dots;
    let indexStart = 0;
    let timeCount = 0;
    //let directions = [line, diagonal, diagonal2, up]
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

    this.setup = function() {
        allSprites.remove();
        new Canvas(500, 500);

        frameRate(60);
        
    
        handController =  new Sprite();
            handController.width = 20;
            handController.height = 20;
    
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
        textSize(20)
    }
    
    this.draw = function() {
        background('skyblue');
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
                //spawnerSprite.addImage(image);
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
                    console.log('teste');
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