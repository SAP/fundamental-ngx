import { Tree } from '@angular-devkit/schematics';
export declare function addImportToRootModule(tree: Tree, moduleName: string, src: string, modulePath: string): void;
export declare function hasModuleImport(tree: Tree, modulePath: string, className: string): boolean;
