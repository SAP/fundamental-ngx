import { isDevMode } from '@angular/core';
import {
    A,
    ALT,
    BACKSPACE,
    CONTROL,
    DELETE,
    DOWN_ARROW,
    END,
    ENTER,
    ESCAPE,
    HOME,
    LEFT_ARROW,
    META,
    RIGHT_ARROW,
    SHIFT,
    SPACE,
    TAB,
    UP_ARROW
} from '@angular/cdk/keycodes';

/**
 * This is going to be deprecated as working with string directly will cause problems.
 *  Instead of doing:
 *      KeyUtil.isKey(event, ['ArrowDown', 'ArrowUp']) we need should be ble to do
 *      KeyUtil.isKey(event, [DOWN_ARROW, UP_ARROW]).
 *
 */
const keyMap: Map<string, { aliases: string[]; keyCode: number }> = new Map([
    ['ArrowRight', { aliases: ['ArrowRight', 'Right'], keyCode: RIGHT_ARROW }],
    ['ArrowDown', { aliases: ['ArrowDown', 'Down'], keyCode: DOWN_ARROW }],
    ['ArrowLeft', { aliases: ['ArrowLeft', 'Left'], keyCode: LEFT_ARROW }],
    ['ArrowUp', { aliases: ['ArrowUp', 'Up'], keyCode: UP_ARROW }],
    [' ', { aliases: ['Space', 'Spacebar', ' '], keyCode: SPACE }],
    ['Escape', { aliases: ['Escape', 'Esc'], keyCode: ESCAPE }],
    ['Delete', { aliases: ['Delete', 'Del'], keyCode: DELETE }],
    ['Enter', { aliases: ['Enter'], keyCode: ENTER }],
    ['Tab', { aliases: ['Tab'], keyCode: TAB }],
    ['Alt', { aliases: ['Alt'], keyCode: ALT }],
    ['Ctrl', { aliases: ['Ctrl', 'Control', 'Meta'], keyCode: CONTROL }],
    ['Meta', { aliases: ['Meta'], keyCode: META }],
    ['Shift', { aliases: ['Shift'], keyCode: SHIFT }],
    ['Backspace', { aliases: ['Backspace'], keyCode: BACKSPACE }],
    ['KeyA', { aliases: ['KeyA'], keyCode: A }]
]);

/**
 * This new KeyMap will allows us to check the key with KeyCodes.
 * Using strings can lead into situation where we are checking space with
 * KeyUtil.isKey(event, ' ']) which might generate issues
 */
const keyMapByCode: Map<number, { aliases: string[]; keyCode: number }> = new Map([
    [RIGHT_ARROW, { aliases: ['ArrowRight', 'Right'], keyCode: RIGHT_ARROW }],
    [DOWN_ARROW, { aliases: ['ArrowDown', 'Down'], keyCode: DOWN_ARROW }],
    [LEFT_ARROW, { aliases: ['ArrowLeft', 'Left'], keyCode: LEFT_ARROW }],
    [UP_ARROW, { aliases: ['ArrowUp', 'Up'], keyCode: UP_ARROW }],
    [SPACE, { aliases: ['Space', 'Spacebar', ' '], keyCode: SPACE }],
    [ESCAPE, { aliases: ['Escape', 'Esc'], keyCode: ESCAPE }],
    [DELETE, { aliases: ['Delete', 'Del'], keyCode: DELETE }],
    [ENTER, { aliases: ['Enter'], keyCode: ENTER }],
    [TAB, { aliases: ['Tab'], keyCode: TAB }],
    [HOME, { aliases: ['Home'], keyCode: HOME }],
    [END, { aliases: ['End'], keyCode: END }],
    [ALT, { aliases: ['Alt'], keyCode: ALT }],
    [CONTROL, { aliases: ['Ctrl', 'Control', 'Meta'], keyCode: CONTROL }],
    [META, { aliases: ['Meta'], keyCode: META }],
    [SHIFT, { aliases: ['Shift'], keyCode: SHIFT }],
    [BACKSPACE, { aliases: ['Backspace'], keyCode: BACKSPACE }],
    [A, { aliases: ['KeyA'], keyCode: A }]
]);

export class KeyUtil {
    /**
     * Function used to unify key identification across different browsers
     *
     * @param event - KeyboardEvent
     * @param keyCode   - event.key name matching W3C specification
     * */
    static isKey(event: KeyboardEvent, keyCode: string | string[]): boolean {
        if (Array.isArray(keyCode)) {
            return keyCode.some((key) => this.isKey(event, key));
        }

        if (event && keyMap.get(keyCode)) {
            return (
                keyMap.get(keyCode).aliases.some((alias) => alias === event.key) ||
                keyMap.get(keyCode).keyCode === event.keyCode
            );
        }

        if (isDevMode()) {
            throw new Error(
                `Invalid function arguments. Check if "event" is a KeyboardEvent or "key" is defined in keyMap`
            );
        }

        return false;
    }

    /**
     * Function used to unify key identification across different browsers using KeyCodes
     *
     * @param event - KeyboardEvent
     * @param keyCode   - event.key name matching W3C specification / (ASSCI char. codes)
     * */
    static isKeyCode(event: KeyboardEvent, keyCode: number | number[]): boolean {
        if (Array.isArray(keyCode)) {
            return keyCode.some((key) => this.isKeyCode(event, key));
        }

        if (event && keyMapByCode.get(keyCode)) {
            return (
                keyMapByCode.get(keyCode).aliases.some((alias) => alias === event.key) ||
                keyMapByCode.get(keyCode).keyCode === event.keyCode
            );
        }

        if (isDevMode()) {
            throw new Error(
                `Invalid function arguments. Check if "event" is a KeyboardEvent or "key" is defined in keyMap`
            );
        }

        return false;
    }

    /**
     * Function used to unify key identification across different browsers
     *
     * @param event     - KeyboardEvent
     * @param keyType   - Type of key
     * */
    static isKeyType(event: KeyboardEvent, keyType: 'alphabetical' | 'numeric'): boolean {
        if (event && keyType) {
            switch (keyType) {
                case 'numeric':
                    return event.code
                        ? event.code.toLowerCase().includes('digit')
                        : (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);
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
