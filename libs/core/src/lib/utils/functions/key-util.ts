import { isDevMode } from '@angular/core';

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
        ['Alt', {aliases: ['Alt'], keyCode: 18}],
        ['Ctrl', {aliases: ['Ctrl', 'Control', 'Meta'], keyCode: 17}],
        ['Meta', {aliases: ['Meta'], keyCode: 91}],
        ['Shift', {aliases: ['Shift'], keyCode: 16}],
        ['Backspace', {aliases: ['Backspace'], keyCode: 8}],
        ['KeyA', {aliases: ['KeyA'], keyCode: 65}],
        ['PageUp', { aliases: ['PageUp'], keyCode: 33 }],
        ['PageDown', { aliases: ['PageDown'], keyCode: 34 }]
    ]
);

export class KeyUtil {
    /** Function used to unify key identification across different browsers
     * @param event - KeyboardEvent
     * @param key   - event.key name matching W3C specification
     * */
    static isKey(event: KeyboardEvent, key: string | string[]): boolean {
        if (Array.isArray(key)) {
            return key.some(_key => this.isKey(event, _key));
        }

        if (event && keyMap.get(key)) {
            return keyMap.get(key).aliases.some(alias => alias === event.key)
                || keyMap.get(key).keyCode === event.keyCode;
        }

        if (isDevMode()) {
            throw new Error(`Invalid function arguments. Check if "event" is a KeyboardEvent or "key" is defined in keyMap`);
        }

        return false;
    }

    /** Function used to unify key identification across different browsers
     * @param event     - KeyboardEvent
     * @param keyType   - Type of key
     * */
    static isKeyType(event: KeyboardEvent, keyType: 'alphabetical' | 'numeric'): boolean {
        if (event && keyType) {
            switch (keyType) {
                case 'numeric':
                    return event.code
                        ? event.code.toLowerCase().includes('digit')
                        : event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 96 && event.keyCode <= 105;
                case 'alphabetical':
                    return event.code
                        ? event.code.toLowerCase().includes('key')
                        : event.keyCode >= 65 && event.keyCode <= 90;
            }
        }

        if (isDevMode()) {
            throw new Error(`Invalid function arguments.`);
        }

        return false;
    }
}
