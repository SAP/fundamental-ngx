import baseConfig from '../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'core-list',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', '../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../dist/coverage/core-list'
};
