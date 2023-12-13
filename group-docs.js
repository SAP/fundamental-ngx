const { readCachedProjectGraph } = require('@nx/workspace/src/core/project-graph');
const { createProjectRootMappings, findProjectForPath } = require('nx/src/project-graph/utils/find-project-for-path')
const {get} = require('lodash');
const graph = readCachedProjectGraph();
const rootMappings = createProjectRootMappings(graph.nodes);

const docsJson = require('./documentation-json/documentation.json');

const projects = Object.entries(graph.nodes).reduce((acc, [projectName, project]) => {
    acc[projectName] = project.data;
    return acc;
}, {});

const entityTypes = Object.keys(docsJson).reduce((acc, key) => {
    if (!Array.isArray(docsJson[key])) {
        Object.keys(docsJson[key]).forEach((subKey) => {
            if (!Array.isArray(docsJson[key][subKey])) {
                Object.keys(docsJson[key][subKey]).forEach((subSubKey) => {
                    acc.push(`${key}.${subKey}.${subSubKey}`);
                });
                return;
            }
            acc.push(`${key}.${subKey}`);
        });
    } else {
        acc.push(key);
    }
    return acc;
}, [])

entityTypes.forEach(entityType => {
    const entities = get(docsJson,entityType);
    if (Array.isArray(entities)) {
        entities.forEach((pipe) => {
            const projectName = findProjectForPath(pipe.file, rootMappings);
            const project = projects[projectName];
            project.entities = project.entities || {};
            project.entities[entityType] = project.entities[entityType] || [];
            project.entities[entityType].push(pipe);
        });
    } else {
        console.log('not an array', entityType);
    }
});

console.log(projects);
