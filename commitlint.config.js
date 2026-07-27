const Configuration = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [
            2,
            'always',
            [
                'core',
                'platform',
                'docs',
                'e2e',
                'release',
                'deps',
                'deps-dev',
                'changelog',
                'ci',
                'cx',
                'btp',
                'cdk',
                'shared',
                'i18n',
                'datetime-adapter',
                'moment-adapter',
                'ui5',
                'mcp',
                'skills'
            ]
        ],
        'body-max-line-length': [2, 'always', 400],
        'footer-max-line-length': [2, 'always', 400],
        'header-max-length': [2, 'always', 400],
        'breaking-change-footer-format': [2, 'always']
    },
    plugins: [
        {
            rules: {
                'breaking-change-footer-format': (parsed) => {
                    const { body, footer } = parsed;
                    const fullText = [body, footer].filter(Boolean).join('\n');

                    // Check for common typos in breaking change footers
                    const invalidPatterns = [
                        { pattern: /^BREAKING CHANGES:/m, typo: 'BREAKING CHANGES:' }, // plural
                        { pattern: /^BREAKING-CHANGE:/m, typo: 'BREAKING-CHANGE:' }, // dash instead of space
                        { pattern: /^breaking change:/m, typo: 'breaking change:' }, // lowercase (exact match, not case-insensitive)
                        { pattern: /^BREAKING_CHANGE:/m, typo: 'BREAKING_CHANGE:' }, // underscore
                        { pattern: /^BREAKINGCHANGE:/m, typo: 'BREAKINGCHANGE:' } // no space/separator
                    ];

                    for (const { pattern, typo } of invalidPatterns) {
                        if (pattern.test(fullText)) {
                            return [
                                false,
                                `Breaking change footer contains "${typo}" but must use "BREAKING CHANGE:" (singular, uppercase, with space). ` +
                                    `The conventional-commits parser requires this exact format for version bumping.`
                            ];
                        }
                    }

                    return [true];
                }
            }
        }
    ]
};

module.exports = Configuration;
