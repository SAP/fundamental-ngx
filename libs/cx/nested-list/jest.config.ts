import baseConfig from '../../../jest.config.base';

export default {
    ...baseConfig,
    displayName: 'cx-nested-list',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts', '../../../jest-extended-matchers.ts'],
    coverageDirectory: '../../../dist/coverage/cx-nested-list'
};
