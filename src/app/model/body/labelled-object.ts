import * as THREE from 'three';
import { GraphContext } from '../common/graph-context';
import { SpriteLabel } from '../helper/sprite-labels';



export interface Drawable {
  next(index: number): void;
  remove(): void;
}


export class LabelledObjectRenderer implements Drawable {

  label: THREE.Sprite;
  graphContext: GraphContext;

  constructor(graphContext: GraphContext, name: string) {

    this.graphContext = graphContext;
    this.label = SpriteLabel.generateLabel(this.graphContext.element, name);
    SpriteLabel.setScale(this.label, 
      this.graphContext.camera.fov,
      name.length);

    this.graphContext.scene.add(this.label);
  }

  remove() {
    this.graphContext.scene.remove(this.label);
  }


  next(index: number) {
    // this.drawLabel();
  }
}
