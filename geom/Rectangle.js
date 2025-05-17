"use strict";

class Rectangle{
    constructor(x,y,w,h){
        this.x = typeof x !== "undefined" ? x : 0;
        this.y = typeof y !== "undefined" ? y : 0;
        this.width = typeof w !== "undefined" ? w : 1;
        this.height =typeof h !== "undefined" ? h : 1;
    }
    get left(){
        return this.x;
    }
    get right(){
        return this.x + this.width;
    }
    get bottom(){
        return  this.y + this.height;
    }
    get top(){
        return this.y;
    }
    get size(){
        return new Vector2(this.width,this.height);
    }
    set size(value){
        return this.size = value;
    }
    set center(value){
        return this.center = this.position.addTo(value.divideBy(2));
    }
    get center(){
        return this.position.addTo(this.size.divideBy(2));
    }
    get position(){
        return new Vector2(this.x,this.y);
    }
    contains(v){
        v = typeof v !== 'undefined' ? v : new Vector2();
        return (v.x >= this.left && v.x <= this.right &&
            v.y >= this.top && v.y <= this.bottom);
    }
    intersects(rect){
        return (this.left <= rect.right && this.right >= rect.left &&
            this.top <= rect.bottom && this.bottom >= rect.top);
    }
    calculateIntersectionDepth(rect){
        // Here they check the minimum distance it take the obj to collide
        // let minDistance = this.size.addTo(rect.size).divideBy(2);
        // let distance = this.center.subtractFrom(rect.center);

        let minDistance = {x:(this.size.x + rect.size.x)/2,y:(this.size.y + rect.size.y) / 2};
        let distance = {x:this.center.x - rect.center.x,y:this.center.y - rect.center.y}
        
        let depth = Vector2.zero;
        if (distance.x > 0)
            depth.x = minDistance.x - distance.x;
        else
            depth.x = -minDistance.x - distance.x;
            
        if (distance.y > 0)
            depth.y = minDistance.y - distance.y;
        else
            depth.y = -minDistance.y - distance.y;

        return depth;
    }
    intersection(rect){
        let xmin = Math.max(this.left, rect.left);
        let xmax = Math.min(this.right, rect.right);
        let ymin = Math.max(this.top, rect.top);
        let ymax = Math.min(this.bottom, rect.bottom);
        return new Rectangle(xmin, ymin, xmax - xmin, ymax - ymin);
    }
    draw(){
        canvas2D.drawRectangle(this.x, this.y, this.width, this.height);
    }
}