var GHOST = 'ᗣ';
var GHOST_SUPER = '👀';


var gIntervalGhosts;
var gGhosts;
var gDeadGhosts = [];

//colors for ghost RED PINK ORANGE

const RED = 'red';
const PINK = 'pink';
const ORANGE = 'orange';

const superModeColor = 'blue'

// change color from start 
function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: EMPTY,
        color: getRandomColor()
    };

    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board, RED);
    createGhost(board, PINK);
    createGhost(board, ORANGE);
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 500)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation =
        {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

        // if WALL - give up
        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return
        // if GHOST - give up
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
            return
        }

        // if PACMAN - gameOver
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
            if (gPacman.isSuper) {
                killGhost(i);
            } else {
                gameOver();
                renderCell(gPacman.location, EMPTY);
                return;
            }
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)


        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost));

    }
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if(gPacman.isSuper){
        return `<span style="color:blue">${GHOST}</span>`
    } else {
        return `<span style="color: ${ghost.color};">${GHOST}</span>`
    }
    
}

function getGhostIdx(ghostLocation) {
    for (let i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location === ghostLocation) return i;
    }
    return -1;
}

function killGhost(ghostIdx) {
    console.log('kill the ghost');
    if (ghostIdx === -1) return;
    var deadGhost = gGhosts.splice(ghostIdx, 1);
    gDeadGhosts.push(deadGhost[0]);
}



