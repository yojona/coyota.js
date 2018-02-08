export default class Loader{
    constructor(){
        this.sources = []
        this.Textures = {}
        this.totalImages = 0
        this.loadedImages = 0

        this.loaded = 0
    }

    load(sources){
        return new Promise((resolve, reject)=>{

            this.sources = sources
    
            for(let source in this.sources) this.totalImages++
            
            for(let source in this.sources){
                this.Textures[source] = new Image()

                this.Textures[source].onload = () =>{
                    
                    this.loadedImages++
                    this.loaded = this.loadedImages /this.totalImages
                        
                    if(this.loadedImages >= this.totalImages){
                        resolve()
                    }                
                }
                this.Textures[source].src = this.sources[source]

            } 
        })
    }
}