var buttonColors = ['green', 'red', 'yellow', 'blue']  // push the random color to get animations 

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// game starts here 
$(document).keypress(function (e) {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// on mouse click this works 
$(".btn").click(function () {
    var getColor = this.id;
    userClickedPattern.push(getColor);
    playSound(getColor);
    addAnimation(getColor);

    checkAnswer(userClickedPattern.length - 1);     // check that user has followed the sequence or not 
});


//makes the next sequence 
function nextSequence() {
    userClickedPattern = [];                // updated for every level 
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);           // this pattern gave by the system 

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// checks for the next sequence 
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// if we made the wrong pattern 
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


// plays associated sound with buttons
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// added animations  of color
function addAnimation(color) {

    $("#" + color).addClass("pressed");         // adding the pressed class for adding a grey color

    setTimeout(() => {
        $("#" + color).removeClass("pressed");      // removing the pressed class after 100 ms  .
    }, 100);

}