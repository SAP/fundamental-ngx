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
    return member.kind === 'field' && member.privacy === 'public' && member.readonly === undefined;
}

/** Type guard to check if a member is a readonly ClassField. */
function isReadonlyField(member: CEM.ClassMember): member is CEM.ClassField {
    return member.kind === 'field' && member.privacy === 'public' && member.readonly === true;
}

/** Gets CVA configuration based on the component's form property metadata */
function getCvaConfig(data: CEM.CustomElementDeclaration): {
    hostDirective: string;
    import: string;
    provider: string;
} | null {
    const formMember = getFormMember(data);

    if (!formMember) {
        return null;
    }

    const propertyName = formMember.name; // e.g., 'value', 'checked', 'selected'
    const events = getFormMemberEvents(formMember);

    const typeText = formMember.type?.text || 'string';
    const isBoolean = typeText.includes('boolean');
    // Radio buttons are special because they have both 'checked' and 'value' properties and we are interested in syncing the 'value' property while listening to 'change' events on the 'checked' state.
    const isRadioButton = data.name === 'RadioButton';

    // Build transformer based on type (not used for radio buttons)
    const transformer = isBoolean
        ? '(v) => !!v' // Boolean coercion
        : typeText.includes('[]')
          ? '(v) => v || []' // Array default
          : "(v) => v || ''"; // String default

    // Build the provider configuration
    let providerConfig = `    {
      provide: CVA_CONFIG,
      useValue: {
        property: '${propertyName}',
        events: [${events}]`;

    if (isRadioButton) {
        providerConfig += `,\n        isRadioButton: true`;
    } else {
        providerConfig += `,\n        transformValue: ${transformer}`;
    }

    providerConfig += `
      }
    }`;

    return {
        hostDirective: 'GenericControlValueAccessor',
        import: `import { GenericControlValueAccessor, CVA_CONFIG } from '@fundamental-ngx/ui5-webcomponents/utils';`,
        provider: providerConfig
    };
}

function getFormMember(data: CEM.CustomElementDeclaration): CEM.ClassField | undefined {
    return data.members?.find(isFormField);
}

/** Type guard to check if a member is a form field. */
function isFormField(member: CEM.ClassMember): member is CEM.ClassField {
    return (
        member.kind === 'field' &&
        !member.static &&
        member.privacy === 'public' &&
        !member.readonly &&
        (member as any)._ui5formProperty === true
    );
}

function getFormMemberEvents(formMember: CEM.ClassField | undefined): string {
    if (!formMember) {
        return '';
    }

    return (formMember._ui5formEvents || 'change')
        .split(',')
        .map((e: string) => `'${e.trim()}'`)
        .join(', ');
}

function generateTypeImports(
    data: CEM.CustomElementDeclaration,
    allEnums: { name: string; members: string[] }[]
): { componentImports: string[]; componentEnums: string[] } {
    const componentImports: Set<string> = new Set();
    const typeNames = new Set<string>();

    const members = (data.members as CEM.ClassField[] | undefined) || [];
    for (const member of members) {
        if (member.type?.references) {
            for (const reference of member.type.references) {
                if (reference.name && !typeNames.has(reference.name)) {
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
                        // Use direct imports to avoid circular dependencies during build
                        importPath = `${reference.package}/${reference.module}`;
                    }

                    if (importPath) {
                        if (
                            reference.module?.includes('dist/' + reference.name) ||
                            reference.module?.includes('/types/')
                        ) {
                            // Use default import for direct type imports and default exports
                            componentImports.add(`import { default as ${reference.name} } from '${importPath}';`);
                        } else {
                            componentImports.add(`import { ${reference.name} } from '${importPath}';`);
                        }
                        typeNames.add(reference.name);
                    }
                }
            }
        }
    }

    const extractedEnums = allEnums.filter((e) => typeNames.has(e.name)).map((e) => e.name);

    return { componentImports: Array.from(componentImports), componentEnums: extractedEnums };
}

