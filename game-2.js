function gameLevel2(){

    let sprite;

    this.setup = function() {
        new Canvas(500, 500);
        sprite = new Sprite(150, 150);
        frameRate(60);   
    }
    
    this.draw = function() {
        background('skyblue');
        if(sprite.mouse.pressing()) scene.showScene(gameLevel3);

        timeCount = round(frameCount/60, 2);
        text(timeCount, 100, 100);
    }

}