const Configuration = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: './parser-preset',
    rules: {
        'type-enum': [
            2,
            'always',
            ['build', 'ci', 'docs', 'feat', 'fix', 'style', 'refactor', 'test', 'revert', 'chore']
        ],
        'scope-enum': [2, 'always', ['Core', 'Platform', 'doc-app', 'release', 'e2e', 'deps', 'deps-dev']],
        'body-max-line-length': [2, 'always', 200],
        'footer-max-line-length': [2, 'always', 200]
    }
};

module.exports = Configuration;
