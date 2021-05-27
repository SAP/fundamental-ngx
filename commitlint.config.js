const Configuration = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // 'type-enum': [
        //     2,
        //     'always',
        //     ['build', 'ci', 'docs', 'feat', 'fix', 'style', 'refactor', 'test', 'revert', 'chore']
        // ],
        'scope-enum': [2, 'always', ['core', 'platform', 'docs', 'release', 'e2e', 'deps', 'deps-dev']],
        'body-max-line-length': [2, 'always', 200],
        'footer-max-line-length': [2, 'always', 200]
    }
};

module.exports = Configuration;
