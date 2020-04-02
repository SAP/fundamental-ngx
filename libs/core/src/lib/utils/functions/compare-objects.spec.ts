import {compareObjects} from './compare-objects';

describe('compareObjects', () => {
    interface TestValue {
        obj1: any,
        obj2: any
    };

    const positiveTestValues: TestValue[] = [
        {obj1: null, obj2: null},
        {obj1: /abc/, obj2: /abc/},
        {obj1: 'ABC', obj2: 'ABC'},
        {obj1: [], obj2: []},
        {obj1: [1, 2, 3], obj2: [1, 2, 3]},
        {obj1: {}, obj2: {}},
        {obj1: {a: 1, b: 2}, obj2: {a: 1, b: 2}},
        {obj1: {a: 1, b: 2}, obj2: {b: 2, a: 1}},
        {
            obj1: {1: {name: 'mhc', age: 28}, 2: {name: 'arb', age: 26}},
            obj2: {1: {name: 'mhc', age: 28}, 2: {name: 'arb', age: 26}}
        },

    ];

    const negativeTestValues: TestValue[] = [
        {obj1: null, obj2: undefined},
        {obj1: /abc/, obj2: /123/},
        {obj1: 'ABC', obj2: 'DEF'},
        {obj1: [1, 2, 3], obj2: [3, 2, 1]},
        {obj1: [1, 2], obj2: [1, 2, 3]},
        {obj1: {a: 1, b: 2}, obj2: {a: 2, b: 1}},
        {obj1: {a: 1, b: 2}, obj2: {a: 1, b: 3}},
        {
            obj1: {1: {name: 'mhc', age: 28}, 2: {name: 'arb', age: 26}},
            obj2: {1: {name: 'mhc', age: 28}, 2: {name: 'arb', age: 27}}
        },
    ];

    it('should identify positive examples', () =>
        positiveTestValues.forEach(example => expect(compareObjects(example.obj1, example.obj2)).toBeTrue())
    );

    it('should identify negative examples', () =>
        negativeTestValues.forEach(example => expect(compareObjects(example.obj1, example.obj2)).toBeFalse())
    );
});
