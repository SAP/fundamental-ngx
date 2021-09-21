const fs = require('fs');
const shell = require('shelljs');

const json = fs.readFileSync('nx.json');

projectsNames = Object.keys(JSON.parse(json).projects);
const coreDependencies = projectsNames.filter(name => name.startsWith('core-'));
const platformDependencies = projectsNames.filter(name => name.startsWith('platform-'));


shell.exec( `nx run-many --target=build --projects=${coreDependencies.join(',')} --with-deps --parallel --maxParallel=3 --exclude=docs,core,platform,docs-e2e --configuration=production`);
shell.exec(`nx run-many --target=build --projects=${platformDependencies.join(',')} --with-deps --parallel --maxParallel=3 --exclude=docs,core,platform,docs-e2e --configuration=production`);
shell.exec(`nx run-many --target=build --projects=core,platform --with-deps --configuration=production`);
