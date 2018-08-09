export default class Animation {
  constructor (texture, from, to, speed) {
    this.texture = texture
    this.firstFrame = from
    this.currentFrame = from
    this.lastFrame = to
    this.frames = (to - from) + 1 || 1
    this.speed = Clamp(speed, 0, 60) | 0
    this.tick = 0
    this._isPlaying = false
    this._isLoop = true
  }

  draw (drawAnimation) {
    if (this._isPlaying && this.speed > 0) {
      this.tick += this.speed

      if (this.tick > fps) {
        if (this.currentFrame < this.lastFrame) {
          this.currentFrame++
        } else if (this._isLoop) {
          this.currentFrame = this.firstFrame
        }
        this.resetTickCount()
      }
    }
    drawAnimation()
  }

  play () {
    this._isPlaying = true
  }

  stop () {
    this._isPlaying = false
  }

  resetTickCount () {
    this.tick = 0
  }

  setLoop (loop) {
    this._isLoop = loop
  }
}
