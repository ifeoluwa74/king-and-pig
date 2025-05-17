"use strict";
class gameObject extends IGameLoopObject{
    constructor(layer,id){
        super(layer,id);
        this.layer = typeof layer !== "undefined" ? layer : 0;
        this.id = typeof id !== 'undefined' ? id : 0;
        this.parent =  null;
        this.position = new Vector2();
        this.velocity = new Vector2();
        this._visible = true;
    }
    get visible(){
        if (this.parent === null)
        return this._visible;
        else
        return this._visible && this.parent.visible;
    }
    set visible(value){
        this._visible = value;
    }
    get root(){
        if(this.parent === null)
        return this;
        else
        return this.parent.root;
    }
    get worldPosition(){
        if(this.parent !== null)
        return this.parent.worldPosition.addTo(this.position);
        else
        return this.position.copy();
    }
    reset(){
        this._visible = true;
    }
    update(delta){
        this.position.addTo(this.velocity.multiply(delta));
    }
}

