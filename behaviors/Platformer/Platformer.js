export default class Platformer {
  constructor () {
    this.inst = null
    this.vectorX = 0
    this.maxSpeed = 100
    this.acceleration = 1000
    this.deceleration = 1000

    this.direction = null

    this.moving = false
    this.jumping = false
    this.falling = false

    this.onFloor = false

    this.vectorY = 0
    this.fallSpeed = 0

    this.jumpPower = 320
    this.gravity = 1000
    this.maxFallSpeed = 500

    this.onJump = false

  }

  isMoving () {
    return this.vectorX != 0 || this.vectorY != 0
  }

  isFalling () {
    return this.vectorY > 0
  }

  isJumping () {
    return this.vectorY < 0
  }

  isOnFloor () {
    return this.onFloor
  }

  moveLeft () {
    this.moving = true
    this.direction = 'left'
  }

  moveRight () {
    this.moving = true
    this.direction = 'right'
  }

  jump () {
    this.onFloor = false

    if (!this.jumping) {
      this.vectorY -= this.jumpPower
      this.jumping = true
    }
  }

  always () {

    if (this.direction === 'left' && this.vectorX > -this.maxSpeed) {
      this.vectorX = this.vectorX - this.acceleration * dt
    } else if (this.direction === 'right' && this.vectorX < this.maxSpeed) {
      this.vectorX = this.vectorX + this.acceleration * dt
    } else {
      if (this.vectorX > this.deceleration * dt) {
        this.vectorX = this.vectorX - this.deceleration * dt
      } else if (this.vectorX < -this.deceleration * dt) {
        this.vectorX = this.vectorX + this.deceleration * dt
      } else {
        this.vectorX = 0
      }
    }

    // Move horizontally
    this.inst.x = this.inst.x + this.vectorX * dt

    // Reset direction
    this.direction = ''


    // Gravity
    this.vectorY = this.vectorY < this.maxFallSpeed ? this.vectorY += this.gravity * dt : this.maxFallSpeed
    this.inst.y += this.vectorY * dt
    
    // Ground Collision
    let potentials = this.inst.collider.potentials()

    for (let wall of potentials) {
      if (this.inst.collider.collides(wall, CollisionResult) && wall.solid) {
        this.moving = false

        if (CollisionResult.overlap_x < 0 || CollisionResult.overlap_x > 0) {
          this.vectorX = 0
        }

        if (CollisionResult.overlap_y < 0) {
          this.vectorY = 0
        }

        if (CollisionResult.overlap_y > 0) {
          this.vectorY = 0
          this.jumping = false
          this.onFloor = true
          this.vectorY = 0
        }

        this.inst.x -= CollisionResult.overlap * CollisionResult.overlap_x
        this.inst.y -= CollisionResult.overlap * CollisionResult.overlap_y
      }
    }
  }
}
