import baseConfig from '../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'moment-adapter',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', '../../jest-extended-matchers.ts'],
    coverageDirectory: '../../dist/coverage/moment-adapter'
};
