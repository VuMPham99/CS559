/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { BackSide, CubeTexture, DoubleSide, FrontSide, Group, MeshBasicMaterial, MeshLambertMaterial, MeshStandardMaterial, Vector2 } from "../libs/CS559-Three/build/three.module.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}
 let geoms = [];
 let mats = [];
 let texts = [];
export class towerOfSauron extends GrObject {
    constructor(){
        geoms[0] = new T.CylinderGeometry(3,3,2,32);
        texts[0] = new T.TextureLoader().load("./images/rock.jpg");
        let materials = [];
        materials[0] = new T.MeshBasicMaterial({map:texts[0]});
        materials[1] = new T.MeshBasicMaterial({color:"black"});
        materials[2] = new T.MeshBasicMaterial({color:"black"});
        mats[0] = materials;
        let tower = new T.Mesh(geoms[0],mats[0]);
        tower.position.y = 1;

        geoms[1]= new T.BoxGeometry(3,3,3);
        mats[1] = new T.MeshStandardMaterial({color:"black"});
        let box1 = new T.Mesh(geoms[1],mats[1]);
        box1.position.y = 2.6;
        tower.add(box1);

        let box2 = box1.clone();
        box2.scale.set(0.7,0.7,0.7);
        box2.position.y = 2.5;
        box1.add(box2);

        let box3 = box2.clone();
        box3.scale.set(0.8,2,0.8);
        box3.position.y = 4.5;
        box2.add(box3);

        geoms[2] = new T.CylinderGeometry(1.5,1.5,0.6,32);
        mats[2] = new T.MeshStandardMaterial({color:"black"});
        let s1 = new T.Mesh(geoms[2],mats[2]);
        s1.position.y = 1.8;
        box3.add(s1);

        let exSettings = {
            steps: 2,
            depth: 0.4,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 2
          };
        let top_curve = new T.Shape();
        top_curve.moveTo(-2, 0.5);
        top_curve.lineTo(0, 1.3);
        top_curve.lineTo(-1, 2);
        top_curve.lineTo(0, 1.3);
        top_curve.lineTo(-2, 0.5);
        top_curve.lineTo(-5, 0.5);
        top_curve.lineTo(-7, 1.3);
        top_curve.lineTo(-6, 2);
        top_curve.lineTo(-7, 1.3);
        top_curve.lineTo(-5, 0.5);
        geoms[3] = new T.ExtrudeGeometry(top_curve, exSettings);
        mats[3] = new T.MeshStandardMaterial({
            color: "black"
          });
        let top = new T.Mesh(geoms[3],mats[3]);
        top.position.x = 3.45;
        top.position.y = -0.1;
        s1.add(top);

        texts[1] = new T.TextureLoader().load("./images/eye.png");
        geoms[4] = new T.SphereGeometry(2,32,32);
        mats[4] = new T.MeshBasicMaterial({map:texts[1]});
        let eye = new T.Mesh(geoms[4],mats[4]);
        eye.position.y = 13.3;
        eye.scale.set(0.55,0.55,0.55);
        eye.rotateY(-Math.PI/2);
        tower.add(eye);
        super("tower",tower);
        
    }
 }
 
export class fireWall extends GrObject{
  constructor(){
    let points = [];
    for ( let i = 0; i < 10; i ++ ) {
      points.push( new T.Vector2( Math.sin( i * 0.2 ) +5 , ( i - 5 ) * 2 ) );
    }
    geoms[5] = new T.LatheGeometry( points );
    texts[2] = new T.TextureLoader().load("./images/fire.jpg");
    mats[5] = new T.MeshBasicMaterial( {side:DoubleSide,map:texts[2]} );
    const lathe = new T.Mesh( geoms[5], mats[5] );
    lathe.position.y = 8;
    lathe.scale.set(7,0.8,7);
    super("fw",lathe);
  }
  /** 
     * @param {number} delta
     * @param {number} timeOfDay
     *
     */
  stepWorld(delta, timeOfDay) {
    this.objects[0].rotateY(delta / 800);  
  }
}

