import baseConfig from '../../jest.config.base.ts';

export default {
    ...baseConfig,
    displayName: 'datetime-adapter',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', '../../jest-extended-matchers.ts'],
    coverageDirectory: '../../dist/coverage/datetime-adapter'
};
