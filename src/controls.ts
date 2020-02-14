

export function listenInput(commands): void {
    document.addEventListener('keyup', (e) => {
        if (e.code === 'KeyP') commands.togglePause()
    })
}