export class tornado extends GrObject{
      constructor(){
        let points = [];
        for ( let i = 0; i < 10; i ++ ) {
          points.push( new T.Vector2( Math.sin( i * 0.2 )*5  , ( i - 5 ) *2 ) );
        }
        geoms[5] = new T.LatheGeometry( points );
        texts[2] = new T.TextureLoader().load("./images/tornado.png");
        mats[5] = new T.MeshBasicMaterial( {side:DoubleSide,map:texts[2]} );
        const lathe = new T.Mesh( geoms[5], mats[5] );
        lathe.position.y = 10;
        //lathe.scale.set(1.5,1,1.5);
        super("tornado",lathe);
      }
      /** 
         * @param {number} delta
         * @param {number} timeOfDay
         *
         */
       stepWorld(delta, timeOfDay) {
         
        this.objects[0].rotateY(delta / 100);  
        let angle = Math.random()*(2*Math.PI)-3;
        let direction = new Vector2(Math.sin(angle), Math.cos(angle));
        
        if(Math.floor(this.objects[0].position.toArray()[0]) > 25){
          this.objects[0].position.x -= (delta/300)*direction.x*10;
        }else{
          this.objects[0].position.x += (delta/300)*direction.x*5;
        }
        if(Math.floor(this.objects[0].position.toArray()[2]) > 25){
          this.objects[0].position.z -= (delta/300)*direction.y*10;
        }else{
          this.objects[0].position.z += (delta/300)*direction.y*5;
        }
      }
    }

