const statusDisplay = document.querySelector(".game--status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} wins`;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const drawMessage = () => `Game Ended in a draw`;
const currentPlayerTurn = () => `It's ${currentPlayer} 's turn`;
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellClick(evt) {
  const clickedCell = evt.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i];
    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
      statusDisplay.innerHTML=drawMessage();
      gameActive=false;
      return;
  }
  handlePlayerChange()
}
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML=currentPlayer
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);

function handleRestartGame() {
    gameActive=true;
    currentPlayer="X"
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell)=>cell.innerHTML="")
}
