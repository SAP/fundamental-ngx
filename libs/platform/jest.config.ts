import baseConfig from '../../jest.config.base.ts';

export default {
    ...baseConfig,
    displayName: 'platform',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../jest-extended-matchers.ts'],
    coverageDirectory: '../../coverage/libs/platform'
};
