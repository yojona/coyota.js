import { ViewportLeft, ViewportTop, ViewportRight, ViewportBottom } from '../../lib/exps.js'

export default class Bound {
    constructor () {
        this.inst = null
        this.boundLeft = true
        this.boundTop = true
        this.boundRight = true
        this.boundBottom = true
    }

    always () {
        if (this.inst.x < ViewportLeft() && this.boundLeft) {
            this.inst.x = ViewportLeft()
        } else if (this.inst.x > ViewportRight() && this.boundRight) {
            this.inst.x = ViewportRight()
        } else if (this.inst.y > ViewportBottom() && this.boundBottom) {
            this.inst.y = ViewportBottom()
        } else if (this.inst.y < ViewportTop() && this.boundTop) {
        }
    }
}