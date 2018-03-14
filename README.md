# coyota.js
A very very simple game engine written in Javascript.

>
> - Coyota.js uses the native ECMAScript Module syntax. You may want to run a [local server.](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
> - This project uses [Collisions library](https://github.com/Sinova/Collisions)
>
## How to use it
Coyota.js provide two main functions, **OnStart** and **Always**. 
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
It is highly recommended to preload your assets before using them. You can use the promise AssetManager.load () for that. 

Use the **Setup** function to set up your game while your assets are loading. **AssetManager** is a global object.
``` javascript
let resources = {
    playerTexture: './assets/mauricio.png',
}

Setup(()=>{
    screen.create(320, 240)    
})

AssetManager.load(resources).then(() => {

  let player

  OnStart(() => {
    player  = new Sprite(AssetManager.Textures.playerTexture, 160, 120, 24, 43, 12, 20)
  })

  Always(() => {
    player.draw()
  })
})

```
### Create Sprite Animations
You need to import the **Sprite** and **Animation** classes from *lib/Sprite/*
``` javascript
OnStart(() => {
  player = new Sprite('./assets/mauricio.png', 160, 120, 24, 43, 12, 20)
        
  player.addAnimation({
    "Walk": new Animation(player.texture, 1, 3, 10) //source, initialFrame, lastFrame, speed)
  })

Always(() => {
  player.setAnimation("Walk").play()
  player.draw()
 })
```
#### Animated Sprite
![Sprite Animation](https://media.giphy.com/media/xUOwGn9e4T7zhpCvoQ/giphy.gif)

### Add behaviors
``` javascript
player.addBehavior(new Spinner(40))
```

#### Animated Sprite with Spinner Behavior
![Spinner Behavior](https://media.giphy.com/media/xThta0SaXkP7uDU57a/giphy.gif)

#### List of behaviors:
- Bullet
- Spinner
- Solid
- Platformer (work in progress)

## Solid objects and collisions
> This project uses [Collisions library](https://github.com/Sinova/Collisions) 

All CoyotaObjects has a collider property. When an Sprite is created, collider initialize with a Polygon object from Collisions Library with the same size and position of the Sprite.

``` javascript

import Sprite from './lib/Sprite/Sprite.js' 
import Bullet from './behaviors/Bullet/Bullet.js'
import Solid from './behaviors/Solid/Solid.js'

let ball
let player
let cpu

  OnStart(() => {
    screen.create(320, 240)    

    ball    = new Sprite('./assets/ball.png', 160, 120, 8, 8, 4, 4)
    player  = new Sprite('./assets/paddle.png', 36, 120, 8, 40, 4, 20)
    cpu     = new Sprite('./assets/paddle.png', 280, 120, 8, 40, 4, 20)

    // new Bullet(speed, angleOfMotion, bounceOffSolids)
    ball.addBehavior(new Bullet(200, 0, true))
    cpu.addBehavior(new Solid())
    player.addBehavior(new Solid())

  })

  Always(() => {
    cpu.draw()
    ball.draw()
    player.draw()
  })
```

#### Simple pong
``` javascript
  ball.addBehavior(new Bullet(200, 0, true))
  cpu.addBehavior(new Solid())
  player.addBehavior(new Solid())
```
![Pong](https://media.giphy.com/media/3ohs4AvRNtGzlwSEko/giphy.gif)
