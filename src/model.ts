import * as T from 'three'
import * as A from './assets'
import * as C from './constants'

class Planet {
    planet: T.Mesh;
    satellites: Array<T.Mesh>;

    constructor(
        planet: T.Mesh,
        satellites: Array<T.Mesh> = []
    ) {
        this.planet = planet;
        this.satellites = satellites;
    }
}

class Model {
    sun: T.Mesh;
    mercury: Planet;
    venus: Planet;
    earth: Planet;
    mars: Planet;
    jupiter: Planet;
    saturn: Planet;
    uranus: Planet;
    neptune: Planet;

    constructor(
        sun: T.Mesh,
        mercury: Planet,
        venus: Planet,
        earth: Planet,
        mars: Planet,
        jupiter: Planet,
        saturn: Planet,
        uranus: Planet,
        neptune: Planet
    ) {
        this.sun = sun;
        this.mercury = mercury;
        this.venus = venus;
        this.earth = earth;
        this.mars = mars;
        this.jupiter = jupiter;
        this.saturn = saturn;
        this.uranus = uranus;
        this.neptune = neptune;
    }
}

export function createBox(): T.Mesh {
    return new T.Mesh(A.boxGeometry, A.createRandomMaterial())
}

function createStars(): T.Mesh {
    const starsG = new T.SphereGeometry(10000, 64, 64)
    return new T.Mesh(starsG, A.starsMaterial)
}

function createCelestialBody(radius: number, segments: number, material: T.Material): T.Mesh {
    const sphereG = new T.SphereGeometry(radius, segments, segments)
    return new T.Mesh(sphereG, material)
}

function createSaturnRing(): T.Mesh {
    const saturnRingG = new T.RingBufferGeometry( C.SATURN_RADIUS + 10, C.SATURN_RADIUS + 60, 64 )
    let pos = <T.BufferAttribute>saturnRingG.attributes.position

    // correct texture coordinates
    var v3 = new T.Vector3()
    for (let i = 0; i < pos.count; i++){
        v3.fromBufferAttribute(pos, i)
        saturnRingG.attributes.uv.setXY(i, v3.length() < 80 ? 0 : 1, 1)
    }

    const saturnRing = new T.Mesh(saturnRingG, A.saturnRingMaterial)
    saturnRingG.rotateX(90 * (Math.PI / 180))

    return saturnRing
}

export function createModel(scene: T.Scene): Model {

    const stars = createStars()
    scene.add(stars)

    const sun = createCelestialBody(C.SUN_RADIUS, 64, A.sunMaterial)
    scene.add(sun)

    const mercury = createCelestialBody(C.MERCURY_RADIUS, 32, A.mercuryMaterial)
    mercury.position.x = 800
    scene.add(mercury)

    const venus = createCelestialBody(C.VENUS_RADIUS, 32, A.venusMaterial)
    venus.position.x = 1100
    scene.add(venus)

    const earth = createCelestialBody(C.EARTH_RADIUS, 32, A.earthMaterial)
    earth.position.x = 1400

    const moon = createCelestialBody(C.MOON_RADIUS, 32, A.moonMaterial)
    scene.add(moon)
    scene.add(earth)

    const mars = createCelestialBody(C.MARS_RADIUS, 32, A.marsMaterial)
    mars.position.x = 1700
    scene.add(mars)

    const jupiter = createCelestialBody(C.JUPITER_RADIUS, 32, A.jupiterMaterial)
    jupiter.position.x = 2000
    scene.add(jupiter)

    const saturn = createCelestialBody(C.SATURN_RADIUS, 32, A.saturnMaterial)
    saturn.position.x = 2300
    saturn.add(createSaturnRing())
    scene.add(saturn)

    const uranus = createCelestialBody(C.URANUS_RADIUS, 32, A.uranusMaterial)
    uranus.position.x = 2600
    scene.add(uranus)

    const neptune = createCelestialBody(C.NEPTUNE_RADIUS, 32, A.neptuneMaterial)
    neptune.position.x = 2900
    scene.add(neptune)

    return new Model(sun,
                     new Planet(mercury),
                     new Planet(venus),
                     new Planet(earth, [moon]),
                     new Planet(mars),
                     new Planet(jupiter),
                     new Planet(saturn),
                     new Planet(uranus),
                     new Planet(neptune))
}
