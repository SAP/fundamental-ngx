import { KeyUtil } from './key-util';
import { isDevMode } from '@angular/core';


describe('KeyUtil', () => {

    describe('isKey', () => {

        interface TestValue {
            event: KeyboardEvent,
            key: string | string[]
        }

        const positiveTestValues: TestValue[] = [
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: 'ArrowUp'}),
                    keyCode: 38
                },
                key: 'ArrowUp'
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: 'Up'}),
                    keyCode: 38
                },
                key: 'ArrowUp'
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: 'Up'}),
                    keyCode: 38
                },
                key: ['ArrowDown', 'ArrowUp']
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: null}),
                    keyCode: 38
                },
                key: 'ArrowUp'
            }
        ];

        const negativeTestValues: TestValue[] = [
            {
                event: {
                    ...new KeyboardEvent('ArrowDown', {key: 'ArrowDown'}),
                    keyCode: 40
                },
                key: 'ArrowUp'
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowDown', {key: 'ArrowDown'}),
                    keyCode: 40
                },
                key: ['ArrowUp', 'Tab']
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowDown', {key: 'ArrowUp'}),
                    keyCode: null
                },
                key: 'ArrowDown'
            }
        ];

        const errorTestValues: TestValue[] = [
            {
                event: {
                    ...new KeyboardEvent('MagicBananaKey', {key: 'MagicBananaKey'}),
                    keyCode: -1
                },
                key: 'StandardPineappleKey'
            },
            {
                event: {
                    ...new KeyboardEvent('ArrowUp', {key: null}),
                    keyCode: 38
                },
                key: null
            },
            {
                event: null,
                key: 'ArrowDown'
            }
        ];

        it('should identify positive key examples', () =>
            positiveTestValues.forEach(example => expect(KeyUtil.isKey(example.event, example.key)).toBeTrue())
        );

        it('should identify negative key examples', () =>
            negativeTestValues.forEach(example => expect(KeyUtil.isKey(example.event, example.key)).toBeFalse())
        );

        it('should throw error for broken examples', () => {
            if (isDevMode()) {
                errorTestValues.forEach(example => expect(() => KeyUtil.isKey(example.event, example.key)).toThrow())
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
                    keyCode: 65
                },
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('KeyB', {code: 'KeyB'}),
                    keyCode: 66
                },
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('KeyZ', {code: null}),
                    keyCode: 90
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
                    keyCode: 16
                },
                keyType: 'alphabetical'
            },
            {
                event: {
                    ...new KeyboardEvent('Control', {code: 'Control'}),
                    keyCode: 17
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
                    keyCode: 66
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
                errorTestValues.forEach(example => expect(() => KeyUtil.isKey(example.event, example.keyType)).toThrow())
            }
        });
    })
});
