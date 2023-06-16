//Factory function used to create the players
const playerCreator = (name, marker) => {
  return {
    name, 
    marker
  };
}

//Module that contains anything related to the gameboard (changes, display, tiles).
const gameBoardModule = (() => {

  const _gameBoard = [];

  const _xMarker = 'close.png';
  const oMarker = 'dry-clean.png';

  const createGameboard = ()=> {
    for (let i=0; i<9; i++) {
      let newTile = document.createElement('div');
      newTile.classList.add('grid');
      newTile.classList.add('item');
      newTile.setAttribute('id', `item${i}`)
      document.querySelector('#board').appendChild(newTile);
      _gameBoard.push(newTile)
    }
    const gridItems = document.querySelectorAll('.item');
    gridItems.forEach( gridItem => {
      gridItem.addEventListener('click', gameLogic.playerMove)
    })
  }

  let markTile = (tileSelected, playerMark) => {
    _gameBoard[tileSelected] = playerMark;
    
  }

  const getGameboard = ()=> _gameBoard;
  const getGridItem = ()=>gridItems;

  return {
    createGameboard,
    markTile,
    getGameboard,
    getGridItem
  }
})();



//Module that contains the logic of the game (player creation, actions taken on the board, turns)
const gameLogic = (() => {
  let players = [];
  let _playerTurn;
  let _gameOver;

  let _player1Name = document.querySelector('#player1').value;
  let _player2Name = document.querySelector('#player2').value;

  const startGame = () => {
    players = [
      playerCreator(_player1Name, 'X'),
      playerCreator(_player2Name, 'O')
    ]
    gameBoardModule.createGameboard()
    _playerTurn = 0;
    _gameOver = false;
    
  }

  const playerMove = (event) => {
    let chosenTile = parseInt(event.target.id.slice(-1));
    gameBoardModule.markTile(chosenTile, players[_playerTurn].marker)
    /*let tileElement = event.target;  
    gameBoardModule.selectTile(tileElement, _playerTurn)*/
    _playerTurn= _playerTurn === 0 ? 1 : 0;
  }

  return{
    startGame,
    playerMove,
  };
})();




//Event Listeners

const startGameButton = document.querySelector('#start');
startGameButton.addEventListener('click', () => {
  gameLogic.startGame();
  console.log('Button working');
})

