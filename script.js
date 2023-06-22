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
    chosenTile.innerHTML = '<img src=\'images/dry-clean.png\'>';
    } else if (playerMark === 'X') {
      chosenTile.innerHTML = '<img src=\'images/close.png\'>';
    }
    _gameBoard[arrayIndex] = playerMark;
    
  }

  const getGameboard = ()=> _gameBoard;

  return {
    createGameboard,
    markTile,
    getGameboard,
  }
})();



//Module that contains the logic of the game (player creation, actions taken on the board, turns)
const gameLogic = (() => {
  let players = [];

  const getPlayers = ()=> players;

  let _gameBoardCreated = false;
  let _playerTurn;
  let _gameOver;

  

  const startGame = () => {
    let _player1Name = document.querySelector('#player1').value;
    let _player2Name = document.querySelector('#player2').value;
    players = [
      createPlayer(_player1Name, 'X'),
      createPlayer(_player2Name, 'O')
    ]
    _playerTurn = 0;
    displayMessages.createMessage(`It's ${players[_playerTurn].name}'s turn!`)

    if (_gameBoardCreated) {
      return
    }
    gameBoardModule.createGameboard()
    
    _gameOver = false;    
    _gameBoardCreated = true;
  }

  const restartGame = ()=> {
    for (i=0; i<9; i++) {
    document.querySelector(`#item${i}`).innerHTML = '';
    gameBoardModule.getGameboard()[i] ='';
    _gameOver = false;
    displayMessages.createMessage(`It's ${players[_playerTurn].name}'s turn!`);
    }
  }

  const playerMove = (event) => {
    if(_gameOver) {
      return
    }

    let arrayIndex = parseInt(event.target.id.slice(-1));
    let tileElement = event.target; 

    if (gameBoardModule.getGameboard()[arrayIndex]!=='') {
      return
    }

    gameBoardModule.markTile(arrayIndex, players[_playerTurn].marker, tileElement); 

    if (_checkForWin(gameBoardModule.getGameboard())) {
      _gameOver=true;
      displayMessages.createMessage(`${players[_playerTurn].name} has won!`);
    } else if (_checkForTie(gameBoardModule.getGameboard())) {
      _gameOver=true;
      displayMessages.createMessage('It\'s a tie.')
    }
    _playerTurn= _playerTurn === 0 ? 1 : 0;

    if (!_gameOver){
    displayMessages.createMessage(`It's ${players[_playerTurn].name}'s turn!`);
    }
  }

  const _checkForWin = gameboard => {
    const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for (let i=0; i<winningCombinations.length; i++) {
      let [a,b,c] = winningCombinations[i];
      if (gameboard[a] && gameboard[a]===gameboard[b] && gameboard[a]===gameboard[c]) {
        return true;
      }
    }    
    return false;
  }

  const _checkForTie = gameboard => {
    return gameboard.every(tile => tile !== "");
  }

  return{
    startGame,
    playerMove,
    getPlayers,
    restartGame
  };
})();


const displayMessages = (() =>{

  const createMessage = message => {
    document.querySelector('#message-box').innerText = message;
  }

  return {
    createMessage
  }

})();


//Event Listeners

const startGameButton = document.querySelector('#start');
startGameButton.addEventListener('click', () => {
  gameLogic.startGame();
})

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', ()=> {
  gameLogic.restartGame();
})

