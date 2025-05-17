"use strict";


game.loadAsset = function(){
    const loadImage =(imageName,col,row,createCollisionMask)=>{
        return new SpriteSheet("./asset/"+imageName,col,row,createCollisionMask);
    }

    const loadSound =(sound)=>{
        return new Sound("./asset/sounds/"+sound);
    }

    sounds.music = loadSound("snd_music.mp3",true);


    sprites.backgroundLevel1 =  loadImage("backgrounds/backgroundLevel1.png",1,1);
    sprites.backgroundLevel2 = loadImage("backgrounds/backgroundLevel2.png",1,1);
    sprites.backgroundLevel3 = loadImage("backgrounds/backgroundLevel3.png",1,1);
    sprites.background_title = loadImage("backgrounds/title_menu.png",1,1);
    
    /* Player */
    sprites.playerAttack = loadImage("01-King Human/Attack (78x58).png",3,1);
    sprites.playerDead = loadImage("01-King Human/Dead (78x58).png",4,1);
    sprites.playerDoorIn = loadImage("01-King Human/Door In (78x58).png",8,1);
    sprites.playerDoorOut = loadImage("01-King Human/Door Out (78x58).png");
    sprites.playerFall = loadImage("01-King Human/Fall (78x58).png");
    sprites.playerGround = loadImage("01-King Human/Ground (78x58).png");
    sprites.playerHit = loadImage("01-King Human/Hit (78x58).png");
    sprites.playerIdle = loadImage("01-King Human/Idle (78x58).png",11,1);
    sprites.playerIdleLeft = loadImage("01-King Human/idleLeft.png",11,1);
    sprites.playerJump =  loadImage("01-King Human/Jump (78x58).png",1,1);
    sprites.playerRun = loadImage("01-King Human/Run (78x58).png",8,1);
    sprites.playerRunLeft = loadImage("01-King Human/runLeft.png",8,1);
    sprites.playerRunRight = loadImage("01-King Human/runRight.png",8,1);



    /* OverLays */
    sprites.frameHint = loadImage("overlays/spr_frame_hint.png");
    sprites.gameOverClick = loadImage("overlays/spr_gameover_click.png");
    sprites.gameOverTap = loadImage("overlays/spr_gameover_tap.png");
    sprites.timer = loadImage("overlays/spr_timer.png");
    sprites.welldoneClick = loadImage("overlays/spr_welldone_click.png");
    sprites.welldoneTap = loadImage("overlays/spr_welldone_tap.png");

        /* Enemies */
    sprites.kingPigIdle = loadImage("02-King Pig/Idle (38x28).png",12,1);
    sprites.kingPigAttack = loadImage("02-King Pig/Attack (38x28).png");
    sprites.kingPigDead = loadImage("02-King Pig/Dead (38x28).png");
    sprites.kingPigFall = loadImage("02-King Pig/Fall (38x28).png");
    sprites.kingPigGround = loadImage("02-King Pig/Ground (38x28).png");
    sprites.kingPigHit = loadImage("02-King Pig/Hit (38x28).png");
    sprites.kingPigIdle = loadImage("02-King Pig/Idle (38x28).png");
    sprites.kingPigJump = loadImage("02-King Pig/Jump (38x28).png");
    sprites.kingPigRun = loadImage("02-King Pig/Run (38x28).png");

    
    sprites.pigIdle = loadImage("03-Pig/Idle (34x28).png");
    sprites.pigAttack = loadImage("03-Pig/Attack (34x28).png");
    sprites.pigDead = loadImage("03-Pig/Dead (34x28).png");
    sprites.pigFall = loadImage("03-Pig/Fall (34x28).png");
    sprites.pigGround = loadImage("03-Pig/Ground (34x28).png");
    sprites.pigHit = loadImage("03-Pig/Hit (34x28).png");
    sprites.pigJump = loadImage("03-Pig/Jump (34x28).png");
    sprites.pigRun = loadImage("03-Pig/Run (34x28).png");


    /* Live and Coins */
   
    sprites.bigHeartHit = loadImage("12-Live and Coins/Big Heart Hit (18x14).png");
    sprites.bigHeartIdle = loadImage("12-Live and Coins/Big Heart Idle (18x14).png",8,1);
    sprites.liveBar = loadImage("12-Live and Coins/Live Bar.png");

    /* GUI */

    // sprites.levelLock = loadImage("GUI/level_lock.png");
    sprites.buttonPlay = loadImage("GUI/spr_button_play.png");
    sprites.buttonHelp = loadImage("GUI/spr_button_help.png");
    sprites.buttonQuit = loadImage("GUI/spr_button_quit.png");
    sprites.buttonBack = loadImage("GUI/spr_button_back.png");
    sprites.levelLocked = loadImage("GUI/spr_level_locked.png");
    sprites.levelSolved = loadImage("GUI/unsolved.png");
    sprites.levelUnSolved = loadImage("GUI/unsolved.png");
    sprites.buttonPlayer = loadImage("GUI/spr_buttons_player@3.png");
    // sprites.background_titleMenu = loadImage("backgrounds/titleMenu1.png")
    sprites.window = loadImage("GUI/Window.jpg");
    sprites.background_levelMenu = loadImage("GUI/level__menu.png");
    sprites.background_pause = loadImage("GUI/Window~3.jpg")
    sprites.background_attention = loadImage("GUI/Window~4.jpg")


    sprites.doorIdle = loadImage("11-Door/idle.png");
    sprites.doorOpen = loadImage("11-Door/doorOpen.png",5,1);

    sounds.music.play();
}

game.initialize = function(){
    pushLevel();
       // define the layers
       ID.layer_background = 1;
       ID.layer_background_1 = 2;
       ID.layer_background_2 = 3;
       ID.layer_background_3 = 4;
       ID.layer_tiles = 10;
       ID.layer_objects = 20;
       ID.layer_overlays = 30;
       ID.layer_overlays_1 = 31;
       ID.layer_overlays_2 = 32;
   
       // define object IDs
       ID.door = 0;
       ID.player = 1;
       ID.live = 2;
       ID.tiles = 3;
       ID.exit = 4;
    //    ID.hint_timer = 5;
    //    ID.button_walkleft = 6;
    //    ID.button_walkright = 7;
       ID.button_jump = 8;
        ID.game_state_title = gameStateManager.add(new TitleMenuState());
        //    ID.game_state_help = gameStateManager.add(new HelpState());
        ID.game_state_playing = gameStateManager.add(new PlayingState());
       ID.game_state_levelselect = gameStateManager.add(new LevelMenuState());
    //    ID.game_state_gameover = gameStateManager.add(new GameOverState());

    //    ID.game_state_levelfinished = gameStateManager.add(new LevelFinishedState());
       gameStateManager.switchTo(ID.game_state_title);
}