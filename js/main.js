"use strict";

/* -------- Popup information --------- */ /* Made by: Nikola */

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

/* -------- Music page -------- */ /* Made by: Nikola */

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

/* ------- MUSIC page ------- */ /* Made by: Nikola */

/* ------- Tracks section ------- */

let _tracks = [];
let _BPMs = [];
let _types = [];

// fetch data from the music json file

async function fetchData2() {
    const response = await fetch('json/music.json');
    const data = await response.json();
    _tracks = data;
    console.log(_tracks);
    appendTracks(_tracks);

    // for BPM

    const BPMs = _tracks.map(track => track.BPM);
    console.log(BPMs);

    _types = [...new Set(BPMs)]
    console.log(_BPMs);
    appendBPMs(_BPMs);

    // type/types = genre/genres here

    const types = _tracks.map(track => track.genre);
    console.log(types);

    _types = [...new Set(types)]
    console.log(_types);
    appendGenres2(_types);
}

fetchData2();

//append tracks to the DOM

function appendTracks(tracks) {
    let htmlTemplate = "";
    for (let track of tracks) {
        htmlTemplate += /*html*/`
        <article onclick="showSong(${track.id})">
        <img src="${track.img_url}">
        <span id="heart" class="material-icons md-40 heart" style="margin-left: -60px; top: -195px;">favorite</span>
        <h4>${track.title}</h4>
        <h5>${track.artist}</h5>
        <p>Genre: ${track.genre}</p>
        <p>BPM: ${track.BPM}</p>
        </article>
    `;
    }
    document.querySelector('#gridTracks').innerHTML = htmlTemplate;
    document.querySelector('#gridTracks2').innerHTML = htmlTemplate;
}

// sorting functions

function orderBy2(option) {
    if (option === "title") {
      orderByTitle();
    } else if (option === "BPM") {
      orderByBPM();
    } else if (option === "genre") {
      orderByGenre();
    }
  }

function orderByTitle() {
    _tracks.sort((title1, title2) => {
        return title1.title.localeCompare(title2.title);
    });
    appendTracks(_tracks);
}

function orderByBPM() {
    _tracks.sort((track1, track2) => {
        return track1.BPM.localeCompare(track2.title);
    });
    appendTracks(_tracks);
}

// append all BPMs and genres as select options (dropdown)

function appendBPMs(BPMs) {
    let htmlTemplate = "";
    for (let BPM of BPMs) {
        htmlTemplate += /*html*/`
        <option value="${BPM}">${BPM}</option>
    `;
    }
    document.querySelector('#sortByBPM').innerHTML += htmlTemplate;
}

function appendGenres2(genres) {
    let htmlTemplate = "";
    for (let genre of genres) {
        htmlTemplate += /*html*/`
        <option value="${genre}">${genre}</option>
    `;
    }
    document.querySelector('#sortByGenre2').innerHTML += htmlTemplate;
}

// filter tracks by selected BPM

function orderByBPM(BPM) {
    const results = _tracks.filter(track => track.BPM === BPM);
    appendTracks(results);
}

// filter tracks by selected genre

function filterByGenre2(genre) {
    const results = _tracks.filter(track => track.genre === genre);
    appendTracks(results);
}

// append tracks by genre

function appendTracksByGenre(tracksByGenre) {
    let htmlTemplate = "";
    for (let track of tracksByGenre) {
        htmlTemplate += /*html*/       `
        <article>
        <img src="${track.img_url}">
        <h4>${track.title}</h4>
        <p>Genre: ${track.genre}</p>
        <p>BPM: ${track.BPM}</p>
        </article>
    `;
    }
    // if no genres, display feedback to the user
    if (tracksByGenre.length === 0) {
        htmlTemplate = /*html*/      `
        <p>No tracks</p>
    `;
    }
    document.querySelector('#tracks-by-genre-container').innerHTML = htmlTemplate;
}

function showSong(id) {
    const trackToPlay = _tracks.find(track => track.id === id);
    document.querySelector("#musicPlayer").innerHTML = /*html*/`
        <img id="imgIcon" src ="${trackToPlay.img_url}">
        <div id="smallTxt" style="color: white; margin-top: 4px; margin-left: 16px; float: left; "><h3 style="display:inline; float: left;">${trackToPlay.title}</h3> <br> <h5 style="display:inline; float: left;">${trackToPlay.artist}</h5></div>
        
        <article id="bigTxt" style="color: white; margin-top: 64px; display: absolute; right: 0;">
            <h2>${trackToPlay.title}</h2>
            <h3>${trackToPlay.artist}</h3>
            <p>${trackToPlay.genre} - ${trackToPlay.subgenre}<br>
            ${trackToPlay.BPM} BPM</p>
        </article>
        <iframe id="API" src="${trackToPlay.spotify_api}" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    `;
}

document.getElementById("playBtn").addEventListener("click", function play(event){
	fetch("https://open.spotify.com/embed/track/2bDe4PKld6qpRUZS9Gki14",
    {
        method: 'PUT',
        dataType: 'json',
        body: JSON.stringify({
            "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
            "offset": {
              "position": 5
            },
            "position_ms": 0
          })
    })
});

/* ------- Music player ------- */ /* Made by: Nikola */

/* Opens music player and enlarges the image */
function openPlayer() {
    document.getElementById("musicPlayer").style.bottom="40px";
    document.getElementById("musicPlayer2").style.bottom="40px";
    document.getElementById("musicPlayer").style.cursor="default";
    document.getElementById("downIcon").style.display="inline-block";
    document.getElementById("downIcon").style.color="#6C7689";
    document.getElementById("imgIcon").style.width="160px";
    document.getElementById("smallTxt").style.display="none";
    document.getElementById("bigTxt").style.display="block";
    document.getElementById("API").style.display="block";
}

function closePlayer() {
    document.getElementById("musicPlayer").style.bottom="-160px";
    document.getElementById("musicPlayer2").style.bottom="-160px";
    document.getElementById("musicPlayer").style.cursor="pointer";
    document.getElementById("downIcon").style.display="none";

    document.getElementById("downIcon").style.color="transparent";
    document.getElementById("imgIcon").style.width="40px";
    document.getElementById("smallTxt").style.display="block";
    document.getElementById("bigTxt").style.display="none";
    document.getElementById("API").style.display="none";
}


/* ------- ARTISTS page ------- */ /* Made by: Marcell */

let _artists = [];
let _genres = [];
let _country = [];

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


    const genres = _artists.map(artist => artist.genre);
    console.log(genres);

    _genres = [...new Set(genres)]
    console.log(_genres);
    appendGenres(_genres);

    const country = _artists.map(artist => artist.country);
    console.log(country);

    _country = [...new Set(country)]
    console.log(_country);

    showLoader(false);
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


/* ------- Detailed artist page ------- */  /* Made by: Marcell */

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
    document.querySelector('#gridArtists').innerHTML = htmlTemplate;
}