/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ModifierKeys } from '@angular/cdk/testing';

/**
 * Dispatches a keydown event from an element.
 * @docs-private
 */
export function createKeyboardEvent(
    type: string,
    keyCode: number = 0,
    key: string = '',
    target?: Element,
    modifiers: ModifierKeys = {}
): KeyboardEvent {
    const event = document.createEvent('KeyboardEvent') as any;
    const originalPreventDefault = event.preventDefault;

    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    if (event.initKeyEvent) {
        event.initKeyEvent(
            type,
            true,
            true,
            window,
            modifiers.control,
            modifiers.alt,
            modifiers.shift,
            modifiers.meta,
            keyCode
        );
    } else {
        // `initKeyboardEvent` expects to receive modifiers as a whitespace-delimited string
        // See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
        let modifiersList = '';

        if (modifiers.control) {
            modifiersList += 'Control ';
        }

        if (modifiers.alt) {
            modifiersList += 'Alt ';
        }

        if (modifiers.shift) {
            modifiersList += 'Shift ';
        }

        if (modifiers.meta) {
            modifiersList += 'Meta ';
        }

        event.initKeyboardEvent(
            type,
            true /* canBubble */,
            true /* cancelable */,
            window /* view */,
            0 /* char */,
            key /* key */,
            0 /* location */,
            modifiersList.trim() /* modifiersList */,
            false /* repeat */
        );
    }

    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: () => keyCode },
        key: { get: () => key },
        target: { get: () => target },
        ctrlKey: { get: () => !!modifiers.control },
        altKey: { get: () => !!modifiers.alt },
        shiftKey: { get: () => !!modifiers.shift },
        metaKey: { get: () => !!modifiers.meta }
    });

    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function (): Event {
        Object.defineProperty(event, 'defaultPrevented', { get: () => true });
        return originalPreventDefault.apply(this, arguments);
    };

    return event;
}
