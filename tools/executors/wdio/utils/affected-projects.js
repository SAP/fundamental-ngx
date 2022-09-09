'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.affectedProjects = void 0;
const child_process_1 = require('child_process');
async function affectedProjects(base = 'origin/main', head = 'HEAD') {
    base = base || 'origin/master';
    head = head || 'HEAD';
    return (0, child_process_1.execSync)(`npx nx print-affected --select=projects --base=${base} --head=${head}`)
        .toString()
        .trim()
        .split(',')
        .map((p) => p.trim());
}
exports.affectedProjects = affectedProjects;
//# sourceMappingURL=affected-projects.js.map
