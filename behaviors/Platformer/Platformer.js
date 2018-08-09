export default class Platformer {
  constructor () {
    this.inst = null
    this.speed = 0
    this.maxSpeed = 100
    this.acceleration = 1000
    this.deceleration = 1000

    this.direction = null

    this.isMoving = false
    this.onFloor = false
    this.isJumping = false
    this.isFalling = false

    this.vectorY = 0
    this.fallSpeed = 0

    this.jumpPower = 320
    this.gravity = 1000
    this.maxFallSpeed = 1000
  }

  moveLeft () {
    this.isMoving = true
    this.direction = 'left'
  }

  moveRight () {
    this.isMoving = true
    this.direction = 'right'
  }

  jump () {
    this.onFloor = false

    if (!this.isJumping) {
      this.vectorY -= this.jumpPower
      this.isJumping = true
    }
  }

  always () {
    if (this.direction === 'left' && this.speed > -this.maxSpeed) {
      this.speed = this.speed - this.acceleration * dt
    } else if (this.direction === 'right' && this.speed < this.maxSpeed) {
      this.speed = this.speed + this.acceleration * dt
    } else {
      if (this.speed > this.deceleration * dt) {
        this.speed = this.speed - this.deceleration * dt
      } else if (this.speed < -this.deceleration * dt) {
        this.speed = this.speed + this.deceleration * dt
      } else {
        this.speed = 0
      }
    }

    // Move horizontally
    this.inst.x = this.inst.x + this.speed * dt

    // Reset direction
    this.direction = ''

    // Gravity
    this.vectorY = this.vectorY < this.maxFallSpeed ? this.vectorY += this.gravity * dt : this.maxFallSpeed
    this.inst.y += this.vectorY * dt

    // Ground Collision
    let potentials = this.inst.collider.potentials()

    for (let wall of potentials) {
      if (this.inst.collider.collides(wall, CollisionResult) && wall.solid) {
        this.isMoving = false

        if (CollisionResult.overlap_x < 0 || CollisionResult.overlap_x > 0) {
          this.speed = 0
        }

        if (CollisionResult.overlap_y < 0) {
          this.vectorY = 0
        }

        if (CollisionResult.overlap_y > 0) {
          this.vectorY = 0
          this.isJumping = false
          this.onFloor = true
          this.vectorY = 0
        }

        this.inst.x -= CollisionResult.overlap * CollisionResult.overlap_x
        this.inst.y -= CollisionResult.overlap * CollisionResult.overlap_y
      }
    }
  }

  isOnFloor () {
    return this.onFloor
  }
}
