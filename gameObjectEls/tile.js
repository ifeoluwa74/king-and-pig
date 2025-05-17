"use strict";

let TileType = {
    background : 0,
    normal : 1,
}


class Tile extends spriteGameObject{
    constructor(position, type,layer){
        super(null,layer)
        this.position = position;
        this._type = type;
    }
    get type(){
        return this._type;
    }
    draw(){
        spriteGameObject.prototype.draw.call(this)
        if(this._type === TileType.normal){
            let tiles = this.root.find(ID.tiles)
        }
    }
}