const keyClicked = new Event("keyClicked");
let wordLength = getCookie("wordLength");
const maxGuesses = 6;

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded - Game Board");
    initialiseInternalBoard();
    createGameBoard(); // the game board is essentially a display for the internal board
    getCorrectWord();
    console.log("Game Board created.");
});

// Create Game Board
function createGameBoard() {
    for (let rowID=0; rowID<maxGuesses; rowID++) {
        createGameBoardRow(rowID);
    }
}

function createGameBoardRow(rowID) {
    let boardRow = document.createElement("div");
    boardRow.className = "boardRow";
    boardRow.id = "boardRow_"+rowID;
    
    for (let colID=0; colID<wordLength; colID++) {
        createGameBoardBox(boardRow, rowID, colID);
    }
    
    document.getElementById("boardContainer").appendChild(boardRow);
}

function createGameBoardBox(parentRow, rowID, colID) {
    let boardBox = document.createElement("div");
    boardBox.className = "boardBox";
    boardBox.id = "boardBox_"+rowID+colID; // honestly expected the integers to add up but surprisingly not

    boardBox.innerHTML = " "; // just in case --> utf-8 invis char (U+2800) "⠀"

    function updateBox() {
        console.log("i am going to      update into three");
        boardBox.innerHTML = internalBoard[rowID][colID];
        if (boardBox.innerHTML == "undefined") {
            boardBox.innerHTML = " ";
        }
    }
    
    boardBox.addEventListener("keyClicked", function() {updateBox()});
    //boardBox.dispatchEvent(keyClicked);

    parentRow.appendChild(boardBox);
}

var internalBoard = [];
function initialiseInternalBoard() {
    for (let i=0; i<maxGuesses; i++) {
        internalBoard.push([]);
    }
}

function updateBoard() {
    // Update Internal Board
    internalBoard[currentGuess] = (inputWord);
    //console.log(internalBoard);

    // Update External Board (display)
    // update the entire row on the display when a letter added/removed
    for (let col=0; col<wordLength; col++) {
        document.getElementById("boardBox_"+currentGuess+col).dispatchEvent(keyClicked);
    }

    /*document.getElementById("boardBox_"+currentGuess+(internalBoard[currentGuess].length)).dispatchEvent(keyClicked);  
    document.getElementById("boardBox_"+currentGuess+(internalBoard[currentGuess].length+1)).dispatchEvent(keyClicked);
    document.getElementById("boardBox_"+currentGuess+(internalBoard[currentGuess].length-1)).dispatchEvent(keyClicked); */
    // there's probably more optimised implementation doing something like this (don't uncomment, this doesn't fully work)
    // but idk i'm just not feeling it 
    //console.log(internalBoard[currentGuess].length);
}