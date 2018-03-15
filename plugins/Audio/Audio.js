export default class Audio {
  constructor (src, loop) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    this.source = this.audioCtx.createBufferSource()
    this.request = new window.XMLHttpRequest()
  
    this.request.open('GET', src, true)
  
    this.request.responseType = 'arraybuffer'
  
    this.request.onload = () => {
      var audioData = this.request.response
  
      this.audioCtx.decodeAudioData(audioData, (buffer) => {
        let myBuffer = buffer
        this.source.buffer = myBuffer
        this.source.connect(this.audioCtx.destination)
        this.source.loop = loop
      },
  
      function (e) {
        console.log('Error with decoding audio data' + e.err)
      })
    }

    this.request.send()
  }
  play () {
    this.source.start(0)
  }

  getVolume () {
    return this.volume
  }

  setVolume (vol) {
    this.volume = vol
    this.music.volume = Clamp((vol / 100), 0, 1)
  }
}
