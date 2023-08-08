import baseConfig from '../../../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'core-fixed-card-layout',
    preset: '../../../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', '../../../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../../../dist/coverage/core-fixed-card-layout'
};
