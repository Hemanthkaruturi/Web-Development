var rand_num1 = Math.floor(Math.random()*5)+1;
var rand_num2 = Math.floor(Math.random()*5)+1;

img_path1 = "images/dice"+rand_num1+".png";
img_path2 = "images/dice"+rand_num2+".png";

document.querySelector(".img1").setAttribute("src",img_path1);
document.querySelector(".img2").setAttribute("src",img_path2);

if (rand_num1 > rand_num2) {
  // Player 1 won
  document.querySelector("h1").innerHTML="Player 1 Won!"
}
else if (rand_num1 === rand_num2) {
  document.querySelector("h1").innerHTML="Draw!"
}
else {
  // player 2 won
  document.querySelector("h1").innerHTML="Player 2 Won!"
}
