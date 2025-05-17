"use strict";

window.LEVELS = [];
const pushLevel =()=>{
    let solved = false,locked = true;
    let tiles,startPosition = undefined,doorPosition = undefined;
    for(let i = 1; i < 9;i ++){
        if(i === 1)
        locked = false;
        else if(i ===  2)
        locked = false;
        else if(i === 3)
        locked = false;
        else
        locked = true;
       
        switch(i){
            case 1:
                tiles = collisionsLevel3;
                startPosition = new Vector2(1000, 308);
                doorPosition = new Vector2(249,480);
                break;
            case 2:
                tiles = collisionsLevel2;
                startPosition = new Vector2(150, 190);
                doorPosition = new Vector2(1088,480);
                break;
            case 3:
                tiles = collisionsLevel1;
                startPosition = new Vector2(1080, 462);
                doorPosition  =   new Vector2(230,395);
                break;
            case 4:
                tiles = collisionsLevel3;
                startPosition = new Vector2(1000, 282);
                doorPosition = new Vector2(249,480);
                break;
            case 5:
                tiles = collisionsLevel2;
                startPosition = new Vector2(150, 190);
                doorPosition = new Vector2(1088,480);
                break;
            case 6:
                tiles = collisionsLevel1;
                startPosition = new Vector2(1080, 462);
                doorPosition  =   new Vector2(230,395);
                break;
            case  7:
                tiles = collisionsLevel3;
                startPosition = new Vector2(1000, 282);
                doorPosition = new Vector2(249,480);
                break;
            case 8:
                tiles = collisionsLevel2;
                startPosition = new Vector2(150, 190);
                doorPosition = new Vector2(1088,480);
                break;
            
        }
        window.LEVELS.push(
            {
                locked : locked,
                solved : solved,
                tiles : tiles,
                startPosition : startPosition,
                doorPosition: doorPosition
            }
        )
    }
}