// establish keyboard layout
const keyboardLayout = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["enter","z","x","c","v","b","n","m","backspace"]
]

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded");
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
                btn.onmouseover = function() {hoverReact(btn.id, "green");};
                btn.onmousedown = function() {hoverReact(btn.id, "darkgreen");};
                btn.onmouseleave = function() {hoverReact(btn.id, "lightgrey");};
                btn.onmouseup = function() {hoverReact(btn.id, "lightgrey");};
                
    
            }
    
            // special case -> backspace
            else if (keyLetter == "backspace") {
                btn.innerHTML = "<--";
                btn.onclick = function() {backspace()};
                btn.onmouseover = function() {hoverReact(btn.id, "red");};
                btn.onmousedown = function() {hoverReact(btn.id, "darkred");};
                btn.onmouseleave = function() {hoverReact(btn.id, "lightgrey");};
                btn.onmouseup = function() {hoverReact(btn.id, "lightgrey");};
            }
    
            // general case -> letters
            else {
                btn.innerHTML = keyLetter;
                btn.onclick = function() {typeLetter(keyLetter)};
                btn.onmouseover = function() {hoverReact(btn.id, "darkgrey");};
                btn.onmousedown = function() {hoverReact(btn.id, "grey");};
                btn.onmouseleave = function() {hoverReact(btn.id, "lightgrey");};
                btn.onmouseup = function() {hoverReact(btn.id, "lightgrey");};
            }
    
            // append key to keyboard row container
            keyboardRowContainer.appendChild(btn)
        }
    }
}

// change button colour on hover
function hoverReact(id, hoverColour) {
    document.getElementById(id).style.backgroundColor = hoverColour;
}

// type letters
var inputWord = "";
var wordLength = 5;

function typeLetter(letter) {
    if (inputWord.length < wordLength) {
        inputWord += letter;
    }
    document.getElementById("disp").innerHTML = inputWord;
}

function confirm() {
    inputWord = ""
    document.getElementById("disp").innerHTML = inputWord;
}

function backspace() {
    inputWord = inputWord.slice(0, -1);
    document.getElementById("disp").innerHTML = inputWord;
}