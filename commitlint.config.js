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

                    // Catch typo variants like pluralization, separators, casing, spacing, and markdown list prefixes.
                    const candidateFooterPattern = /^[ \t>*-]*breaking[ \t_-]*changes?[ \t]*:/im;
                    const candidateFooterTokenPattern = /breaking[ \t_-]*changes?[ \t]*:/i;

                    for (const line of fullText.split(/\r?\n/)) {
                        if (!candidateFooterPattern.test(line)) {
                            continue;
                        }

                        const token = line.match(candidateFooterTokenPattern)?.[0] ?? line.trim();
                        if (line !== 'BREAKING CHANGE:' && !line.startsWith('BREAKING CHANGE: ')) {
                            return [
                                false,
                                `Breaking change footer contains "${token}" but must use "BREAKING CHANGE:" exactly (singular, uppercase, one space, no prefix). ` +
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