let knightCtr = 0;
let ks = new T.Group();
let loader = new OBJLoader();
export class knights extends GrObject{
    constructor(x,y,z,s){   
        let knight = new T.Mesh();
        loader.load("./objects/knight.obj", function(k) {
          knight.add(k);
          knight.position.set(x, y, z);
          knight.scale.set(2,2,2);
        });
        super(`Knights-${knightCtr++}`, knight);
        ks.add(this.objects[0]);
        ks[knightCtr-1] = this.objects[0];
        this.s = s;
        // this.ridePoint = new T.Object3D();
      // this.ridePoint.translateX(20);
      // obs[2].add(this.ridePoint);
      // console.log(this.ridePoint.position.toArray);
      // this.rideable = this.ridePoint;
        
        this.rideable = this.objects[0];
      }
      /** 
       * @param {number} delta
       * @param {number} timeOfDay
       *
       */
       stepWorld(delta, timeOfDay) {
        let deltaSlowed = delta / 200;
        if( this.s == false){
          this.objects[0].translateZ(deltaSlowed);
        
      
          if(Math.floor(this.objects[0].position.toArray()[2])==25.0){
            this.objects[0].rotateY(Math.PI);
      
          }
          if(Math.floor(this.objects[0].position.toArray()[2])==2.0){
            this.objects[0].rotateY(Math.PI);
            
          }
        }   
      }
    }
    let houseCtrs = 0;
    //let simpleHouseCount = 0;
    let simpleHouseGeometry; // one geometry for all
    let simpleHouseTexture;
    let simpleHouseMaterial;
   export class house extends GrObject{
      constructor(params = {}){
        // let geometries = [];
        // let materials = [];
          let w = 2;
          let h = 2;
          let d = 3;
          let r = 1;
          simpleHouseGeometry = new T.Geometry();
          // front vertices
          simpleHouseGeometry.vertices.push(new T.Vector3(0, 0, 0));
          simpleHouseGeometry.vertices.push(new T.Vector3(w, 0, 0));
          simpleHouseGeometry.vertices.push(new T.Vector3(w, h, 0));
          simpleHouseGeometry.vertices.push(new T.Vector3(0, h, 0));
          simpleHouseGeometry.vertices.push(new T.Vector3(w / 2, h + r, 0));
          // back vertices
          simpleHouseGeometry.vertices.push(new T.Vector3(0, 0, d));
          simpleHouseGeometry.vertices.push(new T.Vector3(w, 0, d));
          simpleHouseGeometry.vertices.push(new T.Vector3(w, h, d));
          simpleHouseGeometry.vertices.push(new T.Vector3(0, h, d));
          simpleHouseGeometry.vertices.push(new T.Vector3(w / 2, h + r, d));
          //side vertices-(for door)
          simpleHouseGeometry.vertices.push(new T.Vector3(0, 0, d/3));
          simpleHouseGeometry.vertices.push(new T.Vector3(0, 0, d*2/3));
          simpleHouseGeometry.vertices.push(new T.Vector3(0, h, d*2/3));
          simpleHouseGeometry.vertices.push(new T.Vector3(0, h, d/3));
          //side-roof
          simpleHouseGeometry.vertices.push(new T.Vector3(w/2, h, 0));
          simpleHouseGeometry.vertices.push(new T.Vector3(w/2, h, d));
          //window
          // simpleHouseGeometry.vertices.push(new T.Vector3(5,10,-4));
          // simpleHouseGeometry.vertices.push(new T.Vector3(0,10,-4));
          // simpleHouseGeometry.vertices.push(new T.Vector3(5,10,0));
          // simpleHouseGeometry.vertices.push(new T.Vector3(0,10,0));
    
          // front surface
          simpleHouseGeometry.faces.push(new T.Face3(1, 0, 2));
          simpleHouseGeometry.faces.push(new T.Face3(0, 3, 2));
          simpleHouseGeometry.faces.push(new T.Face3(3, 4, 2));
          // back surface
          simpleHouseGeometry.faces.push(new T.Face3(6, 5, 7));
          simpleHouseGeometry.faces.push(new T.Face3(5, 8, 7));
          simpleHouseGeometry.faces.push(new T.Face3(8, 9, 7));
          // right side
          simpleHouseGeometry.faces.push(new T.Face3(1, 6, 2));
          simpleHouseGeometry.faces.push(new T.Face3(6, 7, 2));
          // left side
          simpleHouseGeometry.faces.push(new T.Face3(0, 10, 3));
          simpleHouseGeometry.faces.push(new T.Face3(10, 13, 3));
          simpleHouseGeometry.faces.push(new T.Face3(10, 11, 13));
          simpleHouseGeometry.faces.push(new T.Face3(11, 12, 13));
          simpleHouseGeometry.faces.push(new T.Face3(11, 5, 12));
          simpleHouseGeometry.faces.push(new T.Face3(5, 8, 12));
          // roof
          simpleHouseGeometry.faces.push(new T.Face3(2, 7, 4));
          simpleHouseGeometry.faces.push(new T.Face3(7, 9, 4));
          simpleHouseGeometry.faces.push(new T.Face3(3, 8, 4));
          simpleHouseGeometry.faces.push(new T.Face3(8, 9, 4));
          //side-roof
          simpleHouseGeometry.faces.push(new T.Face3(2, 14, 4));
          simpleHouseGeometry.faces.push(new T.Face3(14, 3, 4));
          simpleHouseGeometry.faces.push(new T.Face3(2, 14, 4));
          simpleHouseGeometry.faces.push(new T.Face3(14, 2, 4));
          simpleHouseGeometry.faces.push(new T.Face3(7, 15, 9));
          simpleHouseGeometry.faces.push(new T.Face3(15, 8, 9));
          simpleHouseGeometry.faces.push(new T.Face3(7, 15, 9));
          simpleHouseGeometry.faces.push(new T.Face3(15, 7, 9));
          //window
          // simpleHouseGeometry.faces.push(new T.Face3(16, 17, 18));
          // simpleHouseGeometry.faces.push(new T.Face3(17, 19, 18));
    
          let f1 = [
            new T.Vector2(3.3/13,0),
            new T.Vector2(6.5/13,0),
            new T.Vector2(6.5/13,2.9/6.5),
            new T.Vector2(3.3/13,2.9/6.5)
          ];
          let f2 = [
            new T.Vector2(6.4/13,0),
            new T.Vector2(9.6/13,0),
            new T.Vector2(9.6/13,2.9/6.5),
            new T.Vector2(6.4/13,2.9/6.5)
          ];
          let f3 = [
            new T.Vector2(9.6/13,0),
            new T.Vector2(1,0),
            new T.Vector2(1,2.9/6.5),
            new T.Vector2(9.6/13,2.9/6.5)
          ];
          let f4 = [
            new T.Vector2(1.3/13,0),
            new T.Vector2(3.25/13,0),
            new T.Vector2(3.25/13,2.9/6.5),
            new T.Vector2(1.3/13,2.9/6.5)
          ];
          let f5 = [
            new T.Vector2(0,3.2/6.5),
            new T.Vector2(3.3/13,3.2/6.5),
            new T.Vector2(3.3/13,1),
            new T.Vector2(0,1)
          ];
          let f6 =[
            new T.Vector2(3.3/13,2.9/6.5),
            new T.Vector2(4.9/13,2.9/6.5),
            new T.Vector2(6.5/13,2.9/6.5),
            new T.Vector2(4.9/13,4.7/6.5)
          ];
          let f7 = [
            new T.Vector2(0.1/13,0),
            new T.Vector2(1.2/13,0),
            new T.Vector2(1.2/13,1.2/6.5),
            new T.Vector2(0.1/13,1.2/6.5)
          ];
          let f8 = [
            new T.Vector2(0.1/13,1.3/6.5),
            new T.Vector2(1.2/13,1.3/6.5),
            new T.Vector2(1.2/13,2.5/6.5),
            new T.Vector2(0.1/13,2.5/6.5)
          ];
          simpleHouseGeometry.faceVertexUvs[0][0] = [ f1[0], f1[1], f1[3] ];
          simpleHouseGeometry.faceVertexUvs[0][1] = [ f1[1], f1[2], f1[3] ];
          simpleHouseGeometry.faceVertexUvs[0][3] = [ f1[0], f1[1], f1[3] ];
          simpleHouseGeometry.faceVertexUvs[0][4] = [ f1[1], f1[2], f1[3] ];
          simpleHouseGeometry.faceVertexUvs[0][6] = [ f2[0], f2[1], f2[3] ];
          simpleHouseGeometry.faceVertexUvs[0][7] = [ f2[1], f2[2], f2[3] ];
          simpleHouseGeometry.faceVertexUvs[0][8] = [ f3[0], f3[1], f3[3] ];
          simpleHouseGeometry.faceVertexUvs[0][9] = [ f3[1], f3[2], f3[3] ];
          simpleHouseGeometry.faceVertexUvs[0][10] = [ f4[0], f4[1], f4[3] ];
          simpleHouseGeometry.faceVertexUvs[0][11] = [ f4[1], f4[2], f4[3] ];
          simpleHouseGeometry.faceVertexUvs[0][12] = [ f3[0], f3[1], f3[3] ];
          simpleHouseGeometry.faceVertexUvs[0][13] = [ f3[1], f3[2], f3[3] ];
          simpleHouseGeometry.faceVertexUvs[0][14] = [ f5[0], f5[1], f5[3] ];
          simpleHouseGeometry.faceVertexUvs[0][15] = [ f5[1], f5[2], f5[3] ];
          simpleHouseGeometry.faceVertexUvs[0][16] = [ f5[0], f5[1], f5[3] ];
          simpleHouseGeometry.faceVertexUvs[0][17] = [ f5[1], f5[2], f5[3] ];
          simpleHouseGeometry.faceVertexUvs[0][19] = [ f6[1], f6[2], f6[3] ];
          simpleHouseGeometry.faceVertexUvs[0][21] = [ f6[1], f6[2], f6[3] ];
          simpleHouseGeometry.faceVertexUvs[0][23] = [ f6[1], f6[2], f6[3] ];
          simpleHouseGeometry.faceVertexUvs[0][25] = [ f6[1], f6[2], f6[3] ];
          // simpleHouseGeometry.faceVertexUvs[0][26] = [ f7[0], f7[1], f7[3] ];
          // simpleHouseGeometry.faceVertexUvs[0][27] = [ f7[1], f7[2], f7[3] ];
          simpleHouseGeometry.computeFaceNormals();
          simpleHouseTexture = new T.TextureLoader().load("./images/house.jpg");
          simpleHouseMaterial = new T.MeshStandardMaterial({
            color: "white",
            map: simpleHouseTexture,
            roughness: 1.0,
            side: T.DoubleSide,
          });
          let house = new T.Mesh(simpleHouseGeometry, simpleHouseMaterial);
    
          let wgeom = new T.Geometry();
          wgeom.vertices.push(new T.Vector3(5,10,-4));
          wgeom.vertices.push(new T.Vector3(0,10,-4));
          wgeom.vertices.push(new T.Vector3(5,10,0));
          wgeom.vertices.push(new T.Vector3(0,10,0));
    
          wgeom.faces.push(new T.Face3(0, 2, 1));
          wgeom.faces.push(new T.Face3(2, 3, 1));
          wgeom.faceVertexUvs[0][0] = [ f7[0], f7[1], f7[3] ];
          wgeom.faceVertexUvs[0][1] = [ f7[1], f7[2], f7[3] ];
          wgeom.computeFaceNormals();
          let window = new T.Mesh(wgeom, simpleHouseMaterial);
          window.rotation.z = -Math.PI/2;
          window.position.y = 2;
          window.position.x = -2.1;
          window.position.z = 0.9;
          window.scale.set(0.2,0.2,0.2);
          house.add(window);
    
          let w2geom = new T.Geometry();
          w2geom.vertices.push(new T.Vector3(5,10,-4));
          w2geom.vertices.push(new T.Vector3(0,10,-4));
          w2geom.vertices.push(new T.Vector3(5,10,0));
          w2geom.vertices.push(new T.Vector3(0,10,0));
    
          w2geom.faces.push(new T.Face3(0, 2, 1));
          w2geom.faces.push(new T.Face3(2, 3, 1));
          w2geom.faceVertexUvs[0][0] = [ f8[0], f8[1], f8[3] ];
          w2geom.faceVertexUvs[0][1] = [ f8[1], f8[2], f8[3] ];
          w2geom.computeFaceNormals();
          let window2 = new T.Mesh(w2geom, simpleHouseMaterial);
          window2.rotation.z = -Math.PI/2;
          window2.position.y = 2;
          window2.position.x = -2.1;
          window2.position.z = 2.9;
          window2.scale.set(0.2,0.2,0.2);
          house.add(window2);
          house.rotation.y = Math.PI/2;
          house.translateX(params.x || 0);
          house.translateY(params.y || 0);
          house.translateZ(params.z || 0);
        super(`house-${houseCtrs++}`, house);
      }
    }
