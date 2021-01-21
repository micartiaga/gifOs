import Recorder from "./recorder.js";
import Giphy from "./giphy.js";

const key = "jkB76Z9RX3InY7Jduntvx3IS5q1b2oFb";
const urlUp = "https://upload.giphy.com/v1";

const recorder = new Recorder();
const upGiphy = new Giphy(urlUp, key);

if (!localStorage.misGuifos) {
    localStorage.setItem('misGuifos', "[]")
};

async function misGuifosGrid(){

    const arrayStorage =  localStorage.getItem('misGuifos');
    let  array = JSON.parse(arrayStorage);

    let misGuifosContainer = document.getElementById('misGuifosContainer');

    for (let gifo of array){

        let myGif= await upGiphy.getGifById(gifo);
        
        let url= await myGif.data.images.downsized_medium.url;
        let height= await myGif.data.images.downsized_medium.height;
        let width= await myGif.data.images.downsized_medium.width;

        let gif= document.createElement('img');
        gif.setAttribute("src", url);
        gif.classList.add('gridMiniContainer');
        
        if (width>height){
            gif.classList.add('gridMiniContainerLarge');
        } else {
            gif.classList.add('gridMiniContainerSmall');
        }
        misGuifosContainer.appendChild(gif);
        
    }

};

misGuifosGrid();



// CREAR GUIFOS BOTONES PASO 1

const cancelarBtn1 = document.getElementById('misGuifosUnoCancelar');
const comenzarBtn = document.getElementById('misGuifosUnoComenzar');
const ventanaInstrucciones = document.getElementById('windowCrearGuifos');

const capturarBtn = document.getElementById('capturarBtn');
const listoBtn = document.getElementById('listoBtn');
const repetirCaptura = document.getElementById('repetirBtn');
const subirGuifo = document.getElementById('subirGuifoBtn');
const cancelarBtn2 = document.getElementById('misGuifosCincoCancelar');
const videoContainer = document.getElementById('videoContainer');





// BOTONES

cancelarBtn1.addEventListener("click", () => {
    showMisGuifos();
});

function showMisGuifos() {
    window.location.href = 'misGuifos.html'
}

comenzarBtn.addEventListener("click", () => {
    let cross = document.getElementById('misGuifosCross');
    let ventanaUno = document.getElementById('misGuifosUno');
    let ventanaDos = document.getElementById('misGuifosDos');
    let misGuifos = document.getElementById('misGuifos');
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Un Chequeo Antes de Empezar";
    cross.style.display = "block";
    ventanaUno.style.display = "none";
    ventanaDos.style.display = "flex";
    misGuifos.style.display = "none";
    videoContainer.style.display = "block";

    ventanaInstrucciones.style.height = "548px";
    ventanaInstrucciones.style.width = "860px";

    cross.addEventListener("click", () => {
        showMisGuifos();
    });

    recorder.getStreamAndPlay();

});

capturarBtn.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Capturando tu Guifo";
    let ventanaDos = document.getElementById('misGuifosDos');
    let ventanaTres = document.getElementById('misGuifosTres');
    ventanaDos.style.display = "none";
    ventanaTres.style.display = "flex";


    recorder.startRecording();



});

listoBtn.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Vista Previa";
    let ventanaTres = document.getElementById('misGuifosTres');
    let ventanaCuatro = document.getElementById('misGuifosCuatro');
    ventanaTres.style.display = "none";
    ventanaCuatro.style.display = "flex";

    let cross = document.getElementById('misGuifosCross');
    cross.style.display = "none";
    videoContainer.style.display = "none";

    recorder.stopRecording();

});

repetirCaptura.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Capturando tu Guifo";
    let ventanaCuatro = document.getElementById('misGuifosCuatro');
    let ventanaDos = document.getElementById('misGuifosDos');
    let ventanaTres = document.getElementById('misGuifosTres');
    ventanaTres.style.display = "none";
    ventanaCuatro.style.display = "none";
    ventanaDos.style.display = "flex";

    let video = document.getElementById('video');
    let cross = document.getElementById('misGuifosCross');
    cross.style.display = "block";
    videoContainer.style.display = "block";
    video.style.display = "block";

    recorder.getStreamAndPlay();


});

subirGuifo.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Subiendo Guifo";
    let ventanaCinco = document.getElementById('misGuifosCinco');
    let ventanaCuatro = document.getElementById('misGuifosCuatro');
    ventanaCuatro.style.display = "none";
    ventanaCinco.style.display = "flex";

    let cross = document.getElementById('misGuifosCross');
    cross.style.display = "block";
    videoContainer.style.display = "none"

    let myGif = upGiphy.uploadGif(recorder.gif.blob);
    let id=  upGiphy.getGifById(myGif);

    console.log('este es el gif ' + myGif + 'y el id es ' + id);



});


cancelarBtn2.addEventListener("click", () => {
    showMisGuifos();
})





// HACER QUE APAREZCA LA ULTIMA PARTE DE LA SUBIDA CON BOTON DESCARGA Y DEMAS
// HACER GRID DE MIS GUIFOS
// VOLVER A LA HOME Y CAMBIAR EL THEME
// AGREGAR LINK A MISGUIFOS DE LA HOME


