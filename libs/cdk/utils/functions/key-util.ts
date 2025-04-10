import {
    A,
    ALT,
    BACKSPACE,
    C,
    CONTROL,
    DASH,
    DELETE,
    DOWN_ARROW,
    END,
    ENTER,
    ESCAPE,
    F2,
    F7,
    HOME,
    LEFT_ARROW,
    MAC_ENTER,
    META,
    NUMPAD_EIGHT,
    NUMPAD_FIVE,
    NUMPAD_FOUR,
    NUMPAD_MINUS,
    NUMPAD_NINE,
    NUMPAD_ONE,
    NUMPAD_SEVEN,
    NUMPAD_SIX,
    NUMPAD_THREE,
    NUMPAD_TWO,
    NUMPAD_ZERO,
    PAGE_DOWN,
    PAGE_UP,
    RIGHT_ARROW,
    SHIFT,
    SPACE,
    TAB,
    UP_ARROW,
    V,
    X
} from '@angular/cdk/keycodes';
import { isDevMode } from '@angular/core';

/** Map of keyCodes and their corresponding "key" values */
const keyMap: Map<number, string[]> = new Map([
    [RIGHT_ARROW, ['ArrowRight', 'Right']],
    [DOWN_ARROW, ['ArrowDown', 'Down']],
    [LEFT_ARROW, ['ArrowLeft', 'Left']],
    [UP_ARROW, ['ArrowUp', 'Up']],
    [SPACE, ['Space', 'Spacebar', ' ']],
    [ESCAPE, ['Escape', 'Esc']],
    [DELETE, ['Delete', 'Del']],
    [ENTER, ['Enter']],
    [MAC_ENTER, ['Enter']],
    [TAB, ['Tab']],
    [HOME, ['Home']],
    [END, ['End']],
    [ALT, ['Alt']],
    [CONTROL, ['Ctrl', 'Control', 'Meta']],
    [META, ['Meta']],
    [SHIFT, ['Shift']],
    [BACKSPACE, ['Backspace']],
    [A, ['KeyA']],
    [C, ['KeyC']],
    [V, ['KeyV']],
    [X, ['KeyX']],
    [PAGE_UP, ['PageUp']],
    [PAGE_DOWN, ['PageDown']],
    [DASH, ['-']],
    [NUMPAD_MINUS, ['-']],
    [NUMPAD_ZERO, ['NumPad0']],
    [NUMPAD_ONE, ['NumPad1']],
    [NUMPAD_TWO, ['NumPad2']],
    [NUMPAD_THREE, ['NumPad3']],
    [NUMPAD_FOUR, ['NumPad4']],
    [NUMPAD_FIVE, ['NumPad5']],
    [NUMPAD_SIX, ['NumPad6']],
    [NUMPAD_SEVEN, ['NumPad7']],
    [NUMPAD_EIGHT, ['NumPad8']],
    [NUMPAD_NINE, ['NumPad9']],
    [F2, ['F2']],
    [F7, ['F7']]
]);

export class KeyUtil {
    /**
     * Function used to unify key identification across different browsers using KeyCodes
     *
     * @param event     - KeyboardEvent
     * @param keyCode   - event.key name matching W3C specification / (ASSCI char. codes)
     * */
    static isKeyCode(event: KeyboardEvent, keyCode: number | number[]): boolean {
        if (Array.isArray(keyCode)) {
            return keyCode.some((key) => this.isKeyCode(event, key));
        }

        if (event && keyMap.get(keyCode)) {
            return keyMap.get(keyCode)?.some((alias) => alias === event.key) || keyCode === event.keyCode;
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
    static isKeyType(event: KeyboardEvent, keyType: 'alphabetical' | 'numeric' | 'control' | 'ime'): boolean {
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
                // some service commands as alt, ctr, insert, print, f4 etc. All except letters, numbers and symbols
                case 'control':
                    return event.keyCode < 48 || (event.keyCode >= 112 && event.keyCode <= 123);
                case 'ime':
                    return event.key?.toLowerCase() === 'process' || event.keyCode === 229;
            }
        }

        if (isDevMode()) {
            throw new Error(`Invalid function arguments.`);
        }

        return false;
    }
}
