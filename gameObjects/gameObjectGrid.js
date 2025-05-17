"use strict";

class GameObjectGrid extends GameObjectList{
    constructor(rows,columns,layer,id){
        super(layer,id)
        this.cellWidth = 0;
        this.cellHeight = 0;
        this._rows = rows;
        this._columns = columns;
    }
   get rows(){
       return this._rows;
   }
   get columns(){
       return this._columns;
   }
   add(gameobject){
        let row = Math.floor(this._gameObjects.length / this._columns);
        let col = this._gameObjects.length % this._columns;
        this._gameObjects.push(gameobject);
        gameobject.parent = this;
        gameobject.position = new Vector2(col * this.cellWidth , row *  this.cellHeight);
   }
   addAt(gameobject,col,row){
    this._gameObjects[row * this._columns + col] = gameobject;
    gameobject.parent = this;
    gameobject.position = new Vector2(col * this.cellWidth, row * this.cellHeight);
   }
   at(col, row){
    let index = row * this._columns + col;
    if (index < 0 || index >= this._gameObjects.length)
        return null;
    else
        return this._gameObjects[index];
   }
   getAnchorPosition(gameobject){
    let l = this._gameObjects.length;
    for (let i = 0; i < l; ++i)
        if (this._gameObjects[i] == gameobject) {
            var row = Math.floor(i / this.columns);
            var col = i - row * this.columns;
            return new Vector2(col * this.cellWidth, row * this.cellHeight);
        }
    return Vector2.zero;
   }
}