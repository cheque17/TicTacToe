//Module that contains anything related to the gameboard (changes, display, tiles).
const gameBoardModule = (() => {

  const tiles = document.querySelectorAll('.grid.item');
  const gameBoard = Array.from(tiles);

  let selectTile = (tileSelected, playerTurn) => {
    console.log(playerTurn);
    console.log(tileSelected);
    if (playerTurn===0){
      tileSelected.innerHTML = '<img src=\'images/close.png\'>';     
    } else if (playerTurn===1) {
      tileSelected.innerHTML = '<img src=\'images/dry-clean.png\'>';
    }    
    console.log(tileSelected.innerHTML);
  }

  return {
    gameBoard,
    tiles,
    selectTile,
  }
})();

//Factory function used to create the players
const playerCreator = (name, marker) => {
  return {
    name, 
    marker
  };
}


//Module that contains the logic of the game (player creation, actions taken on the board, turns)
const gameLogic = (() => {
  let players = [];
  let _playerTurn;
  let _gameOver = false;

  let _player1Name = document.querySelector('#player1').value;
  let _player2Name = document.querySelector('#player2').value;

  const startGame = () => {
    players = [
      playerCreator(_player1Name, 'X'),
      playerCreator(_player2Name, 'O')
    ]
    _playerTurn = 0;
    _gameOver = false;
    gameBoardModule.tiles.forEach((tile) => {
      tile.addEventListener('click', playerAction)
    })
  }

  const playerAction = (event) => {
    //let chosenTile = parseInt(event.target.id.slice(-1));
    let tileElement = event.target;  
    gameBoardModule.selectTile(tileElement, _playerTurn)
    _playerTurn= _playerTurn === 0 ? 1 : 0;
  }

  return{
    startGame,
    playerAction
  };
})();




//Event Listeners

const startGameButton = document.querySelector('#start');
startGameButton.addEventListener('click', () => {
  gameLogic.startGame();
  console.log('Button working');
})

