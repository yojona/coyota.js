/**
 * Coyota.js
 * 
 * Version: 1.0.0
 * Author: Jonathan Ayala
 * Created: 01/19/2018
 * Last updated: 02/09/2018
 */

import Sprite from '../../objects/Sprite/Sprite.js' 
import Bullet from '../../behaviors/Bullet/Bullet.js'
import Solid from '../../behaviors/Solid/Solid.js'

let ball
let player
let cpu

    OnStart(()=>{
        screen.create(320, 240)    

        ball    = new Sprite('./assets/ball.png', 160, 120, 8, 8, 4, 4)
        player  = new Sprite('./assets/paddle.png', 36, 120, 8, 40, 4, 20)
        cpu     = new Sprite('./assets/paddle.png', 280, 120, 8, 40, 4, 20)

        ball.addBehavior(new Bullet(200, 0, true))
        cpu.addBehavior(new Solid())
        player.addBehavior(new Solid())

    })

    Always(()=>{
        cpu.draw()
        ball.draw()
        player.draw()
    })