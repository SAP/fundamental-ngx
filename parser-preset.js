module.exports = {
    parserOpts: {
        headerPattern: /^(\w*):\s\((\w*|\w*-\w*)\)\s(.*)/,
        headerCorrespondence: ['type', 'scope', 'subject']
    }
};
