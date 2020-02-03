'use strict';
var WALL = '🧊';
var FOOD = '.';
var SUPER_FOOD = '🍔';
var EMPTY = ' ';
var CHERRY = '💸';

var gAddCherryInterval;

var gBoard;
var gGame = {
  score: 0,
  isOn: false,
  deadGhosts: []
};

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gAddCherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;


      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;

      }
      if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
        i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2) {
        board[i][j] = SUPER_FOOD;

      }
    }
  }
  return board;
}

function updateScore(value) {
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function gameOver() {
  var elModal = document.querySelector('.modal')
  var elSpan = elModal.querySelector('span');
  if (isWin()) elSpan.innerText += ' victorious!!!';
  elModal.style.display = 'block';
  gGame.isOn = false;
  gGame.score = 0;
  clearInterval(gIntervalGhosts);
  clearInterval(gAddCherryInterval);
  gIntervalGhosts = null;
  gAddCherryInterval = null;
}

function playAgain() {
  init();
  gGame.score = 0;
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'none';
  elModal.querySelector('span').innerText = '';
}

function addCherry() {
  var emptyCell = getEmptyCell();

  var rndIdx = getRandomIntInclusive(0, emptyCell.length);
  var newIndex = emptyCell[rndIdx];

  if (!emptyCell[rndIdx]) return;
  var i = newIndex.i;
  var j = newIndex.j;

  var posCell = gBoard[i][j];
  if (posCell === ' ') {
    gBoard[i][j] = CHERRY;
    renderCell({ i: i, j: j }, CHERRY);
  }

}

function getEmptyCell() {
  var res = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === ' ') res.push({ i, j });
    }
  }
  return res;
}

function countFoodOnBoard() {
  var res = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === FOOD) res.push({ i, j });
    }
  }
  return res.length;
}