let currentDay = new Date().getDay();
let wordOfTheDay = answerWordList[currentDay % answerWordList.length]; // list will loop in (items in the list) days

async function checkWord(wordToCheck) {
    let wordStatus = [];
    if (wordToCheck.length != wordLength) {
        addPopup("not enough letters");
        return
    }
    if (!validWordList.includes(wordToCheck)) {
        addPopup("not in word list");
        return
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
            colour = "void";
        }
        else if (wordStatus[i] == 1) {
            colour = "okay";
            
        }
        else if (wordStatus[i] == 2) {
            colour = "good";
        }
        else {
            colour = "error";
            console.log("Unexpected occurrence when colouring squares.");
        }
        codeSquare(currentGuess, i, colour);
        await new Promise(r => setTimeout(r, 500));
    }

    if (wordStatus.includes(0) || wordStatus.includes(1)) {
        // no win
        if (currentGuess+1 >= maxGuesses) {
            addPopup(wordOfTheDay, permanent=true);
            return;
        } 
        else {
            return("proceed");
        }
    }
    else {
        // winning!!!
        addPopup("well done", permanent=true);
        return;
    }
}
// add *that* edge case

async function codeSquare(colID, rowID, col) {
    let box = document.getElementById("box_"+String(colID)+String(rowID));
    box.classList.add("boardBox_"+col);
    boxStatus = col;
    
}

async function addPopup(text, permanent) {
    let popup = document.createElement("div");
    console.log("realrelaleroal");
    popup.className = "popup";
    popup.innerHTML = text;
    popup.style.display = "block";
    document.getElementById("popupContainer").appendChild(popup);

    if (!permanent) {
        await new Promise(r => setTimeout(r, 500));
        popup.style.display = "none";
        popup.remove();
    }

}