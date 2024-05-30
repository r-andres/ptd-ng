import * as THREE from 'three';

export interface TextureDefinition {
    path: string;
    mapOffset?: number;
    material?: THREE.MeshLambertMaterial;
}


export class BodyMaterialLoader {

    private static loader = new THREE.TextureLoader();

    private static _textures: Map<string, TextureDefinition> =
        new Map([
            ['jupiter', {
                path: '2k_jupiter.jpg',
                mapOffset: 0.5
            }], ['ganymede', {
                path: 'Jupiter_Ganymede.jpg',
            }], ['callisto', {
                path: 'Jupiter_Callisto.jpg',
            }], ['europa', {
                path: 'Jupiter_Europa.jpg',
            }], ['io', {
                path: '1k_io.jpg'
            }], ['mercury', {
                path: '2k_mercury.jpg'
            }], ['venus', {
                path: '2k_venus_surface.jpg'
            }], ['earth', {
                path: '2k_earth_daymap.jpg'
            }], ['moon', {
                path: '2k_moon.jpg'
            }]
        ]);

    static loadMaterial(name: string) {
        const definition = BodyMaterialLoader._textures.get(name.toLowerCase());
        if (definition) {
            const loader = BodyMaterialLoader.loader;
            loader.setPath('assets/img/')
            const texture =loader.load(definition.path);
            texture.wrapS = THREE.RepeatWrapping;
            texture.offset.x = definition.mapOffset ? definition.mapOffset : 0;
            definition.material = new THREE.MeshLambertMaterial({ map: texture });
            return definition.material;
        }
        return  new THREE.MeshBasicMaterial({ wireframe: true });
    }

}