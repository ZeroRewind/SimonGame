let gamePattern = [];
let userClickedPattern = [];
let buttonColours= ["red", "blue", "green", "yellow"];
let level = 0;

// Start the sequence of colors I need to match
function nextSequence(){

    userClickedPattern= [];

    //Random number to push in gamePattern
    let randomNumber = Math.floor( Math.random() * 4 );
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);  
    playSound(randomChosenColour);

    level++;
    $("h1").text("Level "+level);
}


//Simon user clicks
$(".btn").on("click",function(event){
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    
    animatePress(userChosenColour);  
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

//Audio play
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//Animation for user clicks
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);    
}

//Press a key to start the event
$(document).keydown(function(event){
    while(gamePattern.length === 0){
    nextSequence();
    }
});

//Check user answer against game sequence
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("pass");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    }else{
        console.log("fail");
        
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");    
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        
        gamePattern = [];
        level = 0;
    }
}