/** Helper function to generate input properties for the component. */
function generateInputs(data: CEM.CustomElementDeclaration, enums: string[], className: string): string {
    // className added
    const inputs: string[] = [];
    (data.members ?? []).filter(isField).forEach((member) => {
        const typeText = member.type?.text;
        const typeReferenceName = member.type?.references?.[0]?.name;

        const isArray = typeText?.endsWith('[]') || member.default === '[]';
        const isBoolean = typeText?.includes('boolean') || typeReferenceName === 'Boolean';

        const memberDefault = member.default;
        const camelCaseName = kebabToCamelCase(member.name);

        let inputCall: string;
        let inputType: string;

        if (isBoolean) {
            // BOOLEAN: Use booleanAttribute transform
            const defaultVal = memberDefault === 'true';
            inputCall = `input(${defaultVal}, { transform: booleanAttribute })`;
            inputType = '';
        } else if (isArray) {
            // ARRAY: Use the original type reference for the element type
            const baseType = getBaseType(typeText);
            const typeString = baseType ? `${baseType}` : 'any[]';

            inputType = `<${typeString}>`;
            inputCall = `input${inputType}([])`;
        } else {
            // ENUM/SIMPLE TYPE: Use typeof _${className}.prototype.${member.name} | undefined

            // Build the required type string using the WC's default import alias (_ClassName)
            const typeString = `typeof _${className}.prototype.${member.name} | undefined`;
            inputType = `<${typeString}>`;

            // Get the default value for the input() call
            const defaultValueArgument =
                memberDefault === 'undefined' || memberDefault === undefined ? '' : memberDefault;

            if (!defaultValueArgument) {
                // No default value specified
                inputCall = `input${inputType}()`;
            } else {
                // Has a default value, e.g., "Circle"
                inputCall = `input${inputType}(${defaultValueArgument})`;
            }
        }

        inputs.push(`
  /**
   * ${member.description || ''}
   */
  ${camelCaseName} = ${inputCall};`);
    });

    return inputs.join('\n');
}

function generateProperties(data: CEM.CustomElementDeclaration): {
    readonlyProperties: string;
    privateProperties: string;
} {
    const readonlyMembers = (data.members ?? []).filter(isReadonlyField);
    const events = data.events || [];
    const properties: string[] = [];
    const privateProperties: string[] = [];

    readonlyMembers.forEach((member) => {
        const camelCaseName = kebabToCamelCase(member.name);

        // Find related event that has a parameter with the same name as the readonly property
        const relatedEvent = events.find((event) => event._ui5parameters?.some((param) => param.name === member.name));

        if (relatedEvent) {
            // Generate signal-based reactive readonly property
            const typeString = member.type?.text || 'any';
            const defaultValue = member.default || (typeString.includes('Array') ? '[]' : 'undefined');

            privateProperties.push(`
  // Internal signal to track ${camelCaseName} from ${relatedEvent.name} events
  private _${camelCaseName}Signal = signal<${typeString}>(${defaultValue});
`);

            properties.push(`
  /**
   * ${member.description || `Returns ${member.name}.`}
   * @readonly This property is managed by the web component and updates reactively.
   * Based on schema: readonly field that updates via ${relatedEvent.name} event parameters.
   */
  ${camelCaseName} = computed(() => this._${camelCaseName}Signal());`);
        } else {
            // Generate simple getter for readonly properties without related events
            const typeString = member.type?.text || 'any';
            const fallbackValue = member.default || (typeString.includes('Array') ? '[]' : 'undefined');

            properties.push(`
  /**
   * ${member.description || `Returns ${member.name}.`}
   * @readonly This property is managed by the web component.
   */
  get ${camelCaseName}(): ${typeString} {
    return this.element?.${member.name} ?? ${fallbackValue};
  }`);
        }
    });

    return { readonlyProperties: properties.join('\n'), privateProperties: privateProperties.join('\n') };
}

function generateOutputs(data: CEM.CustomElementDeclaration, className: string): string {
    const outputs: string[] = [];
    data.events?.forEach((event) => {
        // Convert kebab-case to PascalCase after ui5 prefix
        const pascalCaseEventName = kebabToCamelCase(event.name).replace(/^./, (char) => char.toUpperCase());
        outputs.push(`
  /**
   * ${event.description || ''}
   */
  ui5${pascalCaseEventName} = output<UI5CustomEvent<_${className}, '${event.name}'>>();`);
    });

    return outputs.join('\n');
}

