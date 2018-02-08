/**
 * Coyota.js
 * 
 * Version: 1.0.0
 * Author: Jonathan Ayala
 * Created: 01/19/2018
 * Last update: 02/07/2018
 */

import Sprite from './lib/Sprite/Sprite.js' 
import Animation from './lib/Sprite/Animation.js' 

import Spinner from './behaviors/Spinner/Spinner.js'
import Bullet from './behaviors/Bullet/Bullet.js'
import Solid from './behaviors/Solid/Solid.js'
import Polygon from './lib/Collisions/modules/Polygon.js';

Setup(()=>{
    screen.create(320, 240)    
    screen.setSmoothSampling(false)
})

AssetManager.load(resources).then(()=>{

    let player
    let ground


    OnStart(()=>{
        
        player  = new Sprite(AssetManager.Textures.playerTexture, 30, 30, 16, 16, 8, 8)
        ground  = new Sprite(AssetManager.Textures.groundTexture, 0, 220, 320, 32)

        player.addBehavior(new Bullet(200, 50, true))
        player.addBehavior(new Spinner(200))
        ground.addBehavior(new Solid())
    })

    Always(()=>{

        player.setSize(64, 64)

        player.draw()
        player.behaviors.Bullet.setEnabled(false)
        player.drawCollision()
        
        ground.draw()
    })
})

