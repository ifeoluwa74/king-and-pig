"use strict";

class Level extends GameObjectList{
    constructor(levelIndex, id){
     super(id)
    this.levelIndex = levelIndex;
    this.collisionBlocks = null;
    this.times =  0;
    
    this.level = window.LEVELS[this.levelIndex].tiles;

    this.liveBar = new spriteGameObject(sprites.liveBar,ID.layer_overlays);
    this.liveBar.position = new Vector2(30,10);
    this.add(this.liveBar);

    for(let i = 0;i < 3;i++){
        let row = Math.floor(i / 5);
        let column = i % 5;
        this.live = new spriteGameObject(sprites.bigHeartIdle,ID.layer_overlays,ID.live);
        this.live.position = new Vector2(column * (this.live.width) + 59,row *(this.live.height + 10) + 42);
        this.live.sheetIndex = i + 1;
        this.add(this.live);
    }

    this.levelCompleted = new Button(sprites.welldoneClick,ID.layer_overlays);
   

    this.levelCompleted.position = new Vector2(this.levelCompleted.screenCenterX,this.levelCompleted.screenCenterY);


    this.doorPosition = window.LEVELS[this.levelIndex].doorPosition;


    this.door = new Door(new Vector2(this.doorPosition.x,this.doorPosition.y),ID.layer_objects,ID.door);
    
    this.add(this.door);

    this.quitButton = new Button(sprites.buttonQuit,ID.layer_overlays);
    this.quitButton.position = new Vector2(game._size.x - 150,10);
    this.add(this.quitButton)
   

    this.playerPosition = window.LEVELS[this.levelIndex].startPosition;
 
    console.log(this.playerPosition)

    // this.reset();  
    this.loadObject();
    }

    reset(){
        let player = this.root.find(ID.player);
        player.reset(this.playerPosition.x,this.playerPosition.y);

        let Door = this.root.find(ID.door);
        Door.reset(new Vector2(this.doorPosition.x,this.doorPosition.y))
    }

    loadObject(){
    let parseCollision;
    let background = null;

    switch(this.levelIndex){
        case 0:
            background = new spriteGameObject(sprites.backgroundLevel3,ID.layer_background);
        break;
        case 1:
            background = new spriteGameObject(sprites.backgroundLevel2,ID.layer_background); 
            break;
        case 2:
             background = new spriteGameObject(sprites.backgroundLevel1,ID.layer_background);
             break;
        case 3:
                background = new spriteGameObject(sprites.backgroundLevel3,ID.layer_background);
            break;
        case 4:
                background = new spriteGameObject(sprites.backgroundLevel2,ID.layer_background); 
                break;
        case 5:
                 background = new spriteGameObject(sprites.backgroundLevel1,ID.layer_background);
                break;
        case 6:
                    background = new spriteGameObject(sprites.backgroundLevel3,ID.layer_background);
                break;
        case 7:
                    background = new spriteGameObject(sprites.backgroundLevel2,ID.layer_background); 
                    break;
        case 8:
                     background = new spriteGameObject(sprites.backgroundLevel1,ID.layer_background);
    }
    this.add(background);
    
    parseCollision = this.level.parse2D();
    
    this.collisionBlocks = parseCollision.createObjectsFrom2D();

    this.add(this.collisionBlocks);
    
    this.add(
        new Player(
            new Vector2(this.playerPosition.x,this.playerPosition.y),
            this.levelIndex,
            this.collisionBlocks,
            this.door,
            ID.layer_objects,
            ID.player
        )
    );

    
    }
    update(delta){
        GameObjectList.prototype.update.call(this,delta);

        let door = this.root.find(ID.door);
        let player = this.root.find(ID.player).boundingBox;

        if(this.door.boundingBox.intersects(player) && Keyboard.pressed(Keys['I'])){
                this.door.open();
                this.finished = true;
                this.add(this.levelCompleted);
                window.LEVELS[this.levelIndex].solved = true;
        }

        // if((door.boundingBox).intersects(player) && Keyboard.pressed(Keys['I']) && this.times === 0){
        //     this.times += 1;
        //     // this.door.open();
        //     this.finished = true;
        //     this.add(this.levelCompleted);
        //     window.LEVELS[this.levelIndex].solved = true;
        // }
    }
    handleInput(delta){
        GameObjectList.prototype.handleInput.call(this,delta);
        
        if(this.quitButton.down){
            gameStateManager.switchTo(ID.game_state_levelselect);
            this.reset();
        }

        if(this.levelCompleted.down){
            let playingState = gameStateManager.get(ID.game_state_playing);
            playingState.nextLevel();
        }
    }
    
    
}