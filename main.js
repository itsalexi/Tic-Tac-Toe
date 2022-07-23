const boardDiv = document.querySelector(".game");
const gameBoard = (function () {
  let board = ["", "x", "o", "", "", "", "", "", ""];
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
      console.log("Good");
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
    return { name, character };
  };

  function addPlayer(name, character) {
    const player = playerFactory(name, character.toUpperCase());
    players.push(player);
  }

  return {
    players,
    addPlayer,
  }
})();

gameBoard.renderBoard();
playerController.addPlayer("Jack", "x");
playerController.addPlayer("Jerry", "O");

const tiles = document.querySelectorAll(".tile");
tiles.forEach((element) =>
  element.addEventListener("click", (event) => gameBoard.updateTile(event))
);
