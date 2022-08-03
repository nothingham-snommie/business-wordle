const wordLength = 5; // no. of rows
const totalGuesses = 6; // no. of cols

let displayWord = "water";
var display = document.getElementById("displayContainer");

// create board
for (i=0; i<totalGuesses; i++) {
    var guess = document.createElement("div");
    guess.id = "guess_"+String(i);

    for (j=0; j<wordLength; j++) {
        var box = document.createElement("div");
        box.id = "box_"+String((i,j));
    }

}