/**
 * Coyota.js
 *
 * Version: 1.0.0
 * Author: Jonathan Ayala
 * Created: 01/19/2018
 * Last updated: 02/09/2018
 */

import Sprite from './objects/Sprite/Sprite.js'
import Background from './objects/Background/Background.js'
import Spinner from './behaviors/Spinner/Spinner.js'
import Solid from './behaviors/Solid/Solid.js'
import Animation from './objects/Sprite/Animation.js'
import Platformer from './behaviors/Platformer/Platformer.js'

let bird = new Sprite('./assets/bird.png', 40, 128, 24, 24, 12, 12)
let ground = new Background('./assets/ground.png', 0, 202, 320, 54)
let background = new Background('./assets/bg.png', 0, 0, 144, 256)

onStart(() => {
  screen.create(144, 256)
  ground.scrollX = -32

  bird.addAnimation({
    'Default': new Animation(bird.texture, 0, 2, 10)
  })

  bird.setAnimation('Default').play()

  bird.addBehavior(new Platformer())
  ground.addBehavior(new Solid())
})

always(() => {
  background.draw()
  ground.draw()
  bird.draw()
})
