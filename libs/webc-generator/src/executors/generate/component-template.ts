import type * as CEM from '@ui5/webcomponents-tools/lib/cem/types-internal.d.ts';

function kebabToCamelCase(s: string): string {
    return s.replace(/-./g, (x) => x[1].toUpperCase());
}

// Function to generate imports for enum types and other referenced types
function generateTypeImports(
    data: CEM.CustomElementDeclaration,
    allEnums: { name: string; members: string[] }[]
): { componentImports: string[]; componentEnums: string[] } {
    const componentImports: string[] = [];
    const componentEnums: string[] = [];
    const typeNames = new Set<string>();

    const members = (data.members as CEM.ClassField[] | undefined) || [];
    for (const member of members) {
        if (member.type?.references) {
            for (const reference of member.type.references) {
                if (reference.name && !typeNames.has(reference.name)) {
                    // Check if the reference is one of the enums we have extracted
                    const isEnum = allEnums.some((e) => e.name === reference.name);
                    if (isEnum) {
                        // Import from the new central types file
                        componentEnums.push(reference.name);
                        typeNames.add(reference.name);
                        continue;
                    }

                    let importPath: string | undefined;

                    if (reference.package === '@ui5/webcomponents-base') {
                        // Case 1: If the package is @ui5/webcomponents-base, map to our base library
                        importPath = `@fundamental-ngx/ui5-webcomponents-base`;
                    } else if (reference.package === '@ui5/webcomponents' && reference.module) {
                        // Case 2: If the package is @ui5/webcomponents, use the module path
                        importPath = `@ui5/webcomponents/${reference.module}`;
                    } else if (reference.module) {
                        // Fallback: If no package is defined, or it's an unexpected one,
                        // use the existing module logic.
                        importPath = reference.module.startsWith('.')
                            ? reference.module
                            : `@ui5/webcomponents/${reference.module}`;
                    } else if (reference.package) {
                        // Handle the case where the reference has a package
                        const mappedPackage = reference.package.replace(
                            '@ui5/webcomponents',
                            '@fundamental-ngx/ui5-webcomponents'
                        );
                        importPath = `${mappedPackage}`;
                    }

                    if (importPath) {
                        componentImports.push(`import { ${reference.name} } from '${importPath}';`);
                        typeNames.add(reference.name);
                    }
                }
            }
        }
    }

    if (componentEnums.length > 0) {
        componentImports.push(`import { ${componentEnums.join(', ')} } from '../types';`);
    }

    return { componentImports, componentEnums };
}

// Helper function to generate input properties for the component
function generateInputs(data: CEM.CustomElementDeclaration, enums: string[]): string {
    const inputs: string[] = [];
    (data.members ?? []).filter(isField).forEach((member) => {
        const typeText = member.type?.text?.replace(' | undefined', '');
        const typeReferenceName = member.type?.references?.[0]?.name;

        // Determine if the property should be treated as an array
        const isArrayType = typeText?.endsWith('[]');
        const isDefaultValueArray = member.default === '[]';
        const isArray = isArrayType || isDefaultValueArray;

        let type = typeText;
        if (isArray) {
            // Get the base type, handling both 'Type[]' and 'Type' cases
            const baseType = isArrayType ? typeText?.replace('[]', '') : typeReferenceName;

            // If the base type is an enum, use the imported type name
            if (baseType && enums.includes(baseType)) {
                type = baseType;
            } else if (baseType) {
                type = baseType;
            } else {
                type = typeText;
            }

            type = `Array<${type}>`;
        } else {
            // If the type is an enum, use the imported type name
            if (typeReferenceName && enums.includes(typeReferenceName)) {
                type = typeReferenceName;
            }
        }

        const isBoolean = typeText?.includes('boolean') || typeReferenceName === 'Boolean';
        const hasInputDecorator = member.privacy === 'public';

        if (hasInputDecorator) {
            const inputType = isBoolean ? '' : `<${type}>`;
            const memberDefault = member.default;

            let inputCall;
            if (isArray) {
                inputCall = `input${inputType}([])`;
            } else if (memberDefault === 'undefined' || memberDefault === undefined) {
                inputCall = `input${inputType}()`;
            } else if (isBoolean) {
                const defaultVal = memberDefault === 'true';
                inputCall = `input(${defaultVal}, { transform: booleanAttribute })`;
            } else {
                inputCall = `input${inputType}(${memberDefault})`;
            }

            inputs.push(`
  /**
   * ${member.description || ''}
   */
  ${kebabToCamelCase(member.name)} = ${inputCall};`);
        }
    });

    return inputs.join('\n');
}

// Helper function to generate output properties for the component
function generateOutputs(data: CEM.CustomElementDeclaration): string {
    const outputs: string[] = [];
    data.events?.forEach((event) => {
        outputs.push(`
  /**
   * ${event.description || ''}
   */
  ui5${kebabToCamelCase(event.name)} = output<CustomEvent<any>>();`);
    });
    return outputs.join('\n');
}

// Type guard to check if a member is a ClassField
function isField(member: CEM.ClassMember): member is CEM.ClassField {
    return member.kind === 'field';
}

function hasCvaHostDirective(data: CEM.CustomElementDeclaration): boolean {
    return data.superclass?.name === 'FormSupport' || data.superclass?.name === 'InputBase';
}

export function componentTemplate(
    data: CEM.CustomElementDeclaration,
    cemPackage: CEM.Package,
    allEnums: { name: string; members: string[] }[]
): string {
    const { componentImports, componentEnums } = generateTypeImports(data, allEnums);
    const tagName = data.tagName || '';
    const className = data.name;
    const ui5Class = data.name;
    const outputEvents = data.events || [];
    const cvaHostDirective = hasCvaHostDirective(data) ? `  hostDirectives: [GenericControlValueAccessor],\n` : '';

    const inputsToSyncCode = `\n    const inputsToSync = [\n${(data.members ?? [])
        .filter(isField)
        .map((m) => `      '${m.name}',`)
        .join('\n')}\n    ];`;
    const inputSyncLoop =
        (data.members ?? []).filter(isField).length > 0
            ? `
    // Synchronize inputs (properties)
    for (const inputName of inputsToSync) {
      if (this[inputName] && typeof this[inputName] === 'function') {
        runInInjectionContext(this.injector, () => {
          effect(() => {
            const value = this[inputName]();
            if (wcElement) {
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
${outputEvents.map((e) => `      'ui5${kebabToCamelCase(e.name)}',`).join('\n')}
    ];`
            : '';

    const outputSyncLoop =
        outputEvents.length > 0
            ? `
    // Synchronize outputs (events)
    for (const outputName of outputsToSync) {
      const eventName = outputName.replace('ui5', '').toLowerCase();
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
import { default as _${className} } from '@ui5/webcomponents/dist/${className}.js';
import { UI5CustomEvent } from '@ui5/webcomponents-base';

${componentImports.join('\n')}

@Component({
  standalone: true,
  selector: '${tagName}',
  template: '<ng-content></ng-content>',
  exportAs: 'ui5${className}',
${cvaHostDirective}
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${className} implements AfterViewInit {
${generateInputs(data, componentEnums)}

${generateOutputs(data)}

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
