// add styles
import './style.css'
// three.js
import * as T from 'three'

import * as OrbitControls from 'three-orbitcontrols';

import * as C from './controls'
import * as M from './model'

let previousNow = Date.now()
let currentTick = previousNow
let pause = false

C.listenInput({togglePause: () => { pause = !pause}})

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

const ambience = new T.AmbientLight( 0x101010 ); // soft white light
scene.add( ambience );

// debug box
const box = M.createBox()
box.position.x = 1000
box.position.y = 500
scene.add(box)

const model = M.createModel(scene)

camera.position.x = 1395
camera.position.y = 50
camera.position.z = 100

const targetPlanet = model.earth.planet
camera.lookAt(targetPlanet.position)
orbitControls.target = targetPlanet.position

let moveMoon = true

function nextTick(speed: number) {
    const now = Date.now()
    const timePassed = pause ? 0 : now - previousNow
    previousNow = now

    const nextTick = currentTick + timePassed
    currentTick = nextTick
    return 0.001 * nextTick * speed
}

function advanceState(): void {
    const speed = 10
    const tick = nextTick(speed)

    const earth = model.earth.planet
    const moon = model.earth.satellites[0];

    if (moveMoon) {
        //~27.322 d orbit & rotation
        moon.position.copy(earth.position);
        moon.position.set(
            moon.position.x + Math.cos(-tick * 0.01) * 20,
            moon.position.y,
            moon.position.z + Math.sin(-tick * 0.01) * 20
        )
        moon.lookAt(earth.position)
        moon.rotateY(-1.2)
        //moveMoon = !moveMoon
    }

    if (!pause) {
        //TODO correct rotation speeds
        const baseRotation = 0.005 * speed
        model.sun.rotateY(baseRotation / 10)
        model.mercury.planet.rotateY(baseRotation)
        model.venus.planet.rotateY(baseRotation)
        earth.rotateY(baseRotation)
        model.mars.planet.rotateY(baseRotation)
        model.jupiter.planet.rotateY(baseRotation / 5)
        model.saturn.planet.rotateY(baseRotation / 5)
        model.uranus.planet.rotateY(baseRotation)
        model.neptune.planet.rotateY(baseRotation)
    }
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
