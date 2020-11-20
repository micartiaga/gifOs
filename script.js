// CAMBIAR TEMA

let count = 0;
const dropdownBtn = document.getElementById("dropdownContainer");
const temasDropdown= document.getElementById("temaDropdown");
const dayBtn= document.getElementById("sailorDayBtn");
const nightBtn= document.getElementById("sailorNightBtn");
const styleSheet= document.getElementById("themeStylesheet");

// Desplegar dropdown

dropdownBtn.addEventListener("click", () => {
    if(count%2==0){
        temasDropdown.style.visibility="visible";
    }else{
        temasDropdown.style.visibility="hidden";
    }
    count++
});

// Cambiar dia/noche

dayBtn.addEventListener("click", () =>{
    styleSheet.href= "style/day/day.css";
    let logoGifos= document.getElementById("logoImg");
    logoGifos.src= "./assets/gifOF_logo.png";
    let dropdownArrow= document.getElementById("dropdownArrow");
    dropdownArrow.src= "./assets/dropdown.svg";
})

nightBtn.addEventListener("click", () =>{
    styleSheet.href= "style/night/night.css";
    let logoGifos= document.getElementById("logoImg");
    logoGifos.src= "./assets/gifOF_logo_dark.png";
    let dropdownArrow= document.getElementById("dropdownArrow");
    dropdownArrow.src= "./assets/forward.svg";
});