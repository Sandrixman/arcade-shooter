class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene
        this.countMax = 25
        this.countEnemy = 0
        this.countKilled = 0
        this.fires = new Fires(this.scene)
        this.timer = this.scene.time.addEvent({
            delay: 2000,
            loop: true,
            callbackScope: this,
            callback: this.createEnemies,
        })
    }

    createEnemies() {
        let enemy = this.getFirstDead()

        if (!enemy) {
            enemy = Enemy.generate(this.scene, this.fires)
            enemy.on("killed", this.onEnemykilled, this)
            this.add(enemy)
        } else {
            enemy.reset()
        }
        enemy.move()

        this.countEnemy++
        if (this.countEnemy === this.countMax) {
            this.timer.remove()
        }
    }

    onEnemykilled() {
        this.countKilled++
        if (this.countKilled === this.countMax) {
            this.scene.events.emit("enemies-killed")
        }
    }
}
