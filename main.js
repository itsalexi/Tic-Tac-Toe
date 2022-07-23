const boardDiv = document.querySelector(".game");
const startForm = document.getElementById("startForm");

const gameBoard = (function () {
  const resetButton = document.getElementById("resetButton");
  const turnText = document.getElementById("turnText");

  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = false;
  let roundWon = false;
  let roundTie = false;

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
    const player1Input = document.getElementById("player1Input");
    const player2Input = document.getElementById("player2Input");

    const startDiv = document.querySelector(".start");
    const container = document.querySelector(".container");

    startDiv.style.display = "none";
    container.style.display = "grid";

    gameActive = true;
    gameBoard.renderBoard();
    addListeners();
    playerController.addPlayer(player1Input.value, "X");
    playerController.addPlayer(player2Input.value, "O");
    playerController.updatePlayers();
    playerController.players[0].turn = true;
    playerController.players[1].turn = false;

    turnText.textContent = `It's ${playerController.players[0].name}'s turn!`;
  }

  function addListeners() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((element) =>
      element.addEventListener("click", (event) => gameBoard.updateTile(event))
    );
  }

  function checkWin() {
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
      roundTie = true;
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
    roundTie = false;
    turns = 0;
    boardDiv.innerHTML = "";
    turnText.textContent = `It's ${playerController.players[0].name}'s turn!`;
    resetButton.textContent = "Restart?";
    startGame();
  }

  function updateTile(event) {
    if (gameActive) {
      if (event.target.textContent == "") {
        player = playerController.getCurrentPlayer();
        event.target.textContent = player;
        board[event.target.dataset.index] = player;
        turns++;
        console.log(turns);
        checkWin();
        changeGameInfo(player);

        if (roundWon) {
          playerController.addScore(player);
        }
      }
    }

    // event.target.dataset.index
  }
  function changeGameInfo(player) {
    let nameIndex;
    let winNameIndex;
    player === "X" ? (nameIndex = 1) : (nameIndex = 0);
    turnText.textContent = `It's ${playerController.players[nameIndex].name}'s turn!`;
    changeReset();

    if (roundWon) {
      player === "X" ? (winNameIndex = 0) : (winNameIndex = 1);
      turnText.textContent = `${playerController.players[winNameIndex].name} won!`;
    }
    if (roundTie) {
      turnText.textContent = "It was a tie!";
    }
  }

  function changeReset() {
    if (!gameActive) {
      resetButton.textContent = "Play again?";
    }
  }

  resetButton.addEventListener("click", resetBoard);
  return {
    board,
    renderBoard,
    resetBoard,
    updateTile,
    startGame,
    gameActive,
    roundWon,
  };
})();

const playerController = (function () {
  let players = [];

  const player1Score = document.getElementById("player1Score");
  const player2Score = document.getElementById("player2Score");

  const player1Name = document.getElementById("player1Name");
  const player2Name = document.getElementById("player2Name");

  const playerFactory = (name, character) => {
    let turn = false;
    let score = 0;
    character == "X" ? (turn = true) : (turn = false);
    return { name, character, turn, score };
  };

  function addPlayer(name, character) {
    const player = playerFactory(name, character.toUpperCase());
    players.push(player);
  }

  function addScore(player) {
    if (players[0].character == player) {
      players[0].score++;
    } else {
      players[1].score++;
    }
    updateScore();
  }

  function updatePlayers() {
    player1Name.textContent = players[0].name;
    player2Name.textContent = players[1].name;
  }

  function updateScore() {
    player1Score.textContent = `Score: ${players[0].score}`;
    player2Score.textContent = `Score: ${players[1].score}`;
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
    updateScore,
    updatePlayers,
    addScore,
  };
})();

function start(e) {
  gameBoard.startGame();
  e.preventDefault();
}
startForm.addEventListener("submit", (e) => start(e));
