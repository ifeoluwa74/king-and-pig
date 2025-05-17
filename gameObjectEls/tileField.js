"use strict";
class TileField extends GameObjectGrid{
    constructor(rows,columns,layer,id){
        super(rows,columns,layer,id)

    }
    draw(){
        this._gameObjects.forEach((tile)=>{
            tile.draw();
        })
    }
    getTileType(x,y){
       return this.at(x,y).type;
    }
}