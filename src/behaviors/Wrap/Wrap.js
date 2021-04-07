import { ViewportLeft, ViewportRight, ViewportBottom, ViewportTop } from '../../lib/exps.js'

export default class Wrap {
  constructor() {
    this.inst = null
    this.horizontalWrap = true
    this.verticalWrap = true
  }

  setHorizontalWrap(bool) {
    this.horizontalWrap = bool
  }

  setVerticalWrap(bool) {
    this.verticalWrap = bool
  }

  always() {
    const drawX = (this.inst._x - this.inst.scaledOriginX * this.inst._scaleX) * this.inst._scaleX
    const drawY = (this.inst._y - this.inst.scaledOriginY * this.inst._scaleY) * this.inst._scaleY

    const x1 = ((drawX % screen.width) + screen.width) % screen.width;
    const y1 = ((drawY % screen.height) + screen.height) % screen.height;
    const x2 = (x1 + this.inst.frameWidth);
    const y2 = (y1 + this.inst.frameHeight);

    this.inst.appendDraw = () => {

      if (this.horizontalWrap && x2 > screen.width) {
          screen.context.drawImage(
            this.inst._currentAnimation.texture,
            this.inst._currentAnimation.currentFrame * this.inst.frameWidth,
            0,
            this.inst.frameWidth,
            this.inst.frameHeight,
            x1 - screen.width,
            drawY,
            this.inst.width,
            this.inst.height
          )

        if (this.verticalWrap && y2 > screen.height) {
          screen.context.drawImage(
            this.inst._currentAnimation.texture,
            this.inst._currentAnimation.currentFrame * this.inst.frameWidth,
            0,
            this.inst.frameWidth,
            this.inst.frameHeight,
            x1 - screen.width,
            y1 - screen.height,
            this.inst.width,
            this.inst.height
          )
        }

      }

      if (this.verticalWrap && y2 > screen.height) {
        screen.context.drawImage(
          this.inst._currentAnimation.texture,
          this.inst._currentAnimation.currentFrame * this.inst.frameWidth,
          0,
          this.inst.frameWidth,
          this.inst.frameHeight,
          drawX,
          y1 - screen.height,
          this.inst.width,
          this.inst.height
        )
      }
    }

    if (this.verticalWrap) {
      if (this.inst.y > ViewportBottom()) {
        this.inst.y = ViewportTop()
      } else if (this.inst.y < ViewportTop()) {
        this.inst.y = ViewportBottom()
      }
    }

    if (this.horizontalWrap) {
      if (this.inst.x > ViewportRight()) {
        this.inst.x = ViewportLeft()
      } else if (this.inst.x < ViewportLeft()) {
        this.inst.x = ViewportRight()
      }
    }
  }
}