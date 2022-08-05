let currentDay = new Date().getDay();
let wordOfTheDay = answerWordList[currentDay % answerWordList.length]; // list will loop in (items in the list) days

async function checkWord(wordToCheck) {
    let wordStatus = [];
    if (wordToCheck.length != wordLength) {
        alert("not enough letters");
        return("insufficient");
    }
    if (!validWordList.includes(wordToCheck)) {
        alert("not in word list");
        return ("invalid");
    }

    for (let i=0; i<wordToCheck.length; i++) {
        if (wordOfTheDay.indexOf(wordToCheck[i]) == -1) {
            wordStatus.push(0); // 0 - not in word
            
        }
        else {
            if (wordToCheck[i] == wordOfTheDay[i]) {
                wordStatus.push(2); // 2 - in word and in right position
                
            }
            else {
                wordStatus.push(1); // 1 - in word but in wrong position
            }
        }

        if (wordStatus[i] == 0) {
            colour = "grey";
        }
        else if (wordStatus[i] == 1) {
            colour = "yellow";
            
        }
        else if (wordStatus[i] == 2) {
            colour = "green";
        }
        else {
            colour = "red";
            console.log("Unexpected occurrence when colouring squares.");
        }
        codeSquare(currentGuess, i, colour);
        await new Promise(r => setTimeout(r, 100));
    }

    if (wordStatus.includes(0) || wordStatus.includes(1)) {
        // no win
        if (currentGuess+1 >= maxGuesses) {
            alert("lose");
            return("lose");
        } 
        else {
            return("proceed");
        }
    }
    else {
        // winning!!!
        alert("win");
        return("win");
    }
}

// add anims
// and *that* edge case

function codeSquare(colID, rowID, col) {
    let square = document.getElementById("box_"+String(colID)+String(rowID));
    square.style.backgroundColor = col;
    
}
