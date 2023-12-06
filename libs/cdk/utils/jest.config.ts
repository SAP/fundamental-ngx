import baseConfig from '../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'cdk-utils',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../dist/coverage/cdk-utils'
};
