var gPacman;
// var PACMAN = 'ᗧ'; //ᗤ
var PACMAN = '<img src = "images/pacman-right.png" class="pacman"/>';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  //cherry hendle 
  if (nextCell === CHERRY) updateScore(10);
  //super food case
  if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) {
      nextCell = SUPER_FOOD;
      return;
    }

    handleSuperFood()
  }

  // Hitting FOOD? update score
  if (nextCell === FOOD) updateScore(1);
  else if (isWin()) gameOver();
  else if (nextCell === GHOST) {
    //super food case
    if (gPacman.isSuper) {
      var ghostIdx = getGhostIdx(nextLocation);
      killGhost(ghostIdx);
    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };
  elCell = document.querySelector(`.cell${nextLocation.i}-${nextLocation.j}`);


  switch (keyboardEvent.code) {
    case 'ArrowUp':
      PACMAN = rotatePackman(270);
      // elCell.style.transform = 'rotate(270deg)';
      nextLocation.i--;
      break;
    case 'ArrowDown':
      PACMAN = rotatePackman(90);
      // elCell.style.transform = 'rotate(90deg)';
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      PACMAN = rotatePackman(180);
      // elCell.style.transform = 'rotate(180deg)';
      nextLocation.j--;
      break;
    case 'ArrowRight':
      PACMAN = rotatePackman(0);
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function isWin() {
  var foodNum = countFoodOnBoard();
  return (foodNum === 0) ? true : false;
}

function handleSuperFood() {
  gPacman.isSuper = true;
  for (let i = 0; i < gGhosts.length; i++) {
    var currGhost = gGhosts[i];
    renderCell(currGhost.location, getGhostHTML(currGhost))
  }
  setTimeout(function () {
    gPacman.isSuper = false;
    for (let i = 0; i < gDeadGhosts.length; i++) {
      createGhost(gBoard);
    }
    for (let i = 0; i < gGhosts.length; i++) {
      var currGhost = gGhosts[i];
      currGhost.color = getRandomColor();
    }
    gDeadGhosts = [];
  }, 5000)
}

function rotatePackman(degs){
  var pacman = `<img src = "images/pacman-right.png" class="pacman" style="transform: rotate(${degs}deg);"/>`;
  return pacman;
}