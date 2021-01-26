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

            this.gif.blob= form;

            let urlCaptura= this.gifRecorder.toURL();
            this.gif.url=urlCaptura;
            console.log("esto es lo que quiero ver como url "+urlCaptura);
            this.videoGif.setAttribute("src", this.gif.url);
            this.video.style.display= "none";
            
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


