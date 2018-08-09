/**
 * Coyota.js
 *
 * Version: 1.0.0
 * Author: Jonathan Ayala
 * Created: 01/19/2018
 * Last updated: 02/09/2018
 */

import Background from './objects/Background/Background.js'

let bg = new Background('./assets/ground.png', 30, 236, 100, 54)

onStart(() => {
  screen.create(240, 320)
})

always(() => {
  bg.scrollX = 32

  bg.draw()
})
