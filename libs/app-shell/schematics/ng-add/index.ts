import {
    apply,
    branchAndMerge,
    chain,
    mergeWith,
    move,
    noop,
    Rule,
    SchematicContext,
    SchematicsException,
    Tree,
    url
} from '@angular-devkit/schematics';
import { Schema } from './schema';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
    addPackageJsonDependency,
    NodeDependency,
    NodeDependencyType
} from '@schematics/angular/utility/dependencies';
import { getWorkspace } from '@schematics/angular/utility/config';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import {
    addModuleImportToModule,
    getProjectFromWorkspace,
    getProjectTargetOptions
} from '@angular/cdk/schematics';
import {
    FileDoesNotExistException,
    join,
    normalize
} from '@angular-devkit/core';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import { createFundamentalStyles } from './default-styles';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

export type ProjectSettings = Schema & {
    workspace: WorkspaceSchema;
    projectWorkspace: WorkspaceProject;
    config: any;
    hasCustomStyleFile: boolean;
};
const FUNDAMENTAL_STYLES = 'fundamental-styles.scss';
const CONFIG_FILE_NAME = 'angular.json';
let projectSettings: Partial<ProjectSettings>;


export default function(options: Schema): Rule {
    return (host: Tree, context: SchematicContext) => {
        setupOptions(host, options, context);

        return chain([
            addDependencies(),
            options.addModuleAnimation ? addModuleToRootModuleFile('BrowserAnimationsModule',
                '@angular/platform-browser/animations') : noop(),
            options.addAppShellModule ? addModuleToRootModuleFile('AppShellModule',
                '@fundamental-ngx/app-shell') : noop(),
            options.addCustomStyleFile ? createCustomStyles() : noop(),
            options.addCustomStyleFile ? createCustomStyles() : noop(),
            addStylesToAngularJson(),
            copyThemesToAssets(),
            info()

        ]);
    };
}


function addDependencies(): Rule {

    return (host: Tree, context: SchematicContext) => {
        const coreDeps: NodeDependency[] = [
            { type: NodeDependencyType.Default, version: '^VERSION_PLACEHOLDER', name: '@fundamental-ngx/core' },
            { type: NodeDependencyType.Default, version: 'SHELL_VER_PLACEHOLDER', name: '@fundamental-ngx/app-shell' },
            { type: NodeDependencyType.Default, version: 'CDK_VER_PLACEHOLDER', name: '@angular/cdk' }
        ];


        coreDeps.forEach(dependency => {
            addPackageJsonDependency(host, dependency);
        });
        context.logger.log('info', `✅️ Added ${coreDeps.length} packages into dependencies section`);
        context.addTask(new NodePackageInstallTask());
        context.logger.log('info', `🔍 Installing packages...`);

        return host;
    };
}


function addStylesToAngularJson(): Rule {
    return (host: Tree, context: SchematicContext) => {
        context.logger.log('info', `✅️ Added styles entry`);
        const styleEntries = ['node_modules/fundamental-styles/dist/icon.css'];
        if (projectSettings.hasCustomStyleFile) {
            const newStyleFile = normalize(join(normalize(projectSettings.projectWorkspace.sourceRoot),
                FUNDAMENTAL_STYLES));
            styleEntries.push(newStyleFile);
        }

        const buildOptions = getProjectTargetOptions(projectSettings.projectWorkspace, 'build');

        if (!buildOptions.styles) {
            buildOptions.styles = [...styleEntries];
        } else {
            buildOptions.styles.unshift(...styleEntries);
        }
        context.logger.log('info', `✅️ Added styles entry => custom styles ${projectSettings.hasCustomStyleFile}`);

        host.overwrite(CONFIG_FILE_NAME, JSON.stringify(projectSettings.workspace, null, 2));
        return host;
    };
}


function copyThemesToAssets(): Rule {
    return (host: Tree, context: SchematicContext) => {
        try {
            const movePath = join(normalize(projectSettings.projectWorkspace.sourceRoot), 'assets', 'theme');
            context.logger.log('info', `✅️ Copying themes files to application asset folder ${movePath}`);
            if (host.exists(movePath)) {
                return host;
            }
            const templateSource = apply(url('./theme'), [
                move(movePath)
            ]);
            return chain([
                    branchAndMerge(chain([
                        mergeWith(templateSource)
                    ]))
                ]
            );
        } catch (e) {
            context.logger.log('warn',
                `✅️ Failed to copy theme files into assets directory`);
        }
    };
}


function info(): Rule {
    return (host: Tree, context: SchematicContext) => {
        context.logger.log('info', '✅ When everything is installed, you can go ahead and try to add this code into ' +
            'your app.component.html:');
        context.logger.log('warn', `
<fds-app>
    <fds-app-header title="One Procurement">
    </fds-app-header>

    <fds-app-content>
        This is my content
    </fds-app-content>

    <fds-app-footer>
        Copyright
    </fds-app-footer>
</fds-app>

       `);

        return host;
    };
}


function createCustomStyles(): Rule {
    return (host: Tree, context: SchematicContext) => {
        try {
            const styleContent = createFundamentalStyles();

            if (!projectSettings.projectWorkspace.sourceRoot) {
                throw new SchematicsException('Cannot continue updating fundamental styles due to missing sourceRoot');
            }
            const newStyleFile = normalize(join(normalize(projectSettings.projectWorkspace.sourceRoot),
                FUNDAMENTAL_STYLES));
            if (host.exists(newStyleFile)) {
                context.logger.log('warn',
                    `✅️ Skipping updateStyle task. ${FUNDAMENTAL_STYLES} already exists`);
            }
            host.create(newStyleFile, styleContent);

            projectSettings.hasCustomStyleFile = true;


        } catch (e) {
            context.logger.log('warn',
                `✅️ Failed to add scripts into angular.json`);
        }
    };
}

function setupOptions(host: Tree, options: Schema, context: SchematicContext): void {
    if (!host.exists(CONFIG_FILE_NAME)) {
        throw new SchematicsException('Could not install Clarity, requires Angular and Angular CLI version 6 or greater');
    }
    projectSettings = {
        project: options.project,
        path: options.path,
        module: options.module,
        addCustomStyleFile: options.addCustomStyleFile,
        addModuleAnimation: options.addModuleAnimation,
        hasCustomStyleFile: false
    };
    const file = host.get(CONFIG_FILE_NAME);
    if (!file) {
        throw new FileDoesNotExistException(CONFIG_FILE_NAME);
    }

    context.logger.log('info', `✅️ Setting schematics Options`);

    try {
        projectSettings.config = JSON.parse(file.content.toString());
    } catch (e) {
        throw new SchematicsException(`Cant parse file under  ${CONFIG_FILE_NAME}!`);
    }

    if (!options.project) {
        if (!projectSettings.config.defaultProject) {
            throw new SchematicsException('Could not find a default project, please specify --project PROJECT_NAME');
        }

        projectSettings.project = projectSettings.config.defaultProject;
    }
    projectSettings.workspace = getWorkspace(host);

    projectSettings.projectWorkspace = getProjectFromWorkspace(projectSettings.workspace);

    if (!projectSettings.projectWorkspace) {
        throw new SchematicsException('Could not find a project workspace');
    }


    const mainPath = getProjectTargetOptions(projectSettings.projectWorkspace, 'build').main;
    projectSettings.module = normalize(`./${getAppModulePath(host, mainPath)}`);

}


function addModuleToRootModuleFile(moduleName: string, path: string): Rule {
    return (host: Tree) => {
        addModuleImportToModule(
            host,
            projectSettings.module,
            moduleName,
            path
        );
        return host;
    };
}
