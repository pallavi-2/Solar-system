import * as THREE from "three";

export default function asteroid()
{
    
    const asteroidMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    
    const asteroidBelt = new THREE.Group();
    for (let i = 0; i < 200; i++) {
        let size =Math.ceil( (Math.random()*10));
        const asteroidGeometry = new THREE.IcosahedronGeometry(0.1*Math.random(), size, size);
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    
        const angle = Math.random() * Math.PI * 2;
        const radius = 6 + Math.random()*0.3 ; // Between the orbits of Earth and Mars
        asteroid.position.x = Math.cos(angle) * radius;
        asteroid.position.z = Math.sin(angle) * radius;
        asteroid.position.y = (Math.random()) *0.5; // Some variation in y-axis
    
        asteroidBelt.add(asteroid);
    }
    return asteroidBelt;

}
    
