export default class Platformer {
  constructor () {
    this.inst = null
    this.speed = 0
    this.maxSpeed = 50
    this.acceleration = 100
    this.deceleration = 200

    this.direction = null
  }

  moveLeft () {
    this.direction = 'left'
  }

  moveRight () {
    this.direction = 'right'
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
    this.inst.x = this.inst.x + this.speed * dt

    this.direction = null
  }
}
