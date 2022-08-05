const fs = require('fs');
const angularJson = JSON.parse(fs.readFileSync('./angular.json', 'utf8'));

Object.keys(angularJson.projects).forEach((projectName) => {
    const project = angularJson.projects[projectName];
    const projectRoot = project.root;
    fs.writeFileSync(`${projectRoot}/project.json`, JSON.stringify(project, null, 2));
    angularJson.projects[projectName] = projectRoot;
});

fs.writeFileSync('./angular.json', JSON.stringify(angularJson, null, 2));
