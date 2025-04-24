import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { createCleanApplication, createCleanWorkspace } from '../testing-utils/create-clean-application';
import { clearWorkspaceCache } from '../utils/workspace';

describe('add-styles schematic', () => {
    let runner: SchematicTestRunner;
    let tree: Tree;

    beforeEach(async () => {
        runner = new SchematicTestRunner('schematics', path.join(__dirname, '../collection.json'));
        tree = await createCleanApplication({}, await createCleanWorkspace());
    });

    afterEach(clearWorkspaceCache);

    describe('should modify angular.json correctly', () => {
        let styles: any[];
        let assets: any[];

        beforeEach(async () => {
            const result = await runner.runSchematic('add-styles', { project: 'test' }, tree);
            const angularJson = result.readJson('angular.json') as Record<string, any>;
            styles = angularJson.projects.test.architect.build.options.styles;
            assets = angularJson.projects.test.architect.build.options.assets;
        });

        it('should add fd-ngx styles', () => {
            expect(styles).toContain('./node_modules/@fundamental-ngx/core/styles/fundamental-ngx-core.css');
        });

        it('should add specified assets', () => {
            const expectedAssets = [
                {
                    glob: '**/css_variables.css',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/',
                    output: './assets/theming-base/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/',
                    output: './assets/theming-base/baseTheme/fonts/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/fonts/',
                    output: './assets/theming-base/sap_horizon/fonts/'
                },
                {
                    glob: '**/*',
                    input: './node_modules/fundamental-styles/dist/theming/',
                    output: './assets/fundamental-styles-theming/'
                }
            ];
            expectedAssets.forEach((expectedAsset) => {
                expect(assets).toContainEqual(expectedAsset);
            });
        });

        it('should not add styles more than once', async () => {
            const resultFirstRun = await runner.runSchematic('add-styles', { project: 'test' }, tree);
            const angularJsonFirstRun = resultFirstRun.readText('angular.json');

            const resultSecondRun = await runner.runSchematic('add-styles', { project: 'test' }, resultFirstRun);
            const angularJsonSecondRun = resultSecondRun.readText('angular.json');

            expect(angularJsonFirstRun).toEqual(angularJsonSecondRun);
        });

        it('should not duplicate assets on subsequent runs', async () => {
            const resultFirstRun = await runner.runSchematic('add-styles', { project: 'test' }, tree);
            const angularJsonFirstRun = resultFirstRun.readText('angular.json');

            const resultSecondRun = await runner.runSchematic('add-styles', { project: 'test' }, resultFirstRun);
            const angularJsonSecondRun = resultSecondRun.readText('angular.json');

            expect(angularJsonFirstRun).toEqual(angularJsonSecondRun);
        });
    });
});
