/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";


export class xWings extends GrObject{
    constructor(track){
      let cylinders = [];
      let geometry = [];
      let materials = [];
      let box = [];
      //main-body
      geometry[0] = new T.CylinderGeometry( 0.5, 0.5,6, 8 );
      materials[0] = new T.MeshStandardMaterial( {color: "grey", roughness: 1.0} );
      cylinders[0] = new T.Mesh( geometry[0], materials[0]);
      cylinders[0].scale.set(0.5,0.5,0.5);
      cylinders[0].position.y = 4;
      cylinders[0].rotateX(Math.PI/2);
      //scene.add( cylinders[0] );
  
      //upper-jet-1
      geometry[1] = new T.CylinderGeometry( 0.4, 0.4,2, 32);
      cylinders[1] = new T.Mesh( geometry[1], materials[0]);
      cylinders[1].position.y = -2.1;
      cylinders[1].position.x = 0.65;
      cylinders[1].position.z = -0.5;
      cylinders[0].add(cylinders[1]);
  
      //upper-jet-2
      cylinders[2] = new T.Mesh( geometry[1], materials[0]);
      cylinders[2].position.y = -2.1;
      cylinders[2].position.x = -0.65;
      cylinders[2].position.z = -0.5;
      cylinders[0].add(cylinders[2]);
  
      //lower-jet-1
      cylinders[3] = new T.Mesh( geometry[1], materials[0]);
      cylinders[3].position.y = -2.1;
      cylinders[3].position.x = 0.65;
      cylinders[3].position.z = 0.5;
      cylinders[0].add(cylinders[3]);
  
      //lower-jet-2
      cylinders[4] = new T.Mesh( geometry[1], materials[0]);
      cylinders[4].position.y = -2.1;
      cylinders[4].position.x = -0.65;
      cylinders[4].position.z = 0.5;
      cylinders[0].add(cylinders[4]);
  
      //cock-pit
      geometry[5] = new T.ConeGeometry(0.3,2,5);
      geometry[6] = new T.BoxGeometry(0.5,2,0.4);
      materials[1]= new T.MeshStandardMaterial( {color: "white", roughness: 0.0} );
      let head1 = new T.Mesh(geometry[5],materials[1]);
      let head2 = new T.Mesh(geometry[6],materials[1]);
      head1.position.z = -0.5;
      head2.position.z = -0.5;
      head2.position.y = -2;
      cylinders[0].add(head1,head2);
  
      //wings-1
      geometry[7] = new T.BoxGeometry(4.5,0.16,2);
      box[0] = new T.Mesh(geometry[7],materials[0]);
      box[0].position.y = -2.1;
      box[0].position.x = 2.5;
      box[0].position.z = -0.9;
      box[0].rotateX(Math.PI/2);
      box[0].rotateZ(-Math.PI/8);
      cylinders[0].add(box[0]);
  
  
      //wings-2
      box[1] = new T.Mesh(geometry[7],materials[0]);
      box[1].position.y = -2.1;
      box[1].position.x = -2.5;
      box[1].position.z = -0.9;
      box[1].rotateX(Math.PI/2);
      box[1].rotateZ(Math.PI/8);
      cylinders[0].add(box[1]);
  
  
      //wings-3
      box[2] = new T.Mesh(geometry[7],materials[0]);
      box[2].position.y = -2.1;
      box[2].position.x = 2.5;
      box[2].position.z = 0.9;
      box[2].rotateX(Math.PI/2);
      box[2].rotateZ(Math.PI/8);
      cylinders[0].add(box[2]);
  
      //wings-4
      box[3] = new T.Mesh(geometry[7],materials[0]);
      box[3].position.y = -2.1;
      box[3].position.x = -2.5;
      box[3].position.z = 0.9;
      box[3].rotateX(Math.PI/2);
      box[3].rotateZ(-Math.PI/8);
      cylinders[0].add(box[3]);
  
      //gun-1
      geometry[8] = new T.CylinderGeometry(0.15,0.15,3,32);
      cylinders[5] = new T.Mesh( geometry[1], materials[0]);
      cylinders[5].position.z = -1.3;
      cylinders[5].position.x = 4;
      cylinders[1].add(cylinders[5]);
  
      cylinders[6] = new T.Mesh( geometry[8], materials[0]);
      cylinders[6].position.y = 2.5;
      cylinders[5].add(cylinders[6]);
  
      //gun-2
      cylinders[7] = new T.Mesh( geometry[1], materials[0]);
      cylinders[7].position.z = -1.3;
      cylinders[7].position.x = -4;
      cylinders[2].add(cylinders[7]);
  
      cylinders[8]= new T.Mesh(geometry[8],materials[0]);
      cylinders[8].position.y = 2.5;
      cylinders[7].add(cylinders[8]);
  
      //gun-3
      cylinders[9] = new T.Mesh( geometry[1], materials[0]);
      cylinders[9].position.z = 1.3;
      cylinders[9].position.x = 4;
      cylinders[3].add(cylinders[9]);
  
      cylinders[10]= new T.Mesh(geometry[8],materials[0]);
      cylinders[10].position.y = 2.5;
      cylinders[9].add(cylinders[10]);
  
  
      //gun-4
      cylinders[11] = new T.Mesh( geometry[1], materials[0]);
      cylinders[11].position.z = 1.3;
      cylinders[11].position.x = -4;
      cylinders[4].add(cylinders[11]);
  
      cylinders[12]= new T.Mesh(geometry[8],materials[0]);
      cylinders[12].position.y = 2.5;
      cylinders[11].add(cylinders[12]);
  
      //ship-tip
      geometry[9] = new T.ConeGeometry(0.5,1,8);
      let tip = new T.Mesh(geometry[9],materials[0]);
      tip.position.y = 3.5;
      cylinders[0].add(tip);
  
      //propeller-1
      geometry[10] = new T.BoxGeometry(3,0.1,0.3);
      box[4] = new T.Mesh(geometry[10],materials[0]);
      cylinders[5].add(box[4]);
      box[4].position.y= -1;
      //propeller-2
      box[5] = new T.Mesh(geometry[10],materials[0]);
      cylinders[7].add(box[5]);
      box[5].position.y= -1;
      //propeller-3
      box[6] = new T.Mesh(geometry[10],materials[0]);
      cylinders[9].add(box[6]);
      box[6].position.y= -1;
      //propeller-3
      box[7] = new T.Mesh(geometry[10],materials[0]);
      cylinders[11].add(box[7]);
      box[7].position.y= -1;
      let xw = cylinders[0];
    
      xw.scale.set(1,1,1);
      
      super("xw",xw);
      this.p = [];
      this.p.push(box[4]);
      this.p.push(box[5]);
      this.p.push(box[6]);
      this.p.push(box[7]);
      this.track = track;
      this.rideable = this.objects[0];
      this.u = 0;
    }
     /** 
     * @param {number} delta
     * @param {number} timeOfDay
     *
     */
      stepWorld(delta, timeOfDay) {
        let deltaSlowed = delta / 200;
        for(let i = 0; i <4;i++){
          this.p[i].rotateY(deltaSlowed*4);
        }
        this.u += delta / 2000;
        let pos = this.track.eval(this.u);
        let dir = this.track.tangent(this.u);
        let zAngle = Math.atan2(dir[2], dir[0]);
        this.objects[0].position.set(pos[0] , pos[1] - Math.sin(zAngle)*10, pos[2]);
        
        // turn the object so the Z axis is facing in that direction
        this.objects[0].rotation.y = -zAngle - Math.PI / 2;
        //this.objects[0].rotateZ(-zAngle - Math.PI / 2);
      }
  }

