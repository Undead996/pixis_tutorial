import * as PIXI from 'pixi.js';


let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

const app = new PIXI.Application({width: 512, height: 512, antialias: true,});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;

const TextureCache = PIXI.utils.TextureCache;
const Sprite = PIXI.Sprite;
const Loader = PIXI.Loader.shared;
const resources = PIXI.Loader.shared.resources;

Loader.add("assets/tiles/treasureHunter.json")
.load(setup);

let dungeon, explorer, treasure, id, door, blob;

function setup() {
     //1. Access the `TextureCache` directly
    const dungeonTexture = TextureCache["dungeon.png"];
    dungeon = new Sprite(dungeonTexture);
    app.stage.addChild(dungeon);

    //2. Access the texture using through the loader's `resources`:
    explorer = new Sprite(
        resources["assets/tiles/treasureHunter.json"].textures["explorer.png"]
    );
    explorer.x = 68;

    //Center the explorer vertically
    explorer.y = app.stage.height / 2 - explorer.height / 2;
    app.stage.addChild(explorer);

    //3. Create an optional alias called `id` for all the texture atlas 
    //frame id textures.
    id = resources["assets/tiles/treasureHunter.json"].textures; 
  
    //Make the treasure box using the alias
    treasure = new Sprite(id["treasure.png"]);
    app.stage.addChild(treasure);

    //Position the treasure next to the right edge of the canvas
    treasure.x = app.stage.width - treasure.width - 48;
    treasure.y = app.stage.height / 2 - treasure.height / 2;
    app.stage.addChild(treasure);

    const doorT = TextureCache['door.png'];
    door = new Sprite(doorT);
    door.position.set(32, 0);
    app.stage.addChild(door);


    const blobsCount = 6, spacing = 48, xOffset = 150;
    for (let i = 0; i < blobsCount; i++) {
        const blobT = TextureCache['blob.png'];
        blob = new Sprite(blobT);
        let x = spacing * i + xOffset;
        let y = randomInt(0, app.stage.height - blob.height);
        blob.position.set(x, y);
        app.stage.addChild(blob);
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

