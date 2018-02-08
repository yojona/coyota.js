export default class Bullet{
    constructor(speed, angle, bounceOffSolid, enabled){
        this.inst           = null
        this.speed          = { x: speed || 0, y: speed || 0 }
        this.angle          = angle || 0
        this.bounceOffSolid = bounceOffSolid || true
        this._enabled       = enabled || true
    }

    setAngle(angle){
        this.angle          = angle
    }

    always(){

        // add CollisionManager.insert(...) in Sprite class

        if(this.bounceOffSolid && IsSolid(this.inst)){
            
            if(this.inst.x < 0 || this.inst.x > screen.width){
                this.speed.x *=-1
            }

            if(this.inst.y < 0 || this.inst.y > screen.height){
                this.speed.y *=-1
            }

                // if(CollisionResult.overlap_x < 0){
                //     this.inst.speed.x = 3
                // }
                // else if(CollisionResult.overlap_x > 0){
                //     this.inst.speed.x = -3
                // }
    
                // else if(CollisionResult.overlap_y < 0){
                //     this.inst.speed.y = 3
                // }
                // else if(CollisionResult.overlap_y > 0){
                //     this.inst.speed.y = -3
                // }
       
        }

        this.inst.x +=  Math.cos(Radians(this.angle)) * (this.speed.x)
        this.inst.y +=  Math.sin(Radians(this.angle)) * (this.speed.y)
    }
}