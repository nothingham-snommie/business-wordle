// establish keyboard layout
const keyboardLayout = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["enter","z","x","c","v","b","n","m","backspace"]
];

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded - Keyboard");
  createKeyboard();
  console.log("Keyboard created.");
});

function createKeyboard() {
    for (let i=0; i<keyboardLayout.length; i++) {
        let keyboardRowKeys = keyboardLayout[i]; // has the CONTENTS of a singular keyboard row
    
        // setup keyboard row div
        let keyboardRowContainer = document.createElement("div");
        keyboardRowContainer.id = "keyboardRow"+String(i)
        keyboardRowContainer.className = "keyboardRow";
        document.getElementById("keyboardContainer").appendChild(keyboardRowContainer);
    
        for (let j=0; j<keyboardRowKeys.length; j++) {
            // create base button
            let keyLetter = keyboardRowKeys[j];
    
            let btn = document.createElement("button");
            btn.id = "key_"+keyLetter;
            btn.className = "keyboardKey";
            
    
            // special case -> enter
            if (keyLetter == "enter") {
                btn.innerHTML = "ENTER";
                btn.onclick = function() {confirm();};
                
            }
            
            // special case -> backspace
            else if (keyLetter == "backspace") {
                btn.innerHTML = "<--";
                btn.onclick = function() {backspace()};
            }
            
            // general case -> letters
            else {
                btn.innerHTML = keyLetter;
                btn.onclick = function() {typeLetter(keyLetter)};
            }
            
            // append key to keyboard row container
            keyboardRowContainer.appendChild(btn)
        }
    }
}
// type letters
var inputWord = "";
var currentGuess = 0;
// allows inputword to be both updatable and exportable
function typeLetter(letter) {
    if (inputWord.length < wordLength) {
        inputWord += letter;
    }
}

async function confirm() {
    let wordStatus = await checkWord(inputWord);
    if (wordStatus == "proceed") {
        currentGuess += 1;
        inputWord = "";
        //alert("real!");
    }
    else if (wordStatus == "invalid") {
        alert("invalid");
    }
    else if (wordStatus == "insufficient") {
        alert("not enough letters");
    }
}

function backspace() {
    inputWord = inputWord.slice(0, -1);
}