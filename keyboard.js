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

// Create Keyboard
function createKeyboard() {
    keyboardLayout.forEach(element => createKeyboardRow(element));
}

function createKeyboardRow(element) {
    // initialise properties
    let rowContents = element;
    let keyboardRow = document.createElement("div");
    keyboardRow.className = "keyboardRow";
    keyboardRow.id = "keyboardRow_"+String(element);

    rowContents.forEach(element => createKeyboardKey(element, keyboardRow));

    // append
    document.getElementById("keyboardContainer").appendChild(keyboardRow);
}

function createKeyboardKey(element, parent) {
    // initialise properties
    let keyboardKey = document.createElement("button");
    keyboardKey.className = "keyboardKey";
    keyboardKey.id = "keyboardKey_"+element;

    function applyButtonFunction(buttonAct) {
        if (detectMobile==true) {
            // tapppp
            console.log("This appears to be a mobile device.");
            keyboardKey.addEventListener("touchstart", function() {buttonAct(element)});
            //keyboardKey.ontouchstart = function() {buttonAct(element)};
        }
        else {
            console.log("This appears to NOT be a mobile device.");
            keyboardKey.addEventListener("click", function() {buttonAct(element)});
            //keyboardKey.onclick = function() {buttonAct(element)};
        }
    }

    keyboardKey.innerHTML = element;

    if (element == "enter") {
        applyButtonFunction(confirm);
    }
    else if (element == "backspace") {
        keyboardKey.innerHTML = "⌫";
        applyButtonFunction(backspace);
    }
    else { // general case --> letters
        applyButtonFunction(typeLetter);
    }

    // append
    parent.appendChild(keyboardKey);
    
}

// Game Functions
var inputWord = "";
var currentGuess = 0;

async function confirm() {
    if (gameState == "playing") { // ensure these buttons don't work when the game is over
        if (inputWord.length == wordLength) {
            if (!validWords.includes(inputWord)) { // check if word in word list
                console.log("not in word list");
                gameState = "playing";
                return;
            }
            await checkWord();
            if (currentGuess < (maxGuesses-1)) { // id of the sixth guess is 5 rember !!!
                
                if (gameState == "playing") {
                    // go to new row
                    currentGuess += 1;
                    inputWord = "";
                }
                updateBoard();
            }
            else {
                gameState = "lose";
                console.log("lose");
            }
        }
        else {
            console.log("not enough letters");
        }   
    }
}

async function backspace() {
    if (gameState == "playing") {
        inputWord = inputWord.slice(0, -1);
        updateBoard();
    }
}

async function typeLetter(letter) {
    if (gameState == "playing") {
        if (inputWord.length < wordLength) {
            inputWord += letter;
            updateBoard();
        }
    }
}

// Detect Mobile
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
