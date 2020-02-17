export function listenInput(commands): void {
    document.addEventListener('keyup', (e) => {
        if (e.code === 'KeyP') commands.togglePause()
        else
        if (e.code === 'KeyC') commands.cycleCamera()
        else
        if (e.code === 'Minus') commands.speedUp()
        else
        if (e.code === 'Slash') commands.slowDown()
        else console.log('Unknown key', e.code)
    })
}