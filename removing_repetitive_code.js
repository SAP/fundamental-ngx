const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const { sync: globSync } = require('fast-glob');
const { readFileSync, writeFileSync } = require('fs');

const files = globSync('libs/platform/src/lib/*/project.json', {
    // ignore: ['libs/docs/cdk/forms/index.ts', 'libs/docs/cdk/data-source/index.ts', 'libs/docs/cdk/drag-n-drop/index.ts']
});

files.forEach((file) => {
    const content = JSON.parse(readFileSync(file, 'utf-8'));
    delete content.targets.build;
    writeFileSync(file, JSON.stringify(content, null, 2), 'utf-8');
});
