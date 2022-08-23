document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded - UI");
    createUI();
});

function createUI() {
    let themeList = document.createElement("select");

    for (let i=0; i<themes.length; i++) {
        var option = document.createElement("option");
        option.value = themes[i];
        option.text = themes[i];
        option.onclick = function() {switchTheme(themes[i])};
        themeList.appendChild(option);
    }

    document.getElementById("dropdown").appendChild(themeList);
}

function switchTheme(theme) { // wip
    console.log(theme);
    let root = document.querySelector(":root");

    //root.style.setProperty('--blue', 'lightblue');
}