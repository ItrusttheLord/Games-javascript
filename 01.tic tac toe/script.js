"use strict";

let playerText = document.getElementById("playerText");
const restartBtn = document.getElementById("restartBtn");
const boxes = document.getElementsByClassName("box");

let htmlArray = Array.from(boxes);
let winnerColorStyle = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

let gameOver = false;
const O_PLAYER = "O";
const X_PLAYER = "X";
let currentPlayer = X_PLAYER;
let spaces = Array(9).fill(null);
const winningComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const starGame = function () {
  if (gameOver) return boxClicked();
  htmlArray.forEach((box) => box.addEventListener("click", boxClicked));
};

const boxClicked = function (e) {
  let id = e.target.id;
  if (!gameOver) {
    if (!spaces[id]) {
      spaces[id] = currentPlayer;
      e.target.innerText = currentPlayer;
    }
    if (playerWins() !== false) {
      playerText.innerText = `${currentPlayer} has Won`;
      let winning_blocks = playerWins();

      winning_blocks.map(
        (box) => (htmlArray[box].style.backgroundColor = winnerColorStyle)
      );
      return;
    }

    currentPlayer = currentPlayer === X_PLAYER ? O_PLAYER : X_PLAYER;
  }
};

const playerWins = function (e) {
  for (const condition of winningComb) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      gameOver = true;
      return [a, b, c];
    }
  }
  return false;
};

const restart = function () {
  spaces.fill(null);

  htmlArray.forEach((box) => {
    gameOver = false;
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  playerText.innerText = "Tic Tac Toe";

  currentPlayer = X_PLAYER;
};

restartBtn.addEventListener("click", restart);

starGame();
