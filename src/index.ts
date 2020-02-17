import './style.css'
import * as T from 'three'

import * as OrbitControls from 'three-orbitcontrols'

import * as C from './constants'
import * as CONTROLS from './controls'
import * as M from './model'

let previousNow = Date.now()
let pause = false

CONTROLS.listenInput({togglePause: () => { pause = !pause }})

// create the scene
let scene = new T.Scene()

// create the camera
let camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 20000)

let renderer = new T.WebGLRenderer()
// set size
renderer.setSize(window.innerWidth, window.innerHeight)

// add canvas to dom
document.body.appendChild(renderer.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)

// add axis to the scene
let axis = new T.AxesHelper(10000)
scene.add(axis)

const sunLight = new T.PointLight(0xffffff, 1.0)
scene.add(sunLight)

// soft white light
const ambience = new T.AmbientLight( 0x101010 )
scene.add(ambience)

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

function tick(): number {
    const now = Date.now()
    const timePassed = pause ? 0 : now - previousNow
    previousNow = now

    return timePassed
}

let moonPosition = {cos: 0, sin: 0}
let moveMoon = true

const speed = 38880 // 38880 = full moon orbit in one minute

function advanceState(): void {
    const timePassed = tick()

    const passedQuotientOfHour = timePassed / C.HOUR_IN_MILLIS

    const earth = model.earth.planet
    const moon = model.earth.satellites[0]

    if (moveMoon) {
        moon.position.copy(earth.position)
        const moonOrbitRadians = rotation(C.MOON_ORBITS_IN_HOUR, passedQuotientOfHour)
        moonPosition = {cos: moonPosition.cos - moonOrbitRadians,
                        sin: moonPosition.sin - moonOrbitRadians}
        moon.position.set(
            moon.position.x + Math.cos(moonPosition.cos) * 20,
            moon.position.y,
            moon.position.z + Math.sin(moonPosition.sin) * 20
        )
        moon.lookAt(earth.position)
        moon.rotateY(-1.2)
        //moveMoon = !moveMoon
    }

    model.sun.rotateY(rotation(C.SUN_TURNS_IN_HOUR, passedQuotientOfHour))
    model.mercury.planet.rotateY(rotation(C.MERCURY_TURNS_IN_HOUR, passedQuotientOfHour))
    model.venus.planet.rotateY(rotation(C.VENUS_TURNS_IN_HOUR, passedQuotientOfHour))
    earth.rotateY(rotation(C.EARTH_TURNS_IN_HOUR, passedQuotientOfHour))
    model.mars.planet.rotateY(rotation(C.MARS_TURNS_IN_HOUR, passedQuotientOfHour))
    model.jupiter.planet.rotateY(rotation(C.JUPITER_TURNS_IN_HOUR, passedQuotientOfHour))
    model.saturn.planet.rotateY(rotation(C.SATURN_TURNS_IN_HOUR, passedQuotientOfHour))
    model.uranus.planet.rotateY(rotation(C.URANUS_TURNS_IN_HOUR, passedQuotientOfHour))
    model.neptune.planet.rotateY(rotation(C.NEPTUNE_TURNS_IN_HOUR, passedQuotientOfHour))
}

function rotation(radiansInHour: number, passedQuotientOfHour: number): number {
    return radiansInHour * passedQuotientOfHour * speed
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
