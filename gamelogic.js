var gameState = "playing";
let currentDay = new Date().getDay();
let correctWord = businessWords[currentDay % businessWords.length].name; // list will loop every correctWords.length days
let correctDef = businessWords[currentDay % businessWords.length].definition;

async function checkWord() {
    gameState = "checking";
    let word = internalBoard[currentGuess];

    // keep track of letter frequency (this will matter in the thoothpid edge case grrrrr)
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
    let boxColourOrder = [];
    let keyColourOrder = [];
    for (let i=0; i<word.length; i++) {
        let letter = word[i];

        if (letter == correctWord[i]) {
            boxColourOrder[i] = "correct";
            keyColourOrder[i] = "correct";
            letterFrequency[letter] -= 1; // count letter
        }
    }

    // check present/invalid
    for (let i=0; i<word.length; i++) {
        let letter = word[i]; // surely there's a way to not have to define this twice?
        let keyTile = document.getElementById("keyboardKey_"+letter);

        if (boxColourOrder[i] != "correct") {
            // is the letter in the correct word and has it appeared more times than it does in the correct word
            if (correctWord.includes(letter) && letterFrequency[letter] > 0) {
                boxColourOrder[i] = "present";
                if (!keyTile.classList.contains("correct")) { // colour tile unless it's already been coloured correct
                    keyColourOrder[i] = "present"; 
                }
                letterFrequency[letter] -= 1; // count letter
            }
            else { // not in word, or letter has been overcounted
                boxColourOrder[i] = "absent";
                if (!keyTile.classList.contains("correct")) {
                    keyColourOrder[i] = "absent"; // colour key, ensuring letters marked absent from overcount don't colour the key grey
                }
            
            }
        }
        
    }

    // colour boxes
    for (let i=0; i<word.length; i++) {
        let boxTile = document.getElementById("boardBox_"+currentGuess+i);
        let keyTile = document.getElementById("keyboardKey_"+word[i]);

        boxTile.classList.add(boxColourOrder[i]);

        if (keyColourOrder[i] == "correct" && keyTile.classList.contains("present")) { // recolours present tiles if correct at one point
            keyTile.classList.remove("present");
        }
        keyTile.classList.add(keyColourOrder[i]);
        await new Promise(r => setTimeout(r, 500));
    }

    if (word == correctWord) {
        console.log("well done");
        gameState = "win";
        document.getElementById("definitionContainer").innerHTML = correctDef;
        return("win");
    }

    gameState = "playing";
    return;
}