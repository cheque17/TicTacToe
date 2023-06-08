const gameBoardModule = (() => {
  const tiles = document.querySelectorAll('.grid.item');
  const gameBoard = Array.from(tiles);
  return { gameBoard: gameBoard }
})();

const displayController = (() => {
  return{};
})();

const playerCreator = (number, marker) => {
  return {number, marker};
}

const player1 = playerCreator(1, 'o');
const player2 = playerCreator(2, 'x');
