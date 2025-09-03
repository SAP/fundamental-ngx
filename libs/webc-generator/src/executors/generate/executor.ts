import { PromiseExecutor } from '@nx/devkit';
import type * as CEM from '@ui5/webcomponents-tools/lib/cem/types-internal.d.ts';
import { mkdir, readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import { componentTemplate } from './component-template';
import { GenerateExecutorSchema } from './schema';

/**
 * An NX executor that generates Angular components from UI5 Web Components'
 * custom-elements-internal.json schema.
 * @param options The executor options.
 * @param executorContext The executor context.
 * @returns A promise that resolves to an object with a success status.
 */
const runExecutor: PromiseExecutor<GenerateExecutorSchema> = async (options, executorContext) => {
    if (!executorContext.projectName) {
        throw new Error('Project name is not defined in the executor context.');
    }

    let cemFilePath: string | undefined;
    if (!options.cemFile) {
        return {
            success: false,
            error: `Could not determine a valid path to the CEM file. Please provide it via the "cemFile" option.`
        };
    }

    try {
        cemFilePath = require.resolve(options.cemFile, { paths: [executorContext.root] });
    } catch (error) {
        return {
            success: false,
            error: `Failed to resolve CEM file at path "${options.cemFile}". Please ensure the package is installed and the path is correct. Original error: ${error.message}`
        };
    }

    let cemData: CEM.Package;
    try {
        const fileContent = await readFile(cemFilePath, 'utf-8');
        cemData = JSON.parse(fileContent) as CEM.Package;
    } catch (error) {
        return { success: false, error: `Failed to read or parse CEM file at ${cemFilePath}: ${error.message}` };
    }

    // Get the project's root directory from the context.
    const projectRoot = executorContext.projectsConfigurations.projects[executorContext.projectName].root;
    const targetDir = options.targetDir || 'src/generated';
    console.log(`Generating components into: ${path.join(projectRoot, targetDir)}`);

    // Use an array to store all promises for file creation.
    const writePromises: Promise<void>[] = [];
    const componentImports: { className: string; path: string }[] = [];

    // Iterate over each module in the CEM data to find component declarations.
    for (const module of cemData.modules) {
        const declarations = module.declarations as CEM.CustomElementDeclaration[] | undefined;

        if (declarations) {
            // Loop through each custom element declaration.
            for (const declaration of declarations) {
                // Generate components only for classes that have a tag name.
                if (declaration.kind === 'class' && declaration.tagName) {
                    writePromises.push(
                        (async () => {
                            // Get the component's tag name and sanitize it for use in a file path.
                            const componentTagName = declaration.tagName as string;
                            const className = declaration.name as string;

                            // Remove the 'ui5-' prefix from the folder name
                            const componentFolderName = componentTagName.replace(/^ui5-/, '');
                            componentImports.push({ className, path: componentFolderName });

                            // Construct the full path where the component's directory will be created.
                            const componentDir = path.join(projectRoot, targetDir, componentFolderName);
                            const tsPath = path.join(componentDir, 'index.ts');
                            const ngPackagePath = path.join(componentDir, 'ng-package.json');
                            const ngPackageContent = JSON.stringify({ lib: { entryFile: './index.ts' } }, null, 2);

                            try {
                                // Create the directory (and any parent directories) if it doesn't exist.
                                await mkdir(componentDir, { recursive: true });

                                // Generate the component's content.
                                const generatedComponent = componentTemplate(declaration, cemData);

                                // Write the generated content to the index.ts file.
                                await writeFile(tsPath, generatedComponent, 'utf-8');

                                // Write the ng-package.json file.
                                await writeFile(ngPackagePath, ngPackageContent, 'utf-8');
                            } catch (error) {
                                // If any part of this process fails, log a specific error and re-throw
                                // so that the Promise.all at the end will reject.
                                console.error(`Failed to generate component for ${componentTagName}:`, error);
                                throw new Error(`Failed to write file for ${componentTagName}: ${error.message}`);
                            }
                        })()
                    );
                }
            }
        }
    }

    try {
        // Wait for all the component file promises to resolve.
        await Promise.all(writePromises);

        // Now generate the main module file.
        const moduleImports = componentImports.map((c) => `import { ${c.className} } from './${c.path}';`).join('\n');
        const componentNames = componentImports.map((c) => c.className).join(',\n    ');

        const moduleContent = `import { NgModule } from '@angular/core';
${moduleImports}

@NgModule({
  imports: [
    ${componentNames}
  ],
  exports: [
    ${componentNames}
  ],
})
export class Ui5ComponentsModule {}
`;

        const modulePath = path.join(projectRoot, targetDir, 'ui5.module.ts');
        await writeFile(modulePath, moduleContent, 'utf-8');

        // Generate the root index.ts file for the module.
        const rootIndexPath = path.join(projectRoot, targetDir, 'index.ts');
        const rootIndexContent = `export { Ui5ComponentsModule } from './ui5.module';\n`;
        await writeFile(rootIndexPath, rootIndexContent, 'utf-8');

        // Add the new theming folder and service file
        const themingDir = path.join(projectRoot, targetDir, 'theming');
        const themingServicePath = path.join(themingDir, 'index.ts');
        const themingServiceContent = `import { Injectable } from '@angular/core';
import { WebcomponentsThemingProvider } from '@ui5/webcomponents-ngx/theming';

@Injectable({ providedIn: 'root' })
class Ui5WebcomponentsThemingService extends WebcomponentsThemingProvider {
  name = 'ui-5-webcomponents-theming-service';
  constructor() {
    super(
      () => import('@ui5/webcomponents/dist/generated/json-imports/Themes.js'),
    );
  }
}

export { Ui5WebcomponentsThemingService };`;

        await mkdir(themingDir, { recursive: true });
        await writeFile(themingServicePath, themingServiceContent, 'utf-8');

        return { success: true };
    } catch (error) {
        // If any promise in the array rejected, the catch block will be triggered
        // and we can return a clear failure status.
        return { success: false, error: error.message };
    }
};

export default runExecutor;
