document.getElementsByClassName("tablink")[0].click();

function openFunction(evt, inputType) {
    var i, x, tablinks;
    x = document.getElementsByClassName("input-type");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].classList.remove("light-grey");
    }
    document.getElementById(inputType).style.display = "block";
    evt.currentTarget.classList.add("light-grey");
}