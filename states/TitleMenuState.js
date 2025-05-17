"use strict";

class TitleMenuState extends GameObjectList{
    constructor(layer){
        super(layer);
        // the title screen
        let titleScreen = new spriteGameObject(sprites.background_title,ID.layer_background);
        this.add(titleScreen);

        // add a play button
        this.playButton = new Button(sprites.buttonPlay,ID.layer_overlays);
        this.playButton.position = new Vector2(this.playButton.screenCenterX,540);
        this.add(this.playButton)

        // add a help button
        this.helpButton = new Button(sprites.buttonHelp, ID.layer_overlays);
        this.helpButton.position = new Vector2(this.helpButton.screenCenterX, 650);
         this.add(this.helpButton);
    }
    handleInput(delta){
        GameObjectList.prototype.handleInput.call(this,delta);
        if(this.playButton.down)
        gameStateManager.switchTo(ID.game_state_levelselect);
        else if(this.helpButton.pressed)
        console.log("Help")
        // gameStateManager.switchTo(ID.game_state_help);
    }
}
