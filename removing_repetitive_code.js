const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const { sync: globSync } = require('fast-glob');
const { readFileSync, writeFileSync, unlinkSync } = require('fs');

const files = globSync('libs/cx/src/lib/*/project.json', {
    // ignore: ['libs/docs/cdk/forms/index.ts', 'libs/docs/cdk/data-source/index.ts', 'libs/docs/cdk/drag-n-drop/index.ts']
});

files.forEach((file) => {
    const projectDir = require('path').dirname(file);
    unlinkSync(`${projectDir}/tsconfig.lib.prod.json`);
    unlinkSync(`${projectDir}/package.json`);
});
