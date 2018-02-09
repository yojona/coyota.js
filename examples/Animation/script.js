/**
 * Coyota.js
 * 
 * Version: 1.0.0
 * Author: Jonathan Ayala
 * Created: 01/19/2018
 * Last updated: 02/09/2018
 */

import Sprite from './../../objects/Sprite/Sprite.js' 
import Animation from '../../objects/Sprite/Animation.js';
import Spinner from './../../behaviors/Spinner/Spinner.js'

let resources = {
    playerTexture: './assets/mauricio.png',
}

Setup(()=>{
    screen.create(320, 240)    
    screen.setSmoothSampling(false)
})

AssetManager.load(resources).then(()=>{

    let player

    OnStart(()=>{
        player    = new Sprite(AssetManager.Textures.playerTexture, 160, 120, 24, 43, 12, 20)
        player.addAnimation({
            "Walk": new Animation(player.texture, 1, 3, 10)
        })
        player.addBehavior(new Spinner(40))
        player.setSize(player.width * 2, player.height * 2)

    })

    Always(()=>{

        player.setAnimation("Walk").play()
        player.draw()
    })
})