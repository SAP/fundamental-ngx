const nx = require('@nx/eslint-plugin');

module.exports = [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    {
        ignores: ['**/dist']
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    allow: ['jest.config.base'],
                    depConstraints: [
                        {
                            sourceTag: 'scope:cdk',
                            onlyDependOnLibsWithTags: ['scope:cdk']
                        },
                        {
                            sourceTag: 'scope:fd',
                            onlyDependOnLibsWithTags: ['scope:fd', 'scope:i18n', 'scope:cdk']
                        },
                        {
                            sourceTag: 'scope:fdb',
                            onlyDependOnLibsWithTags: ['scope:fd', 'scope:fdb', 'scope:i18n', 'scope:cdk']
                        },
                        {
                            sourceTag: 'scope:fdp',
                            onlyDependOnLibsWithTags: ['scope:fd', 'scope:fdp', 'scope:i18n', 'scope:cdk']
                        },
                        {
                            sourceTag: 'scope:datetime-adapter',
                            onlyDependOnLibsWithTags: ['scope:fd', 'scope:i18n', 'scope:cdk']
                        },
                        {
                            sourceTag: 'scope:cx',
                            onlyDependOnLibsWithTags: ['scope:fd', 'scope:cx', 'scope:i18n', 'scope:cdk']
                        },
                        {
                            sourceTag: 'scope:i18n',
                            onlyDependOnLibsWithTags: ['scope:cdk']
                        },
                        {
                            sourceTag: 'scope:docs',
                            onlyDependOnLibsWithTags: [
                                'scope:docs',
                                'scope:fd',
                                'scope:fdp',
                                'scope:fdb',
                                'scope:datetime-adapter',
                                'scope:i18n',
                                'scope:cx',
                                'scope:cdk'
                            ]
                        }
                    ]
                }
            ],
            '@nx/dependency-checks': [
                'error',
                {
                    buildTargets: ['build'],
                    checkMissingDependencies: true,
                    checkObsoleteDependencies: true,
                    checkVersionMismatches: true,
                    ignoredDependencies: ['@angular/cdk', 'rxjs', 'tslib', 'zone.js']
                }
            ],
            '@typescript-eslint/ban-ts-comment': [
                'error',
                {
                    'ts-expect-error': 'allow-with-description',
                    'ts-ignore': true,
                    'ts-nocheck': true,
                    'ts-check': false,
                    minimumDescriptionLength: 3
                }
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true
                }
            ],
            '@typescript-eslint/explicit-member-accessibility': [
                'off',
                {
                    accessibility: 'explicit'
                }
            ],
            '@typescript-eslint/member-delimiter-style': [
                'off',
                {
                    multiline: {
                        delimiter: 'none',
                        requireLast: true
                    },
                    singleline: {
                        delimiter: 'semi',
                        requireLast: false
                    }
                }
            ],
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    default: [
                        'signature',
                        'call-signature',
                        'public-static-field',
                        'protected-static-field',
                        'private-static-field',
                        '#private-static-field',
                        'public-abstract-field',
                        'protected-abstract-field',
                        'public-abstract-method',
                        'protected-abstract-method',
                        'public-decorated-field',
                        'protected-decorated-field',
                        'private-decorated-field',
                        'public-instance-field',
                        'protected-instance-field',
                        'private-instance-field',
                        '#private-instance-field',
                        'public-field',
                        'protected-field',
                        'private-field',
                        '#private-field',
                        'static-field',
                        'instance-field',
                        'abstract-field',
                        'decorated-field',
                        'field',
                        'static-initialization',
                        'constructor',
                        'public-static-method',
                        'protected-static-method',
                        'private-static-method',
                        '#private-static-method',
                        'public-decorated-method',
                        'protected-decorated-method',
                        'private-decorated-method',
                        'public-instance-method',
                        'protected-instance-method',
                        'private-instance-method',
                        '#private-instance-method',
                        'public-method',
                        'protected-method',
                        'private-method',
                        '#private-method',
                        'static-method',
                        'instance-method',
                        'abstract-method',
                        'decorated-method',
                        'method'
                    ]
                }
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'objectLiteralProperty',
                    format: null,
                    modifiers: ['requiresQuotes']
                }
            ],
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-inferrable-types': [
                'error',
                {
                    ignoreParameters: true
                }
            ],
            '@typescript-eslint/no-shadow': [
                'error',
                {
                    hoist: 'all'
                }
            ],
            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowShortCircuit: true,
                    allowTernary: true
                }
            ],
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/semi': ['off', null],
            '@typescript-eslint/triple-slash-reference': [
                'error',
                {
                    lib: 'always',
                    path: 'always',
                    types: 'prefer-import'
                }
            ],
            // TODO https://typescript-eslint.io/rules/type-annotation-spacing/
            // "@typescript-eslint/type-annotation-spacing": "error",
            '@typescript-eslint/unified-signatures': 'error',
            'arrow-body-style': 'error',
            'arrow-parens': ['off', 'always'],
            curly: 'error',
            'eol-last': 'error',
            eqeqeq: ['error', 'smart'],
            'guard-for-in': 'error',
            'grouped-accessor-pairs': ['error', 'setBeforeGet'],
            'key-spacing': [
                'error',
                {
                    mode: 'strict'
                }
            ],
            'keyword-spacing': 'error',
            'new-parens': 'error',
            'no-bitwise': 'error',
            'no-caller': 'error',
            'no-console': [
                'error',
                {
                    allow: [
                        'log',
                        'warn',
                        'dir',
                        'timeLog',
                        'assert',
                        'clear',
                        'count',
                        'countReset',
                        'group',
                        'groupEnd',
                        'table',
                        'dirxml',
                        'error',
                        'groupCollapsed',
                        'Console',
                        'profile',
                        'profileEnd',
                        'timeStamp',
                        'context'
                    ]
                }
            ],
            'no-empty': 'off',
            'no-eval': 'error',
            'no-multi-spaces': 'error',
            'no-multiple-empty-lines': [
                'error',
                {
                    max: 10
                }
            ],
            'no-new-wrappers': 'error',
            'no-restricted-globals': ['error', 'fdescribe', 'fit'],
            'no-restricted-imports': ['error', 'rxjs/Rx'],
            'no-shadow': 'off',
            'no-throw-literal': 'error',
            'no-undef-init': 'error',
            'no-unused-expressions': 'off',
            'no-unused-vars': [
                'error',
                {
                    args: 'none'
                }
            ],
            'no-var': 'error',
            'object-curly-spacing': ['error', 'always'],
            'object-shorthand': ['error', 'always'],
            'one-var': ['off', 'never'],
            'prefer-arrow/prefer-arrow-functions': 'off',
            'prefer-const': 'error',
            'quote-props': ['off', 'as-needed'],
            semi: ['error', 'always'],
            'space-before-blocks': 'error',
            'space-infix-ops': 'error',
            'spaced-comment': [
                'error',
                'always',
                {
                    markers: ['/']
                }
            ],
            'valid-typeof': 'off'
        }
    },
    {
        files: ['*.spec.ts', 'libs/docs/**/*.ts'],
        rules: {
            'grouped-accessor-pairs': 'off'
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        // Override or add rules here
        rules: {}
    },
    {
        files: ['**/*.html'],
        rules: {
            '@angular-eslint/template/prefer-control-flow': 'error'
        }
    }
];
