import Giphy from "./giphy.js";

const key = "jkB76Z9RX3InY7Jduntvx3IS5q1b2oFb";
const url = "https://api.giphy.com/v1";

console.log("holis");

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
    
    try {
// ALMACENAR RANDOM NUMBER EN UN ARRAY Y HACER UN WHILE PARA CHEQUEAR QUE NO ESTE AHI 
        for (let i=0; i<4; i++) {
            // FETCHING GIF
            let giphy = new Giphy(url, key);
            let suggestedGif = await giphy.gifDailySuggested();
            let data = suggestedGif.data;
            let randomNumber = Math.floor(Math.random() *27);
            let urlGif = data[randomNumber-i].gif.images.downsized_medium.url;
            let tag = data[randomNumber-i].name_encoded;
            
            
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
            gif.setAttribute ("src",urlGif);
            let seeMore = document.createElement("button");
            seeMore.innerText = "Ver más...";
            seeMore.classList.add("seeMoreBtn");
            gifContainer.appendChild(gif);
            gifContainer.appendChild(seeMore);
            tarjeta.appendChild(gifContainer);
            
            
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
        
        for (let i=0; i<25; i++) {
            // FETCHING GIF
            let giphy = new Giphy(url, key);
            let trendingGif = await giphy.gifTrendings(offset);
            let data = trendingGif.data;
            console.log(data);
            let urlGif = data[i].gif.images.downsized_medium.url;


            let height= data[i].gif.images.downsized_medium.height;
            let width= data[i].gif.images.downsized_medium.width;
            
            //CREANDO TAG
            
            let originalTitle = data[i].gif.title;
            console.log(originalTitle);
            const removeBy= " by ";
            const removeGif= " GIF by ";
            let title = originalTitle.replace(removeGif, " ");
            let title2 = title.replace(removeBy, "");
            let splitTitle = title2.split(" ");
            let tags = splitTitle.join(" #");

            

            let tagBar = document.createElement("div");
            let tagBarContainer= document.createElement("div");
            tagBar.classList.add("gradientBar");
            tagBar.classList.add("gridBar");
            tagBarContainer.classList.add("gridTagsContainer");
            tagBar.innerText= "#" + tags;
            
            
            
            // CREANDO DIVS
            
            let container = document.getElementById("gifTrendings");
            let miniContainer= document.createElement("div");
            miniContainer.classList.add("trendings");
            
            let gif = document.createElement("img");
            gif.setAttribute ("src",urlGif);
            
            miniContainer.appendChild(gif);
            
            container.appendChild(miniContainer);
            tagBarContainer.appendChild(tagBar);
            miniContainer.appendChild(tagBarContainer);
            
            if (width/height >1.40){
                // GIFS ANCHOS
                miniContainer.classList.add("gridMiniContainerLarge"); 
                miniContainer.classList.add("gridMiniContainer"); 
                gif.classList.add("gridGifLarge");
                
                
            }else{
                // GIFS CHICOS
                miniContainer.classList.add("gridMiniContainerSmall"); 
                miniContainer.classList.add("gridMiniContainer"); 
                gif.classList.add("gridGifSmall");
            
            };
            
        }
    }
    catch (err) {
        return err;
    }
}

trending(0);