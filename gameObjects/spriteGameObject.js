"use strict";
class spriteGameObject extends gameObject{
    constructor(sprite,layer,id){
        super(layer,id)
        this.sprite = sprite;
        this.origin = Vector2.zero;
        this._sheetIndex = 0;

    }
    get size(){
        return  this.sprite.size;
    }
    get width(){
        return this.sprite.width;
    }
    get height(){
        return this.sprite.height;
    }
    get center(){
        return this.sprite.center;
    }
    get sheetIndex(){
        return this._sheetIndex;
    }
    set sheetIndex(value){
        if (value >= 0)
         this._sheetIndex = value % this.sprite.nrSheetElements;
    }
    get  screenCenterX(){
        return (game.size.x - this.width) / 2 + this.origin.x;
    }
    get screenCenterY(){
        return (game.size.y - this.height) / 2  + this.origin.y;
    }
    get screenCenter(){
        return game.size.subtract(this.size).divideBy(2).addTo(this.origin);
    }
   get boundingBox(){
            if(this.sprite === sprites.playerIdle || this.sprite === (sprites.playerAttack) || this.sprite === (sprites.playerDead) || this.sprite ===  (sprites.playerFall) ||  this.sprite  === (sprites.playerGround) ||  this.sprite === (sprites.playerHit)  || this.sprite === sprites.playerDoorIn){
                let leftTop = this.worldPosition.subtractFrom((this.origin));
                 return new Rectangle(leftTop.x + 20, leftTop.y, 70, this.height);
            }else if(this.sprite ===  sprites.playerIdleLeft || this.sprite === sprites.playerRunLeft ||  this.sprite === sprites.playerRunRight){
                let leftTop = this.worldPosition.subtractFrom((this.origin));
                return new Rectangle(leftTop.x + 45,leftTop.y,70,this.height)
            }
            else{
                let leftTop = this.worldPosition.subtractFrom((this.origin));
                return new Rectangle(leftTop.x, leftTop.y, this.width, this.height);
            }
    }
    
    draw(){ 
            if(this.sprite){
                if (this._visible){
                    this.sprite.draw(this.worldPosition, this.origin, this._sheetIndex);
                }
            }else{
                // canvas2D.drawRect(this.worldPosition,this.origin,"blue",90,91.66,true);
            }
    }
    collideWith(obj){
        if (!this.visible || !obj.visible || !this.boundingBox.intersects(obj.boundingBox))
        return false;
        let intersect = this.boundingBox.intersection(obj.boundingBox);
        let local = intersect.position.subtractFrom(this.worldPosition.subtractFrom(this.origin));
        let objLocal = intersect.position.subtractFrom(obj.worldPosition.subtractFrom(obj.origin));
        for (var x = 0; x < intersect.width; x++)
        for (var y = 0; y < intersect.height; y++) {
            if (this.getAlpha(Math.floor(local.x + x), Math.floor(local.y + y)) !== 0
                && obj.getAlpha(Math.floor(objLocal.x + x), Math.floor(objLocal.y + y)) !== 0)
                return true;
        }
        return false;
    }
    getAlpha(x,y){
        return this.sprite.getAlpha(x, y, this._sheetIndex);
    }
}

