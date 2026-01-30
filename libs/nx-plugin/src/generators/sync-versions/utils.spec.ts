import { replaceInFile } from './utils';

// Mock fs module
jest.mock('fs', () => ({
    readFileSync: jest.fn((path: string) => {
        if (path === './package.json') {
            return JSON.stringify({
                version: '1.0.0',
                dependencies: {
                    '@angular/core': '21.1.0',
                    rxjs: '^7.8.0',
                    'fast-deep-equal': '3.1.3',
                    'fundamental-styles': '0.40.1',
                    '@fundamental-styles/cx': '0.40.1',
                    'focus-trap': '7.1.0',
                    'focus-visible': '5.2.1',
                    'compare-versions': '6.1.0',
                    dayjs: '1.11.11',
                    '@sap-theming/theming-base-content': '11.32.3',
                    'intl-messageformat': '10.5.2',
                    // UI5 webcomponents with tilde prefix (the bug case)
                    '@ui5/webcomponents': '~2.18.1'
                },
                devDependencies: {}
            });
        }
        if (path === './libs/core/package.json') {
            return JSON.stringify({ version: '1.0.0' });
        }
        throw new Error(`Unexpected file read: ${path}`);
    })
}));

describe('sync-versions utils', () => {
    beforeEach(() => {
        // Clear environment variables before each test
        delete process.env.FD_ENV_VERSION_PLACEHOLDER;
        delete process.env.FD_ENV_ANGULAR_VER_PLACEHOLDER;
        delete process.env.FD_ENV_UI5_WEBCOMPONENTS_VER_PLACEHOLDER;
        delete process.env.FD_ENV_FDSTYLES_VER_PLACEHOLDER;
        delete process.env.FD_ENV_FDCXSTYLES_VER_PLACEHOLDER;
        delete process.env.FD_ENV_THEMING_VER_PLACEHOLDER;
    });

    describe('replaceInFile', () => {
        describe('VERSION_PLACEHOLDER', () => {
            it('should replace VERSION_PLACEHOLDER with package version', () => {
                const input = '"@fundamental-ngx/core": "VERSION_PLACEHOLDER"';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('"@fundamental-ngx/core": "1.0.0"');
            });

            it('should not replace FD_ENV_VERSION_PLACEHOLDER', () => {
                const input = 'process.env.FD_ENV_VERSION_PLACEHOLDER';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('process.env.FD_ENV_VERSION_PLACEHOLDER');
            });
        });

        describe('ANGULAR_VER_PLACEHOLDER', () => {
            it('should replace ANGULAR_VER_PLACEHOLDER with major version caret range', () => {
                const input = '"@angular/core": "ANGULAR_VER_PLACEHOLDER"';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('"@angular/core": "^21.0.0"');
            });
        });

        describe('UI5_WEBCOMPONENTS_VER_PLACEHOLDER', () => {
            it('should replace UI5_WEBCOMPONENTS_VER_PLACEHOLDER correctly with tilde-prefixed version', () => {
                // This tests the bug fix: ~2.18.1 should become ^2.18.0
                const input = '"@ui5/webcomponents": "UI5_WEBCOMPONENTS_VER_PLACEHOLDER"';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('"@ui5/webcomponents": "^2.18.0"');
            });

            it('should not produce undefined in version', () => {
                const input = 'UI5_WEBCOMPONENTS_VER_PLACEHOLDER';
                const result = replaceInFile('test.ts', input);
                expect(result).not.toContain('undefined');
                expect(result).toMatch(/^\^?\d+\.\d+\.\d+$/);
            });
        });

        describe('FDSTYLES_VER_PLACEHOLDER', () => {
            it('should replace FDSTYLES_VER_PLACEHOLDER with fundamental-styles version', () => {
                const input = '"fundamental-styles": "FDSTYLES_VER_PLACEHOLDER"';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('"fundamental-styles": "0.40.1"');
            });
        });

        describe('FDCXSTYLES_VER_PLACEHOLDER', () => {
            it('should replace FDCXSTYLES_VER_PLACEHOLDER with @fundamental-styles/cx version', () => {
                const input = '"@fundamental-styles/cx": "FDCXSTYLES_VER_PLACEHOLDER"';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('"@fundamental-styles/cx": "0.40.1"');
            });
        });

        describe('THEMING_VER_PLACEHOLDER', () => {
            it('should replace THEMING_VER_PLACEHOLDER with caret minor range', () => {
                const input = '"@sap-theming/theming-base-content": "THEMING_VER_PLACEHOLDER"';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('"@sap-theming/theming-base-content": "^11.32.0"');
            });
        });

        describe('aboveMinorVersion helper (via placeholder replacement)', () => {
            it('should handle versions without prefix', () => {
                // THEMING uses aboveMinorVersion with version "11.32.3"
                const input = 'THEMING_VER_PLACEHOLDER';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('^11.32.0');
            });

            it('should handle versions with tilde prefix', () => {
                // UI5 uses aboveMinorVersion with version "~2.18.1"
                const input = 'UI5_WEBCOMPONENTS_VER_PLACEHOLDER';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('^2.18.0');
            });

            it('should handle versions with caret prefix', () => {
                // RXJS uses aboveMinorVersion with version "^7.8.0"
                const input = 'RXJS_VER_PLACEHOLDER';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('^7.8.0');
            });
        });

        describe('multiple placeholders in one file', () => {
            it('should replace all placeholders in a package.json-like content', () => {
                const input = `{
    "peerDependencies": {
        "@angular/core": "ANGULAR_VER_PLACEHOLDER",
        "@fundamental-ngx/cdk": "VERSION_PLACEHOLDER",
        "@ui5/webcomponents": "UI5_WEBCOMPONENTS_VER_PLACEHOLDER",
        "fundamental-styles": "FDSTYLES_VER_PLACEHOLDER",
        "@sap-theming/theming-base-content": "THEMING_VER_PLACEHOLDER"
    }
}`;
                const result = replaceInFile('package.json', input);

                expect(result).toContain('"@angular/core": "^21.0.0"');
                expect(result).toContain('"@fundamental-ngx/cdk": "1.0.0"');
                expect(result).toContain('"@ui5/webcomponents": "^2.18.0"');
                expect(result).toContain('"fundamental-styles": "0.40.1"');
                expect(result).toContain('"@sap-theming/theming-base-content": "^11.32.0"');
                expect(result).not.toContain('undefined');
                expect(result).not.toContain('PLACEHOLDER');
            });
        });

        describe('environment variable overrides', () => {
            it('should use FD_ENV_UI5_WEBCOMPONENTS_VER_PLACEHOLDER when set', () => {
                process.env.FD_ENV_UI5_WEBCOMPONENTS_VER_PLACEHOLDER = '^3.0.0';

                const input = 'UI5_WEBCOMPONENTS_VER_PLACEHOLDER';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('^3.0.0');
            });

            it('should use FD_ENV_VERSION_PLACEHOLDER when set', () => {
                process.env.FD_ENV_VERSION_PLACEHOLDER = '2.0.0-rc.1';

                const input = 'VERSION_PLACEHOLDER';
                const result = replaceInFile('test.ts', input);
                expect(result).toBe('2.0.0-rc.1');
            });
        });
    });
});
