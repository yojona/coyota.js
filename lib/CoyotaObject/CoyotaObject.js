export default class CoyotaObject {
  constructor () {
    this.behaviors = {}
    this.collisionEnabled = true
    this.isSolid = false
  }

  setEnableCollision (bool) {
    this.collisionEnabled = bool
  }

  addBehavior (behavior) {
    behavior.inst = this
    behavior.inst.collider.solid = behavior.constructor.name === 'Solid'
    this.behaviors[behavior.constructor.name] = behavior
  }

  getBehavior (behaviorName) {
    return this.behaviors[behaviorName]
  }

  update () {
    for (let behavior in this.behaviors) {
      if (this.behaviors[behavior].always) {
        this.behaviors[behavior].always()
      }
    }
  }
}
