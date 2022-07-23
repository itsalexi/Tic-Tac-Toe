const boardDiv = document.querySelector(".game");
const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
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
    updateBoard();
  }

  function updateBoard() {
    boardDiv.innerHTML = "";
    renderBoard();
  }

  function updateTile(event) {
    console.dir(`${event.target.textContent}`);
    if (event.target.textContent == "") {
      event.target.textContent = playerController.getCurrentPlayer();
    }
    // event.target.dataset.index
  }

  return {
    board,
    renderBoard,
    resetBoard,
    updateBoard,
    updateTile,
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

gameBoard.renderBoard();
playerController.addPlayer("Jack", "x");
playerController.addPlayer("Jerry", "O");

const tiles = document.querySelectorAll(".tile");
tiles.forEach((element) =>
  element.addEventListener("click", (event) => gameBoard.updateTile(event))
);
