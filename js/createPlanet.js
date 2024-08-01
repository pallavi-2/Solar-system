import * as THREE from "three";

export default function createPlanet(size,texture,position,ring)
{
    const angle = Math.random() * Math.PI * 2;
    // const radius = position ;
    const loader = new THREE.TextureLoader();
    const planetGeo = new THREE.SphereGeometry(size,30,30)
    const planetMat = new THREE.MeshStandardMaterial({
        map:loader.load(texture)
    })  
    const planetMesh = new THREE.Mesh(planetGeo,planetMat)
    //planetMesh.position.x = position
    planetMesh.position.x = Math.cos(angle) * position
    planetMesh.position.z = Math.sin(angle) * position;

    const planetObj = new THREE.Object3D();
    planetObj.add(planetMesh)   
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshStandardMaterial({
            map: loader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetObj.add(ringMesh);
        ringMesh.position.x = Math.cos(angle) * position;
        ringMesh.position.z = Math.sin(angle) * position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    
    // scene.add(planetObj)
    return {planetMesh,planetObj}
}
