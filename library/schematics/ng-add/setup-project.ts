import { chain, noop, SchematicsException, Rule, Tree } from '@angular-devkit/schematics';
import { strings, normalize, experimental } from '@angular-devkit/core';
import { Schema as ngAddSchema} from './schema';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';

function setup(options: ngAddSchema): Rule {
    return (tree: Tree) => {
        const workspaceConfig = tree.read('/angular.json');
        if (!workspaceConfig) {
            throw new SchematicsException('Could not find Angular workspace configuration.')
        }

        // Convert workspace configuration to string
        const workspaceContent = workspaceConfig.toString();

        // Parse string to JSON object
        const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

        // Get project info
        const projectName = options.project as string;
        const project = workspace.projects[projectName];
        const projectType = project.projectType === 'application' ? 'app' : 'lib';
    };
}

