import Giphy from "./giphy.js";

const key = "jkB76Z9RX3InY7Jduntvx3IS5q1b2oFb";
const url = "https://api.giphy.com/v1";


// CAMBIAR TEMA

let count = 0;
const dropdownBtn = document.getElementById("dropdownContainer");
const temasDropdown = document.getElementById("temaDropdown");
const dayBtn = document.getElementById("sailorDayBtn");
const nightBtn = document.getElementById("sailorNightBtn");
const styleSheet = document.getElementById("themeStylesheet");

// Desplegar dropdown

dropdownBtn.addEventListener("click", () => {
    if (count % 2 == 0) {
        temasDropdown.style.visibility = "visible";
    } else {
        temasDropdown.style.visibility = "hidden";
    }
    count++
});

// Cambiar dia/noche

dayBtn.addEventListener("click", () => {
    styleSheet.href = "style/day/day.css";
    let logoGifos = document.getElementById("logoImg");
    logoGifos.src = "./assets/gifOF_logo.png";
    let dropdownArrow = document.getElementById("dropdownArrow");
    dropdownArrow.src = "./assets/dropdown.svg";
})

nightBtn.addEventListener("click", () => {
    styleSheet.href = "style/night/night.css";
    let logoGifos = document.getElementById("logoImg");
    logoGifos.src = "./assets/gifOF_logo_dark.png";
    let dropdownArrow = document.getElementById("dropdownArrow");
    dropdownArrow.src = "./assets/forward.svg";
});

// HOY TE SUGERIMOS

async function dailySuggested() {
    let count2 = 0;
    debugger;

    try {
        if (count2 < 5) {
            // FETCHING GIF
            let giphy = new Giphy(url, key);
            let SuggestedGif = await giphy.gifDailySuggested();
            let data = SuggestedGif.data;
            let randomNumber = Math.floor(Math.random() * data.lenght);
            let urlGif = data.randomNumber.gif.image.downsized_medium.url;
            let tag = data.randomNumber.name_encoded;


            // CREANDO DIVS

            let tarjeta = document.createElement("div");
            tarjeta.classList.add("miniContainerSugerencias");

            // barra

            let tagBar = document.createElement("div");
            tagBar.classList.add("miniBarSugerencias");
            tagBar.classList.add("gradientBar");
            let hashtag = document.createElement("p");
            hashtag.innerText = "#" + tag;
            let close = document.createElement("img");
            close.setAttribute.src = "./asstes/button3.svg";
            tagBar.appendChild(hashtag);
            tagBar.appendChild(close);
            tarjeta.appendChild(tagBar);

            // gif
            let gifContainer = document.createElement("div");
            gifContainer.classList.add("sugerenciaGif");
            let gif = document.createElement("img");
            gif.setAttribute.src(urlGif);
            let seeMore = document.createElement("button");
            seeMore.innerText = "Ver más...";
            seeMore.classList.add("seeMoreBtn");
            gifContainer.appendChild(gif);
            gifContainer.appendChild(seeMore);
            tarjeta.appendChild(gifContainer);

            let tarjetaContainer=document.getElementById("sugerenciaCard");
            tarjetaContainer.appendChild(tarjeta);

            // SUMO 1 PARA LLEGAR A 4
            count++
        }
    }
    catch (err) {
        return err;
    }
}

dailySuggested();