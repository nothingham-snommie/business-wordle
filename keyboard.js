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
        keyboardRowContainer.id = "keyboardRow"+String(i);
        keyboardRowContainer.className = "keyboardRow";
        document.getElementById("keyboardContainer").appendChild(keyboardRowContainer);
    
        for (let j=0; j<keyboardRowKeys.length; j++) {
            // create base button
            let keyLetter = keyboardRowKeys[j];
    
            let btn = document.createElement("button");
            btn.id = "key_"+keyLetter;
            btn.className = "keyboardKey_normal";

            function applyButtonResponse(buttonAct, letter) { // letter param for typeLetter() and nothing else
                if (detectMobile() == true) {
                    btn.ontouchstart = function() {changeButtonStatus("pressed", btn);};
                    btn.ontouchend = function() {buttonAct(letter);changeButtonStatus("normal", btn)};
                    btn.ontouchcancel = function() {changeButtonStatus("normal", btn)};
                }
                else {
                    btn.onclick = function() {buttonAct(letter)};
                    btn.onmouseover = function() {changeButtonStatus("hover", btn)};
                    btn.onmousedown = function() {changeButtonStatus("pressed", btn)};
                    btn.onmouseleave = function() {changeButtonStatus("normal", btn)};
                    btn.onmouseup = function() {changeButtonStatus("normal", btn)};
                }
            }
    
            // special case -> enter
            if (keyLetter == "enter") {
                btn.innerHTML = "enter";
                applyButtonResponse(confirm);

            }
            
            // special case -> backspace
            else if (keyLetter == "backspace") {
                btn.innerHTML = "<--";
                applyButtonResponse(backspace);
            }
            
            // general case -> letters
            else {
                btn.innerHTML = keyLetter;
                applyButtonResponse(typeLetter, keyLetter);
            }
            
            // append key to keyboard row container
            keyboardRowContainer.appendChild(btn);
        }
    }
}

function changeButtonStatus(buttonStatus, obj) {
    obj.className = "keyboardKey_"+buttonStatus;
}

// type letters
var inputWord = "";
var currentGuess = 0;

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
    }
}

function backspace() {
    inputWord = inputWord.slice(0, -1);
}

function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}