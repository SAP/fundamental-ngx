const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');

module.exports = [
    ...baseConfig,
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'fd',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'fd',
                    style: 'kebab-case'
                }
            ]
        }
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {}
    }
];
