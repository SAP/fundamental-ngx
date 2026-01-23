export default {
    displayName: 'core-schematics',
    preset: '../../../jest.preset.js',
    testEnvironment: 'node',
    coverageDirectory: '../../../coverage/libs/core/schematics',
    transformIgnorePatterns: ['node_modules/(?!(@angular/cdk/node_modules/parse5|parse5)/)'],
    moduleNameMapper: {
        '^ora$': '<rootDir>/libs/core/schematics/__mocks__/ora.js'
    }
};
