export default class Animation{
    constructor(texture, from, to, speed){
        this.texture        = texture
        this.firstFrame     = from
        this.currentFrame   = from
        this.frames         = (to - from) +1 || 1
        this.speed          = Clamp(speed, 0, 60) | 0
        this.tick           = 0
        this._isPlaying     = false
        this._isLoop        = true
    }

    draw(drawAnimation){

        if(this._isPlaying){
            if(this.speed > 0){
                this.tick       = this.tick + this.speed
            }

            if(this.tick > fps){
                if(this._isLoop){

                    if(this.currentFrame < this.frames){
                        this.currentFrame       = this.currentFrame > this.frames ? this.firstFrame: ++this.currentFrame
                    }
                    else{
                        this.currentFrame       = this.firstFrame
                    }
                }
                else{
                    if(this.currentFrame < this.frames){
                        this.currentFrame       = ++this.currentFrame
                    }
                }
                this.resetTickCount()                  
            }
        }
        drawAnimation()
    }

    play(){
        this._isPlaying     = true
    }

    stop(){
        this._isPlaying     = false
    }

    resetTickCount(){
        this.tick           = 0
    }
}