/** Generate a readonly property documenting available slots for the component. */
function generateSlotsDocumentation(data: CEM.CustomElementDeclaration): string {
    const slots = (data as any).slots || [];
    if (slots.length === 0) {
        return '';
    }

    const slotDocs = slots.map((slot: any) => {
        const slotName = slot.name === 'default' ? '(default)' : slot.name;
        const description = slot.description || 'No description available.';
        return `   * - **${slotName}**: ${description}`;
    });

    return `
  /**
   * Available slots for content projection in this component.
   *
   * Slots allow you to insert custom content into predefined areas of the web component.
   * Use the \`slot\` attribute on child elements to target specific slots.
   *
${slotDocs.join('\n')}
   *
   * @example
   * \`\`\`html
   * <${data.tagName}>
   *   <div slot="header">Custom header content</div>
   *   <p>Default slot content</p>
   * </${data.tagName}>
   * \`\`\`
   *
   * @readonly
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots | MDN Web Components Slots}
   */
  readonly slots = ${JSON.stringify(
      slots.map((slot: any) => ({
          name: slot.name,
          description: slot.description,
          since: slot._ui5since
      })),
      null,
      4
  ).replace(/\n/g, '\n  ')};
`;
}
/** Helper function to extract type exports for re-export at the end of the component file. */
function generateTypeExports(data: CEM.CustomElementDeclaration, packageName: string): string {
    const typeExports: string[] = [];
    const exportedTypes = new Set<string>();

    // Find types that are used in the component but aren't enums (those are already handled)
    const members = (data.members as CEM.ClassField[] | undefined) || [];
    for (const member of members) {
        if (member.type?.references) {
            for (const reference of member.type.references) {
                // Only export interface/type definitions (not enums which go to types folder)
                // Check if the type comes from the component's own .js file (not from /types/)
                if (
                    reference.name &&
                    reference.module &&
                    reference.module === `dist/${data.name}.js` &&
                    !exportedTypes.has(reference.name)
                ) {
                    typeExports.push(`export { ${reference.name} } from '${packageName}/dist/${data.name}.js';`);
                    exportedTypes.add(reference.name);
                }
            }
        }
    }

    return typeExports.length > 0 ? `\n// Re-export types for convenience\n${typeExports.join('\n')}` : '';
}

