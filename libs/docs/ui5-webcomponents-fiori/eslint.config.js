const baseConfig = require('../../../eslint.config.js');

module.exports = [
    ...baseConfig,
    {
        files: ['**/*'],
        rules: {
            '@nx/enforce-module-boundaries': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/member-ordering': 'off'
        }
    },
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': ['off'],
            '@angular-eslint/component-selector': ['off']
        }
    },
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: ['fd', 'noop', 'ui5'],
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: ['fd', 'noop', 'ui5'],
                    style: 'kebab-case'
                }
            ]
        }
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {
            '@angular-eslint/template/elements-content': 'off',
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/template/label-has-associated-control': 'off'
        }
    },
    {
        files: ['**/*.e2e-spec.ts'],
        rules: {
            '@nx/enforce-module-boundaries': ['off']
        }
    },
    {
        files: ['**/*.e2e-spec.ts', '**/*tests.ts', '**/*.po.ts'],
        rules: {
            '@nx/enforce-module-boundaries': ['off']
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/examples/**/*.ts'],
        rules: {
            '@nx/enforce-module-boundaries': ['off'],
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/member-ordering': ['off']
        }
    }
];
