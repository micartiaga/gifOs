import Recorder from "./recorder.js";

// CREAR GUIFOS BOTONES PASO 1

const cancelarBtn1 = document.getElementById('misGuifosUnoCancelar');
const comenzarBtn = document.getElementById('misGuifosUnoComenzar');
const ventanaInstrucciones = document.getElementById('windowCrearGuifos');

const capturarBtn = document.getElementById('capturarBtn');
const listoBtn = document.getElementById('listoBtn');
const repetirCaptura = document.getElementById('repetirBtn');
const subirGuifo = document.getElementById('subirGuifoBtn');
const cancelarBtn2 = document.getElementById('misGuifosCincoCancelar');
const videoContainer= document.getElementById('videoContainer');



// FUNCIONES CAPTURA VIDEO

const recorder= new Recorder();

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
    videoContainer.style.display="block";

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
    videoContainer.style.display= "none";
    
    recorder.stopRecording();

});

repetirCaptura.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Capturando tu Guifo";
    let ventanaCuatro = document.getElementById('misGuifosCuatro');
    let ventanaDos = document.getElementById('misGuifosDos');
    let ventanaTres= document.getElementById('misGuifosTres');
    ventanaTres.style.display= "none";
    ventanaCuatro.style.display = "none";
    ventanaDos.style.display = "flex";

    let cross = document.getElementById('misGuifosCross');
    cross.style.display = "block";
    videoContainer.style.display="none";

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
    videoContainer.style.display= "none"
});

cancelarBtn2.addEventListener("click", () => {
    showMisGuifos();
})









// async function getStreamAndRecord() {
//     await navigator.mediaDevices.getUserMedia({
//         audio: false,
//         video: {
//             width: { min: 838 },
//             height: { min: 440 }
//         }
//     })

//         .then(function (stream) {
//             let video = document.getElementById('video');
//             video.srcObject = stream;
//             video.play()
//         }
//         )
// };
