import CoyotaObject from '../../lib/CoyotaObject/CoyotaObject.js'
import {Polygon} from '../../lib/Collisions/Collisions.js'

export default class Background extends CoyotaObject {
  constructor (source, x, y, width, height) {
    super()

    if (source instanceof HTMLImageElement) {
      this.texture = source
    } else {
      var tmpImage = new Image()
      tmpImage.src = source
      this.texture = tmpImage
    }

    this.width = width
    this.height = height
    this.angle = 0
    this._x = x
    this._y = y

    this.repeat = 'repeat'

    this.scrollX = 0
    this.scrollY = 0

    this.dscrollX = 0
    this.dscrollY = 0

    this.collider = new Polygon(this._x, this._y, [[0, 0], [this.width, 0], [this.width, this.height], [0, this.height]])

    CollisionManager.insert(this.collider)
  }

  setRepeat (repeat) {
    this.repeat = repeat
  }

  setAngle (angle) {
    this.angle = angle

    if (this.collider) {
      this.collider.angle = Radians(angle)
    }
  }

  draw () {
    let pattern = screen.context.createPattern(this.texture, this.repeat)

    screen.context.save()

    screen.context.fillStyle = pattern
    screen.context.translate(this._x + this.dscrollX, this._y + this.dscrollY)
    screen.context.rotate(Radians(this.angle))
    screen.context.fillRect(0 - this.dscrollX, 0 - this.dscrollY, this.width, this.height)

    screen.context.restore()

    this.dscrollX = this.dscrollX + (this.scrollX * dt)
    this.dscrollY = this.dscrollY + (this.scrollY * dt)
    this.update()
  }
}
