import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getAppModulePath, isStandaloneApp } from '@angular/cdk/schematics';
import { getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { findAppConfig } from '@schematics/angular/utility/standalone/app_config';
import {
    findBootstrapApplicationCall,
    findProvidersLiteral,
    getSourceFile
} from '@schematics/angular/utility/standalone/util';
import * as ts from 'typescript';
import { getMainTsFilePath } from './main-ts-file-path';

export async function callsProvidersFunction(tree: Tree, projectName: string, functionName: string): Promise<boolean> {
    const mainPath = await getMainTsFilePath(tree, projectName);
    const isStandalone = isStandaloneApp(tree, mainPath);
    if (isStandalone) {
        const bootstrapCall = findBootstrapApplicationCall(tree, mainPath);
        return callsProvidersFunctionStandalone(tree, bootstrapCall, mainPath, functionName);
    }
    return callsProvidersFunctionNgModule(tree, mainPath, functionName);
}

/**
 * Checks whether a providers function is being called in a `bootstrapApplication` call.
 * @param tree File tree of the project.
 * @param bootstrapCall Call to `bootstrapApplication`
 * @param filePath Path of the file in which to check.
 * @param functionName Name of the function to search for.
 */
export function callsProvidersFunctionStandalone(
    tree: Tree,
    bootstrapCall: ts.CallExpression,
    filePath: string,
    functionName: string
): boolean {
    const appConfig = findAppConfig(bootstrapCall, tree, filePath);
    const providersLiteral = appConfig ? findProvidersLiteral(appConfig.node) : null;

    return !!providersLiteral?.elements.some(
        (el) => ts.isCallExpression(el) && ts.isIdentifier(el.expression) && el.expression.text === functionName
    );
}

function callsProvidersFunctionNgModule(tree: Tree, mainPath: string, functionName: string): boolean {
    const appModulePath = getAppModulePath(tree, mainPath);
    const appModuleSource = getSourceFile(tree, appModulePath);

    const ngModuleDecorator = getDecoratorMetadata(appModuleSource, 'NgModule', '@angular/core');
    if (!ngModuleDecorator.length) {
        throw new SchematicsException(`❌ App module declaration not found.`);
    }
    const providersLiteral = findProvidersLiteral(ngModuleDecorator[0] as any);
    return !!providersLiteral?.elements.some(
        (el) => ts.isCallExpression(el) && ts.isIdentifier(el.expression) && el.expression.text === functionName
    );
}
