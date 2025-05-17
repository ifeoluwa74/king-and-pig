"use strict";

class TimerGameObject extends Label{
    constructor(layer,id){
        super("Arial","26pt",layer,id)
        this.reset();
    }
    get gameOver(){
        return this._timeLeft <= 0;
    }
    update(delta){
        if (!this.running)
        return;
        this._timeLeft -= delta * this.multiplier;
        if (this._timeLeft < 0)
        this.running = false;

        let minutes = Math.floor(this._timeLeft / 60);
        let seconds = Math.ceil(this._timeLeft % 60);
        if (this._timeLeft < 0)
        minutes = seconds = 0;
        this.text = minutes + ":" + seconds;
        if (seconds < 10)
        this.text = minutes + ":0" + seconds;
        this.color = Color.yellow;
        if (this._timeLeft <= 10 && seconds % 2 === 0)
        this.color = Color.red;
    }
    reset(){
        this._timeLeft = 30;
        this.running = true;
        this.multiplier = 1;
    }
}