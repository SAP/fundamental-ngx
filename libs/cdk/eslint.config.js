const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');
const overrides = require('../../eslint.overrides');

module.exports = [
    ...baseConfig,
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    ...overrides,
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'fdk',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'fdk',
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
