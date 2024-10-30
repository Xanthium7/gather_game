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
        map.layers.forEach((layer, index) => {
            map.createLayer('index', 'RPG_ahh', 0, 0)
        })

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