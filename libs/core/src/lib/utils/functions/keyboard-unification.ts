export function unifyKeyboardKey(event: KeyboardEvent) {
    const ieKeys = {
        'left': 'ArrowLeft',
        'right': 'ArrowRight',
        'down': 'ArrowDown',
        'up': 'ArrowUp',
    };
    return ieKeys[event.key.toLowerCase()] || event.key;
}
