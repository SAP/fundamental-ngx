import { cloneDeep } from './clone-deep';

describe('cloneDeep', () => {
    it('should skip any type except object type', () => {
        expect(cloneDeep(null)).toBe(null);
        expect(cloneDeep(undefined)).toBe(undefined);
        expect(cloneDeep('string')).toBe('string');
        expect(cloneDeep(12)).toBe(12);
        const someFunction = () => {};
        expect(cloneDeep(someFunction)).toBe(someFunction);
    });


    it('should return clone of object or array', () => {
        const array = [1, 2, 3];
        const obj = {a: 1, b: 2};
        expect(cloneDeep(array)).not.toBe(array);
        expect(cloneDeep(array)).toEqual(array);
        expect(cloneDeep(obj)).not.toBe(obj);
        expect(cloneDeep(obj)).toEqual(obj);
    });
});
