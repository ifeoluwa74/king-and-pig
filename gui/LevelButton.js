"use strict";

class LevelButton extends GameObjectList{
    constructor(levelIndex ,layer,id){
        super(layer,id)
        this.pressed = false;
        this.levelIndex = levelIndex;
        this._levelSolved = new spriteGameObject(sprites.levelSolved,ID.layer_overlays_1);
        
        this._levelUnsolved = new spriteGameObject(sprites.levelUnSolved, ID.layer_overlays);
        this._levelSolved.sheetIndex = levelIndex;
        this.add(this._levelSolved);
        this.add(this._levelUnsolved);

        this._levelLocked = new spriteGameObject(sprites.levelLocked, ID.layer_overlays_1);
        this.add(this._levelLocked);

        let textLabel = new Label("Arial", "20px", ID.layer_overlays_2);
        textLabel.text = levelIndex + 1;
        textLabel.position = new Vector2(this._levelSolved.width -  textLabel.width - 10, 10);
        textLabel.color = Color.white;
        this.add(textLabel);
    }
    get width(){
        return this._levelLocked.width;
    }
    get height(){
        return  this._levelLocked.height;
    }
    handleInput(delta){
        
        if(window.LEVELS[this.levelIndex].locked)
        return;
        if(Touch.isTouchDevice){
            this.pressed = this.visible && (Touch.containsTouchDown(this._levelUnsolved.boundingBox) ||  Touch.containsTouchDown(this._levelSolved.boundingBox)) 
        }
        this.pressed = this.visible && Mouse.left.pressed && (Mouse.containsMouseDown(this._levelUnsolved.boundingBox) || Mouse.containsMouseDown(this._levelSolved.boundingBox));
    }
    update(delta){
    let currLevel = window.LEVELS[this.levelIndex];
    this._levelLocked.visible = currLevel.locked;
    this._levelSolved.visible = currLevel.solved;
    this._levelUnsolved.visible = !currLevel.solved;
    }
}