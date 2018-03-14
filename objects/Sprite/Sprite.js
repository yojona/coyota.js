import CoyotaObject from '../../lib/CoyotaObject/CoyotaObject.js'
import {Polygon, Circle} from '../../lib/Collisions/Collisions.js'
import Animation from './Animation.js'

export default class Sprite extends CoyotaObject {
  constructor (image, x, y, frameWidth, frameHeight, ox, oy) {
    super()
    this._x = x | 0
    this._y = y | 0
    this.originX = ox | 0
    this.originY = oy | 0
    this.scaledOriginX = ox | 0
    this.scaledOriginY = oy | 0
    this.angle = 0
    this.opacity = 1
    this._mirrored = false
    this._flipped = false
    this._scaleX = 1
    this._scaleY = 1

    if (image instanceof HTMLImageElement) {
      this.texture = image
    } else {
      var tmpImage = new Image()
      tmpImage.src = image
      this.texture = tmpImage
    }
    this.frameWidth = frameWidth || 0
    this.frameHeight = frameHeight || 0
    this.width = frameWidth || this.texture.naturalWidth
    this.height = frameHeight || this.texture.naturalHeight
    this.collider = new Polygon(this._x, this._y, [[0 - this.originX, 0 - this.originY], [this.width - this.originX, 0 - this.originY], [this.width - this.originX, this.height - this.originY], [0 - this.originX, this.height - this.originY]])

    this.animations = {
      // Load resources before call OnStart function
      // "Default"       : new Animation(this.texture, this.texture.naturalWidth / frameWidth, 8)
      //                              Texture,    From,   To,     Speed
      'Default': new Animation(this.texture, 0, 0, 8)
    }

    this._currentAnimation = this.animations.Default

    // Insert body to ColisionManager
    CollisionManager.insert(this.collider)
  }

  set x (nx) {
    this._x = nx
    if (this.collider) {
      this.collider.x = nx
    }
  }

  set y (ny) {
    this._y = ny
    if (this.collider) {
      this.collider.y = ny
    }
  }

  get x () {
    return this._x
  }

  get y () {
    return this._y
  }

  setCollider (body) {
    this.collider = body
  }

  setLocation (nx, ny) {
    this._x = nx
    this._y = ny

    if (this.collider) {
      this.collider.x = nx
      this.collider.y = ny
    }
  }

  setSize (width, height) {
    let hscale = width / this.frameWidth
    let vscale = height / this.frameHeight

    this.width = width
    this.height = height

    this.scaledOriginX = this.originX * hscale
    this.scaledOriginY = this.originY * vscale

    this.collider.scale_x = hscale
    this.collider.scale_y = vscale
  }

  setOrigin (ox, oy) {
    this.originX = ox
    this.originY = oy
  }

  setAngle (angle) {
    this.angle = angle

    if (this.collider) {
      this.collider.angle = Radians(angle)
    }
  }

  setOpacity (opacity) {
    this.opacity = Clamp(opacity, 0, 1)
  }

  setMirrored (bool) {
    this._mirrored = bool
    this._scaleX = bool ? -1: 1
  }

  setFlipped (bool) {
    this._flipped = bool
    this._scaleY = bool ? -1: 1
  }

  draw () {
    this._currentAnimation.draw(() => {
      let drawX = (this._x - this.scaledOriginX * this._scaleX) * this._scaleX
      let drawY = (this._y - this.scaledOriginY * this._scaleY) * this._scaleY

      let translateX = this._x
      let translateY = this._y

      screen.context.save()
      screen.context.globalAlpha = this.opacity
      screen.context.translate(translateX, translateY)
      screen.context.rotate(Radians(this.angle))
      screen.context.translate(-translateX, -translateY)
      screen.context.scale(this._scaleX, this._scaleY)
      // screen.context.drawImage(this._currentAnimation.texture, this._currentAnimation.currentFrame * this.width, 0, this.width, this.height, drawX, drawY, this.width, this.height)
      screen.context.drawImage(this._currentAnimation.texture, this._currentAnimation.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, drawX, drawY, this.width, this.height)
      screen.context.restore()
      this.update()
    })
  }

  drawCollision () {
    DrawCollision(this.collider)
  }

  addAnimation (animations) {
    for (let anim in animations) {
      this.animations[anim] = animations[anim]
    }
  }

  setAnimation (animationName) {
    this._currentAnimation = this.animations[animationName]
    return this._currentAnimation
  }

  getCurrentAnimation () {
    return this._currentAnimation
  }

  getAnimation (animationName) {
    return this.animations[animationName]
  }

  compareFrame (frame) {
    return this.getCurrentAnimation().currentFrame == frame
  }

  drawOrigin () {
    screen.context.save()
    screen.context.fillStyle = 'red'
    screen.context.fillRect(this._x - 1, this._y - 1, 4, 4)
    screen.context.restore()
  }
}
