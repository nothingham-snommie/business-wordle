document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded - UI");
    createUI();
});

function createUI() {
    let themeList = document.createElement("select");

    for (let i=0; i<themes.length; i++) {
        var option = document.createElement("option");
        option.value = themes[i].name;
        option.text = themes[i].name;
        option.onclick = function() {switchTheme(themes[i])};
        themeList.appendChild(option);
    }

    document.getElementById("dropdown").appendChild(themeList);
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