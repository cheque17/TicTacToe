//Factory function used to create the players
const createPlayer = (name, marker) => {
  return {
    name, 
    marker
  };
}

//Module that contains anything related to the gameboard (changes, display, tiles).
const gameBoardModule = (() => {

  const _gameBoard = ["","","","","","","","",""];

  const _xMarker = 'close.png';
  const _oMarker = 'dry-clean.png';

  const createGameboard = ()=> {
    for (let i=0; i<9; i++) {
      let newTile = document.createElement('div');
      newTile.classList.add('grid');
      newTile.classList.add('item');
      newTile.setAttribute('id', `item${i}`)
      document.querySelector('#board').appendChild(newTile);
    }
    const gridItems = document.querySelectorAll('.item');
    gridItems.forEach( gridItem => {
      gridItem.addEventListener('click', gameLogic.playerMove)
    })
  }

  let markTile = (arrayIndex, playerMark, chosenTile) => {
    if (playerMark === 'O') {
    chosenTile.innerHTML = `<img src='images/${_oMarker}'>`;
    } else if (playerMark === 'X') {
      chosenTile.innerHTML = `<img src='images/${_xMarker}'>`;
    }
    _gameBoard[arrayIndex] = playerMark;
    
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
      createPlayer(_player1Name, 'X'),
      createPlayer(_player2Name, 'O')
    ]
    gameBoardModule.createGameboard()
    _playerTurn = 0;
    _gameOver = false;
    
  }

  const playerMove = (event) => {
    let arrayIndex = parseInt(event.target.id.slice(-1));
    let tileElement = event.target; 

    if (gameBoardModule.getGameboard()[arrayIndex]!=='') {
      return
    }

    gameBoardModule.markTile(arrayIndex, players[_playerTurn].marker, tileElement); 


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
})

