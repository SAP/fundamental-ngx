import { KeyUtil } from './key-util';
import { isDevMode } from '@angular/core';
import { A, B, CONTROL, DOWN_ARROW, SHIFT, TAB, UP_ARROW, Z } from '@angular/cdk/keycodes';


describe('KeyUtil', () => {

    describe('isKeyCode', () => {

        interface TestValue {
            event: KeyboardEvent,
            keyCode: number | number[]
        }

        const positiveTestValues: TestValue[] = [
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: 'ArrowUp'}),
                    keyCode: UP_ARROW
                },
                keyCode: UP_ARROW
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: 'Up'}),
                    keyCode: UP_ARROW
                },
                keyCode: UP_ARROW
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: 'Up'}),
                    keyCode: UP_ARROW
                },
                keyCode: [DOWN_ARROW, UP_ARROW]
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: null}),
                    keyCode: UP_ARROW
                },
                keyCode: UP_ARROW
            }
        ];

        const negativeTestValues: TestValue[] = [
            {
                event: {
                    ...new KeyboardEvent('ArrowDown', {key: 'ArrowDown'}),
                    keyCode: DOWN_ARROW
                },
                keyCode: UP_ARROW
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowDown', {key: 'ArrowDown'}),
                    keyCode: DOWN_ARROW
                },
                keyCode: [UP_ARROW, TAB]
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowDown', {key: 'ArrowUp'}),
                    keyCode: null
                },
                keyCode: DOWN_ARROW
            }
        ];

        const errorTestValues: TestValue[] = [
            {
                event: {
                    ...new KeyboardEvent('MagicBananaKey', {key: 'MagicBananaKey'}),
                    keyCode: -1
                },
                keyCode: -2
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: null}),
                    keyCode: UP_ARROW
                },
                keyCode: null
            },
            {
                event: null,
                keyCode: DOWN_ARROW
            }
        ];

        it('should identify positive key examples', () =>
            positiveTestValues.forEach(example => expect(KeyUtil.isKeyCode(example.event, example.keyCode)).toBeTrue())
        );

        it('should identify negative key examples', () =>
            negativeTestValues.forEach(example => expect(KeyUtil.isKeyCode(example.event, example.keyCode)).toBeFalse())
        );

        it('should throw error for broken examples', () => {
            if (isDevMode()) {
                errorTestValues.forEach(example => expect(() => KeyUtil.isKeyCode(example.event, example.keyCode)).toThrow())
            }
        });
    });

    describe('isKeyType', () => {

        interface TestValue {
            event: KeyboardEvent,
            keyType: 'numeric' | 'alphabetical'
        }

        const positiveTestValues: TestValue[] = [
            {
                event: {
                    ...new KeyboardEvent('KeyA', {code: 'KeyA'}),
                    keyCode: A
                },
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('KeyB', {code: 'KeyB'}),
                    keyCode: B
                },
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('KeyZ', {code: null}),
                    keyCode: Z
                },
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('Digit0', {code: 'Digit0'}),
                    keyCode: 48
                },
                keyType: 'numeric'
            },
            {
                event: {
                    ...new KeyboardEvent('Digit1', {code: 'Digit1'}),
                    keyCode: 49
                },
                keyType: 'numeric'
            },
            {
                event: {
                    ...new KeyboardEvent('Digit9', {code: null}),
                    keyCode: 57
                },
                keyType: 'numeric'
            }
        ];

        const negativeTestValues: TestValue[] = [
            {
                event: {
                    ...new KeyboardEvent('Dig0', {code: 'Dig0'}),
                    keyCode: 48
                },
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('Shift', {code: 'Shift'}),
                    keyCode: SHIFT
                },
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('Control', {code: 'Control'}),
                    keyCode: CONTROL
                },
                keyType: 'numeric'
            },
            {
                event: {
                    ...new KeyboardEvent('Digit0', {code: 'Digit0'}),
                    keyCode: 48
                },
                keyType: 'alphabetical'
            }
        ];

        const errorTestValues: TestValue[] = [
            {
                event: undefined,
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('KeyB', {code: 'KeyB'}),
                    keyCode: B
                },
                keyType: undefined
            }
        ];

        it('should identify positive keyType examples', () =>
            positiveTestValues.forEach(example => expect(KeyUtil.isKeyType(example.event, example.keyType)).toBeTrue())
        );

        it('should identify negative keyType examples', () =>
            negativeTestValues.forEach(example => expect(KeyUtil.isKeyType(example.event, example.keyType)).toBeFalse())
        );

        it('should throw error for broken keyType examples', () => {
            if (isDevMode()) {
                errorTestValues.forEach(example => expect(() => KeyUtil.isKeyType(example.event, example.keyType)).toThrow())
            }
        });
    })
});
