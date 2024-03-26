class GameScene extends Phaser.Scene {
    constructor() {
        super("Game")
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.score = 0
    }

    create() {
        this.createBackground()
        if (!this.sounds) {
            this.createSounds()
        }
        this.createText()
        this.player = new Player(this)
        this.enemies = new Enemies(this)
        this.addOverlap()
        this.createCompleteEvents()
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, "bg").setOrigin(0, 0)
    }

    createSounds() {
        this.sounds = {
            theme: this.sound.add("theme", { volume: 0.1, loop: true }),
            boom: this.sound.add("boom", { volume: 0.2 }),
        }
        this.sounds.theme.play()
    }

    createText() {
        this.scoreText = this.add.text(50, 50, `Score: 0`, {
            font: "36px KodeMomo",
            fill: "black",
        })
    }

    addOverlap() {
        this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this)
        this.physics.add.overlap(this.enemies.fires, this.player, this.onOverlap, undefined, this)
        this.physics.add.overlap(this.enemies, this.player, this.onOverlap, undefined, this)
    }

    onOverlap(source, target) {
        const enemy = [source, target].find((item) => item.texture.key === "enemy")
        if (enemy) {
            this.score++
            this.scoreText.setText(`Score: ${this.score}`)
            Boom.generate(this, enemy.x, enemy.y)
            this.sounds.boom.play()
        }
        target.setAlive(false)
        source.setAlive(false)
    }

    createCompleteEvents() {
        this.player.once("killed", this.onComplete, this)
        this.events.once("enemies-killed", this.onComplete, this)
    }

    onComplete() {
        this.scene.start("Start", {
            score: this.score,
            completed: this.player.active,
        })
    }

    update() {
        this.player.move()
        this.bg.tilePositionX += 1
    }
}
