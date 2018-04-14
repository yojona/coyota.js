import { ViewportLeft, ViewportRight, ViewportBottom, ViewportTop } from '../../lib/exps.js'

export default class Wrap {
    constructor () {
        this.inst = null
        this.horizontalWrap = true
        this.verticalWrap = true
    }

    setHorizontalWrap (bool) {
        this.horizontalWrap = bool
    }

    setVerticalWrap (bool) {
        this.verticalWrap = bool
    }

    always () {

        // Vertical Wrap
        if (this.verticalWrap) {
            if (this.inst.y > ViewportBottom()) {
                this.inst.y = ViewportTop()
            } else if (this.inst.y < ViewportTop()) {
                this.inst.y = ViewportBottom()
            }
        }

        // Horizontal Wrap
        if (this.horizontalWrap) {
            if (this.inst.x > ViewportRight()) {
                this.inst.x = ViewportLeft()
            } else if (this.inst.x < ViewportLeft()) {
                this.inst.x = ViewportRight()
            }
        }
    }
}