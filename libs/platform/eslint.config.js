const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');
const overrides = require('../../eslint.overrides');

module.exports = [
    ...baseConfig,
    ...overrides,
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'fdp',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'fdp',
                    style: 'kebab-case'
                }
            ]
        }
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {
            '@angular-eslint/template/label-has-associated-control': 'off',
            '@angular-eslint/template/elements-content': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/valid-aria': 'off',
            '@angular-eslint/template/role-has-required-aria': 'off'
        }
    }
];
