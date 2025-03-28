const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../../eslint.config.js');

module.exports = [
    ...baseConfig,
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': ['off'],
            '@angular-eslint/component-selector': ['off']
        }
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {}
    }
];
