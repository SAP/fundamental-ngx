import { loadJson } from './load-json';

describe('loadJson', () => {
    const testCases = [
        [
            {
                'something.key.1': 'v',
                'something.key.2': 'v',
                'something.key.3': 'v'
            },
            {
                something: {
                    key: {
                        1: 'v',
                        2: 'v',
                        3: 'v'
                    }
                }
            }
        ],
        [
            {
                'something.key': 'v',
                'something.else': 'v',
                'something.else2': 'v'
            },
            {
                something: {
                    key: 'v',
                    else: 'v',
                    else2: 'v'
                }
            }
        ],
        [
            {
                'something.key': 'v',
                'something.else': 'v',
                'something.else2': 'v',
                'else.key': 'v',
                'else.else': 'v',
                'else.else2': 'v',
                else2: 'v'
            },
            {
                something: {
                    key: 'v',
                    else: 'v',
                    else2: 'v'
                },
                else: {
                    key: 'v',
                    else: 'v',
                    else2: 'v'
                },
                else2: 'v'
            }
        ]
    ];
    testCases.forEach(([input, output]) => {
        it(`should convert ${JSON.stringify(input)} to ${JSON.stringify(output)}`, () => {
            // @ts-expect-error: testing wrong key
            const result = loadJson(input);
            expect(result).toEqual(output);
        });
    });
});
