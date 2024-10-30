"use client";
import { Game as GameType } from "phaser";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: GridEngine } = await import("grid-engine");

      // const {default: Preloader} = await import()
      // const {default: TestScene} = await import()
      const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        title: "cool-title",
        parent: "game-content",
        pixelArt: true,
        scale: {
          zoom: 2,
        },
        scene: {
          preload: function () {
            this.load.image("sky", "assets/sky.png");
            this.load.image("ground", "assets/platform.png");
            this.load.image("star", "assets/star.png");
            this.load.image("bomb", "assets/bomb.png");
            this.load.spritesheet("dude", "assets/dude.png", {
              frameWidth: 32,
              frameHeight: 48,
            });
          },
          create: function () {
            this.add.image(400, 300, "sky");
            this.add.image(400, 300, "star");
          },
        },
        physics: {
          default: "arcade",
          arcade: {
            //gravity: { y: 300 },
            debug: true,
          },
        },
        plugins: {
          scene: [
            {
              key: "gridEngine",
              plugin: GridEngine,
              mapping: "gridEngine",
            },
          ],
        },
        backgroundColor: "#000000",
      });
    }
    initPhaser();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <h1>COOL APP</h1>
      <div id="game-content" key="game-content" className=""></div>
    </div>
  );
}
