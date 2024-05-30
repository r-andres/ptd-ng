import * as THREE from "three";
import { DynamicObject, DynamicObjectRenderer } from "./dynamic-object";
import { GraphContext } from "../common/graph-context";
import { BodyMaterialLoader } from "../helper/body-material-loader";

export interface Sphere extends DynamicObject {
    radii: number[];
}


export class SphereRenderer extends DynamicObjectRenderer {
    
    constructor(graphContext: GraphContext, sphere: Sphere) {
        const shape = SphereRenderer.generateShape(sphere);
        super(graphContext, sphere, shape);
    }

    
    private static generateShape(sphere: Sphere): THREE.Mesh {
        const radii = sphere.radii;
        const material = BodyMaterialLoader.loadMaterial(sphere.name);
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        geometry.applyMatrix4(new THREE.Matrix4().makeScale(radii[0], radii[2], radii[1]));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(THREE.MathUtils.degToRad(90)))
        const shape =  new THREE.Mesh(geometry, material);

        // Add the axis helper

        const axesHelper = new THREE.AxesHelper( 1.1 * Math.max(...radii));
        shape.add(axesHelper);

        return shape;
    }
}