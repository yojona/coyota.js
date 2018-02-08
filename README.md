# coyota.js
A very very simple game engine written in Javascript.

>
> - Coyota.js uses the native ECMAScript Module syntax. You may want to run a [local server.](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
> - This project uses [Collisions library](https://github.com/Sinova/Collisions)
>
## How to use it
Coyota.js provide you two main functions, **OnStart** and **Always**. 
**OnStart** function will be executed the first time the game is run, **Always** is the game loop. 

```javascript
    OnStart(()=>{
        screen.create(320, 240)    
    })

    Always(()=>{
        // Write your game here
    })
```

### Preload resources
You can use the **Setup** function to set up your game while your assets are loading. **AssetManager** is a global object.
``` javascript
let resources = {
    playerTexture: './assets/mauricio.png',
}

Setup(()=>{
    screen.create(320, 240)    
})

AssetManager.load(resources).then(()=>{

    let player

    OnStart(()=>{
        player  = new Sprite(AssetManager.Textures.playerTexture, 160, 120, 24, 43, 12, 20)
    })

    Always(()=>{
        player.draw()
    })
})

```
### Create animations
You need to import the **Sprite** and **Animation** classes from *lib/Sprite/*
``` javascript
import Sprite from './lib/Sprite/Sprite.js' 
import Animation from './lib/Sprite/Animation.js';

    OnStart(()=>{
        screen.create(320, 240)   
        
        // new Sprite(source, x, y, frameWidth or width, frameHeight or height, hotSpotX, hotSpotY)
        player = new Sprite('./assets/mauricio.png', 160, 120, 24, 43, 12, 20)
        
        player.addAnimation({
            // new Animation(source, initialFrame, lastFrame, speed)
            "Walk": new Animation(player.texture, 1, 3, 10)
        })
    })

    Always(()=>{
        player.setAnimation("Walk").play()
        player.draw()
    })
```
### Add behaviors
``` javascript
    OnStart(()=>{
        screen.create(320, 240)   
        
        player = new Sprite('./assets/mauricio.png', 160, 120, 24, 43, 12, 20)
        player.addBehavior(new Spinner(40))
    })
```


