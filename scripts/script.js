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
});

nightBtn.addEventListener("click", () => {
    styleSheet.href = "style/night/night.css";
    let logoGifos = document.getElementById("logoImg");
    logoGifos.src = "./assets/gifOF_logo_dark.png";
    let dropdownArrow = document.getElementById("dropdownArrow");
    dropdownArrow.src = "./assets/forward.svg";
});

// HOY TE SUGERIMOS

async function dailySuggested() {

    try {
        // ALMACENAR RANDOM NUMBER EN UN ARRAY Y HACER UN WHILE PARA CHEQUEAR QUE NO ESTE AHI
        for (let i = 0; i < 4; i++) {
            // FETCHING GIF
            let giphy = new Giphy(url, key);
            let suggestedGif = await giphy.gifDailySuggested();
            let data = suggestedGif.data;
            let randomNumber = Math.floor(Math.random() * 27);
            let urlGif = data[randomNumber - i].gif.images.downsized_medium.url;
            let tag = data[randomNumber - i].name_encoded;

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
            close.setAttribute("src", "./assets/button3.svg");
            tagBar.appendChild(hashtag);
            tagBar.appendChild(close);
            tarjeta.appendChild(tagBar);

            // gif
            let gifContainer = document.createElement("div");
            gifContainer.classList.add("sugerenciaGif");
            let gif = document.createElement("img");
            gif.setAttribute("src", urlGif);
            let seeMore = document.createElement("button");
            seeMore.innerText = "Ver más...";
            seeMore.classList.add("seeMoreBtn");
            gifContainer.appendChild(gif);
            gifContainer.appendChild(seeMore);
            tarjeta.appendChild(gifContainer);

            // BOTON SEE MORE y CLOSE
            close.onclick = function () {
                let randomNumber2 = Math.floor(Math.random() * 27);
                let newUrlGif = data[randomNumber2 - i].gif.images.downsized_medium.url;
                let newTag = data[randomNumber2 - i].name_encoded;
                gif.setAttribute("src", newUrlGif);
                hashtag.innerText = "#" + newTag;
            }
            seeMore.onclick = function () {
                let gettingHashtag = hashtag.innerText;
                let term = gettingHashtag.slice(1, gettingHashtag.length);
                searchWord(term);
            }


            let tarjetaContainer = document.getElementById("sugerenciaCard");
            tarjetaContainer.appendChild(tarjeta);

        }
    }
    catch (err) {
        return err;
    }
}

dailySuggested();

// TRENDINGS

async function trending(offset) {
    try {
        // ALMACENAR RANDOM NUMBER EN UN ARRAY Y HACER UN WHILE PARA CHEQUEAR QUE NO ESTE AHI

        for (let i = 0; i < 25; i++) {
            // FETCHING GIF
            let giphy = new Giphy(url, key);
            let trendingGif = await giphy.gifTrendings(offset);
            let data = trendingGif.data;
            let urlGif = data[i].images.downsized_medium.url;

            let height = data[i].images.downsized_medium.height;
            let width = data[i].images.downsized_medium.width;


            //CREANDO TAG
            let originalTitle = data[i].title;

            // Saco al autor
            let splitTitle1 = originalTitle.split("by");
            const removeGif = " GIF ";
            let title1 = splitTitle1[0].replace(removeGif, "");
            let title2 = title1.replace(" GIF", "");

            //   Separando palabras
            let splitTitle2 = title2.split(" ");

            // Agrego hashtag
            let tags = splitTitle2.join(" #");

            let tagBar = document.createElement("p");
            let tagBarContainer = document.createElement("div");
            tagBar.classList.add("gradientBar");
            tagBar.classList.add("gridBar");
            tagBarContainer.classList.add("gridTagsContainer");
            tagBar.innerText = "#" + tags;

            // CREANDO DIVS
            let container = document.getElementById("gifTrendings");
            let miniContainer = document.createElement("div");


            let gif = document.createElement("img");
            gif.setAttribute("src", urlGif);

            miniContainer.appendChild(gif);

            tagBarContainer.appendChild(tagBar);
            miniContainer.appendChild(tagBarContainer);
            container.appendChild(miniContainer);
            tagBar.style.visibility = "hidden";

            if (width / height > 1.40) {
                // GIFS ANCHOS
                miniContainer.classList.add("gridMiniContainerLarge");
                miniContainer.classList.add("gridMiniContainer");
                gif.classList.add("gridGifLarge");
                tagBarContainer.style.width = "592px";

            } else {
                // GIFS CHICOS
                miniContainer.classList.add("gridMiniContainerSmall");
                miniContainer.classList.add("gridMiniContainer");
                gif.classList.add("gridGifSmall");
                tagBarContainer.style.width = "288px";
            };

            // HOVER DEL TAG

            tagBarContainer.addEventListener("mouseover", () => {
                tagBar.style.visibility = "visible";
                miniContainer.classList.add("miniContainerHover");
                tagBarContainer.classList.add("tagBarContainerHover");

            });
            tagBarContainer.addEventListener("mouseout", () => {
                tagBar.style.visibility = "hidden";
                miniContainer.classList.remove("miniContainerHover");
                tagBarContainer.classList.remove("tagBarContainerHover");
            });
        }
    }
    catch (err) {
        return err;
    }
}

