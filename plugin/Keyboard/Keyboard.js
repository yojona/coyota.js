export default class Keyboard{
    constructor(){
        this.keys = []
        this.keyPressed
        this.keyReleased

        document.body.addEventListener("keydown", (e)=> {
            this.keyPressed = e.keyCode
            this.keyReleased = null
        });
         
        document.body.addEventListener("keyup", (e)=> {
            this.keyReleased = e.keyCode
            this.keyPressed = null

        });
    }

    keyIsPressed(key){
        return key == this.keyPressed
    }
}