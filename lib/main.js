import Screen from './Screen/Screen.js'
import Collisions from './Collisions/Collisions.js';
import Platform from './Platform/Platform.js'
import Loader from './Loader/Loader.js';
import * as exp from './exps.js'


window.screen               = new Screen()
window.CollisionManager     = new Collisions()
window.AssetManager         = new Loader()
window.Platform             = new Platform()             
window.CollisionResult      = CollisionManager.createResult()
window.SolidBucket          = []

window.dt                   = 0
window.fps                  = 0
window.pause                = false
window.log                  = console.log
window.pi                   = Math.PI
window.tau                  = Math.PI*2

// Global Expressions
window.IsOnScreen           = exp.IsOnScreen
window.ViewportLeft         = exp.ViewportLeft
window.ViewportRigh         = exp.ViewportRight
window.ViewportTop          = exp.ViewportTop
window.ViewportBottom       = exp.ViewportBottom
window.Clamp                = exp.Clamp
window.Zeropad              = exp.Zeropad
window.Radians              = exp.Radians
window.DrawCollision        = exp.DrawCollision
window.IsOverlapping        = exp.IsOverlapping
window.TakeCapture          = exp.TakeCapture
window.Share                = exp.Share

window.Setup = setup =>{  
    setup.call()
}

window.OnStart = onstart =>{  
    onstart.call()
}

var before                  = Date.now()  

window.Always = (update) => {
    var now = Date.now()

    dt = (now - before) / 1000;
    fps = Math.round(1000/(now - before))

        if(!pause){
            screen.clear()

                update()

            CollisionManager.update()
        }

    before = now
    requestAnimationFrame(()=> Always(update));
}