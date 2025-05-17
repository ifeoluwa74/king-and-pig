"use strict";   
    const requestAnimationFrame =(()=>{
                return window.requestAnimationFrame || 
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame || 
                        ((callBack)=>{
                            window.setTimeout(callBack,1000/60);
                        })
    })();
    const sprites = {};
    const ID = {};
    const sounds = {};
    
 class Game{
    constructor(){
        this.spriteStillLoading = 0;
        this.size = Vector2.zero;
        this.totalSprite = 0;
        this._totalTime = 0;
    }
    get totalTime(){
        return this._totalTime;
    }
    get _size(){
        return this.size;
    }
    get screenRect(){
        return  new Rectangle(0,0,game.size.x,game.size.y);
    }
    start(x, y, canvasName, gameArea){
        this.size = new Vector2(x, y);
        canvas2D.initialize(canvasName, gameArea);
        this.loadAsset();
        this.assetLoadingLoop();
    }
    loadAsset(){
    }
    initialize(){
     
    }
    loadImage(){

    }
    assetLoadingLoop(){
        let percent = Math.round((game.totalSprite -  game.spriteStillLoading) /
        game.totalSprite * 100);

        canvas2D.clear();
        canvas2D.drawRect(new Vector2(550,300),Vector2.zero,Color.black,350,77,true)
        canvas2D.drawRect(new Vector2(550,300),Vector2.zero,Color.white,
        percent/100*350,77
        );
        canvas2D.drawText("Loading "+percent + "%",new Vector2(550,400));

        if(game.spriteStillLoading > 0)
        requestAnimationFrame(game.assetLoadingLoop);
        else{
            game.initialize();
            requestAnimationFrame(game.mainLoop)
        }
    }
    initialize(){

    }
    mainLoop(){
        let delta = 1/60;
         game._totaltime += delta;
            gameStateManager.handleInput(delta);
            gameStateManager.update(delta);
            canvas2D.clear();
            gameStateManager.draw();
            // Keyboard.reset();
        requestAnimationFrame(game.mainLoop);
    }
}

const game = new Game();