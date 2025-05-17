"use strict";

class GameObjectList extends gameObject{
    constructor(layer,id){
        super(layer,id)
        this._gameObjects = [];
    }
    add(gameobject){
        this._gameObjects.push(gameobject);
        gameobject.parent = this;
        this._gameObjects.sort(function (a, b) {
            return a.layer - b.layer;
        });

    }
    
    get length(){
        return this._gameObjects.length;
    }
    remove(gameobject){
        for (var i = 0, l = this._gameObjects.length; i < l; ++i) {
            if (gameobject !== this._gameObjects[i])
                continue;
            this._gameObjects.splice(i, 1);
            gameobject.parent = null;
            return;
        }
    }
    at(index){
        if (index < 0 || index >= this._gameObjects.length)
            return null;
        return this._gameObjects[index];
    }
    find(id){
        for (var i = 0, l = this._gameObjects.length; i < l; ++i) {
            if (this._gameObjects[i].id === id)
                return this._gameObjects[i];
            if (this._gameObjects[i] instanceof GameObjectList) {
                var obj = this._gameObjects[i].find(id);
                if (obj !== null)
                    return obj;
            }
        }
        return null;
    }
    clear(){
        for (var i = 0, l = this._gameObjects.length; i < l; ++i)
            this._gameObjects[i].parent = null;
        this._gameObjects = [];
    }
    handleInput(delta){
        for (var i = this._gameObjects.length - 1; i >= 0; --i)
        this._gameObjects[i].handleInput(delta);
    }
    update(delta){
        for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        this._gameObjects[i].update(delta);
    }
    draw(){
        for (var i = 0, l = this._gameObjects.length; i < l; ++i)
            if (this._gameObjects[i].visible){
                this._gameObjects[i].draw();
            }
    }
}