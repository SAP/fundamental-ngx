import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { addModuleImportToRootModule } from '@angular/cdk/schematics';
import { addRootProvider } from '@schematics/angular/utility';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
import { createCleanApplication, createCleanWorkspace } from '../testing-utils/create-clean-application';
import { getProjectDefinition } from '../utils/workspace';

describe('add-animations schematic', () => {
    let tree: Tree;
    const runner: SchematicTestRunner = new SchematicTestRunner(
        'schematics',
        path.join(__dirname, '../collection.json')
    );

    beforeEach(() => {
        tree = Tree.empty();
    });

    describe('standalone app', () => {
        beforeEach(async () => {
            tree = await createCleanApplication({ standalone: true }, await createCleanWorkspace());
        });
        it('should add animations', async () => {
            tree = await runner.runSchematic('add-animations', { project: 'test' }, tree);
            expect(tree.readText('./test/src/app/app.config.ts')).toContain('provideAnimations()');
        });
        it('should not add animations if already present', async () => {
            tree = await runner.runSchematic('add-animations', { project: 'test' }, tree);
            tree = await runner.runSchematic('add-animations', { project: 'test' }, tree);
            const content = tree.readText('./test/src/app/app.config.ts');
            expect(content.split('provideAnimations()').length === 2).toBe(true);
        });
        it('should not add animations if noop animations already present', async () => {
            tree = await firstValueFrom(
                runner.callRule(
                    () =>
                        addRootProvider(
                            'test',
                            ({ code, external }) =>
                                code`${external('provideNoopAnimations', '@angular/platform-browser/animations')}()`
                        ),
                    tree
                )
            );
            tree = await runner.runSchematic('add-animations', { project: 'test' }, tree);
            const content = tree.readText('./test/src/app/app.config.ts');
            expect(content.indexOf('provideAnimations()')).toBe(-1);
        });
    });

    describe('non-standalone app', () => {
        beforeEach(async () => {
            tree = await createCleanApplication({ standalone: false }, await createCleanWorkspace());
        });
        it('should add animations', async () => {
            tree = await runner.runSchematic(
                'add-animations',
                { project: 'test', path: '/test/src/app', module: 'app-module.ts' },
                tree
            );
            expect(tree.readText('./test/src/app/app-module.ts')).toContain('BrowserAnimationsModule');
        });
        it('should not add animations if already present', async () => {
            tree = await runner.runSchematic(
                'add-animations',
                { project: 'test', path: '/test/src/app', module: 'app-module.ts' },
                tree
            );
            tree = await runner.runSchematic(
                'add-animations',
                { project: 'test', path: '/test/src/app', module: 'app-module.ts' },
                tree
            );
            const content = tree.readText('./test/src/app/app-module.ts');
            // 1 import, 1 ngmodule usage
            expect(content.split('BrowserAnimationsModule').length === 3).toBe(true);
        });
        it('should not add animations if noop animations already present', async () => {
            const project = await getProjectDefinition(tree, 'test');
            addModuleImportToRootModule(tree, 'NoopAnimationsModule', '@angular/platform-browser/animations', project);
            tree = await runner.runSchematic(
                'add-animations',
                { project: 'test', path: '/test/src/app', module: 'app-module.ts' },
                tree
            );
            const content = tree.readText('./test/src/app/app-module.ts');
            expect(content.indexOf('BrowserAnimationsModule')).toBe(-1);
        });
    });
});
