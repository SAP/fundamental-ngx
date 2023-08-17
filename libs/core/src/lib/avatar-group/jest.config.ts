import baseConfig from '../../../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'core-avatar-group',
    preset: '../../../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../../../dist/coverage/core-avatar-group'
};
