export default class CoyotaObject{
    constructor(){
        this.behaviors = {}
    }

    addBehavior(behavior){
        behavior.inst                               = this
        this.behaviors[behavior.constructor.name]   = behavior

        if(behavior.constructor.name == "Solid"){
            this.addToSolidBucket(behavior)
        }
    }

    getBehavior(behaviorName){
        return this.behaviors[behaviorName]
    }

    addToSolidBucket(solid){
        SolidBucket.push(solid)
    }
    
    update(){
        for(let behavior in this.behaviors){
            if(this.behaviors[behavior].always){
                this.behaviors[behavior].always()
            }
   
        }
    }
}