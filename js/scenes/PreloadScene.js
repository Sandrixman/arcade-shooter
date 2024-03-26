class PreloadScene extends Phaser.Scene {
    constructor() {
        super("Preload")
    }

    preload() {
        this.add.sprite(0, 0, "bg").setOrigin(0, 0)
        new LoadingBar(this)
        this.preloadAssets()
    }

    preloadAssets() {
        this.load.image("fire", "sprites/fire.png")
        this.load.image("bullet", "sprites/bullet.png")

        this.load.atlas("boom", "sprites/boom.png", "sprites/boom.json")
        this.load.atlas("dragon", "sprites/dragon.png", "sprites/dragon.json")
        this.load.atlas("enemy", "sprites/enemy.png", "sprites/enemy.json")

        this.load.audio("theme", "sounds/theme.mp3")
        this.load.audio("boom", "sounds/boom.mp3")
    }

    create() {
        this.scene.start("Start")
    }
}
