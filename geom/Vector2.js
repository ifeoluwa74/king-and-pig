"use strict";

class Vector2{
    constructor(x,y){
        this.x = typeof x !== "undefined" ? x : 0;
        this.y = typeof y !== "undefined" ? y : 0;
    }
  
    get isZero(){
        return this.x === 0 && this.y === 0;
    }
    get length(){
        return Math.sqrt(this.x * this.x,this.y *  this.y);
    }
    addTo(v){
        if(v.constructor === Vector2){
            this.x += v.x;
            this.y += v.y;
        }else if(v.constructor  === Number){
            this.x += v;
            this.y += v;
        }
        return this;
    }
    add(v){
        const result = this.copy();
        return  result.addTo(v);
    }
    subtractFrom(v){
        if(v.constructor === Vector2){
            this.x -= v.x;
            this.y -= v.y;
        }else if(v.constructor === Number){
            this.x -= v;
            this.y -= v;
        }
        return this;
    }
    subtract(v)
    {
        const result = this.copy();
        return result.addTo(v);
    }
    divideBy(v){
        if(v.constructor === Vector2){
            this.x /= v.x;
            this.y /= v.y;
        }else if(v.constructor === Number){
            this.x /= v;
            this.y /= v;
        }
        return this;
    }
    divide(v){
        const result = this.copy();
        return result.divideBy(v);
    }
    multiplyWith(v){
        if(v.constructor === Vector2){
            this.x *= v.x;
            this.y *= v.y;
        }else if(v.constructor === Number){
            this.x *= v;
            this.y *= v;
        }
        return this;
    }
    toString(){
        return "(" + this.x + ", " + this.y + ")";
    }
    multiply(v){
        const result = this.copy();
        return result.multiplyWith(v);
    }
    equals(obj){
        return  this.x === obj.x  &&  this.y === obj.y;
    }
    copy(){
        return new Vector2(this.x, this.y);
    }
}

Object.defineProperty(Vector2,"zero",{
    get:function(){
        return new Vector2();
    }
})