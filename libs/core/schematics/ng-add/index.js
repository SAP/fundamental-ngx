"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const package_utils_1 = require("../utils/package-utils");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const ng_module_utils_1 = require("../utils/ng-module-utils");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const project_1 = require("@schematics/angular/utility/project");
const chalk_1 = require("chalk");
const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const fdStylesPath = 'node_modules/fundamental-styles/dist/fundamental-styles.min.css';
function ngAdd(options) {
    return schematics_1.chain([
        addDependencies(),
        addAnimations(options),
        addStylePathToConfig(options),
        endInstallTask()
    ]);
}
exports.ngAdd = ngAdd;
// Runs npm install. Called as the last rule.
function endInstallTask() {
    return (tree, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask());
        return tree;
    };
}
// Adds missing dependencies to the project.
function addDependencies() {
    return (tree) => {
        const ngCoreVersionTag = package_utils_1.getPackageVersionFromPackageJson(tree, '@angular/core');
        const dependencies = [];
        if (!package_utils_1.hasPackage(tree, '@angular/forms')) {
            dependencies.push({ type: dependencies_1.NodeDependencyType.Default, version: `${ngCoreVersionTag}`, name: '@angular/forms' });
        }
        if (!package_utils_1.hasPackage(tree, '@angular/animations')) {
            dependencies.push({ type: dependencies_1.NodeDependencyType.Default, version: `${ngCoreVersionTag}`, name: '@angular/animations' });
        }
        dependencies.forEach(dependency => {
            dependencies_1.addPackageJsonDependency(tree, dependency);
            console.log(chalk_1.default.green(`✅️ Added ${dependency.name} to ${dependency.type}.`));
        });
        return tree;
    };
}
// Configures browser animations.
function addAnimations(options) {
    return (tree) => {
        // tslint:disable-next-line:no-non-null-assertion
        const modulePath = ng_ast_utils_1.getAppModulePath(tree, project_1.getProject(tree, options.project).architect.build.options.main);
        if (options.animations) {
            if (ng_module_utils_1.hasModuleImport(tree, modulePath, noopAnimationsModuleName)) {
                return console.warn(chalk_1.default.red(`Could not set up "${chalk_1.default.bold(browserAnimationsModuleName)}" ` +
                    `because "${chalk_1.default.bold(noopAnimationsModuleName)}" is already imported. Please manually ` +
                    `set up browser animations.`));
            }
            ng_module_utils_1.addImportToRootModule(tree, browserAnimationsModuleName, '@angular/platform-browser/animations', modulePath);
            console.log(chalk_1.default.green(`✅️ Added ${browserAnimationsModuleName} to root module.`));
        }
        else if (!ng_module_utils_1.hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
            ng_module_utils_1.addImportToRootModule(tree, noopAnimationsModuleName, '@angular/platform-browser/animations', modulePath);
            console.log(chalk_1.default.green(`✅️ Added ${noopAnimationsModuleName} to root module.`));
        }
        return tree;
    };
}
// Adds the style path to the angular.json.
function addStylePathToConfig(options) {
    return (tree) => {
        const angularConfigPath = '/angular.json';
        const workspaceConfig = tree.read('/angular.json');
        if (!workspaceConfig) {
            throw new schematics_1.SchematicsException(`Unable to find angular.json. Please manually configure your styles array.`);
        }
        const workspaceJson = JSON.parse(workspaceConfig.toString());
        try {
            // tslint:disable-next-line:no-non-null-assertion
            const stylesArray = workspaceJson.projects[options.project].architect.build.options['styles'];
            if (!stylesArray.includes(fdStylesPath)) {
                stylesArray.push(fdStylesPath);
                // tslint:disable-next-line:no-non-null-assertion
                workspaceJson.projects[options.project].architect.build.options['styles'] = stylesArray;
            }
            else {
                console.log(chalk_1.default.green(`✅️ Found duplicate style path in angular.json. Skipping.`));
                return tree;
            }
        }
        catch (e) {
            throw new schematics_1.SchematicsException(`Unable to find angular.json project styles. Please manually configure your styles array.`);
        }
        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));
        console.log(chalk_1.default.green(`✅️ Added fundamental-styles path to angular.json.`));
        return tree;
    };
}
//# sourceMappingURL=index.js.map