import { range } from './range';

describe('range', () => {
    describe('without mapFn (simple iteration)', () => {
        it('should create an array with n elements', () => {
            expect(range(3)).toEqual([0, 1, 2]);
            expect(range(5)).toEqual([0, 1, 2, 3, 4]);
        });

        it('should return empty array for 0', () => {
            expect(range(0)).toEqual([]);
        });

        it('should return empty array for negative numbers', () => {
            expect(range(-5)).toEqual([]);
        });

        it('should handle 1 element', () => {
            expect(range(1)).toEqual([0]);
        });
    });

    describe('with mapFn (transformation)', () => {
        it('should transform each index using mapFn', () => {
            expect(range(3, (i) => i * 2)).toEqual([0, 2, 4]);
            expect(range(3, (i) => `item-${i}`)).toEqual(['item-0', 'item-1', 'item-2']);
        });

        it('should work with complex transformations', () => {
            const result = range(3, (i) => ({ id: i, name: `Item ${i}` }));
            expect(result).toEqual([
                { id: 0, name: 'Item 0' },
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ]);
        });

        it('should return empty array for 0 length even with mapFn', () => {
            expect(range(0, (i) => i * 2)).toEqual([]);
        });

        it('should return empty array for negative length even with mapFn', () => {
            expect(range(-5, (i) => i * 2)).toEqual([]);
        });
    });
});
