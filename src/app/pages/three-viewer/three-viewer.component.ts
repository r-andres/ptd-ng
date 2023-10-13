import { JuiceLoader } from '@/utils/juiceloader';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.scss']
})
export class ThreeViewerComponent implements AfterViewInit, OnDestroy {

  @ViewChild('modelviewer') el: ElementRef;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  light: THREE.AmbientLight;
  renderer: THREE.WebGLRenderer;
  controls: any;
  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshNormalMaterial>;
  observer: ResizeObserver;

  constructor() {
    this.observer = new ResizeObserver(entries => {
      this.onWindowResize();
    });
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.el.nativeElement);
    this.renderer.setAnimationLoop(null);
  }
  
  ngAfterViewInit(): void {

    this.init();
    this.observer.observe(this.el.nativeElement);
  }



  init() {

    const element = this.el.nativeElement;

    const height = window.innerHeight * 0.85;
    const width = element.clientWidth;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    this.camera.position.z = 1;

    const loader = new JuiceLoader(this.scene, 'juice_low_resolution_v03.obj');

    this.light = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(this.light);


    this.renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    this.renderer.setSize(width, height);
    this.renderer.setAnimationLoop( (time, frame) =>  { this.animation(time) });

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    element.appendChild(this.renderer.domElement);

  }


  onWindowResize() {
    const element = this.el.nativeElement;
    const footerHeaderHeights = 101; // pixels
    const height = window.innerHeight - footerHeaderHeights;
    const width = element.clientWidth;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }


   animation( time ) {
    this.renderer.render( this.scene, this.camera );
    console.log(time);
  }


}