export class tieFighter extends GrObject{
    constructor(track){
      let geoms = [];
      let mats = [];
      let obs = [];
      let texts = [];
      geoms[0] = new T.SphereGeometry(1,32,32);
      mats[0] = new T.MeshStandardMaterial({color:"grey"});
      let tf = new T.Mesh(geoms[0],mats[0]);
  
      geoms[1] = new T.CylinderGeometry(0.5,0.3,1.5,32);
      let materials2 = [];
      texts[0] = new T.TextureLoader().load("./images/222.png");
      materials2[0] = new T.MeshBasicMaterial({map:texts[0]});
      materials2[1] = new T.MeshBasicMaterial({color:"grey"});
      materials2[2] = new T.MeshBasicMaterial({color:"grey"});
      mats[1] = materials2;
      obs[0] = new T.Mesh(geoms[1],mats[1]);
      obs[1] = obs[0].clone();
      obs[0].position.x = 1.6;
      obs[0].rotateZ(Math.PI/2);
      tf.add(obs[0]);
      
      obs[1].position.x = -1.6;
      obs[1].rotateZ(-Math.PI/2);
      tf.add(obs[1]);
  
  
      geoms[2] = new T.CylinderGeometry(3,3,1,6);
      let materials1 = [];
      texts[1] = new T.TextureLoader().load("./images/111.png");
      materials1[0] = new T.MeshBasicMaterial({color:"grey"});
      materials1[1] = new T.MeshBasicMaterial({map:texts[1]});
      materials1[2] = new T.MeshBasicMaterial({map:texts[1]});
      mats[2] = materials1;
      obs[2] = new T.Mesh(geoms[2],mats[2]);
      obs[2].position.y =-0.8;
      obs[2].scale.set(1.5*0.8,0.1*0.8,1*0.8);
      obs[0].add(obs[2]);
  
      obs[3] = obs[2].clone();
      obs[1].add(obs[3]);
  
      geoms[3] = new T.RingGeometry( 0.5, 2, 6 );
      mats[1] = new T.MeshBasicMaterial( { color: "black", side: T.DoubleSide } );
      obs[4] = new T.Mesh( geoms[3], mats[1] );
      obs[4].scale.set(0.3,0.3,0.3);
      tf.add(obs[4]);
      obs[4].position.z = 0.9;
      tf.position.z = 10;
      tf.position.y = 10;
      
      super("tf",tf);
      
      this.track = track;
      this.u = 0.25;
      
      
     
    
    }
    /** 
     * @param {number} delta
     * @param {number} timeOfDay
     *
     */
     stepWorld(delta, timeOfDay) {
      
      this.u += delta / 2000;
      let pos = this.track.eval(this.u);
      let dir = this.track.tangent(this.u);
      let zAngle = Math.atan2(dir[2], dir[0]);
      this.objects[0].position.set(pos[0]  , pos[1] + Math.sin(zAngle)*10, pos[2]);
      
      this.objects[0].rotation.y = -zAngle - Math.PI / 2;
      
      //this.objects[0].rotateZ(-zAngle - Math.PI / 2);
    }
  }

export class track extends GrObject{
    constructor(params = {}) {
      let radius = params.radius || 20;
      let group = new T.Group();
      group.translateX(params.x || 0);
      group.translateY(params.bias || 0.1); // raise track above ground to avoid z-fight
      group.translateZ(params.z || 0);
      super(`CircularTrack`, group);
      this.x = params.x || 0;
      this.z = params.z || 0;
      this.y = params.bias || 50;
      this.r = radius;
    }
    eval(u) {
      let p = u * 2 * Math.PI;
      return [
        this.x + this.r * Math.cos(p),
        this.y,
        this.z + this.r * Math.sin(p),
      ];
    }
    tangent(u) {
      let p = u * 2 * Math.PI;
      // unit tangent vector - not the real derivative
      return [Math.sin(p), 0, -Math.cos(p)];
    }
  }
  
 