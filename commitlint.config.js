const Configuration = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [
            2,
            'always',
            ['core', 'platform', 'docs', 'e2e', 'release', 'deps', 'deps-dev', 'changelog', 'ci', 'fn', 'cx', 'cdk']
        ],
        'body-max-line-length': [2, 'always', 200],
        'footer-max-line-length': [2, 'always', 200],
        'header-max-length': [2, 'always', 200]
    }
};

module.exports = Configuration;
