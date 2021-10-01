"use strict";

/* ------- Music player ------- */

/* Opens music player and enlarges the image */
function openPlayer() {
    document.getElementById("musicPlayer").style.bottom="0px";
    document.getElementById("musicPlayer").style.cursor="default";
    document.getElementById("downIcon").style.display="inline-block";
    document.getElementById("imgIcon").style.width="160px";
}

/*function closePlayer() {
    document.getElementById("musicPlayer").style.bottom="-160px";
    document.getElementById("musicPlayer").style.cursor="pointer";
    document.getElementById("downIcon").style.display="none";
    document.getElementById("imgIcon").style.width="40px";
}*/



/* -------- Popup information --------- */

/*function openPopup() {
    document.getElementById("popupInfo").style.display="block";
}*/


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

//append artists

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

// sorting functions

function orderBy(option) {
    if (option === "name") {
      orderByName();
    } else if (option === "genre") {
      orderByGenre();
    } else if (option === "country") {
      orderByCountry();
    }
  }

function orderByName() {
    _artists.sort((artist1, artist2) => {
        return artist1.name.localeCompare(artist2.name);
    });
    appendArtists(_artists);
}

function orderByGenre() {
    _artists.sort((artist1, artist2) => {
        return artist1.genre.localeCompare(artist2.name);
    });
    appendArtists(_artists);
}

/* ask Rasmus why this doesn't work

// fetch all genres from JSON

async function getGenres() {
    let response = await fetch("json/artists.json");
    let data = await response.json();
    console.log(data);
    appendGenres(data);
}

getGenres();

// append all genres as select options (dropdown)

function appendGenres(genres) {
    let htmlTemplate = "";
    for (let genre of genres) {
        htmlTemplate += /*html*/      /*`
        <option value="${genre.id}">${genre.genre}</option>
    `;
    }
    document.querySelector('#sortByGenre').innerHTML += htmlTemplate;
}

// fetch artists by selected genre

async function genreSelected(genreId) {
    if (genreId) {
        let response = await fetch("json/artists.json")
        let data = await response.json();
        appendArtistsByGenre(data);
    }
}

// append artists by genre

function appendArtistsByGenre(artistsByGenre) {
    let htmlTemplate = "";
    for (let artist of artistsByGenre) {
        htmlTemplate += /*html*/       /*`
        <article>
        <img src="${artist.img_url}">
        <h4>${artist.name}</h4>
        <p>Genre: ${artist.genre}</p>
        <p>Country: ${artist.country}</p>
        </article>
    `;
    }
    // if no movies, display feedback to the user
    if (artistsByGenre.length === 0) {
        htmlTemplate = /*html*/      /*`
        <p>No artists</p>
    `;
    }
    document.querySelector('#artists-by-genre-container').innerHTML = htmlTemplate;
}  */