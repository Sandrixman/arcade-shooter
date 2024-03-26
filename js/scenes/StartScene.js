class StartScene extends Phaser.Scene {
    constructor() {
        super("Start")
        this.bestScore = 0
    }

    create(data) {
        this.createBackground()
        this.createGreetingText()
        if (data.score !== undefined) {
            this.createStats(data)
        }
        this.start()
    }

    createBackground() {
        this.add.sprite(0, 0, "bg").setOrigin(0, 0)
    }

    createGreetingText() {
        this.add
            .text(config.width / 2, 300, "Start game", {
                font: "72px KodeMomo",
                fill: "black",
            })
            .setOrigin(0.5)
    }

    createStats(data) {
        if (data.score > this.bestScore) {
            this.bestScore = data.score
        }

        this.add
            .graphics()
            .fillStyle(0x000000, 0.5)
            .fillRoundedRect(config.width / 2 - 200, config.height / 2, 400, 200)

        const titleText = data.completed ? "Level completed" : "Game over"
        const scoreText = `Current score: ${data.score}`
        const bestScoreText = `Best score: ${this.bestScore}`
        const styleText = {
            font: "36px KodeMomo",
            fill: "white",
        }
        this.add.text(config.width / 2, 400, titleText, styleText).setOrigin(0.5)
        this.add.text(config.width / 2, 450, scoreText, styleText).setOrigin(0.5)
        this.add.text(config.width / 2, 500, bestScoreText, styleText).setOrigin(0.5)
    }

    start() {
        this.input.on("pointerdown", () => {
            this.scene.start("Game")
        })
    }
}
