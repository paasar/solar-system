import * as T from 'three'

export function createRandomMaterial(): T.Material {
    return new T.MeshBasicMaterial({
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
        wireframe: false
    })
}

export const greyMaterial = new T.MeshPhongMaterial({
    color: 0xaaaaaa,
    wireframe: false
})

const textureLoader = new T.TextureLoader()

function texture(fileName: string): T.Texture {
    return textureLoader.load(`assets/${fileName}`)
}

function planetMaterial(name: string): T.Material {
    return new T.MeshPhongMaterial({
        map: texture(`${name}.jpg`)
    })
}

export const starsMaterial = new T.MeshBasicMaterial({
    map: texture('stars.jpg'),
    side: T.BackSide
})

export const sunMaterial = new T.MeshBasicMaterial({
    map: texture('sun.jpg')
})

export const mercuryMaterial = planetMaterial('mercury')//0xB3D4F0
export const venusMaterial = planetMaterial('venus_surface')//0xDDDDDD
export const earthMaterial = planetMaterial('earth_daymap')//0x0000FF
export const moonMaterial = planetMaterial('moon')//0xFFFFFF
export const marsMaterial = planetMaterial('mars')//0xFF0000
export const jupiterMaterial = planetMaterial('jupiter')//0xFFDA67
export const saturnMaterial = planetMaterial('saturn')//0xE3CF62

export const saturnRingMaterial = new T.MeshBasicMaterial({
    map: texture('saturn_ring_alpha.png'),
    side: T.DoubleSide,
    transparent: true
})

export const uranusMaterial = planetMaterial('uranus')//0x33FFFC
export const neptuneMaterial = planetMaterial('neptune')//0x3361FF

export const boxGeometry = new T.BoxGeometry(50, 50, 50)
