import baseConfig from '../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'platform-variant-management',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', '../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../dist/coverage/platform-variant-management'
};
