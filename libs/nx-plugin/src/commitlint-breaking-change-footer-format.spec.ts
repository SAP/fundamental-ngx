const configuration = require('../../../commitlint.config.js');

describe('commitlint breaking-change-footer-format rule', () => {
    const rule = configuration.plugins[0].rules['breaking-change-footer-format'];

    function validate(body?: string, footer?: string): [boolean, string?] {
        return rule({ body, footer });
    }

    it('should allow canonical breaking change footer', () => {
        expect(validate(undefined, 'BREAKING CHANGE: API contract changed')[0]).toBe(true);
        expect(validate(undefined, 'BREAKING CHANGE:')[0]).toBe(true);
    });

    it('should reject non-canonical breaking change footer variants', () => {
        const invalidLines = [
            'BREAKING CHANGES: API contract changed',
            'BREAKING-CHANGE: API contract changed',
            'BREAKING_CHANGE: API contract changed',
            'BREAKINGCHANGE: API contract changed',
            'Breaking Change: API contract changed',
            'BREAKING CHANGE : API contract changed',
            '  BREAKING CHANGE: API contract changed',
            '- BREAKING CHANGE: API contract changed'
        ];

        for (const line of invalidLines) {
            const [isValid, message] = validate(undefined, line);
            expect(isValid).toBe(false);
            expect(message).toContain('BREAKING CHANGE:');
        }
    });

    it('should ignore regular body text that is not a breaking change footer', () => {
        const [isValid] = validate('This PR introduces breaking changes in examples.', undefined);
        expect(isValid).toBe(true);
    });
});
