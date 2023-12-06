import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Schema } from '@schematics/angular/application/schema';
import * as path from 'path';

export const angularSchematics = new SchematicTestRunner(
    '@schematics/angular',
    path.join(__dirname, '../../../../node_modules/@schematics/angular/collection.json')
);

export const createCleanWorkspace = (tree?: Tree): Promise<Tree> =>
    angularSchematics.runSchematic(
        'workspace',
        {
            name: 'workspace',
            version: '1'
        },
        tree || Tree.empty()
    );

export const createCleanApplication = (options: Partial<Schema>, tree: Tree): Promise<Tree> =>
    angularSchematics.runSchematic(
        'application',
        {
            name: 'test',
            standalone: true,
            strict: false,
            inlineStyle: true,
            inlineTemplate: true,
            routing: false,
            skipTests: true,
            minimal: true,
            ssr: false,
            ...options
        },
        tree
    );
