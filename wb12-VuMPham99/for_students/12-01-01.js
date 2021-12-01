/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { BackSide, CubeTexture } from "../libs/CS559-Three/build/three.module.js";

/**
 * Read in a set of textures from HDRI Heaven, as converted by 
 * https://www.360toolkit.co/convert-spherical-equirectangular-to-cubemap
 * 
 * this uses a specific naming convention, and seems to (usually) swap bottom and front,
 * so I provide to undo this
 * 
 * @param {string} name 
 * @param {string} [ext="png"]
 * @param {boolean} [swapBottomFront=true]
 */
 function cubeTextureHelp(name,ext="png", swapBottomFront=false) {
    return new T.CubeTextureLoader().load([
        name + "_Right."  +ext,
        name + "_Left."   +ext,
        name + "_Top."    +ext,
        name + (swapBottomFront ? "_Front."  : "_Bottom.") +ext,
        name + "_Back."   +ext,
        name + (swapBottomFront ? "_Bottom." : "_Front.")  +ext
    ]);
}
let geoms = [];
let mats = [];
let mydiv = document.getElementById("div1");
let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });

geoms[0] = new T.BoxGeometry(2000,2000,2000);
let textures = cubeTextureHelp("./images/box");
mats[0] = new T.MeshBasicMaterial({envMap:textures,side:BackSide});
let skybox = new T.Mesh(geoms[0],mats[0]);
world.scene.add(skybox);

let bumps = new T.TextureLoader().load("./images/islands.png");
geoms[1] = new T.SphereGeometry(1,32,32);
mats[1] = new T.MeshStandardMaterial({color:"white",metalness:1.0,roughness:0.0,envMap:textures,bumpMap:bumps});

let sphere = new T.Mesh(geoms[1],mats[1]);
sphere.position.y = 2;
world.scene.add(sphere);
world.go();
