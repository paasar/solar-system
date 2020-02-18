export function listenInput(commands): void {
    document.addEventListener('keyup', (e) => {
        switch(e.code) {
            case 'KeyP': commands.togglePause(); break
            case 'KeyP': commands.togglePause(); break
            case 'KeyC': commands.cycleCamera(); break
            case 'KeyT': commands.cycleCameraTarget(); break
            case 'Minus': commands.speedUp(); break
            case 'Slash': commands.slowDown(); break
            default: console.log('Unknown key', e.code)
        }
    })
}