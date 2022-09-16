'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProjects = void 0;
const affected_projects_1 = require('./affected-projects');
async function getProjects(context, affected = false, base = 'origin/main', head = 'HEAD') {
    if (affected) {
        return await (0, affected_projects_1.affectedProjects)(base, head);
    }
    return Object.keys(context.workspace.projects).map((p) => p);
}
exports.getProjects = getProjects;
//# sourceMappingURL=get-projects.js.map
