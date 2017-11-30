var colors = [];
var squares = document.querySelectorAll(".square");
var label = document.querySelector("#labelMsg");
var restartButton = document.getElementById("restartButton");
var pickedColour; //just need to be defined in the right scope
var difficulty = document.querySelector("select").value;

restartButton.addEventListener("click", function () {
  startGame(difficulty);
});
document.querySelector("select").addEventListener("change", function () {
  difficulty = this.value;
  startGame(difficulty);
});

startGame(difficulty);

//Core function of the game, sets up the right amount of squares depending on diff.
function startGame(num) {
  var colors = generateColours(num);

  // remake squares for new game
  // recreate container
  var p = document.getElementById("container");
  p.parentNode.removeChild(p);
  var newContainer = document.createElement("div");
  newContainer.id = "container";
  document.querySelector("body").appendChild(newContainer);

  //populate with num of squares
  for(var i=0;i<num;i++){
    var sq = document.createElement("div");
    sq.classList.add("square");
    document.querySelector("#container").appendChild(sq);
  }

  //select all divs into the squares var and set their background colors and listeners
  squares = document.querySelectorAll(".square");
  for(var i=0;i<squares.length; i++) {
    //assign background colour
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function() {
      //get clicked colour
      var clickedColour = this.style.backgroundColor;
      // compare to picked Colour
      if (pickedColour === clickedColour) {
        label.textContent = "Correct!";
        changeColours(clickedColour);
        document.querySelector("h1").style.backgroundColor = pickedColour;
      }else {
        this.style.backgroundColor = "#222";
        label.textContent = "Try again";
      }
    });
  }
  pickedColour = pickColour();
  document.getElementById("pickedC").textContent = pickedColour;

}



//Change all colours
function changeColours(colour) {
  for(var i=0;i<squares.length; i++) {
      squares[i].style.backgroundColor = colour;
  }
}

//pick a random colours out of the squares
function pickColour() {
  const i = Math.floor(Math.random()*squares.length);
  console.log("picked: ",squares[i].style.backgroundColor)
  return squares[i].style.backgroundColor;
}

//returns a random colour (rgb(r ,g, b))
function randomColour() {
  const r = Math.floor(Math.random()*255 +1);
  const g = Math.floor(Math.random()*255 +1);
  const b = Math.floor(Math.random()*255 +1);
  return "rgb("+r+", "+g+", "+b+")";
}

//Generate random colours for all squares
function generateColours(amountColours) {
  var c= [];
  for(var i=0;i<amountColours;i++) {
    c.push(randomColour());
  }
  return c;
}
