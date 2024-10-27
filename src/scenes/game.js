import Phaser from "phaser";
import { GameBackground } from "../consts/keyScenes";

export default class Game extends Phaser.Scene {
    init(data) {
        this.leftscore = 0;
        this.rightscore = 0;
        this.isComputerOpponent = data.isComputerOpponent;
    }

    preload() {}

    create() {
        this.scene.run(GameBackground);
        this.scene.sendToBack(GameBackground);

        // Set world bounds based on screen size
        this.physics.world.setBounds(-100, 0, this.scale.width + 100, this.scale.height);

        // Center ball based on screen dimensions
        this.ball = this.add.circle(this.scale.width / 2, this.scale.height / 2, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1);
        this.resetBall();

        this.ball.body.setCollideWorldBounds(true, 1, 1);

        // Position paddles based on screen height
        this.paddleLeft = this.add.rectangle(50, this.scale.height / 2, 20, 100, 0xffffff);
        this.physics.add.existing(this.paddleLeft, true);

        this.paddleRight = this.add.rectangle(this.scale.width - 50, this.scale.height / 2, 20, 100, 0xffffff);
        this.physics.add.existing(this.paddleRight, true);

        this.physics.add.collider(this.paddleLeft, this.ball);
        this.physics.add.collider(this.paddleRight, this.ball);

        // Score labels positioned based on width and height
        const scoreStyle = { fontSize: "40px", color: "#ffffff" };
        this.leftscoreLabel = this.add.text(this.scale.width * 0.3, this.scale.height * 0.1, "0", scoreStyle);
        this.rightscoreLabel = this.add.text(this.scale.width * 0.7, this.scale.height * 0.1, "0", scoreStyle);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Player control for Player vs Player mode
        if (!this.isComputerOpponent) {
            this.paddleRightKeys = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S
            });
        }
    }

    update() {
        // Control for paddleLeft
        const bodyLeft = this.paddleLeft.body;
        if (this.cursors.up.isDown) {
            this.paddleLeft.y -= 10;
            bodyLeft.updateFromGameObject();
        } else if (this.cursors.down.isDown) {
            this.paddleLeft.y += 10;
            bodyLeft.updateFromGameObject();
        }

        // Control for paddleRight
        const bodyRight = this.paddleRight.body;
        if (this.isComputerOpponent) {
            const easing = 0.08;
            const deltaY = this.ball.y - this.paddleRight.y;
            this.paddleRight.y += deltaY * easing;
            bodyRight.updateFromGameObject();
        } else {
            if (this.paddleRightKeys.up.isDown) {
                this.paddleRight.y -= 10;
                bodyRight.updateFromGameObject();
            } else if (this.paddleRightKeys.down.isDown) {
                this.paddleRight.y += 10;
                bodyRight.updateFromGameObject();
            }
        }

        // Check for ball out of bounds
        if (this.ball.x < -30) {
            this.resetBall();
            this.incrementLeftScore();
        } else if (this.ball.x > this.scale.width + 30) {
            this.resetBall();
            this.incrementRightScore();
        }
    }

    incrementLeftScore() {
        this.rightscore += 1;
        this.rightscoreLabel.setText(this.rightscore);
    }

    incrementRightScore() {
        this.leftscore += 1;
        this.leftscoreLabel.setText(this.leftscore);
    }

    resetBall() {
        // Center the ball on screen resize
        this.ball.setPosition(this.scale.width / 2, this.scale.height / 2);
        const angle = Phaser.Math.Between(0, 360);
        const vec = this.physics.velocityFromAngle(angle, 500);
        this.ball.body.setVelocity(vec.x, vec.y);
    }
}
