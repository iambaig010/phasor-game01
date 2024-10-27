import Phaser from "phaser";

export default class GameBackground extends Phaser.Scene {
    preload() {}

    create() {
        // Use a Graphics object to draw the line
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0xffffff, 1);
        
        // Draw a vertical line from the top to the bottom of the screen
        graphics.beginPath();
        graphics.moveTo(this.scale.width / 2, 0);         // Start at the top center
        graphics.lineTo(this.scale.width / 2, this.scale.height); // Extend to the bottom center
        graphics.strokePath();

        // Center circle with a radius that scales based on screen dimensions
        const circleRadius = Math.min(this.scale.width, this.scale.height) * 0.1; // 10% of the smaller screen dimension
        graphics.lineStyle(5, 0xffffff, 1);
        graphics.strokeCircle(this.scale.width / 2, this.scale.height / 2, circleRadius);
    }
}
