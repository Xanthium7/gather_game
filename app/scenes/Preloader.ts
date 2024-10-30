import {Scene} from 'phaser'



export default class Preloader extends Scene {
    constructor() {
        super('preloader');
    }
    preload(){
        this.load.tilemapTiledJSON('testmap', 'assets/tiles/testmap.json')
        this.load.image('tiles', 'assets/tiles/Overworld.png');
       
        this.load.spritesheet('hero', 'assets/tiles/character.png', { frameWidth: 16, frameHeight: 32 });
    }
    create(){
        this.scene.start('testscene')
    }
}