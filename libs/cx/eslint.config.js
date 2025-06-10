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
                    prefix: 'fdx',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'fdx',
                    style: 'kebab-case'
                }
            ]
        }
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {
            '@angular-eslint/template/elements-content': 'off'
        }
    }
];
