import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
export declare function getSourceFile(host: Tree, path: string): ts.SourceFile;
export declare function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null;
export declare function hasPackage(tree: Tree, name: string): boolean | null;
