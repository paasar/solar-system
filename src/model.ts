import * as T from 'three'
import * as A from './assets'

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

export function createModel(scene: T.Scene): Model {

    const stars = createStars()
    scene.add(stars)

    const sun = createCelestialBody(1392.7/2, 64, A.sunMaterial)
    scene.add(sun)

    const mercury = createCelestialBody(4.879/2, 32, A.mercuryMaterial)
    mercury.position.x = 800
    scene.add(mercury)

    const venus = createCelestialBody(12.104/2, 32, A.venusMaterial)
    venus.position.x = 1100
    scene.add(venus)

    const earth = createCelestialBody(12.742/2, 32, A.earthMaterial)
    earth.position.x = 1400

    const moon = createCelestialBody(3.474/2, 32, A.moonMaterial)
    scene.add(moon)
    moon.position.z = 384.4 / 20 // scale down while not using correct distances
    moon.rotateY(-1.2)

    scene.add(earth)

    const mars = createCelestialBody(6.779/2, 32, A.marsMaterial)
    mars.position.x = 1700
    scene.add(mars)

    const jupiter = createCelestialBody(139.820/2, 32, A.jupiterMaterial)
    jupiter.position.x = 2000
    scene.add(jupiter)

    const saturn = createCelestialBody(116.460/2, 32, A.saturnMaterial)
    saturn.position.x = 2300
    scene.add(saturn)

    const uranus = createCelestialBody(50.724/2, 32, A.uranusMaterial)
    uranus.position.x = 2600
    scene.add(uranus)

    const neptune = createCelestialBody(49.244/2, 32, A.neptuneMaterial)
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
