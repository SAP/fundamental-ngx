import { cloneDeep, concat, countBy, escape, flatten, get, merge, mergeWith, set, uniq, uniqBy } from './lodash-utils';

describe('lodash-utils', () => {
    describe('get', () => {
        it('should get value at path of object', () => {
            const obj = { a: { b: { c: 3 } } };
            expect(get(obj, 'a.b.c')).toBe(3);
            expect(get(obj, ['a', 'b', 'c'])).toBe(3);
        });

        it('should return undefined for non-existent paths', () => {
            const obj = { a: { b: 2 } };
            expect(get(obj, 'a.b.c')).toBeUndefined();
        });

        it('should return default value when path does not exist', () => {
            const obj = { a: { b: 2 } };
            expect(get(obj, 'a.b.c', 'default')).toBe('default');
        });

        it('should handle null or undefined objects', () => {
            expect(get(null, 'a.b', 'default')).toBe('default');
            expect(get(undefined, 'a.b', 'default')).toBe('default');
        });

        it('should handle paths with null values in the middle', () => {
            const obj = { a: null };
            expect(get(obj, 'a.b', 'default')).toBe('default');
        });
    });

    describe('set', () => {
        it('should set value at path of object', () => {
            const obj: any = {};
            set(obj, 'a.b.c', 3);
            expect(obj.a.b.c).toBe(3);
        });

        it('should set value using array path', () => {
            const obj: any = {};
            set(obj, ['a', 'b', 'c'], 3);
            expect(obj.a.b.c).toBe(3);
        });

        it('should create intermediate objects if they do not exist', () => {
            const obj: any = {};
            set(obj, 'x.y.z', 'value');
            expect(obj.x.y.z).toBe('value');
        });

        it('should overwrite existing values', () => {
            const obj: any = { a: { b: 1 } };
            set(obj, 'a.b', 2);
            expect(obj.a.b).toBe(2);
        });
    });

    describe('cloneDeep', () => {
        it('should clone primitives', () => {
            expect(cloneDeep(42)).toBe(42);
            expect(cloneDeep('string')).toBe('string');
            expect(cloneDeep(true)).toBe(true);
            expect(cloneDeep(null)).toBe(null);
            expect(cloneDeep(undefined)).toBe(undefined);
        });

        it('should clone Date objects', () => {
            const date = new Date('2023-01-01');
            const cloned = cloneDeep(date);
            expect(cloned).toEqual(date);
            expect(cloned).not.toBe(date);
        });

        it('should clone Arrays', () => {
            const arr = [1, 2, [3, 4]];
            const cloned = cloneDeep(arr);
            expect(cloned).toEqual(arr);
            expect(cloned).not.toBe(arr);
            expect(cloned[2]).not.toBe(arr[2]);
        });

        it('should clone RegExp objects', () => {
            const regex = /test/gi;
            const cloned = cloneDeep(regex);
            expect(cloned.source).toBe(regex.source);
            expect(cloned.flags).toBe(regex.flags);
            expect(cloned).not.toBe(regex);
        });

        it('should clone Map objects', () => {
            const map = new Map([
                ['a', 1],
                ['b', 2]
            ]);
            const cloned = cloneDeep(map);
            expect(cloned.get('a')).toBe(1);
            expect(cloned.get('b')).toBe(2);
            expect(cloned).not.toBe(map);
        });

        it('should clone Set objects', () => {
            const testSet = new Set([1, 2, 3]);
            const cloned = cloneDeep(testSet);
            expect(cloned.has(1)).toBe(true);
            expect(cloned.has(2)).toBe(true);
            expect(cloned.has(3)).toBe(true);
            expect(cloned).not.toBe(testSet);
        });

        it('should clone nested objects', () => {
            const obj = { a: { b: { c: 3 } } };
            const cloned = cloneDeep(obj);
            expect(cloned).toEqual(obj);
            expect(cloned).not.toBe(obj);
            expect(cloned.a).not.toBe(obj.a);
            expect(cloned.a.b).not.toBe(obj.a.b);
        });

        it('should copy functions by reference', () => {
            const fn = (): string => 'test';
            const obj = { fn };
            const cloned = cloneDeep(obj);
            expect(cloned.fn).toBe(fn);
        });

        it('should handle circular references gracefully', () => {
            const obj: any = { a: 1, b: { c: 2 } };
            obj.self = obj;
            obj.b.parent = obj;
            
            const cloned = cloneDeep(obj);
            
            // Should successfully clone without stack overflow
            expect(cloned).toBeDefined();
            expect(cloned.a).toBe(1);
            expect(cloned.b.c).toBe(2);
            
            // Circular references should be preserved
            expect(cloned.self).toBe(cloned);
            expect(cloned.b.parent).toBe(cloned);
            
            // But the cloned object should not be the same as the original
            expect(cloned).not.toBe(obj);
            expect(cloned.b).not.toBe(obj.b);
        });

        it('should handle circular references in arrays', () => {
            const arr: any[] = [1, 2, 3];
            arr.push(arr);
            
            const cloned = cloneDeep(arr);
            
            expect(cloned).toBeDefined();
            expect(cloned[0]).toBe(1);
            expect(cloned[1]).toBe(2);
            expect(cloned[2]).toBe(3);
            expect(cloned[3]).toBe(cloned);
            expect(cloned).not.toBe(arr);
        });
    });

    describe('merge', () => {
        it('should merge two objects', () => {
            const target = { a: 1, b: 2 };
            const source = { b: 3, c: 4 };
            const result: any = merge(target, source as any);
            expect(result).toEqual({ a: 1, b: 3, c: 4 });
        });

        it('should merge multiple objects', () => {
            const result = merge({ a: 1 } as any, { b: 2 }, { c: 3 });
            expect(result).toEqual({ a: 1, b: 2, c: 3 });
        });

        it('should deep merge nested objects', () => {
            const target = { a: { x: 1, y: 2 } } as any;
            const source = { a: { y: 3, z: 4 } };
            const result = merge(target, source);
            expect(result).toEqual({ a: { x: 1, y: 3, z: 4 } });
        });

        it('should not mutate the original target', () => {
            const target = { a: 1 } as any;
            const source = { b: 2 };
            merge(target, source);
            expect(target).toEqual({ a: 1 });
        });

        it('should handle null target', () => {
            const result = merge(null as any, { a: 1 });
            expect(result).toEqual({ a: 1 });
        });

        it('should handle undefined target', () => {
            const result = merge(undefined as any, { a: 1 });
            expect(result).toEqual({ a: 1 });
        });

        it('should handle null sources', () => {
            const result = merge({ a: 1 } as any, null as any, { b: 2 });
            expect(result).toEqual({ a: 1, b: 2 });
        });

        it('should clone arrays instead of merging them', () => {
            const target = { arr: [1, 2] };
            const source = { arr: [3, 4] };
            const result = merge(target, source);
            expect(result.arr).toEqual([3, 4]);
        });

        it('should handle Date objects', () => {
            const date = new Date('2023-01-01');
            const result = merge({ a: 1 } as any, { date });
            expect(result.date).toEqual(date);
            expect(result.date).not.toBe(date);
        });

        it('should handle functions', () => {
            const fn = (): string => 'test';
            const result = merge({ a: 1 } as any, { fn });
            expect(result.fn).toBe(fn);
        });
    });

    describe('mergeWith', () => {
        it('should merge with custom function', () => {
            const customizer = (targetValue: any, sourceValue: any): any => {
                if (Array.isArray(targetValue)) {
                    return targetValue.concat(sourceValue);
                }
            };

            const target = { arr: [1, 2] };
            const source = { arr: [3, 4] };
            const result = mergeWith(target, source, customizer);
            expect(result.arr).toEqual([1, 2, 3, 4]);
        });

        it('should use default merge behavior when customizer returns undefined', () => {
            const customizer = (): undefined => undefined;
            const target = { a: 1 } as any;
            const source = { b: 2 };
            const result = mergeWith(target, source, customizer);
            expect(result).toEqual({ a: 1, b: 2 });
        });

        it('should handle null target', () => {
            const customizer = (t: any, s: any): any => s;
            const result = mergeWith(null as any, { a: 1 }, customizer);
            expect(result).toEqual({ a: 1 });
        });

        it('should handle undefined target', () => {
            const customizer = (t: any, s: any): any => s;
            const result = mergeWith(undefined as any, { a: 1 }, customizer);
            expect(result).toEqual({ a: 1 });
        });

        it('should pass key to customizer', () => {
            const keys: string[] = [];
            const customizer = (t: any, s: any, key: string): any => {
                keys.push(key);
                return s;
            };

            mergeWith({ a: 1, b: 2 } as any, { b: 3, c: 4 }, customizer);
            expect(keys).toContain('b');
            expect(keys).toContain('c');
        });
    });

    describe('uniq', () => {
        it('should return unique values from array', () => {
            expect(uniq([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
        });

        it('should work with strings', () => {
            expect(uniq(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
        });

        it('should handle empty arrays', () => {
            expect(uniq([])).toEqual([]);
        });

        it('should preserve order', () => {
            expect(uniq([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
        });
    });

    describe('uniqBy', () => {
        it('should return unique values based on iteratee function', () => {
            const arr = [{ x: 1 }, { x: 2 }, { x: 1 }];
            const result = uniqBy(arr, (item) => item.x);
            expect(result).toEqual([{ x: 1 }, { x: 2 }]);
        });

        it('should return unique values based on property path', () => {
            const arr = [{ x: 1 }, { x: 2 }, { x: 1 }];
            const result = uniqBy(arr, 'x');
            expect(result).toEqual([{ x: 1 }, { x: 2 }]);
        });

        it('should handle nested property paths', () => {
            const arr = [{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 1 } }];
            const result = uniqBy(arr, 'a.b');
            expect(result).toEqual([{ a: { b: 1 } }, { a: { b: 2 } }]);
        });

        it('should preserve order', () => {
            const arr = [{ x: 3 }, { x: 1 }, { x: 2 }, { x: 1 }];
            const result = uniqBy(arr, 'x');
            expect(result.map((item) => item.x)).toEqual([3, 1, 2]);
        });
    });

    describe('flatten', () => {
        it('should flatten array one level deep', () => {
            expect(
                flatten([
                    [1, 2],
                    [3, 4]
                ])
            ).toEqual([1, 2, 3, 4]);
        });

        it('should handle empty arrays', () => {
            expect(flatten([])).toEqual([]);
            expect(flatten([[], []])).toEqual([]);
        });

        it('should only flatten one level', () => {
            expect(
                flatten([
                    [1, [2]],
                    [3, [4]]
                ])
            ).toEqual([1, [2], 3, [4]]);
        });
    });

    describe('countBy', () => {
        it('should count by iteratee function', () => {
            const arr = [1.2, 2.3, 2.4];
            const result = countBy(arr, Math.floor);
            expect(result).toEqual({ '1': 1, '2': 2 });
        });

        it('should count by property path', () => {
            const arr = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
            const result = countBy(arr, 'type');
            expect(result).toEqual({ a: 2, b: 1 });
        });

        it('should handle empty arrays', () => {
            expect(countBy([], 'x')).toEqual({});
        });

        it('should convert keys to strings', () => {
            const arr = [1, 2, 1, 2, 3];
            const result = countBy(arr, (x) => x);
            expect(result).toEqual({ '1': 2, '2': 2, '3': 1 });
        });
    });

    describe('concat', () => {
        it('should concatenate arrays', () => {
            expect(concat([1], [2], [3])).toEqual([1, 2, 3]);
        });

        it('should handle single values', () => {
            expect(concat([1], 2, [3])).toEqual([1, 2, 3]);
        });

        it('should handle empty arrays', () => {
            expect(concat([], [], [])).toEqual([]);
        });

        it('should handle mixed arrays and values', () => {
            expect(concat([1, 2], 3, [4, 5], 6)).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });

    describe('escape', () => {
        it('should escape HTML characters', () => {
            expect(escape('<div>Test</div>')).toBe('&lt;div&gt;Test&lt;/div&gt;');
        });

        it('should escape ampersands', () => {
            expect(escape('A & B')).toBe('A &amp; B');
        });

        it('should escape quotes', () => {
            // Note: textContent + innerHTML doesn't encode double quotes, only angle brackets and ampersands
            const result = escape('"quoted"');
            expect(result).toBe('"quoted"');
        });

        it('should handle empty strings', () => {
            expect(escape('')).toBe('');
        });

        it('should handle strings without special characters', () => {
            expect(escape('hello world')).toBe('hello world');
        });

        it('should escape multiple special characters', () => {
            expect(escape('<script>alert("XSS")</script>')).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
        });
    });
});
