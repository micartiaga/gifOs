// CREAR GUIFOS BOTONES PASO 1

const cancelarBtn1=document.getElementById('misGuifosUnoCancelar');
const comenzarBtn= document.getElementById('misGuifosUnoComenzar');
const ventanaInstrucciones=document.getElementById('windowCrearGuifos');
const ventanaTitulo= document.getElementById('windowTitle');
const capturarBtn= document.getElementById('capturarBtn');
const listoBtn= document.getElementById('listoBtn');
const repetirCaptura= document.getElementById('repetirBtn');
const subirGuifo= document.getElementById('subirGuifoBtn');
const cancelarBtn2= document.getElementById('misGuifosCincoCancelar');

// CREAR GUIFOS PASO 1

cancelarBtn1.addEventListener("click", ()=>{
    showMisGuifos();
});

function showMisGuifos(){
    window.location.href= 'misGuifos.html'
}

comenzarBtn.addEventListener("click",()=>{
    let cross= document.getElementById('misGuifosCross');
    let ventanaUno= document.getElementById('misGuifosUno');
    let ventanaDos= document.getElementById('misGuifosDos');
    let misGuifos= document.getElementById('misGuifos');
    let titulo=document.querySelector("#windowTitle p")
    titulo.innerText= "Un Chequeo Antes de Empezar";
    cross.style.display="block";
    ventanaUno.style.display="none";
    ventanaDos.style.display="flex";
    misGuifos.style.display="none";

    ventanaInstrucciones.style.height= "548px";
    ventanaInstrucciones.style.width= "860px";

    cross.addEventListener("click", ()=>{
        showMisGuifos();
    });
});

capturarBtn.addEventListener("click",()=>{
    let titulo=document.querySelector("#windowTitle p")
    titulo.innerText= "Capturando tu Guifo";
    let ventanaDos= document.getElementById('misGuifosDos');
    let ventanaTres= document.getElementById('misGuifosTres');
    ventanaDos.style.display= "none";
    ventanaTres.style.display= "flex";



});

listoBtn.addEventListener("click",()=>{
    let titulo=document.querySelector("#windowTitle p")
    titulo.innerText= "Vista Previa";
    let ventanaTres= document.getElementById('misGuifosTres');
    let ventanaCuatro= document.getElementById('misGuifosCuatro');
    ventanaTres.style.display= "none";
    ventanaCuatro.style.display= "flex";
   
    let cross= document.getElementById('misGuifosCross');
    cross.style.display="none";

});

repetirCaptura.addEventListener("click",()=>{
    let titulo=document.querySelector("#windowTitle p")
    titulo.innerText= "Capturando tu Guifo";
    let ventanaCuatro= document.getElementById('misGuifosCuatro');
    let ventanaTres= document.getElementById('misGuifosTres'); 
    ventanaCuatro.style.display= "none";
    ventanaTres.style.display= "flex";

    let cross= document.getElementById('misGuifosCross');
    cross.style.display="block";

    
});

subirGuifo.addEventListener("click", ()=>{
    let titulo=document.querySelector("#windowTitle p")
    titulo.innerText= "Subiendo Guifo";
    let ventanaCinco= document.getElementById('misGuifosCinco');
    let ventanaCuatro= document.getElementById('misGuifosCuatro');
    ventanaCuatro.style.display= "none";
    ventanaCinco.style.display= "flex";

    let cross= document.getElementById('misGuifosCross');
    cross.style.display="block";
});

cancelarBtn2.addEventListener("click",()=>{
    showMisGuifos();
})


