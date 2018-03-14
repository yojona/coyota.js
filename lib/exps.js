function IsOnScreen (object) {
  return (object.x > 0 && object.x < screen.width && object.y > 0 && object.y < screen.height)
}

function ViewportLeft () {
  return 0
}

function ViewportRight () {
  return screen.width
}

function ViewportTop () {
  return 0
}

function ViewportBottom () {
  return screen.height
}

function Clamp (value, min, max) {
  if (value < min) return min
  else if (value > max) return max
  return value
}

function Zeropad (number, amount) {
  if (number >= Math.pow(10, amount)) {
    return String(number)
  }
  return String((Array(amount).join(0) + number).slice(-amount))
}

function Radians (angle) {
  return angle * Math.PI / 180
}

function DrawCollision (object) {
  screen.context.save()
  screen.context.fillStyle = 'rgba(255, 255, 255, 0.5)'
  screen.context.strokeStyle = 'rgba(0, 255, 0, 1)'
  screen.context.beginPath()
  screen.context.globalAlpha = 0.5
  object.draw(screen.context)
  screen.context.fill()
  screen.context.stroke()
  screen.context.restore()
}

function IsOverlapping (source, target) {
  if (source.hasOwnProperty('collider') && target.hasOwnProperty('collider')) {
    return CollisionManager.collides(source.collider, target.collider)
  }
  return false
}

function TakeCapture () {
  return new Promise((resolve, reject) => {
    let dataURL = screen.canvas.toDataURL('image/png')
    let capture = new Image()
    capture.src = dataURL

    capture.onload = () => {
      resolve(capture)
    }
  })
}

function Share (title, text, image) {
  navigator.share({
    title: title,
    text: text,
    url: window.location.origin + '/' + image.id
  })
    .then(() => console.log('Successfully shared'))
    .catch((error) => console.log('Error sharing:', error))
}

export {
  IsOnScreen,
  ViewportLeft,
  ViewportRight,
  ViewportTop,
  ViewportBottom,
  Clamp,
  Zeropad,
  Radians,
  DrawCollision,
  IsOverlapping,
  TakeCapture,
  Share
}
