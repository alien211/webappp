"use strict";

function openPlayer() {
    document.getElementById("musicPlayer").style.bottom="0px";
    document.getElementById("musicPlayer").style.cursor="default";
    document.getElementById("downIcon").style.display="inline-block";
}

/*document.getElementById("downIcon").onclick = function() {closePlayer()}*/

function closePlayer() {
    alert("Hello");
    document.getElementById("musicPlayer").style.bottom="-160px";
    document.getElementById("downIcon").style.display="none";
}