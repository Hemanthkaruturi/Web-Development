var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i =0;i<numberOfDrumButtons;i++) {
  btn = document.querySelectorAll(".drum")[i].textContent
  // console.log(btn);
  document.querySelector("."+btn).addEventListener("click",function () {
    // console.log(this.innerHTML);
    play_sound(this.innerHTML);
    buttonAnimation(this.innerHTML);
  });

  document.addEventListener("keydown", function (event){
      play_sound(event.key);
      buttonAnimation(event.key);
  });

  // document.querySelectorAll(".drum")[i].addEventListener("click", function () {alert("You clicked!")} );
}

function play_sound(btn) {
  d = {'w':'tom-1.mp3', 'a':'tom-2.mp3', 's':'tom-3.mp3', 'd':'tom-4.mp3', 'j':'crash.mp3', 'k':'kick-bass.mp3', 'l':'snare.mp3'};
  try {
    var audio = new Audio('sounds/'+d[btn]);
    audio.play();
  }
  catch(err) {
    console.log('There is no sound attached to this key');
  }
}

function buttonAnimation(btn) {
  document.querySelector("."+btn).classList.add("pressed");

  setTimeout(function(){
    document.querySelector("."+btn).classList.remove("pressed");
  }, 100);
}
