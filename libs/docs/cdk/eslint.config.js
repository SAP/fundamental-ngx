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
        rules: {
            '@angular-eslint/template/elements-content': 'off',
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/template/label-has-associated-control': 'off'
        }
    },
    {
        files: ['**/*.e2e-spec.ts', '**/*tests.ts', '**/*.po.ts'],
        rules: {
            '@nx/enforce-module-boundaries': ['off']
        }
    }
];
