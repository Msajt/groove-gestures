function gameLevel3(p){

    let video;
    let hands = [];

    this.setup = function() {
        //allSprites.remove();
        new Canvas(500, 500);

            video = createCapture(VIDEO);
            video.size(640, 480);
            video.hide();
            // start detecting hands from the webcam video
            handPose.detectStart(video, gotHands);

        frameRate(60);   
    }
    
    this.draw = function() {
        //background('skyblue');
        
        image(video, 0, 0, width, height);

        //image(img, x, y, width, height)

        // Draw all the tracked hand points
        for (let i = 0; i < hands.length; i++) {
            let hand = hands[i];
            for (let j = 0; j < hand.keypoints.length; j++) {
                let keypoint = hand.keypoints[j];
                fill(0, 255, 0);
                noStroke();
                circle(keypoint.x, keypoint.y, 10);
            }
        }
    }

    function gotHands(results) {
        // save the output to the hands variable
        hands = results;
    }
}

