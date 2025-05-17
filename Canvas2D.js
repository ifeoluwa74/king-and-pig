"use strict";

class Canvas2D{
    constructor(){
        this.canvas = null;
        this.canvasContext = null;
        this.gameArea = null;
        this.canvasOffset = Vector2.zero;
        this._pixeldrawingCanvas = null;
    }
    get offset(){
        return this.canvasOffset;
    }
    clear(){
        this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    initialize(canvasName,gameArea){
        this.canvas = document.getElementById(canvasName);
        this.gameArea = document.getElementById(gameArea);
        if(this.canvas.getContext){
            this.canvasContext = this.canvas.getContext("2d");
        }else{
            alert("Browser is not HTML context compatible");
            return;
        }
        this._pixeldrawingCanvas = document.createElement('canvas');
        
        window.onresize = Canvas2D.prototype.resize;
        this.resize();
    }
    get scale(){
        return new Vector2(canvas2D.canvas.width / game.size.x,
        canvas2D.canvas.height / game.size.y);
    }
    resize(){
        let gameArea =  canvas2D.gameArea;
        let gameCanvas = canvas2D.canvas;
        let widthToHeight = game.size.x / game.size.y;
        let newWidth = window.innerWidth;
        let newHeight = window.innerHeight;
        let newWidthToHeight = newWidth / newHeight;

        if(newWidthToHeight > widthToHeight)
        newWidth = newHeight * widthToHeight;
        else
        newHeight = newWidth / widthToHeight;

        gameArea.style.width = newWidth + "px";
        gameArea.style.height = newHeight + "px";

        gameCanvas.width = newWidth;
        gameCanvas.height = newHeight;


        gameArea.style.marginTop = (window.innerHeight - newHeight) /2 + "px";
        gameArea.style.marginBottom = (window.innerHeight - newHeight) /2 + "px";
        gameArea.style.marginLeft = (window.innerWidth - newWidth)/2 + "px";
        gameArea.style.marginRight = (window.innerWidth - newWidth)/2 + "px";


        let offset = Vector2.zero;
        if (gameCanvas.offsetParent) {
            do {
                offset.x += gameCanvas.offsetLeft;
                offset.y += gameCanvas.offsetTop;
            } while ((gameCanvas = gameCanvas.offsetParent));
        }
        canvas2D.canvasOffset = offset;
        
    }
    drawImage(sprite, position, rotation, scale, origin, sourceRect, opacity){
        let canvasScale = this.scale;

        position = typeof position !== 'undefined' ? position : Vector2.zero;
        rotation = typeof rotation !== 'undefined' ? rotation : 0;
        scale = typeof scale !== 'undefined' ? scale : 1;
        opacity = typeof opacity !== 'undefined' ? opacity : 1;
        origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
        sourceRect = typeof sourceRect !== 'undefined' ? sourceRect : new   Rectangle(0, 0, sprite.width, sprite.height);

        this.canvasContext.save();
        this.canvasContext.globalAlpha = opacity;
            this.canvasContext.scale(scale * canvasScale.x, scale * canvasScale.y);
            this.canvasContext.translate(position.x, position.y);
            this.canvasContext.rotate(rotation);
            this.canvasContext.drawImage(sprite, sourceRect.x, sourceRect.y,
                sourceRect.width, sourceRect.height,
                -origin.x, -origin.y,
                sourceRect.width, sourceRect.height);
        this.canvasContext.restore();
    }
    drawRect(position,origin,color,width,height,stroke){
        stroke = typeof stroke !== "undefined" ? stroke : false;
        let canvasScale =  this.scale;

        this.canvasContext.save();
        this.canvasContext.scale(canvasScale.x, canvasScale.y);
        this.canvasContext.globalAlpha= 0.2;
        this.canvasContext.lineWidth = 3;
        this.canvasContext.strokeStyle = "#FF0000";
        this.canvasContext.fillStyle = color.toString();
        this.canvasContext.fillRect(position.x,position.y,width,height);
        if(stroke)
        this.canvasContext.strokeRect(position.x,position.y, width, height);
        this.canvasContext.restore();
    }
    drawPixel(x, y ,color){
        let canvasscale = this.scale;
        this._canvasContext.save();
        this._canvasContext.scale(canvasscale.x, canvasscale.y);
        this._canvasContext.fillStyle = color.toString();
        this._canvasContext.fillRect(x, y, 1, 1);
        this._canvasContext.restore();
    }
    drawText(text, position, origin, color, textAlign, fontname, fontsize){
        let canvasScale = this.scale;

        position = typeof position !== 'undefined' ? position : Vector2.zero;
        origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
        color = typeof color !== 'undefined' ? color : Color.black;
        textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
        fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
        fontsize = typeof fontsize !== 'undefined' ? fontsize : "60px";


        this.canvasContext.save();
        this.canvasContext.beginPath();
        this.canvasContext.scale(canvasScale.x, canvasScale.y);
        this.canvasContext.translate(position.x - origin.x, position.y - origin.y);
        this.canvasContext.textBaseline = 'top';
        this.canvasContext.font = fontsize + " " + fontname + " " + "bold";
        this.canvasContext.fillStyle = color.toString();
        this.canvasContext.textAlign = textAlign;
        this.canvasContext.fillText(text, 0, 0);
        this.canvasContext.restore();
    }
}

const canvas2D = new Canvas2D();