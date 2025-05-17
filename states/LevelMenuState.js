"use strict";
class LevelMenuState extends GameObjectList{
    constructor(layer){
        super(layer)
        this.background = new spriteGameObject(sprites.background_levelMenu,ID.layer_background);
        this.add(this.background);

        this.back = new Button(sprites.buttonBack,ID.layer_overlays);
        this.back.position = new Vector2(this.back.screenCenterX,750);
        this.add(this.back);
        
        this.levelButtons = [];

        for(let i = 0,j = window.LEVELS.length;i < j;i++){
            let row = Math.floor(i / 5);
            let column = i % 5;
            let level = new LevelButton(i,ID.layer_overlays);
            level.position = new Vector2(column * (level.width + 110) + 120,row * (level.height + 100) + 250);
            this.add(level);
            this.levelButtons.push(level);
        }
    }
    getSelectedLevel(){
        for(let i = 0,j = this.levelButtons.length;i < j;i++){
            if(this.levelButtons[i].pressed){
                return this.levelButtons[i].levelIndex;
            }
        }
        return -1;
    }
    handleInput(delta){
        GameObjectList.prototype.handleInput.call(this,delta);
        let selectedLevel = this.getSelectedLevel();
        if(selectedLevel != -1){
            let playingState =  gameStateManager.get(ID.game_state_playing);
            game.playingState = true;
            playingState.goToLevel(selectedLevel);
            gameStateManager.switchTo(ID.game_state_playing);
        }
        else if(this.back.down)
        gameStateManager.switchTo(ID.game_state_title);
    }
}