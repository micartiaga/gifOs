// CAMBIAR TEMA

let count = 0;
const dropdownBtn = document.getElementById("dropdownContainer");
const temasDropdown = document.getElementById("temaDropdown");
const dayBtn = document.getElementById("sailorDayBtn");
const nightBtn = document.getElementById("sailorNightBtn");
const styleSheet = document.getElementById("themeStylesheet");
let themeStorage = localStorage.getItem('theme');

// CHEQUEO SI EXISTE EL VALOR EN EL LOCAL Storage, SINO LO CREO
if (!localStorage.theme) {
    localStorage.setItem('theme', 'Day')
};

// HOJA DE ESTILO CORRESPONDIENTE AL VALOR
if (themeStorage=='Day'){
    day();
}else{
    night();
};


// Desplegar dropdown

dropdownBtn.addEventListener("click", () => {
    if (count % 2 == 0) {
        temasDropdown.style.visibility = "visible";
    } else {
        temasDropdown.style.visibility = "hidden";
    }
    count++
});

// BOTONES DEL DROPDOWN

dayBtn.addEventListener("click", day);

nightBtn.addEventListener("click", night);

// TEMAS

function night(){
    styleSheet.href = "style/night/night.css";
    let logoGifos = document.getElementById("logoImg");
    logoGifos.src = "./assets/gifOF_logo_dark.png";
    let dropdownArrow = document.getElementById("dropdownArrow");
    dropdownArrow.src = "./assets/forward.svg";
    localStorage.setItem('theme', 'Night');
    console.log(themeStorage);
};

function day(){
    styleSheet.href = "style/day/day.css";
    let logoGifos = document.getElementById("logoImg");
    logoGifos.src = "./assets/gifOF_logo.png";
    let dropdownArrow = document.getElementById("dropdownArrow");
    dropdownArrow.src = "./assets/dropdown.svg";
    localStorage.setItem('theme', 'Day');
    console.log(themeStorage);
}