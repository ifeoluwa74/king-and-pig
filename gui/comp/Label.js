"use strict";

const calculateTextSize =(fontname, fontsize,text)=>{
    const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = -1000;
        div.style.top = -1000;
        document.body.appendChild(div);
        text = typeof text !== 'undefined' ? text : "M";
        div.style.fontSize = "" + fontsize;
        div.style.fontFamily = fontname;
        div.innerHTML = text;
        var size = new Vector2(div.offsetWidth, div.offsetHeight);
        document.body.removeChild(div);
        return size;
};

class Label extends GameObjectList{
    constructor(fontname,fontsize,layer,id){
        super(layer,id)
        this.color = Color.black;
        this.origin = Vector2.zero;
        this._fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
        this._fontsize = typeof fontsize !== 'undefined' ? fontsize : "40px";
        this._contents = "";
        this._align = "left";
        this._size = Vector2.zero;
    }
    get size(){
        return this._size;
    }
    get width(){
        return this._size.x;
    }
    get height(){
        return this._size.y;
    }
    get screenCenterX(){
        return (game.size.x - this.width) / 2 + this.origin.x;
    }
    get screenCenterY(){
        return (game.size.y - this.height) / 2 + this.origin.y;
    }
    get screenCenter(){
        return game.size.subtract(this.size).divideBy(2).addTo(this.origin);
    }
    get text(){
        return this._contents;
    }
    set text(value){
        this._contents = value;
        this._size = calculateTextSize(this._fontname, this._fontsize, value);
    }
    draw(){
        if (!this.visible)
        return;
    canvas2D.drawText(this._contents, this.worldPosition,
        this.origin, this.color, this._align,
        this._fontname, this._fontsize);
    }
}