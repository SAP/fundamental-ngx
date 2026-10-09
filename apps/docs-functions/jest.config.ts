export default {
    displayName: 'docs-functions',
    preset: '../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['<rootDir>/tests/**/*.spec.ts'],
    coverageDirectory: '../../coverage/apps/docs-functions'
};
