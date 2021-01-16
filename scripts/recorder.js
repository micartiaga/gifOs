class Recorder {
    constructor() {
        this.video = document.getElementById('video');
        this.gif = {
            url: '',
            blob: '',
        }

        this.stream = '';
        this.vidRecorder = '';
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
        
    }

    async stopRecording(){
        // STOP
        await this.gifRecorder.stopRecording(()=>{
            // GUARDAR GRABACION COMO GIF Y SU URL
            let blob= this.gifRecorder.getBlob();
            let form = new FormData();
            form.append('file', blob, 'myGif.gif');
            console.log(form.get('file'));
            this.gif.blob= form;
            
        
        }
        );

    }

};

export default Recorder;