"use strict";

/* ------- Music player ------- */

/* Opens music player and enlarges the image */
function openPlayer() {
    document.getElementById("musicPlayer").style.bottom="0px";
    document.getElementById("musicPlayer2").style.bottom="0px";
    document.getElementById("musicPlayer").style.cursor="default";
    document.getElementById("downIcon").style.display="inline-block";
    document.getElementById("downIcon").style.color="#6C7689";
    document.getElementById("imgIcon").style.width="160px";
}

function closePlayer() {
    document.getElementById("musicPlayer").style.bottom="-160px";
    document.getElementById("musicPlayer2").style.bottom="-160px";
    document.getElementById("musicPlayer").style.cursor="pointer";
    document.getElementById("downIcon").style.display="none";
    document.getElementById("downIcon").style.color="transparent";
    document.getElementById("imgIcon").style.width="40px";
}



/* -------- Popup information --------- */

document.getElementById("info").onclick = function openPopup() {
    if (document.getElementById("popupInfo").style.display != "none")
    {
        document.getElementById("popupInfo").style.display = "none";
        document.getElementById("triangle").style.display = "none";
    }
    else {
        document.getElementById("popupInfo").style.display = "block";
        document.getElementById("triangle").style.display = "block";
    }
}

/* -------- Music page -------- */

function openTab(evt,tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablink" and remove the class "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* ------- MUSIC page ------- */

let _tracks = [];

// fetch data from the artists json file

async function fetchData2() {
    const response = await fetch('json/music.json');
    const data = await response.json();
    _tracks = data;
    console.log(_tracks);
    appendTracks(_tracks);
}

fetchData2();

//append tracks to the DOM

function appendTracks(tracks) {
    let htmlTemplate = "";
    for (let track of tracks) {
        htmlTemplate += /*html*/`
        <article onclick="showDetailedPage(${track.id})">
        <img src="${track.img_url}">
        <h4>${track.title}</h4>
        <h5>${track.artist}</h5>
        <p>Genre: ${track.genre}</p>
        <p>BPM: ${track.BPM}</p>
        </article>
    `;
    }
    document.querySelector('#gridTracks').innerHTML = htmlTemplate;
}


/* ------- ARTISTS page ------- */

let _artists = [];
let _genres = [];
let _country = [];

// fetch data from the artists json file

async function fetchData() {
    const response = await fetch('json/artists.json');
    const data = await response.json();
    _artists = data;
    console.log(_artists);
    appendArtists(_artists);

    const genres = _artists.map(artist => artist.genre);
    console.log(genres);

    _genres = [...new Set(genres)]
    console.log(_genres);
    appendGenres(_genres);

    const country = _artists.map(artist => artist.country);
    console.log(country);

    _country = [...new Set(country)]
    console.log(_country);
    appendCountry(_country);
}

fetchData();

//append artists to the DOM

function appendArtists(artists) {
    let htmlTemplate = "";
    for (let artist of artists) {
        htmlTemplate += /*html*/`
        <article onclick="showDetailedPage(${artist.id})">
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

// ask Rasmus why this doesn't work

// append all genres and countries as select options (dropdown)

function appendGenres(genres) {
    let htmlTemplate = "";
    for (let genre of genres) {
        htmlTemplate += /*html*/`
        <option value="${genre}">${genre}</option>
    `;
    }
    document.querySelector('#sortByGenre').innerHTML += htmlTemplate;
}

function appendCountry(countries) {
    let htmlTemplate = "";
    for (let country of countries) {
        htmlTemplate += /*html*/`
        <option value="${country}">${country}</option>
    `;
    }
    document.querySelector('#sortByCountry').innerHTML += htmlTemplate;
}

// filter artists by selected genre

function filterByGenre(genre) {
    const results = _artists.filter(artist => artist.genre === genre);
    appendArtists(results);
}

// filter artists by selected country

function filterByCountry(country) {
    const results = _artists.filter(artist => artist.country === country);
    appendArtists(results);
}

// append artists by genre

function appendArtistsByGenre(artistsByGenre) {
    let htmlTemplate = "";
    for (let artist of artistsByGenre) {
        htmlTemplate += /*html*/       `
        <article>
        <img src="${artist.img_url}">
        <h4>${artist.name}</h4>
        <p>Genre: ${artist.genre}</p>
        <p>Country: ${artist.country}</p>
        </article>
    `;
    }
    // if no genres, display feedback to the user
    if (artistsByGenre.length === 0) {
        htmlTemplate = /*html*/      `
        <p>No artists</p>
    `;
    }
    document.querySelector('#artists-by-genre-container').innerHTML = htmlTemplate;
} 

/* ------- Detailed artist page ------- */

function showDetailedPage(id) {
    const artistToShow = _artists.find(artist => artist.id === id);
    navigateTo("detailed-page");
    document.querySelector("#detailed-page-container").innerHTML = /*html*/`
        <article>
        <img src ="${artistToShow.img_url}">
        <h2>${artistToShow.name}</h2>
        <h3>${artistToShow.genre}</h3>
        <h4>${artistToShow.country}</h4>
        </article>
    `;
}