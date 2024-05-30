import * as THREE from 'three';

export class SpriteLabel {

  static FOV_REFERENCE = 5.0;

  static setScale(sprite: any, fov: number, length: number) {
    const scaleX = 0.0025 * (fov / this.FOV_REFERENCE) *length;
    const scaleY = scaleX / length;
    sprite.scale.set(scaleX, scaleY, 0.00001)
  }


  static generateLabel(domElement: HTMLDivElement, name: string) {
    
    const element = SpriteLabel.createCanvas(name);
    domElement.appendChild(element);

    const texture = new THREE.CanvasTexture(element);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      sizeAttenuation: false
    });
    domElement.removeChild(element);

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.visible = true;
    return sprite;
  }

  private static createCanvas(name: string) {

    const fontSize = 30;
    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-label';
    canvas.width = name.length * fontSize;
    canvas.height = fontSize + 10;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.font = fontSize + 'px arial';
    ctx.fillText(name, 0, fontSize);

    return canvas;
  }

}
