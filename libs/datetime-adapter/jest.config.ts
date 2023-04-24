import baseConfig from '../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'datetime-adapter',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', '../../jest-extended-matchers.ts'],
    coverageDirectory: '../../coverage/libs/datetime-adapter',
};
