
import { GraphContext } from '@/model/common/graph-context';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


export class JuiceLoader {

    private spacecraft: Spacecraft;

    constructor(graphContext: GraphContext, filename: string) {


        const mtlLoader = new MTLLoader();

        mtlLoader.setPath('assets/model/');

        mtlLoader.load(filename + '.mtl', (materials) => {
            materials.preload();
            const loader = new OBJLoader();
            loader.setMaterials(materials);
            loader.setPath('assets/model/');

            // load a resource
            loader.load(
                filename,
                // Function when resource is loaded
                (shape) => {
                    const rotY = new THREE.Quaternion();
                    rotY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
                    const rotZ = new THREE.Quaternion();
                    rotZ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
                    rotZ.multiplyQuaternions(rotY, rotZ);
                    rotZ.normalize();
                    shape.setRotationFromQuaternion(rotZ);
                    const scale = 1E-3;
                    shape.scale.set(scale, scale, scale);
                    this.spacecraft = new Spacecraft(shape, rotZ);
                    graphContext.scene.add(shape);

                }
            );


        }, function () { }, function (error) { console.log(error); });
    }

    getSpacecraft() {
        return this.spacecraft;
    }

}


export class Spacecraft {

    private mesh;
    private rotation: THREE.Quaternion;

    constructor(object, rotation: THREE.Quaternion) {
        this.mesh = object;
        this.rotation = rotation;
    }

    setAttitude(quat: THREE.Quaternion) {
        const newQuat = quat.clone();
        if (this.rotation != null) {
            newQuat.multiplyQuaternions(newQuat, this.rotation);
        }
        newQuat.normalize();
        this.mesh.setRotationFromQuaternion(newQuat);
    }

}