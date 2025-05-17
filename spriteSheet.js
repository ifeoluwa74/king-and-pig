"use strict";

class SpriteSheet{
    constructor(imageName,col,row,createCollisionMask){
        game.spriteStillLoading += 1;
        game.totalSprite += 1;
        
        this.img = new Image();

        this.img.src = imageName;
        this._sheetColumns = typeof col !== "undefined" ? col : 1;
        this._sheetRows = typeof row !== "undefined" ? row : 1;
        this._scale = 1;
        this.opacity = 1;
        this.img.onload =()=>{
            game.spriteStillLoading -= 1;
        }

    }
    get scale(){
        return this._scale;
    }
    get size(){
        return new Vector2(this.width,this.height);
    }
    get image(){
        return this.img;
    }
    get width(){
        return this.img.width / this._sheetColumns;
    }
    
    get height(){
        return this.img.height / this._sheetRows;
    }
    get size(){
        return new Vector2(this.width,this.height);
    }
    get center(){
        return this.size.divideBy(2);
    }
    get nrSheetElements(){
        return this._sheetColumns * this._sheetRows;
    }
    createPixelCollisionMask(){
        this._collisionMask = [];
        let w = this.img.width;
        let h = this.img.height;
        canvas2D._pixeldrawingCanvas.width = w;
        canvas2D._pixeldrawingCanvas.height = h;
        let  ctx = canvas2D._pixeldrawingCanvas.getContext('2d');

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.drawImage(this.img, 0, 0, w, h, 0, 0, w, h);
        ctx.restore();
        let imageData = ctx.getImageData(0, 0, w, h);
        for (var x = 3, l = w * h * 4; x < l; x += 4) {
            this._collisionMask.push(imageData.data[x]);
        }
    }
    getAlpha(x, y, sheetIndex,mirror){
        if (this._collisionMask === null)
        return 255;

        let columnIndex = sheetIndex % this._sheetColumns;
        let rowIndex = Math.floor(sheetIndex / this._sheetColumns) % this._sheetRows;
        let textureX = columnIndex * this.width + x;
        if (mirror)
        textureX = (columnIndex + 1) * this.width - x - 1;
        let textureY = rowIndex * this.height + y;
        let arrayIndex = Math.floor(textureY * this.img.width + textureX);
        if (arrayIndex < 0 || arrayIndex >= this._collisionMask.length)
        return 0;
        else
        return this._collisionMask[arrayIndex];
    }
    draw(position, origin, sheetIndex){
        let columnIndex = sheetIndex % this._sheetColumns;
        let rowIndex = Math.floor(sheetIndex / this._sheetColumns) % this._sheetRows;
        let imagePart = new Rectangle(columnIndex * this.width, rowIndex * this.height,
            this.width, this.height);
        canvas2D.drawImage(this.img, position, 0, this.scale, origin, imagePart,this.opacity);
        // position,origin,color,width,height,stroke
        // if(this.im)
        // canvas2D.drawRect(position,origin,"blue",this.width,this.height,true);
    }
}