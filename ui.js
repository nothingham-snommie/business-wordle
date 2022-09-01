document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded - UI");
    createUI();
});

function createUI() {
    createThemeSelect();
    createWordSelect();
    switchTheme(getCookie("theme"));
}

function createThemeSelect() {
    let themeList = document.createElement("select");

    for (let i=0; i<themes.length; i++) {
        let option = document.createElement("option");
        option.value = themes[i].name;
        option.text = themes[i].name;
        option.onclick = function() {
            //switchTheme(themes[i]);
            setCookie("theme", i, 30);
            location.reload();
        };
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
        option.onclick = function() {
            setCookie("wordLength", option.value, 30);
            location.reload();
        };

        wordLenList.appendChild(option);
    }

    document.getElementById("wordLen").appendChild(wordLenList);
}

let root = document.querySelector(":root");
function switchTheme(theme) { // the pure jank :skull:
    let themeContents = themes[theme];

    for (let key in themeContents) {
        if (key != "name") {
            console.log(key + ' is ' + themeContents[key])
            root.style.setProperty("--"+key, themeContents[key]);
        }
    };
}

// COOKIES
// w3schools my beloved
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
};
