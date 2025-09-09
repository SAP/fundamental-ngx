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

    const projectRoot = executorContext.projectGraph.nodes[executorContext.projectName].data.root;
    const { targetDir } = options;

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
        const cemFileContent = await readFile(cemFilePath, 'utf-8');
        cemData = JSON.parse(cemFileContent) as CEM.Package;
    } catch (error) {
        return {
            success: false,
            error: `Failed to parse CEM file. Please ensure it is a valid JSON file. Original error: ${error.message}`
        };
    }

    try {
        const components: { className: string; fileName: string }[] = [];
        const enumDeclarations: { name: string; members: string[] }[] = [];

        for (const module of cemData.modules) {
            // Check if declarations exist before trying to iterate
            for (const declaration of module.declarations || []) {
                if (declaration.kind === 'enum') {
                    const members =
                        (declaration as CEM.EnumDeclaration).members?.map((member) => `"${member.name}"`) || [];
                    enumDeclarations.push({ name: declaration.name, members });
                }
            }
        }

        // Generate the central types file
        const typesDir = path.join(projectRoot, targetDir, 'types');
        await mkdir(typesDir, { recursive: true });

        const typesContent = enumDeclarations
            .map((e) => `export type ${e.name} = ${e.members.join(' | ')} | undefined;`)
            .join('\n');
        await writeFile(path.join(typesDir, 'index.ts'), typesContent, 'utf-8');

        // Generate the utils/cva.ts file
        const utilsDir = path.join(projectRoot, targetDir, 'utils');
        const cvaPath = path.join(utilsDir, 'cva.ts');
        const cvaContent = `import { Directive, HostListener, forwardRef } from '@angular/core';\nimport { NG_VALUE_ACCESSOR } from '@angular/forms';\n\n@Directive({\n  selector: 'ui5-input[ngModel],ui5-input[formControl],ui5-input[formControlName],' +\n    'ui5-textarea[ngModel],ui5-textarea[formControl],ui5-textarea[formControlName],' +\n    'ui5-slider[ngModel],ui5-slider[formControl],ui5-slider[formControlName],' +\n    'ui5-step-input[ngModel],ui5-step-input[formControl],ui5-step-input[formControlName],' +\n    'ui5-rating-indicator[ngModel],ui5-rating-indicator[formControl],ui5-rating-indicator[formControlName],' +\n    'ui5-select[ngModel],ui5-select[formControl],ui5-select[formControlName],' +\n    'ui5-multi-combobox[ngModel],ui5-multi-combobox[formControl],ui5-multi-combobox[formControlName],' +\n    'ui5-radio-button[ngModel],ui5-radio-button[formControl],ui5-radio-button[formControlName],' +\n    'ui5-checkbox[ngModel],ui5-checkbox[formControl],ui5-checkbox[formControlName],' +\n    'ui5-switch[ngModel],ui5-switch[formControl],ui5-switch[formControlName],' +\n    'ui5-date-picker[ngModel],ui5-date-picker[formControl],ui5-date-picker[formControlName],' +\n    'ui5-daterange-picker[ngModel],ui5-daterange-picker[formControl],ui5-daterange-picker[formControlName],' +\n    'ui5-time-picker[ngModel],ui5-time-picker[formControl],ui5-time-picker[formControlName],' +\n    'ui5-datetime-picker[ngModel],ui5-datetime-picker[formControl],ui5-datetime-picker[formControlName],' +\n    'ui5-upload-collection[ngModel],ui5-upload-collection[formControl],ui5-upload-collection[formControlName]',\n  providers: [\n    {\n      provide: NG_VALUE_ACCESSOR,\n      useExisting: forwardRef(() => GenericControlValueAccessor),\n      multi: true,\n    },\n  ],\n})\nexport class GenericControlValueAccessor {\n  onChange: (_: any) => void = () => {};\n  onTouched: () => void = () => {};\n\n  writeValue(value: any): void {\n    // Cast value to a string to properly update the UI5 Web Component.\n    // Note: This might not be suitable for all components (e.g., FileUploader)\n    const element = this.host.nativeElement as any;\n    element.value = (value === null || value === undefined) ? '' : value;\n  }\n\n  registerOnChange(fn: any): void {\n    this.onChange = fn;\n  }\n\n  registerOnTouched(fn: any): void {\n    this.onTouched = fn;\n  }\n\n  setDisabledState(isDisabled: boolean): void {\n    (this.host.nativeElement as any).disabled = isDisabled;\n  }\n\n  @HostListener('input', ['$event.target.value']) onInput(value: any): void {\n    this.onChange(value);\n  }\n\n  @HostListener('blur') onBlur(): void {\n    this.onTouched();\n  }\n\n  @HostListener('change') onChangeEvent(): void {\n    this.onTouched();\n  }\n\n  constructor(private host: ElementRef) {}\n}`;
        await mkdir(utilsDir, { recursive: true });
        await writeFile(cvaPath, cvaContent, 'utf-8');

        // Filter for components and generate them
        const componentPromises = cemData.modules.flatMap((mod) => (mod.declarations || [])
                .filter(
                    (dec): dec is CEM.CustomElementDeclaration =>
                        dec?.kind === 'class' && (dec as CEM.CustomElementDeclaration).customElement
                )
                .map(async (declaration) => {
                    const componentName = declaration.tagName?.replace('ui5-', '') || '';
                    const componentDir = path.join(projectRoot, targetDir, componentName);
                    const componentIndexFile = path.join(componentDir, 'index.ts');
                    const componentPackageFile = path.join(componentDir, 'ng-package.json');
                    const className = declaration.name;

                    await mkdir(componentDir, { recursive: true });

                    const componentContent = componentTemplate(declaration, cemData, enumDeclarations);
                    await writeFile(componentIndexFile, componentContent, 'utf-8');

                    // Generate ng-package.json for the component
                    const packageJsonContent = JSON.stringify(
                        {
                            $schema: '../../node_modules/ng-packagr/ng-package.schema.json',
                            dest: `../../dist/libs/${targetDir}/${componentName}`,
                            lib: {
                                entryFile: 'index.ts'
                            }
                        },
                        null,
                        2
                    );
                    await writeFile(componentPackageFile, packageJsonContent, 'utf-8');

                    components.push({ className, fileName: componentName });
                }));

        await Promise.all(componentPromises);

        const rootIndexPath = path.join(projectRoot, targetDir, 'index.ts');
        const exportsContent =
            `export { GenericControlValueAccessor } from './utils/cva';\n` +
            components.map(({ className, fileName }) => `export { ${className} } from './${fileName}';`).join('\n');
        await writeFile(rootIndexPath, exportsContent, 'utf-8');

        // Add the new theming folder and service file
        const themingDir = path.join(projectRoot, targetDir, 'theming');
        const themingServicePath = path.join(themingDir, 'index.ts');
        const themingServiceContent = `import { Injectable } from '@angular/core';\nimport { WebcomponentsThemingProvider } from '@ui5/webcomponents-ngx/theming';\n\n@Injectable({ providedIn: 'root' })\nclass Ui5WebcomponentsThemingService extends WebcomponentsThemingProvider {\n  name = 'ui-5-webcomponents-theming-service';\n  constructor() {\n    super(\n      () => import('@ui5/webcomponents/dist/generated/json-imports/Themes.js'),\n    );\n  }\n}\n\nexport { Ui5WebcomponentsThemingService };`;

        await mkdir(themingDir, { recursive: true });
        await writeFile(themingServicePath, themingServiceContent, 'utf-8');

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: `An error occurred during component generation: ${error.message}`
        };
    }
};

export default runExecutor;
