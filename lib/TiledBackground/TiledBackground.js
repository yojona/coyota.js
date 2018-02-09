import CoyotaObject from '../CoyotaObject/CoyotaObject.js';
import {Polygon} from '../Collisions/Collisions.js'

export default class TiledBackground extends CoyotaObject{
    constructor(source, x, y, width, height){
        super()
        
        if(source instanceof HTMLImageElement){
            this.texture    = source
        }
        else{
            var tmpImage    = new Image()
            tmpImage.src    = source
            this.texture    = tmpImage
        }

        this.width      = width
        this.height     = height
        this.angle      = 0
        this._x         = x
        this._y         = y
        this.collider   = new Polygon(this._x, this._y, [[0, 0], [this.width, 0], [this.width, this.height], [0, this.height]])

        CollisionManager.insert(this.collider)
    }

    setAngle(angle){
        this.angle = angle

        if(this.collider){
            this.collider.angle = Radians(angle)
        }
    }

    draw(){

        let pattern     = screen.context.createPattern(this.texture, 'repeat') 

        screen.context.save()

        screen.context.fillStyle = pattern
        screen.context.translate(this._x, this._y);
        screen.context.rotate(Radians(this.angle));		
        screen.context.fillRect(0, 0, this.width, this.height);

        screen.context.restore()

        this.update()
    }
}