/**
 * Coyota.js
 *
 * Version: 1.0.0
 * Author: Jonathan Ayala
 * Created: 01/19/2018
 * Last updated: 02/09/2018
 */

import TiledBackground from './../../objects/TiledBackground/TiledBackground.js'
import Sprite from './../../objects/Sprite/Sprite.js'
import Animation from '../../objects/Sprite/Animation.js'
import Solid from './../../behaviors/Solid/Solid.js'
import Keyboard from '../../plugins/Keyboard/Keyboard.js'
import Platformer from '../../behaviors/Platformer/Platformer.js'

let resources = {
  playerTexture: './assets/mauricio.png',
  groundTexture: './assets/ground.png'
}

Setup(() => {
  screen.create(320, 240)
  screen.setSmoothSampling(false)
  screen.setBackgroundColor('cyan')
})

AssetManager.load(resources).then(() => {
  let ground
  let ground2
  let ground3
  let player
  let keyboard = new Keyboard()

  OnStart(() => {
    player = new Sprite(AssetManager.Textures.playerTexture, 16, 120, 24, 32, 12, 20)
    ground = new TiledBackground(AssetManager.Textures.groundTexture, 0, 216, 320, 32)
    ground2 = new TiledBackground(AssetManager.Textures.groundTexture, 208, 184, 120, 32)
    ground3 = new TiledBackground(AssetManager.Textures.groundTexture, 128, 136, 80, 16)

    player.addAnimation({
      'Walk': new Animation(player.texture, 1, 3, 10)
    })

    player.addBehavior(new Platformer())

    ground.addBehavior(new Solid())
    ground2.addBehavior(new Solid())
    ground3.addBehavior(new Solid())
  })

  Always(() => {
    if (keyboard.keys[37]) {
      player.behaviors.Platformer.moveLeft()
      player.setMirrored(true)
      player.setAnimation('Walk').play()
    }
    else if (keyboard.keys[39]) {
      player.behaviors.Platformer.moveRight()
      player.setMirrored(false)
      player.setAnimation('Walk').play()
    } else {
      player.setAnimation('Default')
    }

    if (keyboard.keys[38]) {
      player.behaviors.Platformer.jump()
    }

    player.draw()
    ground.draw()
    ground2.draw()
    ground3.draw()
  })
})