export function get_Ks(){
    return ks;
}
export function get_Kctr(){
    return knightCtr;
}

// A simple excavator
/**
 * @typedef GolemProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
 export class golem extends GrObject{
  constructor(){
    let golem = new T.Group();
    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.35,
      bevelSize: 0.1,
      bevelSegments: 2
    };
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let body_mat = new T.MeshStandardMaterial({
      color: "grey",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, body_mat);
    base.position.set(-0.9,-0.8,0.22);
    base.rotation.y=Math.PI/2;
    base.scale.set(1.5,2,2);
    base.translateZ(20);
    base.translateY(1);
    golem.add(base);
    
    
    let body_group = new T.Group();
    golem.add(body_group);
    let body_curve = new T.Shape();
    body_curve.moveTo(0, 1);
    body_curve.lineTo(1.2, 3);
    body_curve.lineTo(0.7, 4);
    body_curve.lineTo(0, 4);
    body_curve.lineTo(-0.2, 4.5);
    body_curve.lineTo(-0.7, 4.5);
    body_curve.lineTo(-0.9, 4);
    body_curve.lineTo(-1.6, 4);
    body_curve.lineTo(-2.1, 3);
    body_curve.lineTo(-0.9, 1);
    let body_geom = new T.ExtrudeGeometry(body_curve, exSettings);
    let body = new T.Mesh(body_geom, body_mat);
    body_group.add(body);
    body_group.translateX(20);
    body_group.translateY(1);

    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.5, 0);
    pedestal_curve.lineTo(-0.5, 0.25);
    pedestal_curve.lineTo(0.5, 0.25);
    pedestal_curve.lineTo(0.5, 0);
    pedestal_curve.lineTo(-0.5, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, body_mat);
    pedestal.position.y = 0.6;
    pedestal.position.x = -0.45;
    golem.add(pedestal);
    pedestal.translateX(20);
    pedestal.translateY(1);

    let shoulder_group = new T.Group();
    body_group.add(shoulder_group);
    let shoulder_geom = new T.SphereGeometry(0.6,32,32);
    let shoulder_mat = new T.MeshStandardMaterial({
      color: "grey",
      metalness:0.5,
      roughness:0.7
    });
    let shoulder = new T.Mesh(shoulder_geom,shoulder_mat);
    shoulder.position.set(-2.1,3.6,0.25);
    shoulder_group.add(shoulder);
    
    let arm_group = new T.Group();
    shoulder_group.add(arm_group);
    let arm_geom = new T.CylinderGeometry(0.4,0.4,1,32);
    let arm = new T.Mesh(arm_geom,shoulder_mat);
    arm.position.set(-2.8,3,0.25);
    arm.rotation.z = -Math.PI/4;
    arm_group.add(arm);

    let elbow_group = new T.Group();
    arm_group.add(elbow_group);
    let elbow_geom = new T.SphereGeometry(0.4,32,32);
    let elbow = new T.Mesh(elbow_geom,shoulder_mat);
    elbow.position.set(-3.3,2.5,0.25);
    elbow_group.add(elbow);

    let drill_group = new T.Group();
    elbow_group.add(drill_group);
    let drill_geom = new T.CylinderGeometry(0.3,0.05,2,32);
    let drill = new T.Mesh(drill_geom,shoulder_mat);
    drill.position.set(-4,1.8,0.25);
    drill.rotation.z = -Math.PI/4;
    drill_group.add(drill);
    
    let shoulder_group_tmp = shoulder_group.clone();
    shoulder_group_tmp.position.x = -1;
    shoulder_group_tmp.position.z = 0.5;
    shoulder_group_tmp.rotation.y = Math.PI;
    let shoulder_group2 = shoulder_group_tmp.clone();
    body_group.add(shoulder_group2);

    
    
    super("golem",golem,[
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["spin", 0, 360, 0],
      ["shoulder rotate", -50, 50, 0],
      ["arm rotate", 0, 36, 0],
      ["elbow rotate",-50, 50, 0],
      ["drill rotate", -90, 90, 0],
      ["shoulder2 rotate", -50, 50, 0],
      ["arm2 rotate", 0, 36, 0],
      ["elbow2 rotate",-50, 50, 0],
      ["drill2 rotate", -90, 90, 0],
    ]);
    this.whole_ob = golem;
    this.body = body_group;
    this.shoulder1 = shoulder_group;
    this.shoulder2 = shoulder_group2;
    this.arm1 = arm_group;
    this.elbow1 = elbow_group;
    this.drill1 = drill_group;
    this.arm2 = shoulder_group2.children[1];
    this.elbow2 = shoulder_group2.children[1].children[1];
    this.drill2 = shoulder_group2.children[1].children[1].children[1];
    
    
  }
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.body.rotation.y = degreesToRadians(paramValues[3]);
    this.shoulder1.rotation.y = degreesToRadians(paramValues[4]);
    this.arm1.rotation.z = degreesToRadians(paramValues[5]);
    this.elbow1.rotation.y = degreesToRadians(paramValues[6]);
    this.drill1.rotation.y = degreesToRadians(paramValues[7]);
    this.shoulder2.rotation.y = degreesToRadians(-paramValues[8]);
    this.arm2.rotation.z = degreesToRadians(paramValues[9]);
    this.elbow2.rotation.y = degreesToRadians(paramValues[10]);
    this.drill2.rotation.y = degreesToRadians(paramValues[11]);
  }
}