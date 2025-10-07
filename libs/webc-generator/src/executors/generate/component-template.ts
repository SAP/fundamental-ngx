import type * as CEM from '@ui5/webcomponents-tools/lib/cem/types-internal.d.ts';

function kebabToCamelCase(s: string): string {
    return s.replace(/-./g, (x) => x[1].toUpperCase());
}

/** Determines the base type for an array (e.g., 'string[]' -> 'string'). */
function getBaseType(typeText: string | undefined): string | undefined {
    if (!typeText) {
        return undefined;
    }
    const isArrayType = typeText.endsWith('[]');
    return isArrayType ? typeText.replace('[]', '') : typeText;
}

/** Type guard to check if a member is a ClassField. */
function isField(member: CEM.ClassMember): member is CEM.ClassField {
    return member.kind === 'field';
}

/** Checks if the component should host the CVA directive. */
function hasCvaHostDirective(data: CEM.CustomElementDeclaration): boolean {
    return data.superclass?.name === 'FormSupport' || data.superclass?.name === 'InputBase';
}

function generateTypeImports(
    data: CEM.CustomElementDeclaration,
    allEnums: { name: string; members: string[] }[],
    enumPackageMapping: Record<string, string>
): { componentImports: string[]; componentEnums: string[] } {
    const componentImports: string[] = [];
    const componentEnums: string[] = [];
    const typeNames = new Set<string>();

    const members = (data.members as CEM.ClassField[] | undefined) || [];
    for (const member of members) {
        if (member.type?.references) {
            for (const reference of member.type.references) {
                if (reference.name && !typeNames.has(reference.name)) {
                    const isEnum = allEnums.some((e) => e.name === reference.name);
                    let importPath: string | undefined;

                    if (reference.module) {
                        importPath = reference.module.startsWith('.')
                            ? reference.module
                            : `${reference.package}/${reference.module}`;
                    } else if (reference.package) {
                        importPath = reference.package.replace(
                            '@ui5/webcomponents',
                            '@fundamental-ngx/ui5-webcomponents'
                        );
                    }

                    if (reference.package && reference.module && reference.module.includes('/types/')) {
                        importPath = enumPackageMapping[reference.package];
                    }

                    if (importPath) {
                        if (reference.module?.includes('dist/' + reference.name)) {
                            componentImports.push(`import ${reference.name} from '${importPath}';`);
                        } else {
                            componentImports.push(`import { ${reference.name} } from '${importPath}';`);
                        }
                        typeNames.add(reference.name);
                    }
                }
            }
        }
    }
    const extractedEnums = allEnums.filter((e) => typeNames.has(e.name)).map((e) => e.name);

    return { componentImports, componentEnums: extractedEnums };
}

/** Helper function to generate input properties for the component. */
function generateInputs(data: CEM.CustomElementDeclaration, enums: string[]): string {
    const inputs: string[] = [];
    (data.members ?? []).filter(isField).forEach((member) => {
        const typeText = member.type?.text?.replace(' | undefined', '');
        const typeReferenceName = member.type?.references?.[0]?.name;

        // Determine the array status
        const isArrayType = typeText?.endsWith('[]');
        const isDefaultValueArray = member.default === '[]';
        const isArray = isArrayType || isDefaultValueArray;

        // Determine the final type string for the input
        let type = typeText;
        let inputType = '';

        const baseType = getBaseType(typeText) || typeReferenceName;

        if (baseType && enums.includes(baseType)) {
            type = baseType; // Use the enum name directly
        }

        if (isArray) {
            type = `${baseType || type}[]`; // Fallback to original type if baseType is undefined
        }

        const isBoolean = typeText?.includes('boolean') || typeReferenceName === 'Boolean';
        if (!isBoolean) {
            inputType = `<${type}>`;
        }

        const memberDefault = member.default;
        const camelCaseName = kebabToCamelCase(member.name);

        let inputCall: string;

        if (isArray) {
            inputCall = `input${inputType}([])`;
        } else if (isBoolean) {
            const defaultVal = memberDefault === 'true';
            inputCall = `input(${defaultVal}, { transform: booleanAttribute })`;
        } else if (memberDefault === 'undefined' || memberDefault === undefined) {
            inputCall = `input${inputType}()`;
        } else {
            // Use the member default value directly (e.g., '0', '"text"', etc.)
            inputCall = `input${inputType}(${memberDefault})`;
        }

        inputs.push(`
  /**
   * ${member.description || ''}
   */
  ${camelCaseName} = ${inputCall};`);
    });

    return inputs.join('\n');
}

