var started = false;
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

$(document).on("keydown", function(){
        
   if (!started) {      
      $("#level-title").text("Level "+level);
      nextSequence();
      started = true;
    }

} )

$(".btn").click(function(event){
   var userChosenColor = event.target.id;
   userClickedPattern.push(userChosenColor);

   playSound(userChosenColor);
   animationPress(userChosenColor);
   
   checkAnswer(userClickedPattern.length-1);
    
});

function nextSequence(){
   level++;
   $("#level-title").text("Level "+level);

   var randomNumber= Math.floor(Math.random()*4);
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
    
   $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //flash animation of randomly chosen button
   playSound(randomChosenColor);
   
   userClickedPattern = [];
}

function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");

      if(gamePattern.length === userClickedPattern.length){
         setTimeout(function(){
            nextSequence();
         }, 1000);
      }
   }
   else{
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key To Restart");

      playSound("wrong");

      startOver();
   }

}

function playSound(name){
    var audio = new Audio('sounds/'+ name +'.mp3');  
    audio.play();
}

function animationPress(currentColor){ 

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);    
 
}

function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
}
