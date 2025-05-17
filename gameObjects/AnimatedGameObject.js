"use strict";

class AnimatedGameObject extends spriteGameObject{
    constructor(layer,id){
        super(null,layer,id)

        this._animations = {};
        this._current = null;
        this._time = 0;
    }
    loadAnimation(animname,id,looping,frametime){
        this._animations[id] = new Animation(animname, looping, frametime);
    }
    playAnimation(id){
         if (this._current === this._animations[id])
            return;
        this._sheetIndex = 0;
        this._time = 0;
        this._current = this._animations[id];
        this.sprite = this._current.sprite;
    }
    animationEnds(){
        return !this._current.looping && this.sheetIndex >= this.sprite.nrSheetElements - 1;
    }
    update(delta){
        this._time += delta;
        while (this._time > this._current.frameTime) {
            this._time -= this._current.frameTime;
            this._sheetIndex++;
            if (this._sheetIndex > this.sprite.nrSheetElements - 1)
                if (this._current.looping)
                    this._sheetIndex = 0;
                else
                    this._sheetIndex = this.sprite.nrSheetElements - 1;
        }
    }
}