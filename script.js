// CAMBIAR TEMA

let count = 0;
const dropdownBtn = document.getElementById("dropdownContainer");
const temasDropdown= document.getElementById("temaDropdown");

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

