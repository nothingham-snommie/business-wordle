// establish keyboard layout
const keyboardLayout = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["enter","z","x","c","v","b","n","m","backspace"]
]

// create buttons
for (let i=0; i<keyboardLayout.length; i++) {
    let keyboardRowKeys = keyboardLayout[i]; // has the CONTENTS of a singular keyboard row

    // setup keyboard row div
    let keyboardRowContainer = document.createElement("div");
    keyboardRowContainer.id = "keyboardRow"+String(i)
    document.getElementById("keyboardContainer").appendChild(keyboardRowContainer);

    for (let j=0; j<keyboardRowKeys.length; j++) {
        // create base button
        let keyLetter = keyboardRowKeys[j];

        let btn = document.createElement("button");
        btn.id = "key_"+keyLetter;
        //btn.class = "keyboardKey";

        // special case -> enter
        if (keyLetter == "enter") {
            btn.innerHTML = "ENTER";
            btn.onclick = function() {confirm()};
            btn.onmouseover = function() {document.getElementById(btn.id).style.backgroundColor = "red";}; //can't have external func b/c it must refer to a local var (btn)
            btn.onmouseleave = function() {document.getElementById(btn.id).style.backgroundColor = "#4CAF50";};

        }

        // special case -> backspace
        else if (keyLetter == "backspace") {
            btn.innerHTML = "<--";
            btn.onclick = function() {backspace()};
            btn.onmouseover = function() {document.getElementById(btn.id).style.backgroundColor = "red";};
            btn.onmouseleave = function() {document.getElementById(btn.id).style.backgroundColor = "#4CAF50";};
        }

        // general case -> letters
        else {
            btn.innerHTML = keyLetter.toUpperCase();
            btn.onclick = function() {typeLetter(keyLetter)};
            btn.onmouseover = function() {document.getElementById(btn.id).style.backgroundColor = "red";};
            btn.onmouseleave = function() {document.getElementById(btn.id).style.backgroundColor = "#4CAF50";};
        }

        // append key to keyboard row container
        keyboardRowContainer.appendChild(btn)
    }
}


// type letters
var inputWord = "";
var maxInputLen = 5;

function typeLetter(letter) {
    if (inputWord.length < maxInputLen) {
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