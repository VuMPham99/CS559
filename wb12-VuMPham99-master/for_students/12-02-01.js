/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { BackSide, CubeTexture, DoubleSide, FrontSide, Group, MeshBasicMaterial, MeshLambertMaterial, MeshStandardMaterial, Vector2 } from "../libs/CS559-Three/build/three.module.js";
import {main} from "../examples/main.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import {xWings,track,tieFighter} from "./starwar-objects.js";
import {towerOfSauron,fireWall,tornado,knights, get_Kctr, get_Ks, house, golem} from "./LoTR-objects.js";
import {skybox} from "./studio.js";
import { AutoUI } from "../libs/CS559-Framework/AutoUI.js";
 /**m
  * The Graphics Town Main -
  * This builds up the world and makes it go...
  */
 
 // make the world
 let mydiv = document.getElementById("div1");
 let world = new GrWorld({
     width: 800,
     height: 600,
     groundplanecolor: "#1f1816",
     groundplanesize: 50, // make the ground plane big enough for a world of stuff
     where:mydiv,
     
    //  lookat: new T.Vector3(0,10,0),
    //  lookfrom: new T.Vector3(20,30,20),
     
 });
//main(world);
 
 // put stuff into the world
 // this calls the example code (that puts a lot of objects into the world)
 // you can look at it for reference, but do not use it in your assignment
//main(world);
 
 // while making your objects, be sure to identify some of them as "highlighted"
 
 ///////////////////////////////////////////////////////////////
 // because I did not store the objects I want to highlight in variables, I need to look them up by name
 // This code is included since it might be useful if you want to highlight your objects here
 function highlight(obName) {
     const toHighlight = world.objects.find(ob => ob.name === obName);
     if (toHighlight) {
         toHighlight.highlighted = true;
     } else {
         throw `no object named ${obName} for highlighting!`;
     }
 }
//  // of course, the student should highlight their own objects, not these
//  highlight("SimpleHouse-5");
//  highlight("Helicopter-0");
//  highlight("Track Car");
 

 
 // now make it go!

class deathStar {
  constructor(){
    let image = new T.TextureLoader().load("./images/Death_Star.png");
    let shaderMat = shaderMaterial("./shaders/12-grtown.vs", "./shaders/12-grtown.fs", {
      side: T.DoubleSide,
      uniforms: {
        colormap: { value: image },
        red:{value: new T.Vector3(0.5, 0, 0)}
      },
    });  
    let ds = new SimpleObjects.GrSphere({y: 50,material: shaderMat });
    ds.setSegmentation(32,30);
    ds.setScale(10,10,10);
    world.add(ds);
    
  }
 }
let tos = new towerOfSauron();
world.add(tos);
let fw = new fireWall();
world.add(fw);
 new deathStar();
 let tr = new track();
let xw = new xWings(tr);
let sb = new skybox();
world.add(sb);
world.add(xw);
let tf = new tieFighter(tr);
world.add(tf);
let k = new knights(0,1,5,false);
world.add(k);
for (let i = 0 ; i <3;i++){
  for(let j = 0; j <4; j++){
    
    world.add(new knights(-5 + 4*j, 0.5, i+5,true));
  }
}
for(let i = 0; i < 2; i++){
  for (let j = 0; j< 8; j++){
    world.add(new house({x:10+5*i,z:-20+5*j}));
  }
}
let t = new tornado();
world.add(t);
highlight("house-3");
highlight("xw");
highlight("tf");
highlight("Knights-0");
highlight("tornado");
highlight("fw");
highlight("tower");
let gol = new golem();
world.add(gol);
let g_ui = new AutoUI(gol,300,mydiv);
let lastTimestamp; // undefined to start
function animate(timestamp) {
  // Convert time change from milliseconds to seconds
  let knightCtr = get_Kctr();
  let ks = get_Ks();
  if(knightCtr > 1){
    let timeDelta = 0.005 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    lastTimestamp = timestamp;
    
    for(let i = 0; i <knightCtr; i++){
      if(ks[i].s == false){
          ks[i].translateZ(timeDelta);
          if(Math.floor(ks[i].position.toArray()[2])==25.0){
            ks[i].rotateY(Math.PI);
          }
          if(Math.floor(ks[i].position.toArray()[2])==2.0){
            ks[i].rotateY(Math.PI);
          }
    }
  }
  }
  // draw and loop
  world.renderer.render(world.scene, world.active_camera);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
 ///////////////////////////////////////////////////////////////
 // build and run the UI
 // only after all the objects exist can we build the UI
 // @ts-ignore       // we're sticking a new thing into the world
 world.ui = new WorldUI(world);
world.go();
