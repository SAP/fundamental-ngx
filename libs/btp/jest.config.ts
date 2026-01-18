import baseConfig from '../../jest.config.base.ts';

export default {
    ...baseConfig,
    displayName: 'btp',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../jest-extended-matchers.ts'],
    coverageDirectory: '../../dist/coverage/cdk-data-source'
};
