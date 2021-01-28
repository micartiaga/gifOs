class Recorder {
    constructor() {
        this.video = document.getElementById('video');
        this.videoPlay = document.getElementById('videoPlay');
        this.videoGif = document.getElementById('videoGif')
        this.gif = {
            url: '',
            blob: '',
        }

        this.stream = '';
        this.gifRecorder = '';
        this.startTime = 0;
        this.finishTime = 0;
        this.videoRecorder = '';
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
        await this.video.play();

    };
    async startRecording() {
        // RECORD
        this.gifRecorder = await RecordRTC(this.stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,

            onGifRecordingStarted: function () {
                console.log('started')
            },
        })
        this.videoRecorder = await RecordRTC(this.stream, {
            type: 'video',
            quality: 10,
            mimeType: "video/webm; codecs=vp8",
            frameRate: 30,
        });


        await this.gifRecorder.startRecording();
        await this.videoRecorder.startRecording();

        this.videoRecorder.stream = this.stream;
        this.gifRecorder.stream = this.stream;

        this.startTime = new Date();
    };

    async stopRecording() {
        this.finishTime = new Date();

        // STOP
        await this.gifRecorder.stopRecording(async () => {
            // GUARDAR GRABACION COMO GIF Y SU URL
            let blob = await this.gifRecorder.getBlob();
            let form = new FormData();
            form.append('file', blob, 'myGif.gif');
            this.gif.blob = form;
            
            let urlCaptura = this.gifRecorder.toURL();
            this.gif.url = urlCaptura;

            this.gifRecorder.reset();
            this.gifRecorder.destroy();
        }
        );

        await this.videoRecorder.stopRecording( async()=> {
            let videoBlob = this.videoRecorder.getBlob();
            this.videoPlay.src = URL.createObjectURL(videoBlob);
            this.videoPlay.load();           
            this.videoRecorder.reset();
            this.videoRecorder.destroy();
            this.videoPlay.srcObject = null;
        })

        this.stream.getTracks().forEach((track) => {
            track.stop();
        });
    }
};

export default Recorder;


