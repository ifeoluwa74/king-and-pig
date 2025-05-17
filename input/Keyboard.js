"use strict";

const handleKeyDown =(evt)=>{
    const code  = evt.keyCode;
    if(code < 0 || code > 255)
    return;
    if(!Keyboard._keyStates[code].down)
    Keyboard._keyStates[code].pressed = true;
    Keyboard._keyStates[code].down = true;
}

const handleKeyUp =(evt)=>{
    const code = evt.keyCode;
    if (code < 0 || code > 255)
        return;
    Keyboard._keyStates[code].down = false;
    Keyboard._keyStates[code].pressed = false;
}
class Keyboard_Singleton{
    constructor(){
        this._keyStates = [];
        for (var i = 0; i < 256; ++i)
        this._keyStates.push(new ButtonState());
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
    }
    reset(){
        // for (var i = 0; i < 256; ++i)
            this._keyStates[Keys['up']].pressed = false;
    }
    pressed(key){
        return this._keyStates[key].pressed;
    }
    down(key){
        return this._keyStates[key].down;
    }
}

const Keyboard = new Keyboard_Singleton();