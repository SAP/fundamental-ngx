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
            error: `Could not determine a valid path to the CEM file. Please provide it via the cemFile option.`
        };
    }

    try {
        cemFilePath = require.resolve(options.cemFile, { paths: [executorContext.root] });
    } catch (error) {
        return {
            success: false,
            error: `Failed to resolve CEM file at path ${options.cemFile}. Please ensure the package is installed and the path is correct. Original error: ${error.message}`
        };
    }

    let cemData: CEM.Package;
    try {
        const cemContent = await readFile(cemFilePath, 'utf-8');
        cemData = JSON.parse(cemContent) as CEM.Package;
    } catch (error) {
        return {
            success: false,
            error: `Failed to read or parse the CEM file at ${cemFilePath}. Original error: ${error.message}`
        };
    }

    const skipComponents = options.skipComponents === true;
    const packageName = options.packageName || '@ui5/webcomponents';

    // Helper function to convert PascalCase to kebab-case
    const pascalToKebabCase = (str: string): string => str.replace(/\B([A-Z])/g, '-$1').toLowerCase();

    const componentDeclarations = cemData.modules.flatMap((m) => {
        const declarations = (m.declarations || []).filter(
            (d): d is CEM.CustomElementDeclaration =>
                d?.kind === 'class' && 'customElement' in d && d.customElement === true
        );
        return declarations.map((d) => ({ declaration: d, modulePath: m.path }));
    });

    const components = componentDeclarations
        .map(({ declaration, modulePath }) => {
            const className = declaration.name || '';
            const fileName = pascalToKebabCase(declaration.name || '');
            return { className, fileName };
        })
        .filter((c) => c.className !== '' && c.fileName !== '');

    // Extract all enum declarations from the CEM data
    const allEnums = cemData.modules
        .flatMap((m) => m.declarations || [])
        .filter((d): d is CEM.EnumDeclaration => d?.kind === 'enum')
        .map((e) => ({ name: e.name, members: (e.members || []).map((m) => m.name) }));

    try {
        const projectRoot = executorContext.root;
        const targetDir = `libs/${executorContext.projectName}`;

        const typesContent = allEnums
            .map((e) => {
                const enumValues = e.members.map((m) => `'${m}'`).join(' | ');
                return `export type ${e.name} = ${enumValues} | undefined;`;
            })
            .join('\n');

        // Create the directory if it doesn't exist
        await mkdir(path.join(projectRoot, targetDir), { recursive: true });

        let exportsContent = '';

        if (typesContent) {
            // Generate the types file
            const typesDir = path.join(projectRoot, targetDir, 'types');
            const typesIndexPath = path.join(typesDir, 'index.ts');
            if (typesContent) {
                exportsContent += `export * from './types';\n`;
            }

            await mkdir(typesDir, { recursive: true });
            await writeFile(typesIndexPath, typesContent, 'utf-8');
            await writeFile(
                path.join(typesDir, 'ng-package.json'),
                JSON.stringify({ lib: { entryFile: './index.ts' } }, null, 2),
                'utf-8'
            );
        }

        if (!skipComponents) {
            // Generate all component files and ng-package.json files
            await Promise.all(
                componentDeclarations.map(({ declaration, modulePath }) => {
                    const fileName = pascalToKebabCase(declaration.name || '');
                    const componentDir = path.join(projectRoot, targetDir, fileName);
                    const componentIndexPath = path.join(componentDir, 'index.ts');
                    const ngPackagePath = path.join(componentDir, 'ng-package.json');

                    return mkdir(componentDir, { recursive: true })
                        .then(() =>
                            writeFile(
                                componentIndexPath,
                                componentTemplate(declaration, cemData, allEnums, packageName),
                                'utf-8'
                            )
                        )
                        .then(() =>
                            writeFile(
                                ngPackagePath,
                                JSON.stringify({ lib: { entryFile: './index.ts' } }, null, 2),
                                'utf-8'
                            )
                        );
                })
            );

            // Generate the utils folder and cva.ts file
            const utilsDir = path.join(projectRoot, targetDir, 'utils');
            const cvaFilePath = path.join(utilsDir, 'cva.ts');
            const cvaContent = `import { Directive, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface CvaComponent<ValueType = any> {
  element: Element;
  cvaValue: ValueType;
}

@Directive({
  selector: '[noop]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericControlValueAccessor), // TODO: it's not needed in the older wrappers
      //useExisting: GenericControlValueAccessor,
      multi: true,
    },
  ],
  host: {
    '(focusout)': 'onTouched?.()',
  },
})
class GenericControlValueAccessor<ValueType = any>
  implements ControlValueAccessor
{
  onChange!: (val: ValueType) => void;
  onTouched!: () => void;

  host!: CvaComponent<ValueType>;

  setDisabledState = (isDisabled: boolean): void => {
    this.host.element['disabled'] = isDisabled;
  };

  registerOnChange(fn: (newVal: ValueType) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(val: ValueType): void {
    this.host.cvaValue = val;
  }
}

export { GenericControlValueAccessor };`;
            await mkdir(utilsDir, { recursive: true });
            await writeFile(cvaFilePath, cvaContent, 'utf-8');

            exportsContent +=
                `export { GenericControlValueAccessor } from './utils/cva';\n` +
                components.map(({ className, fileName }) => `export { ${className} } from './${fileName}';`).join('\n');

            // Add the new theming folder and service file
            const themingDir = path.join(projectRoot, targetDir, 'theming');
            const themingServicePath = path.join(themingDir, 'index.ts');
            const themingServiceContent = `import { Injectable } from '@angular/core';\nimport { WebcomponentsThemingProvider } from '@fundamental-ngx/ui5-webcomponents-base/theming';\n\n@Injectable({ providedIn: 'root' })\nclass Ui5Webcomponents${getSuffix(packageName)}ThemingService extends WebcomponentsThemingProvider {\n  name = 'ui-5-webcomponents-theming-service';\n  constructor() {\n    super(\n      () => import('@ui5/webcomponents/dist/generated/json-imports/Themes.js'),\n    );\n  }\n}\n\nexport { Ui5Webcomponents${getSuffix(packageName)}ThemingService };`;

            await mkdir(themingDir, { recursive: true });
            await writeFile(themingServicePath, themingServiceContent, 'utf-8');
            await writeFile(
                path.join(themingDir, 'ng-package.json'),
                JSON.stringify({ lib: { entryFile: './index.ts' } }, null, 2),
                'utf-8'
            );
        }

        // Generate the root index.ts file
        const rootIndexPath = path.join(projectRoot, targetDir, 'index.ts');

        await writeFile(rootIndexPath, exportsContent, 'utf-8');

        return { success: true };
    } catch (error) {
        // If any promise in the array rejected, the catch block will be triggered
        // and we can return a clear failure status.
        return {
            success: false,
            error: `An error occurred during component generation: ${error.message}`
        };
    }
};

function getSuffix(packageName: string): string {
    const prefix = '@ui5/webcomponents';
    if (!packageName.startsWith(prefix)) {
        throw new Error('Invalid package name');
    }

    const suffix = packageName.slice(prefix.length + 1) || 'main';
    const capitalizedSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);

    return capitalizedSuffix;
}

export default runExecutor;
