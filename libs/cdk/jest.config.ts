import baseConfig from '../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'cdk',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../jest-extended-matchers.ts'],
    coverageDirectory: '../../coverage/libs/cdk'
};
