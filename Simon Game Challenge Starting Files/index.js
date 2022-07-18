var colors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = colors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  play_sound(randomChosenColour);
  $("#level-title").text("Level "+level);
  level++;
}

function play_sound(color) {
  var audio = new Audio('sounds/'+color+'.mp3');
  audio.play();
}

function play_wrong_sound() {
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
}

$(".btn").click(function (event){
  var userChosenColour = event.target.id;
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  play_sound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(colors.indexOf(userChosenColour));
});

function animatePress(currentColour) {
  $("."+currentColour).addClass("pressed");

  setTimeout(function () {
    $("."+currentColour).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {
  var l_game = gamePattern[gamePattern.length-1];
  var l_user = userClickedPattern[userClickedPattern.length-1];
  if (l_game === l_user) {
    console.log("success");
    setTimeout(function () {
      nextSequence()
    }, 1000);
  }
  else {
    console.log("wrong");
    play_wrong_sound();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

// start game
$(document).keypress(nextSequence);
