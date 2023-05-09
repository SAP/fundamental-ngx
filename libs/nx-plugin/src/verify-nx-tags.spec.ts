import { readCachedProjectGraph } from 'nx/src/project-graph/project-graph';

const knownTypes = new Set(['app', 'e2e', 'tools', 'lib']);
const knownScopes = new Set(['docs', 'fd', 'fdp', 'fn', 'cx', 'tools', 'datetime-adapter', 'components-e2e', 'i18n']);

// For some reason this test hangs. TODO: investigate whats wrong.
describe('Nx projects (nx.json)', () => {
    const graph = readCachedProjectGraph();

    Object.keys(graph.nodes).forEach((projectName) => {
        const project = graph.nodes[projectName];
        describe(`Project ${project.name}`, () => {
            it('should have a valid scope tag', () => {
                expect(project.data.tags).toBeDefined();
                expect(project.data.tags?.length).toBeGreaterThan(0);

                const scopeTag = project.data.tags?.find((x) => x.startsWith('scope:'));
                expect(scopeTag).toBeTruthy();
                const scopeValue = scopeTag?.split(':')[1];
                expect(knownScopes.has(scopeValue as string)).toBeTruthy();
            });

            it('should have a type tag', () => {
                expect(project.data.tags).toBeDefined();
                expect(project.data.tags?.length).toBeGreaterThan(0);

                const typeTag = project.data.tags?.find((x) => x.startsWith('type:'));
                expect(typeTag).toBeTruthy();
                const typeValue = typeTag?.split(':')[1];
                expect(knownTypes.has(typeValue as string)).toBeTruthy();
            });
        });
    });
});
