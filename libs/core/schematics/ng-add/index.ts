import {
    chain,
    Rule,
    SchematicContext,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getPackageVersionFromPackageJson, hasPackage } from '../utils/package-utils';
import {
    addPackageJsonDependency,
    NodeDependency,
    NodeDependencyType
} from '@schematics/angular/utility/dependencies';
import { addImportToRootModule, hasModuleImport } from '../utils/ng-module-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

import { cdkVersion } from './versions';
import { defaultFontStyle } from './styles';
import { getWorkspace, getWorkspacePath } from '@schematics/angular/utility/config';
import { getProject } from '@schematics/angular/utility/project';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const stylesEntries: string[] = [
    'node_modules/fundamental-styles/dist/icon.css',
    'node_modules/@angular/cdk/overlay-prebuilt.css'
];

export function ngAdd(options: any): Rule {
    return chain([
        addDependencies(),
        addAnimations(options),
        addStylePathToConfig(options),
        addFontsToStyles(options),
        endInstallTask()
    ]);
}

// Runs npm install. Called as the last rule.
function endInstallTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
}

// Adds missing dependencies to the project.
function addDependencies(): Rule {
    return (tree: Tree) => {
        const ngCoreVersionTag = getPackageVersionFromPackageJson(tree, '@angular/core');
        const dependencies: NodeDependency[] = [];

        if (!hasPackage(tree, '@angular/forms')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `${ngCoreVersionTag}`,
                name: '@angular/forms'
            });
        }

        if (!hasPackage(tree, '@angular/animations')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `${ngCoreVersionTag}`,
                name: '@angular/animations'
            });
        }

        if (!hasPackage(tree, '@angular/cdk')) {
            dependencies.push({ type: NodeDependencyType.Default, version: `${cdkVersion}`, name: '@angular/cdk' });
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);
            console.log(`✅️ Added ${dependency.name} to ${dependency.type}.`);
        });

        return tree;
    };
}

// Configures browser animations.
function addAnimations(options: any): Rule {
    return (tree: Tree) => {

        const workspace = getWorkspace(tree);
        const projectName = options.project || workspace.defaultProject;

        // tslint:disable-next-line:no-non-null-assertion
        const modulePath = getAppModulePath(tree, getProject(tree, projectName)!.architect!.build!.options!.main);

        if (options.animations) {
            if (hasModuleImport(tree, modulePath, noopAnimationsModuleName)) {
                return console.warn(
                    `Could not set up "${browserAnimationsModuleName}" ` +
                        `because "${noopAnimationsModuleName}" is already imported. Please manually ` +
                        `set up browser animations.`
                );
            }
            addImportToRootModule(
                tree,
                browserAnimationsModuleName,
                '@angular/platform-browser/animations',
                modulePath
            );
            console.log(`✅️ Added ${browserAnimationsModuleName} to root module.`);
        } else if (!hasModuleImport(tree, modulePath, browserAnimationsModuleName)) {
            addImportToRootModule(tree, noopAnimationsModuleName, '@angular/platform-browser/animations', modulePath);
            console.log(`✅️ Added ${noopAnimationsModuleName} to root module.`);
        }
        return tree;
    };
}

// Adds the icon style path to the angular.json.
function addStylePathToConfig(options: any): Rule {
    return (host: Tree) => {

        const workspace = getWorkspace(host);
        const projectName = options.project || workspace.defaultProject;

        if (!projectName) {
            throw Error(`Cant Find project by name ${projectName}`);
        }
        try {
            // tslint:disable-next-line:no-non-null-assertion
            const project: WorkspaceProject = workspace.projects[projectName];
            const styles: any[] = (<any>project.architect)['build']['options']['styles'];

            stylesEntries.reverse().forEach(path => {
                if (!styles.includes(path)) {
                    styles.unshift(path);
                }
            });
        } catch (e) {
            throw new SchematicsException(
                `Unable to find angular.json project styles. Please manually configure your styles array.`
            );
        }
        host.overwrite(getWorkspacePath(host), JSON.stringify(workspace, null, 2));
        console.log(`✅️ Added styles path to angular.json.`);
        return host;
    };
}

// Adds the default fonts import into styles.scss
function addFontsToStyles(options: any): Rule {
    return (tree: Tree) => {
        const stylesFilePath = '/src/styles.scss';
        const stylesFileContent = tree.read('/src/styles.scss');
        const defaultFontStyleString = defaultFontStyle;
        const sapThemingImport: string = 'node_modules/@sap-theming/theming-base-content/content/Base/baseLib';

        if (options.styleFonts) {
            if (!stylesFileContent) {
                console.warn(
                    `Unable to find styles.scss. Please manually configure your styles. For more info, visit https://fundamental-styles.netlify.com/getting-started.html`
                );
                return tree;
            }

            try {
                let stylesFileString: string = stylesFileContent.toString();

                if (!stylesFileString.includes(sapThemingImport)) {
                    stylesFileString = defaultFontStyleString + stylesFileString;
                    tree.overwrite(stylesFilePath, stylesFileString);
                } else {
                    console.log(`✅️ There are imports from @sap-theming in styles.scss already. Skipping`);
                    return tree;
                }
            } catch (e) {
                console.warn(
                    `Unable to find styles.scss. Please manually configure your styles. For more info, visit https://fundamental-styles.netlify.com/getting-started.html`
                );
                return tree;
            }
        }

        return tree;
    };
}

