
class Enemy extends AnimatedGameObject{
    constructor(position, levelIndex, collisionBlock, door, layer, id){
        super(layer,id)
        this.position = position;
        this.currPosition = position;
        this.levelIndex = levelIndex;
        this.collisionBlock = collisionBlock;
        this.door = door;

        this.walkingSpeed = 400;
        this.gravity = 1100;
        this.velocity = new Vector2(0, 0);

        this._previousYPosition = 0;
        this.onTheGround = true;
        this.alive = true;
        this.invert = false;
        this.finished = false;
        this.gameOver = false;

        this.jumpPressed = false;


        this.loadAnimation(sprites.pigAttack, "attack", true, 0.05);
        this.loadAnimation(sprites.pigDead, "dead", false, 0.05);
        this.loadAnimation(sprites.pigFall, "fall", false);
        this.loadAnimation(sprites.pigGround, "ground", false);
        this.loadAnimation(sprites.pigHit, "hit", false);
        this.loadAnimation(sprites.pigIdle, "idle", true, 0.05);
        // this.loadAnimation(sprites.playerIdleLeft, "idleleft", false, 0.05);
        this.loadAnimation(sprites.pigJump, "jump", false, 0.05);
        this.loadAnimation(sprites.pigRun, "run", true, 0.05);
        // this.loadAnimation(sprites.pigRun, "runleft", true, 0.05);
        // this.loadAnimation(sprites.playerRunRight, "runright", true, 0.05);
    }
    reset(){

    }

    update(delta) {
        if (!this.alive || this.finished) {
            this.velocity.x = 0;
        } 

        // Apply gravity
        if (!this.onTheGround) {
            this.velocity.y += this.gravity * delta;
        }

        // Movement direction
        if (this.velocity.x < 0) this.invert = true;
        else if (this.velocity.x > 0) this.invert = false;

        // Update positions
        this._previousYPosition = this.position.y;
        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;

        // Animation states
        if (this.onTheGround && this.alive && !this.finished) {
            if (this.velocity.x === 0) {
                this.playAnimation("idle");
            } else {
                this.playAnimation("run");
            }
        }


        // // Finish level manually (debug)
        // if (Keyboard.pressed(Keys.I)) {
        //     this.finished = true;
        // }

        // if (this.finished) {
        //     this.levelFinished();
        // }

        // Collision check
        this.handleCollision();

        // Call base update
        super.update(delta);
    }

    handleCollision() {
        this.onTheGround = false;
        const collisionBlocks = this.collisionBlock._gameObjects;
        const boundingBox = this.boundingBox;
        const tiles = this.root.find(ID.tiles);

        if(this.door.boundingBox.intersects(boundingBox) && Keyboard.pressed(Keys['I'])){
            this.finished = true;
            // this.door.open();
            this.playAnimation("doorin");
            this.velocity.x = 0;
            return;
        }

        for (let block of collisionBlocks) {
            if (block.type !== TileType.normal) continue;

            const tileBounds = new Rectangle(
                block.position.x,
                block.position.y,
                tiles.cellWidth,
                tiles.cellHeight
            );

            if (!tileBounds.intersects(boundingBox)) continue;

            const depth = boundingBox.calculateIntersectionDepth(tileBounds);
            
            if (!depth) continue;


            if (Math.abs(depth.y) < Math.abs(depth.x)) {
                // Vertical collision
                this.position.y += depth.y;
                this.velocity.y = 0;

                if (depth.y < 0) {
                    this.onTheGround = true;
                }
            } else {
                // Horizontal collision
                this.position.x += depth.x;
            }
        }
    }

    draw() {
        super.draw();
    }
}