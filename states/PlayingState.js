"use strict";

class PlayingState extends IGameLoopObject{
    constructor(){
        super()
        this.currentLevelIndex = -1;
        this.levels = [];

        this.loadLevelsStatus();
        this.loadLevels();
    }
    get currentLevel(){
        return this.levels[this.currentLevelIndex];
    }
    handleInput(delta){
        this.currentLevel.handleInput(delta);
    }
    update(delta){
        this.currentLevel.update(delta);

        if(this.currentLevel.gameOver)
        gameStateManager.switchTo(ID.game_state_gameover);
        else if(this.currentLevel.completed){
            gameStateManager.switchTo(ID.game_state_levelfinished);
            this.nextLevel();
        }
    }
    draw(){
        this.currentLevel.draw();
    }
    reset(){
        this.currentLevel.reset();
    }
    goToLevel(levelIndex){
        if (levelIndex < 0 || levelIndex >= this.levels.length)
        return;
        this.currentLevelIndex = levelIndex;
        this.currentLevel.reset();
    }
    nextLevel(){
        if (this.currentLevelIndex >= window.LEVELS.length - 1)
        gameStateManager.switchTo(ID.game_state_levelselect);
        else {
        localStorage.kingAndPigLevels = JSON.stringify(window.LEVELS);
        this.goToLevel(this.currentLevelIndex + 1);
        window.LEVELS[this.currentLevelIndex].locked = false;
        }
    }
    loadLevels(){
        for (var currLevel = 0; currLevel < window.LEVELS.length; currLevel += 1) {
            this.levels.push(new Level(currLevel));
        }
    }
    loadLevelsStatus(){
        // this.writeLevelsStatus();
        if(localStorage && localStorage.kingAndPigLevels){
            window.LEVELS = JSON.parse(localStorage.kingAndPigLevels);

            if(!window.LEVELS[1].locked){
                return
            }else{
                this.writeLevelsStatus();
            }
        }
    }
    writeLevelsStatus(){
        if (!localStorage)
        return;
        localStorage.kingAndPigLevels = JSON.stringify(window.LEVELS);
    }
}