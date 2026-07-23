export default {
    displayName: 'ui5-webcomponents-fiori',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
    coverageDirectory: '../../coverage/libs/ui5-webcomponents-fiori',
    moduleNameMapper: {
        '^@fundamental-ngx/ui5-webcomponents-base/(.*)$': '<rootDir>/../../libs/ui5-webcomponents-base/$1/index.ts',
        '^@fundamental-ngx/ui5-webcomponents-fiori/(.*)$': '<rootDir>/../ui5-webcomponents-fiori/$1/index.ts'
    },
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$'
            }
        ]
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ]
};
