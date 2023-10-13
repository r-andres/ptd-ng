import { GraphContext } from '@/model/graph-context';
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

  graphContext: GraphContext;
  light: THREE.AmbientLight;

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
    this.graphContext.cleanUp();
  }
  
  ngAfterViewInit(): void {

    this.init();
    this.observer.observe(this.el.nativeElement);
  }


  initGraphContext(): void {

    const element = this.el.nativeElement;
    const height = element.clientHeight;
    const width = element.clientWidth;

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = -0.1;

    this.light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(this.light);

    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop( (time, frame) =>  { this.animation(time) });

    this.controls = new OrbitControls(camera, renderer.domElement );
    element.appendChild(renderer.domElement);

    this.graphContext = new GraphContext(
      document, 
      element, 
      renderer,
      scene,
      camera);
  }

  init() {

    this.initGraphContext();
      new JuiceLoader(this.graphContext, 'juice_low_resolution_v03.obj');
  }


  onWindowResize() {
    this.graphContext.resize();
  }


   animation( time ) {
    this.graphContext.render()
  }


}
