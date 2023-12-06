import baseConfig from '../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'platform-smart-filter-bar',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', '../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../dist/coverage/platform-smart-filter-bar'
};
