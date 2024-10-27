import Phaser, { Physics } from "phaser";
import TitleScreen from "./scenes/titleScreen";
import Game from "./scenes/game";
import GameBackground from "./scenes/gameBackround";

import * as keyScenes from './consts/keyScenes'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scale: {
        mode: Phaser.Scale.FIT,      // Scales game to fit screen while maintaining aspect ratio
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centers game on the screen
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: "#616161"
};

const game = new Phaser.Game(config);

game.scene.add(keyScenes.TitleScreen, TitleScreen);
game.scene.add(keyScenes.Game, Game);
game.scene.add(keyScenes.GameBackground, GameBackground);

game.scene.start(keyScenes.TitleScreen);
