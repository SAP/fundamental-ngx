import { correct } from './correct';

/**
 * Simple unit tests for the correct operation logic
 * (Integration tests would run against actual workspace paths)
 */
describe('correct operation', () => {
    it('should have a correct export function', () => {
        expect(typeof correct).toBe('function');
    });

    it('should return success when no files found', async () => {
        const result = await correct({ propertiesPath: '/nonexistent/path' });

        expect(result.success).toBe(true);
        expect(result.filesModified).toEqual([]);
        expect(result.corrections).toEqual({});
    });

    it('should have correct interface for result', async () => {
        const result = await correct({ propertiesPath: '/tmp' });

        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('filesModified');
        expect(result).toHaveProperty('corrections');
        expect(Array.isArray(result.filesModified)).toBe(true);
        expect(typeof result.corrections).toBe('object');
    });
});
