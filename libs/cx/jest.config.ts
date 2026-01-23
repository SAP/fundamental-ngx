import baseConfig from '../../jest.config.base.ts';

export default {
    ...baseConfig,
    displayName: 'core',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../jest-extended-matchers.ts'],
    coverageDirectory: '../../coverage/libs/core',
    testPathIgnorePatterns: ['<rootDir>/schematics/']
};
