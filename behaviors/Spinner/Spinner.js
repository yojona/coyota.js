export default class Spinner{
    constructor(speed){
        this.inst   = null   
        this.speed  = speed
    }

    setSpeed(speed){
        this.speed = speed
    }

    always(){
        this.inst.setAngle(this.inst.angle + this.speed)
    }
}