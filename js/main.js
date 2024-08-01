import * as THREE from "three";
import { EffectComposer, FilmPass, OrbitControls, RenderPass, ShaderPass,UnrealBloomPass } from "three/examples/jsm/Addons.js";
import gsap from 'gsap';
import starsTexture from '../textures/star.png'
import sunTexture from '../textures/2k_sun.jpg'
import mercuryTexture from "../textures/2k_mercury.jpg"
import venusTexture from "../textures/2k_venus_surface.jpg"
import marsTexture from "../textures/2k_mars.jpg"
import earthTexture from "../textures/2k_earth_daymap.jpg"
import jupiterTexture from "../textures/2k_jupiter.jpg"
import saturnTexture from "../textures/2k_saturn.jpg"
import uranusTexture from "../textures/2k_uranus.jpg"
import neptuneTexture from "../textures/2k_neptune.jpg"
import asteroid from "./asteroid.js"
import createPlanet from "./createPlanet.js";

const scene = new THREE.Scene();
const w = window.innerWidth;
const h = window.innerHeight;
const fov =100;

const camera = new THREE.PerspectiveCamera(fov,w/h,0.1,1000)
camera.position.z = 10;

const renderer= new THREE.WebGLRenderer({antialias:true})
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),0.8,0.2,0.1)
composer.addPass(renderPass);
composer.addPass(bloomPass)

const cubeTextureLoader = new THREE.CubeTextureLoader();
    const sceneTexture = cubeTextureLoader.load([
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture,
        starsTexture  
    ]);
    scene.background = sceneTexture;

const pointLight = new THREE.PointLight(0xc36f00,25)
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x333333,5);
scene.add(ambientLight);

let directionLight = new THREE.PointLight(0x999999,5,0,0.2)
scene.add(directionLight)

const loader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(2,30,30)
const sunMat = new THREE.MeshBasicMaterial({
    map:loader.load(sunTexture)
})
const sunMesh = new THREE.Mesh(sunGeo,sunMat)
scene.add(sunMesh) 


const mercury = createPlanet(0.2,mercuryTexture,3)
const venus = createPlanet(0.4,venusTexture,4)
const earth = createPlanet(0.45,earthTexture,5.2)
const mars = createPlanet(0.25,marsTexture,7.5)
const jupiter = createPlanet(1,jupiterTexture,9.5)
const saturn = createPlanet(0.8,saturnTexture,13,{
    innerRadius: 0.9,
    outerRadius: 1.4,
    texture:saturnTexture})
const uranus = createPlanet(0.6,uranusTexture,16)
const neptune = createPlanet(0.55,neptuneTexture,19)
scene.add(mercury.planetObj,venus.planetObj,mars.planetObj,earth.planetObj,jupiter.planetObj,saturn.planetObj,uranus.planetObj,neptune.planetObj)

const asteroidBelt = asteroid();
scene.add(asteroidBelt);


function animate(){
   sunMesh.rotateY(0.002)
    requestAnimationFrame(animate)
    composer.render(scene, camera);
    mercury.planetObj.rotateY(0.02);
    venus.planetObj.rotateY(0.015);
    earth.planetObj.rotateY(0.01);
    mars.planetObj.rotateY(0.009);
    jupiter.planetObj.rotateY(0.004);
    saturn.planetObj.rotateY(0.003);
    uranus.planetObj.rotateY(0.002);
    neptune.planetObj.rotateY(0.001);

    mercury.planetMesh.rotateY(0.2);
    venus.planetMesh.rotateY(0.15);
    earth.planetMesh.rotateY(0.1);
    mars.planetMesh.rotateY(0.4);
    jupiter.planetMesh.rotateY(0.09);
    saturn.planetMesh.rotateY(0.06);
    uranus.planetMesh.rotateY(0.05);
    neptune.planetMesh.rotateY(0.06);


    
}

animate();

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.update();
});