function generateOutputs(data: CEM.CustomElementDeclaration, className: string): string {
    const outputs: string[] = [];
    data.events?.forEach((event) => {
        outputs.push(`
  /**
   * ${event.description || ''}
   */
  ui5${kebabToCamelCase(event.name)} = output<UI5CustomEvent<_${className}, '${event.name}'>>();`);
    });
    return outputs.join('\n');
}

/** Generate the Angular component wrapper. */
export function componentTemplate(
    data: CEM.CustomElementDeclaration,
    cemPackage: CEM.Package,
    allEnums: { name: string; members: string[] }[],
    packageName: string,
    enumPackageMapping: Record<string, string>
): string {
    const { componentImports, componentEnums } = generateTypeImports(data, allEnums, enumPackageMapping);
    const tagName = data.tagName || '';
    const className = data.name;
    const outputEvents = data.events || [];
    const shouldHostCVA = hasCvaHostDirective(data);

    // Add CVA hostDirective property only if needed
    const cvaHostDirective = shouldHostCVA ? `  hostDirectives: [GenericControlValueAccessor],\n` : '';

    // Add CVA import only if needed
    const cvaImport = shouldHostCVA ? `import { GenericControlValueAccessor } from './utils/cva';` : '';

    const inputMembers = (data.members ?? []).filter(isField);

    // Prepare string array of Web Component's kebab-case property names for synchronization
    const inputsToSyncCode =
        inputMembers.length > 0
            ? `\n    const inputsToSync = [\n${inputMembers.map((m) => `      '${m.name}',`).join('\n')}\n    ];`
            : '';

    // The core synchronization logic using Angular signals and effects
    const inputSyncLoop =
        inputMembers.length > 0
            ? `
    // Synchronize inputs (properties)
    for (const inputName of inputsToSync) {
      // Find the corresponding camelCase signal property on the Angular component
      const signalName = inputName.replace(/-./g, (x: string) => x[1].toUpperCase());

      // Use the Injector to run the effect in the correct context
      if (this[signalName] && typeof this[signalName] === 'function') {
        runInInjectionContext(this.injector, () => {
          effect(() => {
            // Read the signal value
            const value = this[signalName]();
            if (wcElement) {
              // Write the value to the Web Component's property
              wcElement[inputName] = value;
            }
          });
        });
      }
    }
  `
            : '';

    const outputsToSyncCode =
        outputEvents.length > 0
            ? `
    const outputsToSync = [
${outputEvents.map((e) => `      'ui5-${kebabToCamelCase(e.name)}',`).join('\n')}
    ];`
            : '';

    const outputSyncLoop =
        outputEvents.length > 0
            ? `
    // Synchronize outputs (events)
    for (const outputName of outputsToSync) {
      const eventName = outputName.replace('ui5', '').toLowerCase();
      // Ensure the output property exists and has an emit function before adding listener
      if (this[outputName] && typeof this[outputName].emit === 'function' && wcElement.addEventListener) {
        // Cast the listener to the correct type to satisfy TypeScript
        wcElement.addEventListener(eventName, (e) => {
          this[outputName].emit(e as CustomEvent<any>);
        });
      }
    }
  `
            : '';

    return `
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  AfterViewInit,
  effect,
  runInInjectionContext,
  inject,
  Injector,
  booleanAttribute
} from '@angular/core';
import '${packageName}/dist/${className}.js';
import { default as _${className} } from '${packageName}/dist/${className}.js';
import { UI5CustomEvent } from '@ui5/webcomponents-base';
${cvaImport}
${componentImports.join('\n')}

@Component({
  standalone: true,
  selector: '${tagName}, [${tagName}]',
  template: '<ng-content></ng-content>',
  exportAs: 'ui5${className}',
${cvaHostDirective}
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${className} implements AfterViewInit {
${generateInputs(data, componentEnums)}

${generateOutputs(data, className)}

  public elementRef: ElementRef<_${className}> = inject(ElementRef);
  public injector = inject(Injector);

  get element(): _${className} {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    const wcElement = this.element;
    ${inputsToSyncCode}
    ${inputSyncLoop}
    ${outputsToSyncCode}
    ${outputSyncLoop}
  }
}
`;
}
