document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded - UI");
    createUI();
});

function createUI() {
    createThemeSelect();
    createWordSelect();
}

function createThemeSelect() {
    let themeList = document.createElement("select");

    for (let i=0; i<themes.length; i++) {
        let option = document.createElement("option");
        option.value = themes[i].name;
        option.text = themes[i].name;
        option.onclick = function() {switchTheme(themes[i])};
        themeList.appendChild(option);
    }

    document.getElementById("dropdown").appendChild(themeList);
}

function createWordSelect() {
    let wordLenList = document.createElement("select");

    for (let i=0; i<businessWords.length; i++) {
        let option = document.createElement("option");
        option.value = businessWords[i].wordLen;
        option.text = businessWords[i].wordLen;
        option.onclick = function() {wordLength = option.value};

        wordLenList.appendChild(option);
    }

    document.getElementById("wordLen").appendChild(wordLenList);
}

let root = document.querySelector(":root");
function switchTheme(theme) { // wip
    console.log(theme.name);
    
    for (let key in theme) {
        if (key != "name") {
            console.log(key + ' is ' + theme[key])
            root.style.setProperty("--"+key, theme[key]);
        }
    }
}