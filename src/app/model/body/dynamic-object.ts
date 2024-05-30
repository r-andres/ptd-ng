import { LabelledObjectRenderer } from './labelled-object';
import { GraphContext } from '../common/graph-context';
import { ChunkArray } from '../common/chunkArray';
import * as THREE from 'three';

export interface DynamicObject {
    name: string;
    positionsChunkArray: ChunkArray;
}

export class DynamicObjectRenderer extends LabelledObjectRenderer {

  dynamicObject: DynamicObject;
  shape: THREE.Mesh;

  constructor(graphContext: GraphContext, dynamicObject: DynamicObject, shape: THREE.Mesh) {
    super(graphContext, dynamicObject.name);
    this.dynamicObject = dynamicObject;
    this.shape = shape;

    // Setup label

    var bbox = new THREE.Box3().setFromObject(this.shape);
    this.label.position.z = bbox.getSize(new THREE.Vector3()).z / 1.5 ;
    this.shape.add(this.label);

    // Finally setup the shape in the scene
    this.graphContext.scene.add(this.shape);
  }

  next(index) {
    super.next(index);
    //this.setPosition(index);
    this.shape.rotateZ(THREE.MathUtils.degToRad(0.1));
  }

  private setPosition(index) {
    const position = this.dynamicObject.positionsChunkArray.getIndex(index);
    this.shape.position.fromArray(position);
  }

  remove(): void {
      super.remove();
      this.graphContext.scene.remove(this.shape);
  }

}
