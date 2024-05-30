import { ChunkArray } from '@/model/common/chunkArray';
import { GraphContext } from '@/model/common/graph-context';
import { SphereRenderer } from '@/model/body/sphere';
import { JuiceLoader } from '@/utils/juiceloader';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DynamicObjectRenderer } from '@/model/body/dynamic-object';

@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.scss']
})
export class ThreeViewerComponent implements AfterViewInit, OnDestroy {

  @ViewChild('modelviewer') el: ElementRef<HTMLDivElement>;

  graphContext: GraphContext;
  light: THREE.AmbientLight;

  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshNormalMaterial>;
  observer: ResizeObserver;
  dynamicObjectRenderers: DynamicObjectRenderer[] = [];

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
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1E6 );
    camera.position.y = - 100;

    this.light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(this.light);

    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop( (time, frame) =>  { this.animation(time) });

    const controls = new OrbitControls(camera, renderer.domElement );
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


    const a = new SphereRenderer(this.graphContext,
        {
          name: 'callisto',
          radii: [4, 4, 4],
          positionsChunkArray: new ChunkArray()
        }
      );

    this.dynamicObjectRenderers.push(a);
  }


  onWindowResize() {
    this.graphContext.resize();
  }


   animation( time ) {
    this.graphContext.render()
    this.dynamicObjectRenderers.forEach((body)=> {
      body.next(time);
    });
  }


}
