const keyClicked = new Event("keyClicked");
var gameState = "playing";
var correctWord = "assets";

async function checkWord() {
    gameState = "checking";
    let word = internalBoard[currentGuess];

    if (!validWords.includes(word)) {
        console.log("not in word list");
        gameState = "playing";
        return ("not in word list");
    }

    // keep track of letter frequency (this will matter in the thoothpid edge case grrrrr)
    // e.g: KENNY -> {K:1, E:1, N:2, Y: 1}
    // put youtube tutorial to credit here
    let letterFrequency = {};
    for (let i=0; i<word.length; i++) {
        let letter = word[i];

        if (letterFrequency[letter]) {
           letterFrequency[letter] += 1;
        } 
        else {
           letterFrequency[letter] = 1;
        }
    }
    //console.log(letterFrequency);

    // check correct
    for (let i=0; i<word.length; i++) {
        let letter = word[i];
        let currentTile = document.getElementById("boardBox_"+currentGuess+i);
        let keyTile = document.getElementById("keyboardKey_"+letter);

        if (letter == correctWord[i]) {
            currentTile.classList.add("correct"); // colour tile
            keyTile.classList.add("correct"); // colour key
            letterFrequency[letter] -= 1;
        }
    }
    if (word == correctWord) {
        console.log("well done");
        gameState = "win";
        return("win");
    }

    // check present/invalid
    for (let i=0; i<word.length; i++) {
        let letter = word[i]; // surely there's a way to not have to define this twice?
        let currentTile = document.getElementById("boardBox_"+currentGuess+i);
        let keyTile = document.getElementById("keyboardKey_"+letter);

        if (!currentTile.classList.contains("correct")) {
            // is the letter in the correct word        and has it appeared more times than it does in the correct word
            if (correctWord.includes(letter) && letterFrequency[letter] > 0) {
                currentTile.classList.add("present"); // colour tile
                if (!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present"); // colour tile unless it's already been coloured correct
                }       
                letterFrequency[letter] -= 1;
            }
            else { // not in word, or letter has been overcounted
                currentTile.classList.add("absent"); // colour tile
                if (!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("absent"); // colour key, ensuring letters marked absent from overcount don't colour the key grey
                }
            
            }
        }
    }
    gameState = "playing";
    //return;
}