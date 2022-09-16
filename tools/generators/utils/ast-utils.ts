import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { addExportToModule, parseSourceFile } from '@angular/cdk/schematics';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';

/**
 * return Variable Statement based on variable name.
 * @param source
 * @param variableName
 */
export function getVariableStatement(source: ts.SourceFile, variableName: string): ts.VariableStatement | null {
    const variableStatements = source.statements.filter((s) => ts.isVariableStatement(s));
    const matchingVariable = variableStatements.find((s) => {
        const list = (s as ts.VariableStatement).declarationList;
        const firstDeclaration = list.declarations[0];
        if (ts.isIdentifier(firstDeclaration.name)) {
            return firstDeclaration.name.text === variableName;
        }
        return false;
    });

    if (!matchingVariable) {
        return null;
    }

    return matchingVariable as ts.VariableStatement;
}

/**
 * get variable value based on variable statement passed in.
 * returns the `initializer` property of first declaration.
 * @param variableStatement
 */
export function getVariableValue(variableStatement: ts.VariableStatement) {
    const firstDeclaration = variableStatement.declarationList.declarations[0];
    return firstDeclaration.initializer;
}

/**
 * find the property assignment node based on list of properties passed in and name of property you are looking for.
 * @param {ts.NodeArray<ts.ObjectLiteralElementLike>} props
 * @param {string} propName
 * @returns {ts.PropertyAssignment | undefined}
 */
export function getPropertyAssignmentByName(
    props: ts.NodeArray<ts.ObjectLiteralElementLike>,
    propName: string
): ts.PropertyAssignment | undefined {
    return props.find(
        (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.escapedText === propName
    ) as ts.PropertyAssignment | undefined;
}

/**
 * Import and add module or component to specific module path.
 * @param host the tree we are updating
 * @param modulePath src location of the module to export
 * @param moduleName name of module to export
 * @param src src location to export
 */
export function addModuleOrComponentExportToModule(host: Tree, modulePath: string, moduleName: string, src: string) {
    const moduleSource = parseSourceFile(host, modulePath);

    if (!moduleSource) {
        throw new SchematicsException(`Module not found: ${modulePath}`);
    }

    // @ts-ignore
    const changes = addExportToModule(moduleSource, modulePath, moduleName, src);
    const recorder = host.beginUpdate(modulePath);

    changes.forEach((change) => {
        if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
    });

    host.commitUpdate(recorder);
}

/**
 * Replaces content in file at given path
 * @param tree the tree we are updating
 * @param filePath src location of the file to update
 * @param replacements an array of arguments for `string.replace()` function
 */
export function replaceContentInFile(
    tree: Tree,
    filePath: string,
    replacements: [replacer: string | RegExp, replaceValue: string][]
) {
    if (!tree.exists(filePath)) {
        throw new SchematicsException(`File not found: ${filePath}`);
    }
    let indexTs = tree.read(filePath)?.toString() ?? '';
    replacements.forEach(([replacer, replaceValue]) => (indexTs = indexTs.replace(replacer, replaceValue)));
    tree.overwrite(filePath, indexTs);
}
