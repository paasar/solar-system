import './style.css'
import * as T from 'three'

import * as OrbitControls from 'three-orbitcontrols'

import * as C from './constants'
import * as CONTROLS from './controls'
import * as M from './model'

let previousNow = Date.now()
let pause = false

CONTROLS.listenInput({togglePause: () => { pause = !pause }})

let scene = new T.Scene()

// the camera to look around the Solar system from afar
let bigPictureCamera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 20000)

let renderer = new T.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// add canvas to dom
document.body.appendChild(renderer.domElement)

const orbitControls = new OrbitControls(bigPictureCamera, renderer.domElement)

// add axis to the scene
let axis = new T.AxesHelper(10000)
scene.add(axis)

const sunLight = new T.PointLight(0xffffff, 1.0)
scene.add(sunLight)

// dim white light
const ambientLight = new T.AmbientLight( 0x101010 )
scene.add(ambientLight)

const model = M.createModel(scene)

bigPictureCamera.position.x = 1395
bigPictureCamera.position.y = 50
bigPictureCamera.position.z = 100

const targetPlanet = model.earth.planet
bigPictureCamera.lookAt(targetPlanet.position)
orbitControls.target = targetPlanet.position

function tick(): number {
    const now = Date.now()
    const timePassed = pause ? 0 : now - previousNow
    previousNow = now

    return timePassed
}

let moonPosition = {cos: 0, sin: 0}

const speed = 38880 // 38880 = full moon orbit in one minute

function advanceState(): void {
    const timePassed = tick()
    const passedQuotientOfHour = timePassed / C.HOUR_IN_MILLIS

    const earth = model.earth.planet
    const moon = model.earth.satellites[0]

    moveMoon(moon, earth, passedQuotientOfHour)

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

function moveMoon(moon: T.Mesh, earth: T.Mesh, passedQuotientOfHour: number): void {
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
    renderer.render(scene, bigPictureCamera)
}

animate()
