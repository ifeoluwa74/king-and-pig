"use  strict";

class Button extends spriteGameObject{
    constructor(sprite,layer,id){
        super(sprite,layer,id)
        this.pressed = false;
        this.down = false;
    }
    handleInput(delta){
        let boundingBox = this.boundingBox;
        this.pressed = this.visible && Touch.containsTouchPress(boundingBox) || Mouse.containsMousePress(boundingBox);
        this.down = this.visible && Touch.containsTouchDown(boundingBox) || Mouse.containsMouseDown(boundingBox);
    }
}