const boardDiv = document.querySelector(".game");
const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = false;
  let turns = 0;

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function startGame() {
    gameActive = true;
    gameBoard.renderBoard();
    playerController.addPlayer("Jack", "x");
    playerController.addPlayer("Jerry", "O");
  }

  function checkWin() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
      const currentWinCondition = winConditions[i];
      const a = board[currentWinCondition[0]];
      const b = board[currentWinCondition[1]];
      const c = board[currentWinCondition[2]];

      // this checks to see if there is a match, if there is no match, just continue
      if (a === "" || b === "" || c == "") {
        continue;
      }

      // if there is a match then round is won.
      if (a === b && b == c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      console.log("Won");
      gameActive = false;
    }

    // if there is still no winner, and there has been 9 turns then its a tie
    if (!roundWon && turns == 9) {
      console.log("Tie");
      gameActive = false;
    }
  }

  function renderBoard() {
    for (let i = 0; i < board.length; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.textContent = board[i];
      tile.dataset.index = i;
      boardDiv.appendChild(tile);
    }
  }

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = false;
    roundWon = false;
    updateBoard();
  }

  function updateBoard() {
    boardDiv.innerHTML = "";
    renderBoard();
  }

  function updateTile(event) {
    if (gameActive) {
      if (event.target.textContent == "") {
        player = playerController.getCurrentPlayer();
        event.target.textContent = player;
        board[event.target.dataset.index] = player;

        checkWin();
        turns++;
      }
    }

    // event.target.dataset.index
  }

  return {
    board,
    renderBoard,
    resetBoard,
    updateBoard,
    updateTile,
    startGame,
    gameActive,
    turns,
  };
})();

const playerController = (function () {
  let players = [];

  const playerFactory = (name, character) => {
    let turn = false;
    character == "X" ? (turn = true) : (turn = false);
    return { name, character, turn };
  };

  function addPlayer(name, character) {
    const player = playerFactory(name, character.toUpperCase());
    players.push(player);
  }

  function getCurrentPlayer() {
    // this gets the current player and changes it to the next one
    if (players[0].turn) {
      players[0].turn = false;
      players[1].turn = true;

      return players[0].character;
    } else {
      players[0].turn = true;
      players[1].turn = false;
      return players[1].character;
    }
  }

  return {
    players,
    addPlayer,
    getCurrentPlayer,
  };
})();

gameBoard.startGame();

const tiles = document.querySelectorAll(".tile");
tiles.forEach((element) =>
  element.addEventListener("click", (event) => gameBoard.updateTile(event))
);
