const nx = require('@nx/eslint-plugin');
const baseConfig = require('../eslint.config.js');

module.exports = [
    ...baseConfig,
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    {
        files: ['*.ts'],
        rules: {
            '@angular-eslint/no-host-metadata-property': 'off',
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'fd',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'off',
                {
                    type: 'element',
                    prefix: 'fd',
                    style: 'kebab-case'
                }
            ],
            'jsdoc/require-jsdoc': 'off',
            'grouped-accessor-pairs': 'off'
        },
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {}
    }
];
