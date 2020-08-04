/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ModifierKeys } from '@angular/cdk/testing';

/**
 * Creates a browser MouseEvent with the specified options.
 * @docs-private
 */
export function createMouseEvent(type: string, x = 0, y = 0, button = 0): MouseEvent {
    const event = document.createEvent('MouseEvent');
    const originalPreventDefault = event.preventDefault.bind(event);

    event.initMouseEvent(
        type,
        true /* canBubble */,
        true /* cancelable */,
        window /* view */,
        0 /* detail */,
        x /* screenX */,
        y /* screenY */,
        x /* clientX */,
        y /* clientY */,
        false /* ctrlKey */,
        false /* altKey */,
        false /* shiftKey */,
        false /* metaKey */,
        button /* button */,
        null /* relatedTarget */
    );

    // `initMouseEvent` doesn't allow us to pass the `buttons` and
    // defaults it to 0 which looks like a fake event.
    Object.defineProperty(event, 'buttons', { get: () => 1 });

    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function (): Event {
        Object.defineProperty(event, 'defaultPrevented', { get: () => true });
        return originalPreventDefault();
    };

    return event;
}

/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 * @docs-private
 */
export function createTouchEvent(type: string, pageX = 0, pageY = 0): Event {
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    const event = document.createEvent('UIEvent');
    const touchDetails = { pageX: pageX, pageY: pageY };

    // TS3.6 removes the initUIEvent method and suggests porting to "new UIEvent()".
    (event as any).initUIEvent(type, true, true, window, 0);

    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    Object.defineProperties(event, {
        touches: { value: [touchDetails] },
        targetTouches: { value: [touchDetails] },
        changedTouches: { value: [touchDetails] }
    });

    return event;
}

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

/**
 * Creates a fake event object with any desired event type.
 * @docs-private
 */
export function createFakeEvent(type: string, canBubble = false, cancelable = true): Event {
    const event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}
