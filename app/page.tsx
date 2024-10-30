"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Home = () => {
  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: GridEngine } = await import("grid-engine");
      const Preloader = (await import("./scenes/Preloader")).default;
      const TestScene = (await import("./scenes/TestScene")).default;

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
        scene: [Preloader, TestScene],
        physics: {
          default: "arcade",
          arcade: {
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
      });
    }

    initPhaser();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div id="game-content"></div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
