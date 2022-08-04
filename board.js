wordLength = 5;
totalGuesses = 6;

let displayWord = "water";
var display = document.getElementById("boardContainer");

// create board
for (i=0; i<totalGuesses; i++) {
    // create row
    var guess = document.createElement("div");
    guess.id = "guess_"+String(i);
    guess.style.display = "flex";
    document.getElementById("boardContainer").appendChild(guess);

    for (j=0; j<wordLength; j++) {
        // create boxes for one row
        var box = document.createElement("div");
        box.id = "box_"+String(i)+String(j);
        box.className = "boardBox"
        box.innerHTML = "a";

        guess.appendChild(box);
    }

}