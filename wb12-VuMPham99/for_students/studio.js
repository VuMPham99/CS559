/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { BackSide, CubeTexture, DoubleSide, FrontSide, Group, MeshBasicMaterial, MeshLambertMaterial, MeshStandardMaterial, Vector2 } from "../libs/CS559-Three/build/three.module.js";
 

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
export class skybox extends GrObject{
    constructor(){
      let sb_geom = new T.BoxGeometry(500,500,500);
      let sb_textures = cubeTextureHelp("./images/room");
      let sb_mat = new T.MeshBasicMaterial({envMap:sb_textures,side:BackSide});
      let skybox = new T.Mesh(sb_geom,sb_mat);
      super("sb",skybox);
    }
  }