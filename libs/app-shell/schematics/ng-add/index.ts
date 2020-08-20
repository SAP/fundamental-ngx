import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

export default function(options: Schema): Rule {
    return (host: Tree, context: SchematicContext) => {

        console.log(options.project);
        addPackageJsonDependency(host, {
            type: NodeDependencyType.Default,
            name: '@fundamental-ngx/app-shell',
            version: 'SHELL_PLACEHOLDER'

        });
        context.addTask(new NodePackageInstallTask());
    };
}


