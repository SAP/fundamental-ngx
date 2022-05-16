import { WorkspaceProject, WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import { Tree, SchematicsException } from '@angular-devkit/schematics';
import * as ts from 'typescript';

// Checks if an import is included in the module.
export function hasModuleImport(tree: Tree, modulePath: string, className: string): boolean {
    const moduleFileContent = tree.read(modulePath);

    if (!moduleFileContent) {
        throw new SchematicsException(`Could not read Angular module file: ${modulePath}`);
    }

    const parsedFile = ts.createSourceFile(modulePath, moduleFileContent.toString(), ts.ScriptTarget.Latest, true);
    const ngModuleMetadata = findNgModuleMetadata(parsedFile);

    if (!ngModuleMetadata) {
        throw new SchematicsException(`Could not find NgModule declaration inside: "${modulePath}"`);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const property of ngModuleMetadata!.properties) {
        if (
            !ts.isPropertyAssignment(property) ||
            property.name.getText() !== 'imports' ||
            !ts.isArrayLiteralExpression(property.initializer)
        ) {
            continue;
        }

        if (property.initializer.elements.some((element) => element.getText() === className)) {
            return true;
        }
    }

    return false;
}

// Borrowed from the Angular CDK
function findNgModuleMetadata(rootNode: ts.Node): ts.ObjectLiteralExpression | null {
    // Add immediate child nodes of the root node to the queue.
    const nodeQueue: ts.Node[] = [...rootNode.getChildren()];

    while (nodeQueue.length) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const node = nodeQueue.shift()!;

        if (ts.isDecorator(node) && ts.isCallExpression(node.expression) && isNgModuleCallExpression(node.expression)) {
            return node.expression.arguments[0] as ts.ObjectLiteralExpression;
        } else {
            nodeQueue.push(...node.getChildren());
        }
    }

    return null;
}

// Borrowed from the Angular CDK
function resolveIdentifierOfExpression(expression: ts.Expression): ts.Identifier | null {
    if (ts.isIdentifier(expression)) {
        return expression;
    } else if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.name)) {
        return expression.name;
    }
    return null;
}

// Borrowed from the Angular CDK
function isNgModuleCallExpression(callExpression: ts.CallExpression): boolean {
    if (!callExpression.arguments.length || !ts.isObjectLiteralExpression(callExpression.arguments[0])) {
        return false;
    }

    const decoratorIdentifier = resolveIdentifierOfExpression(callExpression.expression);
    return decoratorIdentifier ? decoratorIdentifier.text === 'NgModule' : false;
}

// Borrowed from the Angular CDK
export function getProjectFromWorkspace(workspace: WorkspaceSchema, projectName?: string): WorkspaceProject {
    const key = projectName || workspace.defaultProject;
    const project = key && workspace.projects[key];

    if (!project) {
        throw new SchematicsException(`Could not find project in workspace: ${projectName}`);
    }

    return project;
}