trending(0);

// SEARCH

// Seleccionar boton
const searchBtn = document.getElementById('buscarBtn');

// seleccionar input
const searchInput = document.getElementById('textContainer');

// seleccionar search suggestions
const searchSuggestions = document.getElementById('searchSuggestedContainer');

const searchSuggestionsTags = document.getElementById('tagsSuggestedContainer');


// habilitar boton cuando el textarea del input este lleno y desplegar sugerencias de search

searchInput.addEventListener("input", () => {

    let searchWord = searchInput.value;
    let lupita = document.getElementById("lupita");

    if (searchWord !== "") {
        searchBtn.disabled = false;
        searchBtn.classList.replace("buscarBtnInactive", "buscarBtnActive");
        lupita.classList.replace("lupitaInactive", "lupitaActive");

        searchTagsRelated(searchWord);

    } else {
        searchBtn.disabled = true;
        searchBtn.classList.replace("buscarBtnActive", "buscarBtnInactive");
        lupita.classList.replace("lupitaActive", "lupitaInactive");
        searchSuggestions.style.visibility = "hidden";
    }
});

function showSearchResults() {
    let term = searchInput.value;
    searchWord(term);
};

async function searchResultsGrid(term, offset) {
    try {
        let giphy = new Giphy(url, key);
        let searchedGif = await giphy.gifSearch(term, offset);
        let data = searchedGif.data;

        for (let i = 0; i < 25; i++) {
            // FETCHING GIF
            let urlGif = data[i].images.downsized_medium.url;
            let height = data[i].images.downsized_medium.height;
            let width = data[i].images.downsized_medium.width;

            //CREANDO TAG
            let originalTitle = data[i].title;

            // Saco al autor
            let splitTitle1 = originalTitle.split("by");
            const removeGif = " GIF ";
            let title1 = splitTitle1[0].replace(removeGif, "");
            let title2 = title1.replace(" GIF", "");

            //   Separando palabras
            let splitTitle2 = title2.split(" ");

            // Agrego hashtag
            let tags = splitTitle2.join(" #");

            let tagBar = document.createElement("p");
            let tagBarContainer = document.createElement("div");
            tagBar.classList.add("gradientBar");
            tagBar.classList.add("gridBar");
            tagBarContainer.classList.add("gridTagsContainer");
            tagBar.innerText = "#" + tags;


            // CREANDO DIVS

            let container = document.getElementById("gifSearch");
            let miniContainer = document.createElement("div");


            let gif = document.createElement("img");
            gif.setAttribute("src", urlGif);

            miniContainer.appendChild(gif);

            tagBarContainer.appendChild(tagBar);
            miniContainer.appendChild(tagBarContainer);
            container.appendChild(miniContainer);
            tagBar.style.visibility = "hidden";

            if (width / height > 1.40) {
                // GIFS ANCHOS
                miniContainer.classList.add("gridMiniContainerLarge");
                miniContainer.classList.add("gridMiniContainer");
                gif.classList.add("gridGifLarge");
                tagBarContainer.style.width = "592px";

            } else {
                // GIFS CHICOS
                miniContainer.classList.add("gridMiniContainerSmall");
                miniContainer.classList.add("gridMiniContainer");
                gif.classList.add("gridGifSmall");
                tagBarContainer.style.width = "288px";
            };

            searchInput.value = "";

            // HOVER DEL TAG

            tagBarContainer.addEventListener("mouseover", () => {
                tagBar.style.visibility = "visible";
                miniContainer.classList.add("miniContainerHover");
                tagBarContainer.classList.add("tagBarContainerHover");

            });
            tagBarContainer.addEventListener("mouseout", () => {
                tagBar.style.visibility = "hidden";
                miniContainer.classList.remove("miniContainerHover");
                tagBarContainer.classList.remove("tagBarContainerHover");
            });


        }
        searchMoreTagsRelated(term);
        
    }
    catch (err) {
        return err;
    }
}

