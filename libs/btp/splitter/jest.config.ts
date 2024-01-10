import baseConfig from '../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'core-splitter',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../dist/coverage/core-splitter'
};
