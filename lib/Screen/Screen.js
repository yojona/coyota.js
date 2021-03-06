export default class Screen {
  create (width, height) {
    this.init()

    this.width = width
    this.height = height

    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext('2d')
    this.backgroundColor = 'black'

    this.clear()
  }

  init () {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
  }

  setFullscreen (bol) {
    if (bol) {
      this.canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    } else {
      document.webkitCancelFullScreen()
    }
  }

  toggleFullscreen () {
    this.establecerPantallaCompleta(!document.webkitIsFullScreen)
  }

  clear () {
    this.context.clearRect(0, 0, this.width, this.height)
    this.setBackgroundColor(this.backgroundColor)
  }

  setBackgroundColor (color) {
    this.backgroundColor = color
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, this.width, this.height)
  }

  setSmoothSampling (sampling) {
    this.context.imageSmoothingEnabled = sampling
  }

  drawRect (x, y, width, height, color) {
    this.context.fillStyle = color
    this.context.fillRect(x, y, width, height)
  }

  drawCircle (x, y, r, color) {
    this.context.beginPath()
    this.context.fillStyle = color
    this.context.arc(x, y, r, 0, 2 * Math.PI)
    this.context.fill()
  }
}
