import baseConfig from '../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'cdk-forms',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../dist/coverage/cdk-forms'
};
