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

  return {
    board,
    renderBoard,
    resetBoard,
  };
})();

gameBoard.renderBoard();
