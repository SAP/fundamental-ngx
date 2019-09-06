"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const package_utils_1 = require("./package-utils");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const ts = require("typescript");
// Adds an import to the root module.
function addImportToRootModule(tree, moduleName, src, modulePath) {
    const moduleSource = package_utils_1.getSourceFile(tree, modulePath);
    if (!moduleSource) {
        throw new schematics_1.SchematicsException(`Module not found ${modulePath}`);
    }
    const changes = ast_utils_1.addImportToModule(moduleSource, modulePath, moduleName, src);
    const recorder = tree.beginUpdate(modulePath);
    changes.forEach((change) => {
        if (change instanceof change_1.InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
    });
    tree.commitUpdate(recorder);
}
exports.addImportToRootModule = addImportToRootModule;
// Checks if an import is included in the module.
function hasModuleImport(tree, modulePath, className) {
    const moduleFileContent = tree.read(modulePath);
    if (!moduleFileContent) {
        throw new schematics_1.SchematicsException(`Could not read Angular module file: ${modulePath}`);
    }
    const parsedFile = ts.createSourceFile(modulePath, moduleFileContent.toString(), ts.ScriptTarget.Latest, true);
    const ngModuleMetadata = findNgModuleMetadata(parsedFile);
    if (!ngModuleMetadata) {
        throw new schematics_1.SchematicsException(`Could not find NgModule declaration inside: "${modulePath}"`);
    }
    // tslint:disable-next-line:no-non-null-assertion
    for (const property of ngModuleMetadata.properties) {
        if (!ts.isPropertyAssignment(property) || property.name.getText() !== 'imports' ||
            !ts.isArrayLiteralExpression(property.initializer)) {
            continue;
        }
        if (property.initializer.elements.some(element => element.getText() === className)) {
            return true;
        }
    }
    return false;
}
exports.hasModuleImport = hasModuleImport;
// Borrowed from the Angular CDK
function findNgModuleMetadata(rootNode) {
    // Add immediate child nodes of the root node to the queue.
    const nodeQueue = [...rootNode.getChildren()];
    while (nodeQueue.length) {
        // tslint:disable-next-line:no-non-null-assertion
        const node = nodeQueue.shift();
        if (ts.isDecorator(node) && ts.isCallExpression(node.expression) &&
            isNgModuleCallExpression(node.expression)) {
            return node.expression.arguments[0];
        }
        else {
            nodeQueue.push(...node.getChildren());
        }
    }
    return null;
}
// Borrowed from the Angular CDK
function resolveIdentifierOfExpression(expression) {
    if (ts.isIdentifier(expression)) {
        return expression;
    }
    else if (ts.isPropertyAccessExpression(expression)) {
        return expression.name;
    }
    return null;
}
// Borrowed from the Angular CDK
function isNgModuleCallExpression(callExpression) {
    if (!callExpression.arguments.length ||
        !ts.isObjectLiteralExpression(callExpression.arguments[0])) {
        return false;
    }
    const decoratorIdentifier = resolveIdentifierOfExpression(callExpression.expression);
    return decoratorIdentifier ? decoratorIdentifier.text === 'NgModule' : false;
}
//# sourceMappingURL=ng-module-utils.js.map