// sugerencias de busqueda 
async function searchTagsRelated(term) {

    let giphy = new Giphy(url, key);
    let tagsRelated = await giphy.tagsSearch(term);

    searchSuggestions.style.visibility = "visible";
    let liContainer = document.getElementById('searchSuggestedMiniContainer');
    let tagMiniContainer = document.getElementById('tagsSuggestedContainerUl');
    tagMiniContainer.innerText = "";
    liContainer.innerText = "";
    tagMiniContainer.classList.add("tagsSuggestedUl");
    liContainer.classList.add("searchSuggestedUl");
    for (let i = 0; i < 3; i++) {
        let suggestedWord = document.createElement('li');
        let suggestedTagLi = document.createElement('li');
        let searchTags = tagsRelated.data[i].name;
        suggestedWord.innerText = searchTags;
        suggestedTagLi.innerText = "#" + searchTags;
        suggestedWord.classList.add("searchSuggestedContainerLi");
        suggestedTagLi.classList.add("tagsSuggestedContainerLi");

        // FUNCIONALIDAD LI

        suggestedTagLi.onclick = function () {
            let term = searchTags;
            searchWord(term);
        }

        suggestedWord.onclick = function () {
            let term = this.innerText;
            searchWord(term);
        }
        liContainer.appendChild(suggestedWord);
        tagMiniContainer.appendChild(suggestedTagLi);
    }
    searchSuggestionsTags.style.visibility = "hidden";
};

async function searchMoreTagsRelated(term) {

    let giphy = new Giphy(url, key);
    let tagsRelated = await giphy.tagsSearch(term);

    let tagMiniContainer = document.getElementById('tagsSuggestedContainerUl');
    tagMiniContainer.innerText = "";
    
    tagMiniContainer.classList.add("tagsSuggestedUl");
    
    for (let i = 0; i < 3; i++) {
        
        let suggestedTagLi = document.createElement('li');
        let searchTags = tagsRelated.data[i].name;
        
        suggestedTagLi.innerText = "#" + searchTags;
        suggestedTagLi.classList.add("tagsSuggestedContainerLi");

        // FUNCIONALIDAD LI

        suggestedTagLi.onclick = function () {
            let term = searchTags;
            searchWord(term);
        }
        
        tagMiniContainer.appendChild(suggestedTagLi);
    }
    searchSuggestionsTags.style.visibility = "visible";
};

searchBtn.addEventListener("click", showSearchResults);
searchInput.addEventListener("keyup", event => {
    if (window.event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
});

function searchWord(term) {
    // ESCONDIENDO SUGGESTED
    let sugerencias = document.getElementById('sugerenciasContainer');
    sugerencias.style.display = "none";
    // ESCONDIENDO TRENDINGS
    let tendencias = document.getElementById('tendenciasContainer');
    tendencias.style.display = "none";
    // CAMBIAR SUGERENCIA DE BUSQUEDA
    searchSuggestions.style.visibility = "hidden";
    let busqueda = document.getElementById('busquedaContainer');
    // HACER VISIBLE WHITE TITLE CON PALABRA BUSCADA
    busqueda.style.display = "block";
    let searchWhiteBarTitle = document.getElementById('searchWhiteBarTitle');
    searchWhiteBarTitle.innerText = term;
    let gridContainer = document.getElementById('gifSearch');
    // VACIO CONTENIDO ANTERIOR
    gridContainer.innerHTML = "";
    searchResultsGrid(term, 0);
};




// COMENZAR EL CREAR GUIFOS
// HACER LA VERSION DAAAAAARKS
// VER SI AGREGAR EXTRAS NICE TO HAVE
