import { parseVersion } from './parse-version';

describe('Parses version properly', () => {
    it('Valid versions', () => {
        expect(parseVersion('1.0.0')).toBe('~1.0');
        expect(parseVersion('0.1.0')).toBe('~0.1');
        expect(parseVersion('0.0.1')).toBe('~0.0');
        expect(parseVersion('0.31')).toBe('~0.31');
        expect(parseVersion('0.31.1')).toBe('~0.31');
        expect(parseVersion('0.31.1-rc.0')).toBe('~0.31');
        expect(parseVersion('0.31.1-rc.234')).toBe('~0.31');
        expect(parseVersion('0.31.1-alpha.234')).toBe('~0.31');
        expect(parseVersion('0.31.0-rc.0')).toBe('~0.30');
        expect(parseVersion('0.31.0-rc.234')).toBe('~0.30');
        expect(parseVersion('0.31.0-alpha.234')).toBe('~0.30');
        expect(parseVersion('0.31.0-rc.0')).toBe('~0.30');
        expect(parseVersion('0.31.0-rc.234')).toBe('~0.30');
        expect(parseVersion('1.0.0-alpha.234')).toBe('^0');
    });

    it('Invalid versions', () => {
        expect(() => parseVersion(undefined)).toThrow();
        expect(() => parseVersion(null)).toThrow();
        expect(() => parseVersion('')).toThrow();
        // @ts-expect-error
        expect(() => parseVersion(1)).toThrow();
        expect(() => parseVersion('1')).toThrow();
        expect(() => parseVersion('1.')).toThrow();
        expect(() => parseVersion('1.0.0-')).toThrow();
    });
});
