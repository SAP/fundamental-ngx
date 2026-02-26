/**
 * Creates an array of numbers from 0 to n-1, optionally transformed by a map function.
 * Useful for iterating a fixed number of times in templates with `@for` or generating
 * transformed sequences.
 *
 * @param length The number of elements in the array
 * @param mapFn Optional function to transform each index into a value
 * @returns An array of numbers from 0 to n-1, or transformed values if mapFn is provided
 *
 * @example
 * // Simple iteration (returns [0, 1, 2])
 * range(3)
 *
 * // With transformation (returns ['Item 0', 'Item 1', 'Item 2'])
 * range(3, i => `Item ${i}`)
 *
 * // In component for template iteration:
 * readonly loadingRange = range(3);
 *
 * // In template:
 * @for (i of loadingRange; track i) {
 *   <div>Item {{ i }}</div>
 * }
 */
export function range<T = number>(length: number, mapFn: (index: number) => T = (i) => i as T): T[] {
    return Array.from({ length: Math.max(0, length) }, (_, i) => mapFn(i));
}
