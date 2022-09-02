document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded - UI");
    createUI();
    // no cookies?
    if (wordLength == "") {
        setDefaultCookies();
        location.reload();
    };
});

function createUI() {
    createThemeSelect();
    createWordSelect();
    switchTheme(getCookie("theme"));
};

function createThemeSelect() {
    let themeSelect = document.createElement("select");

    for (let i=0; i<themeList.length; i++) {
        let option = document.createElement("option");
        option.value = themeList[i].name;
        option.text = themeList[i].name;
        option.onclick = function() {
            setCookie("theme", i, 30);
            location.reload();
        };
        themeSelect.appendChild(option);
    };

    document.getElementById("dropdown").appendChild(themeSelect);
};

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
    };

    document.getElementById("wordLen").appendChild(wordLenList);
};

let root = document.querySelector(":root");
function switchTheme(themeID) { // the pure jank :skull:
    let themeContents = themeList[themeID];

    for (let key in themeContents) {
        if (key != "name") {
            //console.log(key + ' is ' + themeContents[key])
            root.style.setProperty("--"+key, themeContents[key]);
        };
    };
};

// COOKIES
// w3schools my beloved
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
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

function setDefaultCookies() {
    setCookie("wordLength", 5, 30);
    setCookie("theme", 0, 30);
};