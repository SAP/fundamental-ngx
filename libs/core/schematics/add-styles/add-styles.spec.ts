import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";
import { createCleanApplication, createCleanWorkspace } from "../testing-utils/create-clean-application";
import { clearWorkspaceCache } from "../utils/workspace";

describe('add-styles schematic', () => {
    let tree: Tree;
    const runner: SchematicTestRunner = new SchematicTestRunner('schematics', path.join(__dirname, '../collection.json'));

    beforeEach(async () => {
        tree = await createCleanApplication({}, await createCleanWorkspace());
    });

    afterEach(clearWorkspaceCache);

    describe('should add styles to angular.json', () => {
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
        it('should add sap fonts', () => {
            expect(styles).toContain('./node_modules/fundamental-styles/dist/fonts/sap_fonts.css');
        });
        it('should add assets', () => {
            const expectedAssets = [
                JSON.stringify({
                    "glob": "**/css_variables.css",
                    "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/",
                    "output": "./assets/theming-base/"
                }),
                JSON.stringify({
                    "glob": "**/*",
                    "input": "./node_modules/fundamental-styles/dist/theming/",
                    "output": "./assets/fundamental-styles-theming/"
                })
            ];
            const factualAssets = JSON.stringify(assets);
            expectedAssets.forEach(expectedAsset => {
                expect(factualAssets).toContain(expectedAsset);
            });
        });
    });

    it('should not add fonts if not requested', async () => {
        const result = await runner.runSchematic('add-styles', { project: 'test', fonts: false }, tree);
        const angularJson = result.readJson('angular.json') as Record<string, any>;
        const styles = angularJson.projects.test.architect.build.options.styles;
        expect(styles).not.toContain('./node_modules/fundamental-styles/dist/fonts/sap_fonts.css');
    });

    it('should not add styles more than once', async () => {
        const result = await runner.runSchematic('add-styles', { project: 'test' }, tree);
        const angularJson = result.readText('angular.json');

        const result2 = await runner.runSchematic('add-styles', { project: 'test' }, result);
        const angularJson2 = result2.readText('angular.json');

        expect(angularJson).toEqual(angularJson2);
    });
});
