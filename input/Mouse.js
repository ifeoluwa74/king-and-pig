"use strict";

const handleMouseMove =(evt)=>{
    if(canvas2D.canvas){
        const canvasScale = canvas2D.scale;
        const canvasOffset = canvas2D.offset;
        let mx = (evt.pageX - canvasOffset.x) / canvasScale.x;
        let my = (evt.pageY - canvasOffset.y) / canvasScale.y;
        Mouse._position = new Vector2(mx , my);
    }
}

const handleMouseDown =(evt)=>{
    handleMouseMove(evt);

    if(evt.which  ===  1){
        if(!Mouse._left.down)
        Mouse._left.pressed = true;
        Mouse._left.down = true;
    }else if(evt.which === 2){
        if(!Mouse._middle.down)
        Mouse._middle.pressed = true;
        Mouse._middle.down = true;
    }else if(evt.which === 3){
        if(!Mouse._right.down)
        Mouse._right.pressed = true;
        Mouse._right.down = true;
    }
}

const handleMouseUp =(evt)=>{
    handleMouseMove(evt);

    if(evt.which === 1)
    Mouse._left.down = false;
    else if(evt.which === 2)
    Mouse._middle.down = false;
    else if(evt.which === 3)
    Mouse._right.down = false;
}

class Mouse_Singleton{
    constructor(){
        this._position = Vector2.zero;
        this._left = new ButtonState();
        this._middle = new ButtonState();
        this._right = new ButtonState();
        document.onmousemove = handleMouseMove;
        document.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;
    }
    get left(){
        return  this._left;
    }
    get middle(){
        return this._middle;
    }
    get right(){
        return this._right;
    }
    get positon(){
        return this._position;
    }
    reset(){
        this._left.pressed = false;
        this._middle.pressed = false;
        this._right.pressed = false; 
    }
    containsMouseDown(rect){
        return this._left.down && rect.contains(this._position);
    }
    containsMousePress(rect){
        return this._left.pressed && rect.contains(this._position);
    }
}

const Mouse = new Mouse_Singleton();
