"use strict";

class Sound{
    constructor(music,looping){
        this.sound = new Audio();
        this.sound.src = music;
        this.looping = typeof looping !="undefined" ? looping : false;
    }
    get volume(){
        return this._volume;
    }
    set volume(value){
        return this._volume = value;
    }
    play(){
    if (this.sound === null)
    return;
    this.sound.load();
    this.sound.autoplay = true;
    if (!this.looping)
        return;
    this.sound.addEventListener('ended', function () {
        this.load();
        this.autoplay = true;
    }, false);

    }
}

