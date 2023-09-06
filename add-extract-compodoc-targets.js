const API_FILES = {
    sideNavigation: ['SideNavigationComponent']
};

const projectJsons = require('fast-glob').sync('libs/docs/cx/*/project.json', {
    ignore: ['libs/docs/cx/schema/project.json']
});

projectJsons.forEach((filePath) => {
    const parsedFilePath = require('path').parse(filePath);
    const indexTsContent = require('fs').readFileSync(`${parsedFilePath.dir}/index.ts`, 'utf-8');
    const apiFileKey = indexTsContent.match(/export const API_FILE_KEY = '(.*)';/)?.[1];
    if (apiFileKey && API_FILES[apiFileKey].length > 0) {
        const projectJsonContent = JSON.parse(require('fs').readFileSync(filePath, 'utf-8'));
        projectJsonContent.targets['extract-compodoc'] = {
            executor: '@fundamental-ngx/nx-plugin:compodoc',
            options: {
                outputPath: `${parsedFilePath.dir}/docs.json`,
                entities: API_FILES[apiFileKey]
            },
            dependsOn: ['cx:compodoc']
        };
        require('fs').writeFileSync(filePath, JSON.stringify(projectJsonContent, null, 4), 'utf-8');
    }
});
