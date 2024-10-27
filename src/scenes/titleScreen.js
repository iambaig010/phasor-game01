import Phaser from "phaser";
import { Game } from "../consts/keyScenes";

export default class TitleScreen extends Phaser.Scene {
    preload() {}

    create() {
        // Centered Title Text
        this.title = this.add.text(this.scale.width / 2, this.scale.height / 4, "Pong Game", { fontSize: "40px", color: "#ffffff" })
            .setOrigin(0.5);

        // Instruction Text
        this.startText = this.add.text(this.scale.width / 2, this.scale.height / 2, "Press Space to Start", { fontSize: "20px", color: "#ffffff" })
            .setOrigin(0.5);

        // Wait for the user to press space
        this.input.keyboard.once("keydown-SPACE", () => {
            this.startText.setText("");
            this.showModeSelection();
        });

        // Adjust layout on window resize
        this.scale.on("resize", this.resize, this);
    }

    showModeSelection() {
        // Choose Mode Text
        this.modeText = this.add.text(this.scale.width / 2, this.scale.height / 3, "Choose Your Mode", { fontSize: "30px", color: "#ffffff" })
            .setOrigin(0.5);

        // Create responsive buttons
        this.playerButton = this.createButton(this.scale.width / 2, this.scale.height / 2, "Player vs Player", () => this.startGame(false));
        this.computerButton = this.createButton(this.scale.width / 2, this.scale.height / 1.6, "Player vs Computer", () => this.startGame(true));
    }

    createButton(x, y, label, callback) {
        // Button background rectangle
        const button = this.add.rectangle(x, y, 200, 50, 0x007acc, 1).setOrigin(0.5).setInteractive();

        // Button label
        const buttonText = this.add.text(x, y, label, { fontSize: "20px", color: "#ffffff" }).setOrigin(0.5);

        // Button hover effects
        button.on("pointerover", () => {
            button.setFillStyle(0x005999, 1); // Darker color on hover
            buttonText.setColor("#ffff99"); // Lighter text color on hover
        });

        button.on("pointerout", () => {
            button.setFillStyle(0x007acc, 1); // Original color
            buttonText.setColor("#ffffff"); // Original text color
        });

        // Button click event
        button.on("pointerdown", callback);

        return button;
    }

    startGame(isComputerOpponent) {
        this.scene.start(Game, { isComputerOpponent });
    }

    resize() {
        // Update position of title and start text based on new window size
        this.title.setPosition(this.scale.width / 2, this.scale.height / 4);
        this.startText.setPosition(this.scale.width / 2, this.scale.height / 2);

        // Update positions for mode selection text and buttons if shown
        if (this.modeText) {
            this.modeText.setPosition(this.scale.width / 2, this.scale.height / 3);
            this.playerButton.setPosition(this.scale.width / 2, this.scale.height / 2);
            this.computerButton.setPosition(this.scale.width / 2, this.scale.height / 1.6);
        }
    }
}
