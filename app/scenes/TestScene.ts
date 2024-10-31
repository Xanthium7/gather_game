import {GridEngine, Direction} from "grid-engine";
import Phaser, {Scene} from "phaser";

export default class TestScene extends Scene {

    private gridEngine!: GridEngine;
    constructor() {
        super('testscene');
    }
    preload(){
       // preloading shi for tge Spash and title screen
       
    }
    create(){
        const map = this.make.tilemap({ key: 'testmap' });
        const tileset = map.addTilesetImage('RPG_ahh', 'tiles')!;
      
        // Create tile layers only
        if (!tileset) {
            console.error('Tileset not found!');
            return;
        }

        // Create tile layers only
        map.layers.forEach((layer) => {
            if (layer.name != 'collision') {
                map.createLayer(layer.name, tileset, 0, 0);
            }
        });

        const heroSprite = this.physics.add.sprite(0, 0, 'hero')

        // Camera follow logic >o<
        this.cameras.main.startFollow(heroSprite, true)
        this.cameras.main.setFollowOffset(-heroSprite.width, -heroSprite.height)


        const gridEngineConfig = {
            characters: [
                {
                    id: 'hero',
                    sprite: heroSprite,
                    startPosition: {x:8, y:8}
                }
            ]
        }
        this.gridEngine = new GridEngine(this);
        this.gridEngine.create(map, gridEngineConfig)
        
    }

    update() {
        const cursor = this.input.keyboard?.createCursorKeys();
        
        if (cursor?.left.isDown) {
            this.gridEngine.move('hero', 'left' as Direction);
        } else if (cursor?.right.isDown) {
            this.gridEngine.move('hero', 'right' as Direction);
        } else if (cursor?.up.isDown) {
            this.gridEngine.move('hero', 'up' as Direction);
        } else if (cursor?.down.isDown) {
            this.gridEngine.move('hero', 'down' as Direction);
        }
          
    }
}