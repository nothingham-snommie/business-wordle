let wordLength = 6;
let maxGuesses = 6;

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded - Board");
    createBoard();
    console.log("Game board created.");
});


// create the whole board
function createBoard() {
    for (let i=0; i<maxGuesses; i++) {
        createRow(i);
    }
}

// create row
function createRow(rowID) {
    let guess = document.createElement("div");
    guess.id = "guess_"+String(rowID);
    guess.className = "boardRow"
    document.getElementById("boardContainer").appendChild(guess);
    // create all the boxes for one row
    for (let j=0; j<wordLength; j++) {
        createBox(rowID, j, guess);
    }
}

// create one box
function createBox(rowID, colID, parent) { // hoh god what is this
    let box = document.createElement("div");
    box.id = "box_"+String(rowID)+String(colID);
    box.className = "boardBox";
    box.boxStatus = "normal";
    document.body.addEventListener("click", function() { // very much a bodge, me likey
        if (rowID == currentGuess) {
            box.innerHTML = inputWord[colID]; 
            if (box.innerHTML == "undefined") {
                box.innerHTML = "";
                console.log("Undefined at "+String(rowID)+String(colID));
            }
        }
    }); 
    
    parent.appendChild(box);
}