/** Generate the Angular component wrapper. */
export function componentTemplate(
    data: CEM.CustomElementDeclaration,
    allEnums: { name: string; members: string[] }[],
    packageName: string
): string {
    const { componentImports, componentEnums } = generateTypeImports(data, allEnums);
    const tagName = data.tagName || '';
    const className = data.name;
    const typeExports = generateTypeExports(data, packageName);
    const { readonlyProperties, privateProperties } = generateProperties(data);
    const outputEvents = data.events || [];

    // Get CVA configuration based on component metadata
    const cvaConfig = getCvaConfig(data);

    // Add hostDirective if CVA is needed
    const cvaHostDirective = cvaConfig ? `  hostDirectives: [${cvaConfig.hostDirective}],\n` : '';
    const cvaImport = cvaConfig ? cvaConfig.import : '';

    // Build providers array - always includes content density, plus CVA if needed
    const contentDensityProvider = `    contentDensityObserverProviders({
      supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY]
    })`;

    const providersArray = cvaConfig
        ? `  providers: [\n${contentDensityProvider},\n${cvaConfig.provider}\n  ],\n`
        : `  providers: [\n${contentDensityProvider}\n  ],\n`;

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
${outputEvents
    .map((e) => {
        const camelCase = kebabToCamelCase(e.name);
        const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
        return `      'ui5${pascalCase}',`;
    })
    .join('\n')}
    ];`
            : '';

    // Generate readonly property signal updates for events
    const readonlyMembers = (data.members ?? []).filter(isReadonlyField);
    const readonlySignalUpdates = readonlyMembers
        .filter((member) =>
            // Only include members that have related events with parameters
            outputEvents.some((event) => event._ui5parameters?.some((param) => param.name === member.name))
        )
        .map((member) => {
            const camelCaseName = kebabToCamelCase(member.name);
            const relatedEvents = outputEvents.filter((event) =>
                event._ui5parameters?.some((param) => param.name === member.name)
            );

            return relatedEvents
                .map(
                    (event) =>
                        `          // Update ${camelCaseName} signal when ${event.name} event fires
          if (eventName === '${event.name}') {
            const customEvent = e as CustomEvent<any>;
            // Use ${member.name} from event detail, fallback to web component property
            const ${camelCaseName}Value = customEvent.detail?.${member.name} || wcElement.${member.name} || ${member.default || (member.type?.text?.includes('Array') ? '[]' : 'undefined')};
            this._${camelCaseName}Signal.set(${camelCaseName}Value);
          }`
                )
                .join('\n');
        })
        .join('\n');

    const outputSyncLoop =
        outputEvents.length > 0
            ? `
    // Synchronize outputs (events)
    for (const outputName of outputsToSync) {
      // Map Angular output name to UI5 web component event name
      const eventName = outputName.replace('ui5', '').replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
      // Ensure the output property exists and has an emit function before adding listener
      if (this[outputName] && typeof this[outputName].emit === 'function' && wcElement.addEventListener) {
        // Cast the listener to the correct type to satisfy TypeScript
        wcElement.addEventListener(eventName, (e) => {
${readonlySignalUpdates}
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
  booleanAttribute,
  computed,
  signal
} from '@angular/core';
import '${packageName}/dist/${className}.js';
import { default as _${className} } from '${packageName}/dist/${className}.js';
import { UI5CustomEvent } from '@ui5/webcomponents-base';
import {
  ContentDensityObserver,
  contentDensityObserverProviders,
  ContentDensityMode
} from '@fundamental-ngx/core/content-density';
${cvaImport}
${componentImports.join('\n')}

@Component({
  standalone: true,
  selector: '${tagName}, [${tagName}]',
  template: '<ng-content></ng-content>',
  exportAs: 'ui5${className}',
${cvaHostDirective}${providersArray}  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${className} implements AfterViewInit {
  /**
   * Content density observer is injected to activate automatic CSS class and
   * UI5 attribute application. The observer self-initializes, no explicit subscribe() needed.
   * @private
   */
  private readonly _contentDensityObserver = inject(ContentDensityObserver);

${generateInputs(data, componentEnums, className)} // className is now passed
${readonlyProperties}

${generateOutputs(data, className)}
${generateSlotsDocumentation(data)}

  public elementRef: ElementRef<_${className}> = inject(ElementRef);
  public injector = inject(Injector);
${privateProperties}
  get element(): _${className} {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    const wcElement = this.element;
    ${inputsToSyncCode}
    ${inputSyncLoop}
    ${outputsToSyncCode}
    ${outputSyncLoop}
${(() => {
    const signalInits = readonlyMembers
        .filter((member) =>
            // Only initialize signals for members that have related events
            (data.events || []).some((event) => event._ui5parameters?.some((param) => param.name === member.name))
        )
        .map((member) => {
            const camelCaseName = kebabToCamelCase(member.name);
            const fallbackValue = member.default || (member.type?.text?.includes('Array') ? '[]' : 'undefined');
            return `    // Initialize ${camelCaseName} signal with current state using delayed initialization
    // to handle web component timing properly
    const initialize${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)} = (): void => {
      const currentValue = wcElement.${member.name} || ${fallbackValue};
      if (JSON.stringify(currentValue) !== JSON.stringify(this._${camelCaseName}Signal())) {
        this._${camelCaseName}Signal.set(currentValue);
      }
    };

    // Try immediate initialization
    initialize${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)}();

    // Fallback delayed initialization if web component needs more time
    // Use requestAnimationFrame for zoneless compatibility
    requestAnimationFrame(() => initialize${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)}());`;
        })
        .join('\n');

    return signalInits ? `\n${signalInits}` : '';
})()}
  }
}
${typeExports}
`;
}
