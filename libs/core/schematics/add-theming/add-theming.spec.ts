import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { createCleanApplication, createCleanWorkspace } from '../testing-utils/create-clean-application';
import { clearWorkspaceCache } from '../utils/workspace';

describe('add-theming schematic', () => {
    let tree: Tree;
    const runner: SchematicTestRunner = new SchematicTestRunner(
        'schematics',
        path.join(__dirname, '../collection.json')
    );

    describe('angular.json modifications', () => {
        beforeEach(async () => {
            tree = await createCleanApplication({ standalone: true }, await createCleanWorkspace());
        });
        afterEach(clearWorkspaceCache);
        it('should add icon font styles', async () => {
            const iconFonts = ['sap_fiori_3_fonts', 'sap_horizon_fonts'];
            tree = await runner.runSchematic('add-theming', { project: 'test' }, tree);
            const styles = (tree.readJson('./angular.json') as Record<string, any>).projects.test.architect.build
                .options.styles;
            iconFonts.forEach((font) => {
                expect(
                    styles.find((jsonStyle: any) => typeof jsonStyle === 'object' && jsonStyle.bundleName === font)
                ).toBeDefined();
            });
        });
    });

    describe('standalone app', () => {
        beforeEach(async () => {
            tree = await createCleanApplication({ standalone: true }, await createCleanWorkspace());
        });
        afterEach(clearWorkspaceCache);
        it('should add theming and initializer', async () => {
            tree = await runner.runSchematic('add-theming', { project: 'test' }, tree);
            expect(tree.readText('./test/src/app/app.config.ts')).toContain('provideTheming');
            expect(tree.readText('./test/src/app/app.config.ts')).toContain('themingInitializer()');
        });
        it('should not add theming if already present', async () => {
            tree = await runner.runSchematic('add-theming', { project: 'test' }, tree);
            tree = await runner.runSchematic('add-theming', { project: 'test' }, tree);
            const content = tree.readText('./test/src/app/app.config.ts');
            expect(content.split('provideTheming').length === 3).toBe(true);
            expect(content.split('themingInitializer').length === 3).toBe(true);
        });
        it('should correctly take the theme name into the configuration', async () => {
            tree = await runner.runSchematic('add-theming', { project: 'test', theme: 'sap_fiori_3' }, tree);
            expect(tree.readText('./test/src/app/app.config.ts')).toContain(
                "provideTheming({ defaultTheme: 'sap_fiori_3', changeThemeOnQueryParamChange: false })"
            );
        });
        it('should correctly configure `readThemeFromURL` option', async () => {
            tree = await runner.runSchematic(
                'add-theming',
                { project: 'test', theme: 'sap_fiori_3', readThemeFromURL: true },
                tree
            );
            expect(tree.readText('./test/src/app/app.config.ts')).toContain(
                "provideTheming({ defaultTheme: 'sap_fiori_3', changeThemeOnQueryParamChange: true })"
            );
            expect(tree.readText('./test/src/app/app.config.ts')).toContain('provideRouter([])');
        });
    });

    describe('non-standalone app', () => {
        beforeEach(async () => {
            tree = await createCleanApplication({ standalone: false }, await createCleanWorkspace());
        });
        afterEach(clearWorkspaceCache);
        it('should add theming and initializer', async () => {
            tree = await runner.runSchematic('add-theming', { project: 'test' }, tree);
            expect(tree.readText('./test/src/app/app.module.ts')).toContain('provideTheming');
            expect(tree.readText('./test/src/app/app.module.ts')).toContain('themingInitializer()');
        });
        it('should not add theming if already present', async () => {
            tree = await runner.runSchematic('add-theming', { project: 'test' }, tree);
            tree = await runner.runSchematic('add-theming', { project: 'test' }, tree);
            const content = tree.readText('./test/src/app/app.module.ts');
            expect(content.split('provideTheming').length === 3).toBe(true);
            expect(content.split('themingInitializer').length === 3).toBe(true);
        });
        it('should correctly take the theme name into the configuration', async () => {
            tree = await runner.runSchematic('add-theming', { project: 'test', theme: 'sap_fiori_3' }, tree);
            expect(tree.readText('./test/src/app/app.module.ts')).toContain(
                "provideTheming({ defaultTheme: 'sap_fiori_3', changeThemeOnQueryParamChange: false })"
            );
        });
        it('should correctly configure `readThemeFromURL` option', async () => {
            tree = await runner.runSchematic(
                'add-theming',
                { project: 'test', theme: 'sap_fiori_3', readThemeFromURL: true },
                tree
            );
            expect(tree.readText('./test/src/app/app.module.ts')).toContain(
                "provideTheming({ defaultTheme: 'sap_fiori_3', changeThemeOnQueryParamChange: true })"
            );
            expect(tree.readText('./test/src/app/app.module.ts')).toContain('RouterModule.forRoot([])');
        });
    });
});
