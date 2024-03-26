import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const toStrictEqual = (actual: any, expected: any): void => expect(actual).toStrictEqual(expected);

describe('ng-add schematic', () => {
    let tree: Tree;
    let runner: SchematicTestRunner;

    beforeEach(() => {
        process.env = {
            FD_ENV_FDSTYLES_VER_PLACEHOLDER: '1',
            FD_ENV_THEMING_VER_PLACEHOLDER: '2',
            FD_ENV_VERSION_PLACEHOLDER: '3'
        };
        tree = Tree.empty();
        tree.create(
            'package.json',
            JSON.stringify({
                dependencies: {
                    '@angular/core': '^17.0.4'
                }
            })
        );
        runner = new SchematicTestRunner('schematics', collectionPath);
    });
    it('should add needed packages', async () => {
        tree = await runner.runExternalSchematic('schematics', 'add-dependencies', undefined, tree);
        const { dependencies } = tree.readJson('package.json') as { dependencies: Record<string, string> };

        toStrictEqual(dependencies, {
            '@angular/cdk': '^17.0.0',
            '@angular/core': '^17.0.4',
            '@angular/forms': '^17.0.0',
            '@fundamental-ngx/cdk': '3',
            '@fundamental-ngx/i18n': '3',
            '@sap-theming/theming-base-content': '2',
            'fundamental-styles': '1'
        });
    });

    it('should throw an error if package.json does not exist', async () => {
        tree.delete('package.json');
        try {
            await runner.runExternalSchematic('schematics', 'add-dependencies', undefined, tree);
        } catch (e) {
            expect(e.message).toBe('Path "/package.json" does not exist.');
        }
    });

    it('should throw an error if @angular/core is not a dependency', async () => {
        tree.overwrite('package.json', JSON.stringify({ dependencies: {} }));
        try {
            await runner.runExternalSchematic('schematics', 'add-dependencies', undefined, tree);
        } catch (e) {
            expect(e.message).toBe('Could not find @angular/core in package.json');
        }
    });
});
