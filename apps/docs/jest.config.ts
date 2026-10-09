// @ts-expect-error Jest's TypeScript config loader requires the explicit extension.
import baseConfig from '../../jest.config.base.ts';

export default {
    ...baseConfig,
    displayName: 'docs',
    preset: '../../jest.preset.js',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
    coverageDirectory: '../../coverage/apps/docs',
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|marked(?:/|$))'],
    testMatch: ['<rootDir>/src/**/*.spec.ts']
};
