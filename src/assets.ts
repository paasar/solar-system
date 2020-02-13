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

function planetMaterial(color: number): T.Material {
  return new T.MeshPhongMaterial({
    color: color,
    wireframe: false
})
}

export const sunMaterial = new T.MeshBasicMaterial({
    color: 0xFFFF00,
    wireframe: false
})

export const mercuryMaterial = planetMaterial(0xB3D4F0)
export const venusMaterial = planetMaterial(0xDDDDDD)
export const earthMaterial = planetMaterial(0x0000FF)
export const moonMaterial = planetMaterial(0xFFFFFF)
export const marsMaterial = planetMaterial(0xFF0000)
export const jupiterMaterial = planetMaterial(0xFFDA67)
export const saturnMaterial = planetMaterial(0xE3CF62)
export const uranusMaterial = planetMaterial(0x33FFFC)
export const neptuneMaterial = planetMaterial(0x3361FF)

export const boxGeometry = new T.BoxGeometry(50, 50, 50)
