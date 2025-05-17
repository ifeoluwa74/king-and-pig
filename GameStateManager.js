"use strict";

class GameStateManager{
    constructor(){
        this._gameStates = [];
        this._currentStates = null;
    }

    add(gamestate){
    this._gameStates.push(gamestate);
    this._currentStates = gamestate;
    return this._gameStates.length - 1;
    }

    get(id){
        if(id < 0 || id >= this._gameStates.length)
        return null;
        else
        return this._gameStates[id];
    }
   switchTo(id){
        if(id < 0 || id >= this._gameStates.length)
            return;
        this._currentStates = this._gameStates[id];
   }
   handleInput(delta){
            if(this._currentStates !== null)
            this._currentStates.handleInput(delta);
   }
   update(delta){
        if(this._currentStates !== null)
        this._currentStates.update(delta);
   }
   draw(delta){
        if(this._currentStates !== null)
        this._currentStates.draw(delta)
   }
   reset(){
       if(this._currentStates !== null)
       this._currentStates.reset();
   }
}

const gameStateManager = new GameStateManager();