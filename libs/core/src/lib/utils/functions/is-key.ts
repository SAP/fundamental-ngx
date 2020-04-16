const keyMap: Map<string, { aliases: string[], keyCode: number }> = new Map(
    [
        ['ArrowRight', {aliases: ['ArrowRight', 'Right'], keyCode: 39}],
        ['ArrowDown', {aliases: ['ArrowDown', 'Down'], keyCode: 40}],
        ['ArrowLeft', {aliases: ['ArrowLeft', 'Left'], keyCode: 37}],
        ['ArrowUp', {aliases: ['ArrowUp', 'Up'], keyCode: 38}],
        [' ', {aliases: ['Space', 'Spacebar', ' '], keyCode: 32}],
        ['Escape', {aliases: ['Escape', 'Esc'], keyCode: 27}],
        ['Delete', {aliases: ['Delete', 'Del'], keyCode: 46}],
        ['Enter', {aliases: ['Enter'], keyCode: 13}],
        ['Tab', {aliases: ['Tab'], keyCode: 9}],
    ]
);

/** Function used to unify key identification across different browsers
 * @param event - KeyboardEvent
 * @param key   - event.key name matching W3C specification
 * */
export function isKey(event: KeyboardEvent, key: string) {
    if (event && keyMap.get(key)) {
        return keyMap.get(key).aliases.includes(event.key) || keyMap.get(key).keyCode === event.keyCode;
    }

    throw `Invalid function arguments. Check if "event" is a KeyboardEvent or "key" is defined in keyMap`;
    return false;
}
