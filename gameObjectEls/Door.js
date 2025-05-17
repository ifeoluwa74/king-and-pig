"use strict";

class Door extends AnimatedGameObject{
    constructor(position,layer,id){
        super(layer,id)
        this.position = position;
        this.loadAnimation(sprites.doorIdle,'idle',false);
        this.loadAnimation(sprites.doorOpen,'open',false,0.05);
        this.reset(this.position)
    }
    reset(position){
        this.position = position;
        this.playAnimation('idle');
    }
    open(){
        this.playAnimation('open');
    }
}