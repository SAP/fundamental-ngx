import type * as CEM from '@ui5/webcomponents-tools/lib/cem/types-internal.d.ts';

// Helper function to extract and format enum-like types from the schema
function extractAndFormatEnums(data: CEM.CustomElementDeclaration, cemPackage: CEM.Package): string[] {
    const enums: string[] = [];
    const typeNames: Set<string> = new Set();
    data.members?.filter(isField).forEach((member) => {
        const typeReferenceName = member.type?.references?.[0]?.name;
        if (typeReferenceName && !typeNames.has(typeReferenceName)) {
            // Find the enum declaration in the global CEM
            const enumDeclaration = cemPackage.modules
                .flatMap((mod) => mod.declarations)
                .filter((dec): dec is CEM.Declaration => dec !== undefined) // Filter out undefined values
                .find((dec) => dec.name === typeReferenceName && dec.kind === 'enum') as
                | CEM.EnumDeclaration
                | undefined;

            if (enumDeclaration && enumDeclaration.members) {
                const enumValues = enumDeclaration.members.map((m) => `"${m.name}"`).join(' | ');

                typeNames.add(typeReferenceName);
                enums.push(`export type ${typeReferenceName} = ${enumValues} | undefined;`);
            }
        }
    });
    return enums;
}

// Type guard to check if a member is a ClassField
function isField(member: CEM.ClassMember): member is CEM.ClassField {
    return member.kind === 'field';
}

function kebabToCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Helper function to generate input() properties from schema members
function generateInputs(data: CEM.CustomElementDeclaration): string {
    const inputs = data.members?.filter(isField) || [];
    return inputs
        .map((member) => {
            const propName = kebabToCamelCase(member.name);
            const type = member.type?.text.replace(/\| undefined/g, '').trim() || 'any';
            const isBoolean = type === 'boolean' || type.includes('boolean');
            const hasDefault = member.default !== undefined && member.default !== 'undefined';
            let docComment = '';

            if (member.description) {
                const descriptionLines = member.description.split('\n');
                docComment = `  /**\n` + descriptionLines.map((line) => `   * ${line.trim()}`).join('\n') + `\n   */\n`;
            }

            let inputDecorator: string;
            if (hasDefault) {
                const defaultValue = member.default;
                if (isBoolean) {
                    inputDecorator = `input(${defaultValue}, { transform: booleanAttribute })`;
                } else {
                    // Cast the default value to the correct type to resolve TS errors
                    inputDecorator = `input<${type}>(${defaultValue} as ${type})`;
                }
            } else {
                inputDecorator = `input<${type}>()`;
            }
            return `${docComment}  ${propName} = ${inputDecorator};`;
        })
        .join('\n');
}

// Helper function to generate output() properties from schema events
function generateOutputs(data: CEM.CustomElementDeclaration): string {
    const outputs = data.events || [];
    return outputs
        .map((event) => {
            const eventName = `ui5${kebabToCamelCase(event.name)}`;
            let docComment = '';

            if (event.description) {
                const descriptionLines = event.description.split('\n');
                docComment = `  /**\n` + descriptionLines.map((line) => `   * ${line.trim()}`).join('\n') + `\n   */\n`;
            }

            return `${docComment}  ${eventName} = output<CustomEvent<any>>();`;
        })
        .join('\n');
}

// The main function to export
export const componentTemplate = (data: CEM.CustomElementDeclaration, cemPackage: CEM.Package): string => {
    const tagName = data.tagName;
    const className = data.name;
    const ui5Class = `_${className}`;

    // Extract and format enum types
    const enumDeclarations = extractAndFormatEnums(data, cemPackage);
    const enumBlock = enumDeclarations.length > 0 ? enumDeclarations.join('\n') + '\n\n' : '';

    // Collect all types that need to be imported
    const importsFromWebComponent = new Set<string>();
    data.members?.filter(isField).forEach((member) => {
        const typeReferenceName = member.type?.references?.[0]?.name;
        if (typeReferenceName) {
            const enumDeclaration = cemPackage.modules
                .flatMap((mod) => mod.declarations)
                .filter((dec): dec is CEM.Declaration => dec !== undefined)
                .find((dec) => dec.name === typeReferenceName && dec.kind === 'enum') as
                | CEM.EnumDeclaration
                | undefined;

            // If the type is not an enum, add it to our import list
            if (!enumDeclaration) {
                importsFromWebComponent.add(typeReferenceName);
            }
        }
    });

    // Construct the import statement for the web component
    const namedImports = [...importsFromWebComponent].join(', ');
    const ui5ImportLine =
        namedImports.length > 0
            ? `import { default as ${ui5Class}, ${namedImports} } from '@ui5/webcomponents/dist/${className}.js';`
            : `import ${ui5Class} from '@ui5/webcomponents/dist/${className}.js';`;

    const componentImports = [
        `import {`,
        `  ChangeDetectionStrategy,`,
        `  Component,`,
        `  ElementRef,`,
        `  input,`,
        `  output,`,
        `  AfterViewInit,`,
        `  effect,`,
        `  runInInjectionContext,`,
        `  inject,`,
        `  Injector,`,
        `  booleanAttribute,`,
        `} from '@angular/core';`,
        ui5ImportLine,
        `import { GenericControlValueAccessor } from '../utils/cva';`,
        `import { UI5CustomEvent } from '@ui5/webcomponents-base';`
    ];

    const isCva = data.members?.some((member) => member.name === 'value');
    const cvaHostDirective = isCva ? `  hostDirectives: [GenericControlValueAccessor],` : '';

    const inputMembers = data.members?.filter(isField) || [];
    const outputEvents = data.events || [];

    const inputsToSyncCode =
        inputMembers.length > 0
            ? `
    const inputsToSync = [
${inputMembers.map((m) => `      '${kebabToCamelCase(m.name)}',`).join('\n')}\
    ];`
            : '';

    const inputSyncLoop =
        inputMembers.length > 0
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
${outputEvents.map((e) => `      'ui5${kebabToCamelCase(e.name)}',`).join('\n')}\
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
${componentImports.join('\n')}

${enumBlock}
@Component({
  standalone: true,
  selector: '${tagName}',
  template: '<ng-content></ng-content>',
  exportAs: 'ui5${className}',
${cvaHostDirective}
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${className} implements AfterViewInit {
${generateInputs(data)}

${generateOutputs(data)}

  public elementRef: ElementRef<${ui5Class}> = inject(ElementRef);
  public injector = inject(Injector);

  get element(): ${ui5Class} {
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
};
