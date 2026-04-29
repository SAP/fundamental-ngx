export default {
    displayName: 'mcp-server',
    preset: '../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    coverageDirectory: '../../coverage/libs/mcp-server'
};
