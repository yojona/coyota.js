export default class Platformer{
    constructor(){
        this.inst           = null
        this.maxSpeed       = 3
        this.jumpStrength   = 6
        this.velX           = 0
        this.velY           = 0
        this.friction       = 0.8
        this.gravity        = 0.3

        this.isJumping      = false
    }

    moveLeft(){
        if(this.velX < this.maxSpeed){
            this.inst.x -= this.velX
            this.velX++
        }   
    }

    moveRight(){
        if(this.velX < this.maxSpeed){
            this.velX++
            this.inst.x += this.velX

        }   
    }

    jump(){
        if(!this.isJumping){
            this.isJumping  = true
            this.velY = -this.jumpStrength;
        }


    }

    always(){

        this.velX *= this.friction

        this.velY += this.gravity;
        this.inst.y += this.velY

        let potentials  = this.inst.collider.potentials()
    
        for(let wall of potentials){
            
                if(this.inst.collider.collides(wall, CollisionResult) && wall.solid){

                    this.isJumping = false
                    this.velY = 0

                    this.inst.x -= CollisionResult.overlap * CollisionResult.overlap_x;
                    this.inst.y -= CollisionResult.overlap * CollisionResult.overlap_y;
                    
      
                }
        }
    }
}