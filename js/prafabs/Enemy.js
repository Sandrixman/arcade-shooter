class Enemy extends MovableObject {
    static generateAttributes() {
        const x = config.width
        const y = Phaser.Math.Between(50, config.height - 50)
        return { x, y, frame: `enemy${Phaser.Math.Between(1, 4)}` }
    }

    static generate(scene, fires) {
        const data = Enemy.generateAttributes()
        return new Enemy({
            scene,
            fires,
            x: data.x,
            y: data.y,
            texture: "enemy",
            frame: data.frame,
            velocity: -200,
            bullet: { delay: 2000, texture: "bullet", velocity: -500 },
            origin: { x: 0, y: 0.5 },
        })
    }

    init(data) {
        super.init(data)
        this.setOrigin(data.origin.x, data.origin.y)
        this.fires = data.fires || new Fires(this.scene)
        this.timer = this.scene.time.addEvent({
            delay: data.bullet.delay,
            loop: true,
            callbackScope: this,
            callback: this.fire,
        })
        this.bullet = data.bullet
    }

    fire() {
        this.fires.createFires(this)
    }

    reset() {
        const data = Enemy.generateAttributes()
        super.reset(data.x, data.y)
        this.setFrame(data.frame)
    }

    isDead() {
        return this.x < -this.width
    }
}
