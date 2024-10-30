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
        map.addTilesetImage('RPG_ahh', 'titles')
        map.layers.forEach((layer, index) => {
            map.createLayer('index', 'RPG_ahh', 0, 0)
        })

        const heroSprite = this.physics.add.sprite(0, 0, 'hero')

        
    }
}