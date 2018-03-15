export default class Sound {
  constructor (a) {
    this.music = new Audio(a)
    this.volume = 100
  }
  play () {
    this.music.play()
  }

  getVolume () {
    return this.volume
  }

  setVolume (vol) {
    this.volume = vol
    this.music.volume = Clamp((vol / 100), 0, 1)
  }

  setLoop (bool) {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    let source
    let songLength
    let request

    source = audioCtx.createBufferSource()
    request = new XMLHttpRequest()
    request.open('GET', './assets/naranja.mp3', true)
    request.responseType = 'arraybuffer'

    request.onload = () => {
      let audioData = request.response

      audioCtx.decodeAudioData(audioData, (buffer) => {
        let myBuffer = buffer
        songLength = buffer.duration
        source.buffer = myBuffer
        source.connect(audioCtx.destination)
        source.loop = bool
      }
      )
    }
    request.send()
  }
}
