// add styles
import './style.css'
// three.js
import * as T from 'three'

import * as OrbitControls from 'three-orbitcontrols';

import * as M from './model'

// create the scene
let scene = new T.Scene()

// create the camera
let camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000)

let renderer = new T.WebGLRenderer()
// set size
renderer.setSize(window.innerWidth, window.innerHeight)

// add canvas to dom
document.body.appendChild(renderer.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement);

// add axis to the scene
let axis = new T.AxesHelper(10000)
scene.add(axis)

const sunLight = new T.PointLight(0xffffff, 1.0)
scene.add(sunLight)

// debug box
const box = M.createBox()
box.position.x = 1000
box.position.y = 500
scene.add(box)

const model = M.createModel(scene)

camera.position.x = 1000
camera.position.y = 1000
camera.position.z = 1000

//camera.lookAt(scene.position)
const targetPlanet = model.earth.planet
camera.lookAt(targetPlanet.position)
orbitControls.target = targetPlanet.position

function advanceState(): void {
    let timer = 0.0005 * Date.now()

    const moon = model.earth.satellites[0];
    moon.position.set(
        Math.cos(timer) * 20,
        0,
        Math.sin(timer) * 20
      )
}

function animate(): void {
    requestAnimationFrame(animate)
    advanceState()
    render()
}

function render(): void {
    renderer.render(scene, camera)
}

animate()
