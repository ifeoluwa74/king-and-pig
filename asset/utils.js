"use strict";

Array.prototype.parse2D = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 16) {
      rows.push(this.slice(i, i + 16))
    }
    return rows
  }
  
  Array.prototype.createObjectsFrom2D = function () {
    const tiles = new TileField(this.length,this[0].length,ID.layer_tiles,ID.tiles);
    
    tiles.cellWidth = game._size.x / this[0].length;
    tiles.cellHeight = game._size.y / this.length;

    console.log(tiles.cellWidth,tiles.cellHeight)
   
    for(let r = 0;r < this.length;r++){
      for(let c = 0;c < this[0].length;c++){
        if(this[r][c] === 292 || this[r][c] === 250){
          tiles.add(
                        new Tile(
                            new Vector2(c * tiles.cellWidth, r * tiles.cellHeight),
                            TileType.normal,
                            ID.tiles
                        )
                  )
        
        }else if(this[r][c] === 0){
          tiles.add(
              new Tile(new Vector2(c * tiles.cellWidth, r * tiles.cellHeight),
                TileType.background,ID.tiles)
          );
        }
      }
    }
    
    return tiles;
  }

  
