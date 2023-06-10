
const gameBoardModule = (() => {
  const tiles = document.querySelectorAll('.grid.item');
  const gameBoard = Array.from(tiles);

  const showGame = () => {
    tiles.forEach(() => {
      tiles.addEventListener('click', displayController.interaction)
    })
  }
  return {gameBoard}
})();

const playerCreator = (name, marker) => {
  return {name, marker};
}

const displayController = (() => {
  let players = [];
  let playerTurn;
  let gameOver = false;

  let player1Name = document.querySelector('#player1').value;
  let player2Name = document.querySelector('#player2').value;

  const startGame = () => {
    players = [
      playerCreator(player1Name, 'X'),
      playerCreator(player2Name, 'O')
    ]
    playerTurn = 0;
    gameOver = false;
  }

  return{
    startGame,
  };
})();




//Event Listener

const startGameButton = document.querySelector('#start');
startGameButton.addEventListener('click', () => {
  displayController.startGame();
  console.log('Button working');
})

