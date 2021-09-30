"use strict";

function openPlayer() {
    document.getElementById("musicPlayer").style.bottom="0px";
    document.getElementById("musicPlayer").style.cursor="default";
    document.getElementById("downIcon").style.display="inline-block";
    document.getElementById("imgIcon").style.width="160px";
}

/*document.getElementById("downIcon").onclick = function() {closePlayer()}*/

function closePlayer() {
    alert("Hello");
    document.getElementById("musicPlayer").style.bottom="-160px";
    document.getElementById("downIcon").style.display="none";
}

/* ------- Artists page ------- */

let _artists = [];

// fetch data from the artists json file

async function fetchData() {
    const response = await fetch('json/artists.json');
    const data = await response.json();
    _artists = data;
    console.log(_artists);
    appendArtists(_artists);
    showLoader(false);
}

fetchData();

function appendArtists(artists) {
    let htmlTemplate = "";
    for (let artist of artists) {
        htmlTemplate += /*html*/`
        <article>
        <img src="${artist.img_url}">
        <h4>${artist.name}</h4>
        <p>Genre: ${artist.genre}</p>
        <p>Country: ${artist.country}</p>
        </article>
    `;
    }
    document.querySelector('#gridArtists').innerHTML = htmlTemplate;
}