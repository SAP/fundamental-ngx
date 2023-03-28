const angularJson = require('../../angular.json');
const projects: { projectName: string; tags: string[] }[] = Object.keys(angularJson.projects).map((projName) => {
    const projectContent = require('../../' + angularJson.projects[projName] + '/project.json');
    return {
        projectName: projName,
        ...projectContent
    };
});

const knownTypes = new Set(['app', 'e2e', 'tools', 'lib']);
const knownScopes = new Set(['docs', 'fd', 'fdp', 'fn', 'cx', 'tools', 'datetime-adapter', 'components-e2e', 'i18n']);

// For some reason this test hangs. TODO: investigate whats wrong.
describe('Nx projects (nx.json)', () => {
    // generate tests so we have a clear output of which project failed
    projects.forEach((testEntry) => {
        describe(`Project ${testEntry.projectName}`, () => {
            it('should have a valid scope tag', () => {
                expect(testEntry.tags).toBeDefined();
                expect(testEntry.tags?.length).toBeGreaterThan(0);

                const scopeTag = testEntry.tags?.find((x) => x.startsWith('scope:'));
                expect(scopeTag).toBeTruthy();
                const scopeValue = scopeTag?.split(':')[1];
                expect(knownScopes.has(scopeValue as string)).toBeTruthy();
            });

            it('should have a type tag', () => {
                expect(testEntry.tags).toBeDefined();
                expect(testEntry.tags?.length).toBeGreaterThan(0);

                const typeTag = testEntry.tags?.find((x) => x.startsWith('type:'));
                expect(typeTag).toBeTruthy();
                const typeValue = typeTag?.split(':')[1];
                expect(knownTypes.has(typeValue as string)).toBeTruthy();
            });
        });
    });
});
