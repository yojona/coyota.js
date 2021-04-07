import Screen from './Screen/Screen.js'
import Collisions from './Collisions/Collisions.js'
import Platform from './Platform/Platform.js'
import Loader from './Loader/Loader.js'
import * as exp from './exps.js'

window.screen = new Screen()
window.CollisionManager = new Collisions()
window.AssetManager = new Loader()
window.Platform = new Platform()
window.CollisionResult = CollisionManager.createResult()
window.SolidBucket = []

window.dt = 0
window.fps = 0
window.pause = false
window.log = console.log
window.pi = Math.PI
window.tau = Math.PI * 2

// Global Expressions
window.IsOnScreen = exp.IsOnScreen
window.ViewportLeft = exp.ViewportLeft
window.ViewportRigh = exp.ViewportRight
window.ViewportTop = exp.ViewportTop
window.ViewportBottom = exp.ViewportBottom
window.Clamp = exp.Clamp
window.Zeropad = exp.Zeropad
window.Radians = exp.Radians
window.DrawCollision = exp.DrawCollision
window.IsOverlapping = exp.IsOverlapping
window.TakeCapture = exp.TakeCapture
window.Share = exp.Share
window.timescale = 1
window.currentLayout = 'main'

const runtime = {
  dt: 0,
  fps: 0,
  timescale: 1,
  pause: false
};

const delay = ms => new Promise(res => setTimeout(res, ms));
const handleVisibilityChange = async () => {
  if (document.hidden) {
    runtime.pause = true
  } else {
    await delay(100)
    runtime.pause = false
  }
};

document.onvisibilitychange = handleVisibilityChange;

window.Setup = setup => {
  setup.call();
};

window.OnStart = onstart => {
  onstart.call();
};

let before = Date.now();

window.Always = (update) => {
  let now = Date.now();

  runtime.dt = ((now - before) / 1000) * runtime.timescale;
  runtime.fps = Math.round((1000 / (now - before)) / runtime.timescale);

  if (!runtime.pause) {
    screen.clear();
    CollisionManager.update();

    update(runtime);
  }

  before = now;
  requestAnimationFrame(() => Always(update));
};

export {runtime};