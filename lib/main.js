import Screen from './Screen/Screen.js'
import Collisions from './Collisions/Collisions.js';

window.collisionManager = new Collisions();
window.result = collisionManager.createResult();

window.fps      = 60
window.screen = new Screen()

window.pause    = false
window.lastTime = (new Date()).getTime()

window.interval = 1000/fps
window.currentTime = 0
window.delta = 0;

window.OnStart = setup =>{
    setup.call()
}

// Loop
window.Always = (loop) => {
    window.requestAnimationFrame(() => Always(loop));

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);

    if(delta > interval) {
    
            if(!pause){
                screen.clear()
                loop()
                collisionManager.update()
            }
        
        lastTime = currentTime - (delta % interval);
    }  
}

window.IsOnScreen = object =>{
    return (object.x > 0 && object.x < screen.width && object.y > 0 && object.y < screen.height)
}

window.ViewportLeft = () =>{
    return 0
}

window.ViewportRight = () =>{
    return screen.width
}

window.ViewportTop = () =>{
    return 0
}

window.ViewportBottom = () =>{
    return screen.height
}

window.Clamp = (value, min, max) =>{
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}


window.DrawObject = (object, color) =>{
    screen.context.fillStyle = color || "white";
    screen.context.beginPath();
    object.draw(screen.context);   
    screen.context.fill();
}

// window.IsOverlapping = (a, b) =>{
//         if( a.box.left < b.box.right && 
//             a.box.right > b.box.left && 
//             a.box.top < b.box.bottom && 
//             a.box.bottom > b.box.top){
//             return true
//         }
//     return false
// }

// window.ShowBoxCollider = (object) =>{

//     pantalla.contexto.beginPath()
//     pantalla.contexto.moveTo(object.box.left, object.box.top)
//     pantalla.contexto.lineTo(object.box.left, object.box.bottom)
//     pantalla.contexto.lineTo(object.box.right, object.box.bottom)
//     pantalla.contexto.lineTo(object.box.right, object.box.top)
//     pantalla.contexto.lineTo(object.box.left, object.box.top)
//     pantalla.contexto.strokeStyle = "red"
//     pantalla.contexto.stroke()
//     pantalla.contexto.fillStyle = "rgba(255, 0, 0, 0.25)";
//     pantalla.contexto.fill()

// }