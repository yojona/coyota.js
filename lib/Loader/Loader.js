export default class Loader{
    constructor(){
        this.sources = []
        this.Textures = {}
        this.totalImages = 0
        this.loadedImages = 0
        this._loaded = true
    }

    IsLoaded(){
        return this._loaded
    }

    load(sources){
        return new Promise((resolve, reject)=>{

            this.sources = sources
            this._loaded = false
    
            for(let source in this.sources){
                this.totalImages++
            }
            
            for(let source in this.sources){
                this.Textures[source] = new Image()
                this.Textures[source].src = this.sources[source]
                this.Textures[source].onload = () =>{
                    console.log(this.sources[source]+" loaded")
    
                    if(++this.loadedImages >= this.totalImages){
                        resolve()
                    }                
                }
            } 

        })
   
    }
}