import * as THREE from 'three';

export class GraphContext {


    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    document: any;
    element: any;
    state: number[];


    constructor(document,
        element,
        renderer: THREE.WebGLRenderer,
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera) {

        this.scene = scene;
        this.camera = camera;
        this.document = document;
        this.element = element;
        this.renderer = renderer;
        this.state = [];
    }


    private getElementState() {
        return [
            this.element.nativeElement.offsetLeft,
            this.element.nativeElement.clientWidth,
            this.element.nativeElement.clientHeight
        ]
    }

    private compareState(a1, a2) {
        return a1.length == a2.length && a1.every(function (v, i) { return v === a2[i] });
    }


    cleanUp() {
        this.renderer.setAnimationLoop(null);
    }

    needsRedraw() {

        var newState = this.getElementState();
        var isRequired = !this.compareState(this.state, newState);
        this.state = newState;
        return isRequired;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    resize() {

        const footerHeaderHeights = 101; // pixels
        const height = window.innerHeight - footerHeaderHeights;
        const width = this.element.clientWidth;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }


}