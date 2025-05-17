"use strict";
class LevelFinished{
    constructor(){
        this.playingState = gameStateManager.get(ID.game_state_playing);
        this.overlay = new spriteGameObject(sprites.overlay_welldone, ID.layer_overlays);
        this.overlay.position = this.overlay.screenCenter;
        this.add(this.overlay);
    }
    handleInput(delta){
        if (powerupjs.Touch.isTouchDevice) {
            if (!powerupjs.Touch.containsTouch(this.overlay.boundingBox))
                return;
        }
        else if (!powerupjs.Mouse.containsMousePress(this.overlay.boundingBox))
            return;
        powerupjs.GameStateManager.switchTo(ID.game_state_playing);
        this.playingState.nextLevel();
    }
    update(){
        this.playingState.update(delta);
    }
    draw(){
        this.playingState.draw();
    }
}