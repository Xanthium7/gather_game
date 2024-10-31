import Phaser, {Scene} from "phaser";

export default class TestScene extends Scene {

    private gridEngine: any;
    constructor() {
        super('testscene');
    }
    preload(){
       // preloading shi for tge Spash and title screen
    }
    create(){
        const map = this.make.tilemap({ key : 'testmap'})
        map.addTilesetImage('RPG_ahh', 'tiles')
        // Corrected code
        const tileset = map.addTilesetImage('RPG_ahh', 'tiles');
        if (tileset) {
            map.layers.forEach((layer) => {
                map.createLayer(layer.name, tileset, 0, 0);
            });
        } else {
            console.error('Tileset is null');
        }

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
        this.gridEngine.create(map, gridEngineConfig)
        
    }

    update() {
        const cursor = this.input.keyboard?.createCursorKeys();
        
        if (cursor?.left.isDown) {
            this.gridEngine.move('hero', 'left');
        } else if (cursor?.right.isDown) {
            this.gridEngine.move('hero', 'right');
        } else if (cursor?.up.isDown) {
            this.gridEngine.move('hero', 'up');
        } else if (cursor?.down.isDown) {
            this.gridEngine.move('hero', 'down');
        }
          
    }
}