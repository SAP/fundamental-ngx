const Configuration = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [
            2,
            'always',
            ['core', 'platform', 'docs', 'e2e', 'release', 'deps', 'deps-dev', 'changelog', 'ci', 'cx', 'cdk']
        ],
        'body-max-line-length': [2, 'always', 400],
        'footer-max-line-length': [2, 'always', 400],
        'header-max-length': [2, 'always', 400]
    }
};

module.exports = Configuration;
