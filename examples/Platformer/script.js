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
import Bullet from '../../behaviors/Bullet/Bullet.js'

let resources = {
  playerTexture: './assets/mauricio.png',
  bulletTexture: './assets/mauricio.png',
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
  let bullet
  let keyboard = new Keyboard()

  OnStart(() => {
    player = new Sprite(AssetManager.Textures.playerTexture, 16, 120, 24, 32, 12, 20)
    ground = new TiledBackground(AssetManager.Textures.groundTexture, 0, 216, 320, 32)
    ground2 = new TiledBackground(AssetManager.Textures.groundTexture, 208, 184, 120, 32)
    ground3 = new TiledBackground(AssetManager.Textures.groundTexture, 128, 136, 80, 16)

    bullet = new Sprite(AssetManager.Textures.bulletTexture, 40, 170, 16, 16, 0, 0)

    player.addAnimation({
      'Walk': new Animation(player.texture, 1, 3, 10)
    })

    player.addBehavior(new Platformer())

    bullet.addBehavior(new Bullet(100, 0, true))
    ground.addBehavior(new Solid())
    ground2.addBehavior(new Solid())
    ground3.addBehavior(new Solid())
  })

  Always(() => {

    if (player.behaviors.Platformer.isMoving()) {
      if (player.behaviors.Platformer.isOnFloor()) {
        player.setAnimation("Walk").play()
      }
      else {
        player.setAnimation("Walk").stop()
      }
    } else  {
      player.setAnimation("Default")
    }

    if (keyboard.keys[37]) {
      player.behaviors.Platformer.moveLeft()
    }
    
    if (keyboard.keys[39]) {
      player.behaviors.Platformer.moveRight()
    }

    if (keyboard.keys[38]) {
      player.behaviors.Platformer.jump()
    }

    if (player.behaviors.Platformer.vectorX > 0) {
      player.setMirrored(false)
    }

    if (player.behaviors.Platformer.vectorX < 0) {
      player.setMirrored(true)
    }

    if (keyboard.keys[65]) {
      let n = Object.assign(bullet)
      log(n)
    }

    player.draw()
    ground.draw()
    ground2.draw()
    ground3.draw()
    bullet.draw()
  })
})
