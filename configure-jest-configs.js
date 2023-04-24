const {sync} = require('glob');
const {readFileSync, writeFileSync} = require('fs');

const jestConfigFiles = sync('libs/**/jest.config.ts', {ignore: ['libs/nx-plugin/jest.config.ts']});

for (const filePath of jestConfigFiles) {
    try {
        const fileContents = readFileSync(filePath, {encoding: "utf-8"});
        const displayName = fileContents.match(/displayName: '(.*)'/)[1];
        const preset = fileContents.match(/preset: '(.*)'/)[1];
        const setupFilesAfterEnv = fileContents.match(/setupFilesAfterEnv: \[(.*)]/)[1];
        const coverageDirectory = fileContents.match(/coverageDirectory: '(.*)'/)[1];
        const pathToRoot = preset.match(/(.*)\/jest.preset.js/)[1];
        writeFileSync(filePath, `
    import baseConfig from '${pathToRoot}/jest.config.base';

    export default {
        ...baseConfig,
        displayName: '${displayName}',
        preset: '${preset}',
        setupFilesAfterEnv: [${setupFilesAfterEnv}, '${pathToRoot}/jest-extended-matchers.ts'],
        coverageDirectory: '${coverageDirectory}',
    };
    `)

    } catch (e) {
        console.log({filePath});
        throw e
    }
}
