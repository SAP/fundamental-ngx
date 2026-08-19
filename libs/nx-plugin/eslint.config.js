const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');
const pluginTs = require('typescript-eslint');
const angularEslint = require('@angular-eslint/eslint-plugin');

module.exports = [
    { ignores: ['eslint.config.js', '**/*.tsx'] },
    ...baseConfig,
    { plugins: { '@typescript-eslint': pluginTs.plugin, '@angular-eslint': angularEslint } },
    {
        files: ['**/*.spec.ts'],
        rules: {
            '@nx/enforce-module-boundaries': 'off'
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case'
                }
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            'grouped-accessor-pairs': 'off',
            '@typescript-eslint/no-shadow': 'off',
            'no-unused-vars': 'off',
            'no-bitwise': 'off'
        }
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {}
    }
];
