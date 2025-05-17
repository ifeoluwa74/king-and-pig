"use strict";

class Player extends AnimatedGameObject {
    constructor(position, levelIndex, collisionBlock, door, layer, id) {
        super(layer, id);

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

        // Load animations
        this.loadAnimation(sprites.playerAttack, "attack", true, 0.05);
        this.loadAnimation(sprites.playerDead, "dead", false, 0.05);
        this.loadAnimation(sprites.playerDoorIn, "doorin", false,0.05);
        this.loadAnimation(sprites.playerDoorOut, "doorout", false);
        this.loadAnimation(sprites.playerFall, "fall", false);
        this.loadAnimation(sprites.playerGround, "ground", false);
        this.loadAnimation(sprites.playerHit, "hit", false);
        this.loadAnimation(sprites.playerIdle, "idle", true, 0.05);
        this.loadAnimation(sprites.playerIdleLeft, "idleleft", false, 0.05);
        this.loadAnimation(sprites.playerJump, "jump", false, 0.05);
        this.loadAnimation(sprites.playerRun, "run", true, 0.05);
        this.loadAnimation(sprites.playerRunLeft, "runleft", true, 0.05);
        this.loadAnimation(sprites.playerRunRight, "runright", true, 0.05);

        this.reset(this.position.x, this.position.y);
    }

    reset(x, y) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
        this._previousYPosition = 0;
        this.onTheGround = true;
        this.alive = true;
        this.finished = false;
        this.gameOver = false;
        this.playAnimation("idle");
    }

    handleInput(delta) {
        if (!this.alive || this.finished) return;

        // Horizontal movement
        if (Keyboard.pressed(Keys.left)) {
            this.velocity.x = -this.walkingSpeed;
        } else if (Keyboard.pressed(Keys.right)) {
            this.velocity.x = this.walkingSpeed;
        } else {
            this.velocity.x = 0;
        }

        // Jump input - only allow jump on new press
        if (Keyboard.pressed(Keys.up)) {
            if (this.onTheGround && !this.jumpPressed) {
                this.jump();
                this.jumpPressed = true;
            }
        } else {
            this.jumpPressed = false;
        }
    }

    jump() {
        this.velocity.y = -4000;
        this.playAnimation("jump");
        this.onTheGround = false;
    }

    die(withAnimation) {
        if (!this.alive || this.finished) return;
        this.alive = false;

        if (withAnimation) {
            this.playAnimation("dead");
        }
    }

    levelFinished() {
        this.velocity.x = 0;
        this.playAnimation("doorin");
    }

    update(delta) {
        if (!this.alive || this.finished) {
            this.velocity.x = 0;
        } else {
            this.handleInput(delta);
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
                this.playAnimation(this.invert ? "idleleft" : "idle");
            } else {
                this.playAnimation(this.invert ? "runleft" : "runright");
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
