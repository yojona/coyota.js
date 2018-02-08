export default class Bullet{
    constructor(speed, angle, bounceOffSolid, enabled){
        this.inst           = null
        this.speed          = speed || 0
        this.speedX         = speed || 0
        this.speedY         = speed || 0
        this.angle          = angle || 0
        this.bounceOffSolid = bounceOffSolid || false
        this.enabled        = enabled || true
    }

    setEnabled(bool){
        this.enabled        = bool
    }

    setAngle(angle){
        this.angle          = angle
    }

    always(){

        if(this.enabled){
            if(this.bounceOffSolid){
            
                let potentials  = this.inst.collider.potentials()
    
                for(let wall of potentials){
                    
                        if(this.inst.collider.collides(wall, CollisionResult) && wall.solid){
                            if(CollisionResult.overlap_x < 0){
                                this.speedX = this.speed
                            }
                            else if(CollisionResult.overlap_x > 0){
                                this.speedX = -this.speed
                            }
                
                            else if(CollisionResult.overlap_y < 0){
                                this.speedY = this.speed
                            }
                            else if(CollisionResult.overlap_y > 0){
                                this.speedY = -this.speed
                            }
                        }
                    
                }
            }
    
            this.inst.x +=  Math.cos(Radians(this.angle)) * (this.speedX*dt)
            this.inst.y +=  Math.sin(Radians(this.angle)) * (this.speedY*dt)   
        }
    }
}