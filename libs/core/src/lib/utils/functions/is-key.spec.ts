import { isKey } from '@fundamental-ngx/core';

describe('isKey', () => {
    interface TestValue {
        event: KeyboardEvent,
        key: string
    };

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
        positiveTestValues.forEach(example => expect(isKey(example.event, example.key)).toBeTrue())
    );

    it('should identify negative key examples', () =>
        negativeTestValues.forEach(example => expect(isKey(example.event, example.key)).toBeFalse())
    );

    it('should throw error for broken examples', () =>
        errorTestValues.forEach(example =>
            expect(() => isKey(example.event, example.key)).toThrow()
        )
    );
});
