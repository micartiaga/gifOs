class Recorder {
    constructor() {
        this.video = document.getElementById('video');
        this.videoGif = document.getElementById('videoGif')
        this.gif = {
            url: '',
            blob: '',
        }

        this.stream = '';
        this.gifRecorder='';
    }
    async getStreamAndPlay() {
        // STREAM
        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: { min: 838 },
                height: { min: 440 }
            }
        })  
        // PLAY
        this.video.srcObject = this.stream;
        console.log(this.stream);
        await this.video.play();

    };
    async startRecording(){
        // RECORD
        this.gifRecorder = await RecordRTC(this.stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            
            onGifRecordingStarted: function() {
                console.log('started')
            },
        }); 

        await this.gifRecorder.startRecording();
        this.gifRecorder.stream = this.stream;
        
    };

    async stopRecording(){
        // STOP
        await this.gifRecorder.stopRecording(async ()=>{
            // GUARDAR GRABACION COMO GIF Y SU URL
            let blob= await this.gifRecorder.getBlob();
            let form = new FormData();
            form.append('file', blob, 'myGif.gif');

            // QUIERO LLORAR ESTO NO SIRVE :(
            // console.log("Este es el file " + form.get('file'));

            this.gif.blob= form;

            let urlCaptura= this.gifRecorder.toURL();
            this.gif.url=urlCaptura;
            console.log("esto es lo que quiero ver como url "+urlCaptura);
            this.videoGif.setAttribute("src", this.gif.url);
            this.video.style.display= "none";
            
            // ESTO SIRVE PERO NO SE POR QUE, ME BORRA TODO

             this.gifRecorder.reset();
             this.gifRecorder.destroy();
        
        }
        );

         this.stream.getTracks().forEach((track) => {
            track.stop();
         });

    }

};

export default Recorder;



// Recorder.GIF TIENE LA URL Y EL Blob
// NECESITO SUBIR ESO COMO UN GIF/form A LA API CON UN POST

// PARA ESO TENGO QUE CREAR UN NUEVO TIPO DE GIPHY PERO CON OTRA URL, LA DE UPLOAD --- upload.giphy.com/v1/gifs/

// PARA QUE NECESITO EL FILE? NI IDEA
// A ESTA INSTANCIA LA BARRA DE PROGRESO Y EL RELOJ SON UN LUJO





// async function uploadGif(){
//     try{
//         const blob = recorder.gif.blob
//         let upload = await upGiphy.uploadGif(blob);
//         const id = upload.data.id

//         return id;    CON ESTO TENGO EL ID DEL GIF PARA BUSCARLO, ASI SU URL Y MOSTRARLO

//     }catch(err){
//         console.log(err)
//     }
// };


// async getGifById(id) {

//     const RES = await fetch(`${this.url}/gifs/${id}?${this.key}`);
//     const myGif = await res.json();
//     return myGif
//  }



