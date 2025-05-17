"use strict";
const handleTouchStart =(evt)=>{
    evt.preventDefault();
    let touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        Touch._touches.push(touches[i]);
        Touch._touchPresses.push(true);
    }
}


const handleTouchMove =(evt)=>{
    evt.preventDefault();
        let touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            let id = Touch.getTouchIndexFromId(touches[i].identifier);
            Touch._touches.splice(id, 1, touches[i]);
        }
}

const handleTouchEnd =(evt)=>{
    evt.preventDefault();
        var touches = evt.changedTouches;
        for (var i = 0; i < touches.length; ++i) {
            var id = Touch.getTouchIndexFromId(touches[i].identifier);
            Touch._touches.splice(id, 1);
            Touch._touchPresses.splice(id, 1);
        }
}


class Touch_Singleton{
    constructor(){
        this._touches = [];
        this._touchPresses = [];
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        document.addEventListener('touchcancel', handleTouchEnd, false);
        document.addEventListener('touchleave', handleTouchEnd, false);
        document.body.addEventListener('touchmove', handleTouchMove, false);
    }
    get nrTouches(){
        return this._touches.length;
    }
    get isTouching(){
        return this._touches.length !== 0;
    }
    get isTouchDevice(){
        return ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);
    }
    getTouchIndexFromId(id){
        for (var i = 0, l = this._touches.length; i < l; ++i) {
            if (this._touches[i].identifier === id)
                return i;
        }
        return -1;
    }
    reset(){
        for (var i = 0, l = this._touchPresses.length; i < l; ++i)
        this._touchPresses[i] = false;
    }
    getPosition(index){
        let canvasScale =  canvas2D.scale;
        let canvasOffset = canvas2D.offset;
        let mx = (this._touches[index].pageX - canvasOffset.x) / canvasScale.x;
        let my = (this._touches[index].pageY - canvasOffset.y) / canvasScale.y;
        return new Vector2(mx, my);
    }
    getIndexInRect(rect){
        for (var i = 0, l = this._touches.length; i < l; ++i) {
            var pos = this.getPosition(i);
            if (rect.contains(pos))
                return i;
        }
        return Vector2.zero;
    }
    containsTouchDown(rect){
        for (var i = 0, l = this._touches.length; i < l; ++i) {
            if (rect.contains(this.getPosition(i)))
                return true;
        }
        return false;
    }
    containsTouchPress(rect){
        for (var i = 0, l = this._touches.length; i < l; ++i) {
            if (rect.contains(this.getPosition(i)) && this._touchPresses[i])
                return true;
        }
        return false;
    }
}


const Touch = new Touch_Singleton();