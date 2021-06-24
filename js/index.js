let computerOrder = [];
// order of the colors acc. to game
let playerOrder = [];
// order of the colors acc. to player
let flashesApperared;
//number of flashes appeared till now in game
let turn;
// turn on which the player is
let good;
// is player performing correcly
let computerTurn;
// to checkwhether its computer turn to flash
let displayFlashes;
// to stop setInterval function for displaying computer ordered flashes
let strict = false;
// is strict button checked or not
let noise = true;
// are we playing noise in program
let powerOn = false;
// can player use game or not
let noOfRoundToWin = 10;
//number of rounds to win
let isWon;
// has the player won or not
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener("click", function (event) {
  if (strictButton.checked) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener("click", function (event) {
  if (onButton.checked) {
    powerOn = true;
    turnCounter.innerHTML = "-";
  } else {
    powerOn = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(displayFlashes);
  }
});

startButton.addEventListener("click", function (event) {
  if (powerOn && !isWon) {
    setTimeout(() => {
      flashColor();
    }, 10);
    clearColor();
  }
  if (powerOn || isWon) {
    playNow();
  }
});

function playNow() {
  isWon = false;
  computerOrder = [];
  playerOrder = [];
  flashesApperared = 0;
  displayFlashes = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < noOfRoundToWin; i++) {
    computerOrder.push(Math.floor(Math.random() * 4) + 1);
  }
  computerTurn = true;
  displayFlashes = setInterval(gameControlOn, 800);
}

function gameControlOn() {
  powerOn = false;
  if (flashesApperared == turn) {
    clearInterval(displayFlashes);
    computerTurn = false;
    clearColor();
    powerOn = true;
  }
  if (computerTurn) {
    clearColor();
    setTimeout(function () {
      if (computerOrder[flashesApperared] == 1) one();
      if (computerOrder[flashesApperared] == 2) two();
      if (computerOrder[flashesApperared] == 3) three();
      if (computerOrder[flashesApperared] == 4) four();
      flashesApperared++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.querySelector("#clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.querySelector("#clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}
function three() {
  if (noise) {
    let audio = document.querySelector("#clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}
function four() {
  if (noise) {
    let audio = document.querySelector("#clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener("click", function (event) {
  if (powerOn) {
    playerOrder.push(1);
    check();
    one();
    if (!isWon) {
      setTimeout(function () {
        clearColor();
      }, 300);
    }
  }
});
topRight.addEventListener("click", function (event) {
  if (powerOn) {
    playerOrder.push(2);
    check();
    two();
    if (!isWon) {
      setTimeout(function () {
        clearColor();
      }, 300);
    }
  }
});
bottomLeft.addEventListener("click", function (event) {
  if (powerOn) {
    playerOrder.push(3);
    check();
    three();
    if (!isWon) {
      setTimeout(function () {
        clearColor();
      }, 300);
    }
  }
});
bottomRight.addEventListener("click", function (event) {
  if (powerOn) {
    playerOrder.push(4);
    check();
    four();
    if (!isWon) {
      setTimeout(function () {
        clearColor();
      }, 300);
    }
  }
});
function check() {
  if (
    playerOrder[playerOrder.length - 1] != computerOrder[playerOrder.length - 1]
  ) {
    good = false;
  }
  if (playerOrder.length == noOfRoundToWin && good) {
    winGame();
  }
  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(function () {
      turnCounter.innerHTML = turn;
      clearColor();
      if (strict) {
        playNow();
      } else {
        computerTurn = true;
        flashesApperared = 0;
        playerOrder = [];
        good = true;
        displayFlashes = setInterval(gameControlOn, 800);
      }
    }, 800);
    noise = false;
  }
  if (turn == playerOrder.length && good && !isWon) {
    turn++;
    playerOrder = [];
    computerTurn = true;
    flashesApperared = 0;
    turnCounter.innerHTML = turn;
    displayFlashes = setInterval(gameControlOn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  powerOn = flase;
  isWon = true;
}
