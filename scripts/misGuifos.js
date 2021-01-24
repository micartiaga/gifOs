import Recorder from "./recorder.js";
import Giphy from "./giphy.js";

const key = "jkB76Z9RX3InY7Jduntvx3IS5q1b2oFb";
const urlUp = "https://upload.giphy.com/v1";

const recorder = new Recorder();
const upGiphy = new Giphy(urlUp, key);

if (!localStorage.misGuifos) {
    localStorage.setItem('misGuifos', "[]")
};

async function misGuifosGrid() {

    const arrayStorage = localStorage.getItem('misGuifos');
    let array = JSON.parse(arrayStorage);

    let misGuifosContainer = document.getElementById('misGuifosContainer');

    for (let gifo of array) {

        let myGif = await upGiphy.getGifById(gifo);

        let url = await myGif.data.images.downsized_medium.url;
        let height = await myGif.data.images.downsized_medium.height;
        let width = await myGif.data.images.downsized_medium.width;

        let gif = document.createElement('img');
        gif.setAttribute("src", url);
        gif.classList.add('gridMiniContainer');

        if (width > height) {
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
const listoBtn2= document.getElementById('misGuifosSeisListo');
const copyUrl= document.getElementById('copiarUrlBtn');




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

    let blob = recorder.gif.blob;
    subiendoGif(blob);

});

async function subiendoGif(blob) {
    let myGif = await upGiphy.uploadGif(blob);
    let id = await upGiphy.getGifById(myGif);
let urlCopy= await id.data.url;
    console.log(id);
    console.log(urlCopy);
    exitoMisGuifos(id, urlCopy);
};

function exitoMisGuifos(id, urlCopy) {
    // CAMBIAR DE DIV AL ULTIMO Y SU TITULO
    let ventanaCinco = document.getElementById('misGuifosCinco');
    ventanaCinco.style.display = "none";
    let ventanaSeis = document.getElementById('misGuifosSeis');
    ventanaSeis.style.display = "block";
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Guifo Subido Con Éxito";
    ventanaInstrucciones.style.height = "391px";
    ventanaInstrucciones.style.width = "721px";
    
    // AGREGAR URL DEL GIF
    let miniGif= document.getElementById('exitoGif');
    let urlGif= id.data.images.downsized_medium.url;
    miniGif.setAttribute("src", urlGif);
    
    copyUrl.addEventListener("click", ()=>{
    console.log(urlCopy);
    let textarea= document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value= urlCopy;
        textarea.select();
        document.execCommand('copy');
        textarea.style.display= "none";
        document.body.removeChild(textarea);
        alert('Enlace copiado en el portapapeles' + urlCopy); 
    });
};





cancelarBtn2.addEventListener("click", () => {
    showMisGuifos();
})

listoBtn2.addEventListener("click", ()=>{
    showMisGuifos();
} );








//COPIAR URL EN PORTAPAPELES
// HACER BARRA PROGRESO Y RELOJ
// VER COMO DESCARGAR GIF
// HOVER DE BOTONES
// VOLVER A LA HOME Y CAMBIAR EL THEME



