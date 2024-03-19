const libPath = 'libs/core';

const ngPackageFiles = require('fast-glob').sync(`${libPath}/*/ng-package.json`);
const jestConfigFiles = require('fast-glob').sync(`${libPath}/*/jest.config.ts`);
const tsConfigFiles = require('fast-glob').sync(`${libPath}/*/tsconfig.json`);
const eslintRc = require('fast-glob').sync(`${libPath}/*/.eslintrc.json`);
const tsConfigModifiersFiles = require('fast-glob').sync(`${libPath}/*/tsconfig.*.json`);
const projectJsonFiles = require('fast-glob').sync(`${libPath}/*/project.json`);
const READMEFiles = require('fast-glob').sync(`${libPath}/*/README.md`);
const testSetupFiles = require('fast-glob').sync(`${libPath}/*/src/test-setup.ts`);

for (const file of ngPackageFiles) {
    const content = JSON.parse(require('fs').readFileSync(file, 'utf-8'));
    content.dest = undefined;
    require('fs').writeFileSync(file, JSON.stringify(content, null, 4));
}

for (const file of jestConfigFiles) {
    require('fs').unlinkSync(file);
}

for (const file of tsConfigFiles) {
    require('fs').unlinkSync(file);
}

for (const file of tsConfigModifiersFiles) {
    require('fs').unlinkSync(file);
}

for (const file of eslintRc) {
    require('fs').unlinkSync(file);
}

for (const file of projectJsonFiles) {
    const content = JSON.parse(require('fs').readFileSync(file, 'utf-8'));
    content.targets = {};
    require('fs').writeFileSync(file, JSON.stringify(content, null, 4));
}

for (const file of READMEFiles) {
    require('fs').unlinkSync(file);
}

for (const file of testSetupFiles) {
    require('fs').unlinkSync(file);
}

const srcFolders = require('fast-glob').sync(`${libPath}/*/src`);

for (const folder of srcFolders) {
    if (require('fs').readdirSync(folder).length === 0) {
        require('fs').rmdirSync(folder);
    }
}
