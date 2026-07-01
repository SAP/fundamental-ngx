import type * as CEM from '@ui5/webcomponents-tools/lib/cem/types-internal.d.ts';
import { componentTemplate } from './component-template';

const PACKAGE = '@ui5/webcomponents';

// ── Fixtures ────────────────────────────────────────────────────────────────

const minimalDeclaration: CEM.CustomElementDeclaration = {
    kind: 'class',
    name: 'Button',
    tagName: 'ui5-button',
    customElement: true
};

const booleanInputDeclaration: CEM.CustomElementDeclaration = {
    kind: 'class',
    name: 'CheckBox',
    tagName: 'ui5-checkbox',
    customElement: true,
    members: [
        {
            kind: 'field',
            name: 'checked',
            privacy: 'public',
            type: { text: 'boolean' },
            default: 'false'
        } as CEM.ClassField
    ]
};

const enumInputWithDefaultDeclaration: CEM.CustomElementDeclaration = {
    kind: 'class',
    name: 'Avatar',
    tagName: 'ui5-avatar',
    customElement: true,
    members: [
        {
            kind: 'field',
            name: 'shape',
            privacy: 'public',
            type: {
                text: 'AvatarShape',
                references: [{ name: 'AvatarShape', package: PACKAGE, module: 'dist/types/AvatarShape.js' }]
            },
            default: 'Circle'
        } as CEM.ClassField
    ]
};

const enumInputNoDefaultDeclaration: CEM.CustomElementDeclaration = {
    kind: 'class',
    name: 'Tag',
    tagName: 'ui5-tag',
    customElement: true,
    members: [
        {
            kind: 'field',
            name: 'design',
            privacy: 'public',
            type: {
                text: 'TagDesign',
                references: [{ name: 'TagDesign', package: PACKAGE, module: 'dist/types/TagDesign.js' }]
            }
        } as CEM.ClassField
    ]
};

const arrayInputDeclaration: CEM.CustomElementDeclaration = {
    kind: 'class',
    name: 'Select',
    tagName: 'ui5-select',
    customElement: true,
    members: [
        {
            kind: 'field',
            name: 'items',
            privacy: 'public',
            type: { text: 'SelectOption[]' },
            default: '[]'
        } as CEM.ClassField
    ]
};

// ── Tests ────────────────────────────────────────────────────────────────────

describe('componentTemplate', () => {
    describe('minimal component (no members/events/slots)', () => {
        let output: string;

        beforeEach(() => {
            output = componentTemplate(minimalDeclaration, [], PACKAGE);
        });

        it('generates selector with tag and attribute variant', () => {
            expect(output).toContain("selector: 'ui5-button, [ui5-button]'");
        });

        it('generates ng-content template', () => {
            expect(output).toContain("template: '<ng-content></ng-content>'");
        });

        it('generates exportAs', () => {
            expect(output).toContain("exportAs: 'ui5Button'");
        });

        it('imports the web component JS', () => {
            expect(output).toContain(`import '${PACKAGE}/dist/Button.js'`);
        });

        it('does not include GenericControlValueAccessor (no form property)', () => {
            expect(output).not.toContain('GenericControlValueAccessor');
        });

        it('does not include readonly slots property (no slots)', () => {
            expect(output).not.toContain('readonly slots');
        });
    });

    describe('boolean input', () => {
        it('uses booleanAttribute transform with correct default', () => {
            const output = componentTemplate(booleanInputDeclaration, [], PACKAGE);
            expect(output).toContain('input(false, { transform: booleanAttribute })');
        });
    });

    describe('enum input with default', () => {
        it('uses typeof prototype pattern with default value', () => {
            const output = componentTemplate(enumInputWithDefaultDeclaration, [], PACKAGE);
            expect(output).toContain('input<typeof _Avatar.prototype.shape | undefined>(Circle)');
        });
    });

    describe('enum input without default', () => {
        it('uses typeof prototype pattern with no default', () => {
            const output = componentTemplate(enumInputNoDefaultDeclaration, [], PACKAGE);
            expect(output).toContain('input<typeof _Tag.prototype.design | undefined>()');
        });
    });

    describe('array input', () => {
        it('uses base type with empty array default', () => {
            const output = componentTemplate(arrayInputDeclaration, [], PACKAGE);
            expect(output).toContain('input<SelectOption>([])');
        });
    });

    describe('event output', () => {
        const eventDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Button',
            tagName: 'ui5-button',
            customElement: true,
            events: [
                {
                    name: 'click',
                    _ui5privacy: 'public',
                    type: { text: 'CustomEvent' }
                } as CEM.Event
            ]
        };

        it('generates output with correct UI5CustomEvent type', () => {
            const output = componentTemplate(eventDeclaration, [], PACKAGE);
            expect(output).toContain("output<UI5CustomEvent<_Button, 'click'>>()");
        });

        it('converts kebab-case event name to camelCase output property', () => {
            const kebabDeclaration: CEM.CustomElementDeclaration = {
                kind: 'class',
                name: 'Select',
                tagName: 'ui5-select',
                customElement: true,
                events: [
                    {
                        name: 'selection-change',
                        _ui5privacy: 'public',
                        type: { text: 'CustomEvent' }
                    } as CEM.Event
                ]
            };
            const output = componentTemplate(kebabDeclaration, [], PACKAGE);
            expect(output).toContain('ui5SelectionChange');
        });
    });

    describe('slots', () => {
        const slotsDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Dialog',
            tagName: 'ui5-dialog',
            customElement: true,
            slots: [
                { kind: 'slot', name: 'header', description: 'Header content.' },
                { kind: 'slot', name: 'default', description: 'Default slot.' }
            ] as any
        };

        it('generates readonly slots documentation property', () => {
            const output = componentTemplate(slotsDeclaration, [], PACKAGE);
            expect(output).toContain('readonly slots =');
        });

        it('includes slot names in the slots array', () => {
            const output = componentTemplate(slotsDeclaration, [], PACKAGE);
            expect(output).toContain('"header"');
            expect(output).toContain('"default"');
        });

        it('does not generate slots property when no slots defined', () => {
            const output = componentTemplate(minimalDeclaration, [], PACKAGE);
            expect(output).not.toContain('readonly slots');
        });
    });

    describe('type imports', () => {
        const typeImportDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Avatar',
            tagName: 'ui5-avatar',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'shape',
                    privacy: 'public',
                    type: {
                        text: 'AvatarShape',
                        references: [{ name: 'AvatarShape', package: PACKAGE, module: 'dist/types/AvatarShape.js' }]
                    }
                } as CEM.ClassField
            ]
        };

        it('uses default import for /types/ path references', () => {
            const output = componentTemplate(typeImportDeclaration, [], PACKAGE);
            expect(output).toContain(
                "import { default as AvatarShape } from '@ui5/webcomponents/dist/types/AvatarShape.js'"
            );
        });

        const distNameImportDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'AvatarGroup',
            tagName: 'ui5-avatar-group',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'hiddenItems',
                    privacy: 'public',
                    readonly: true,
                    type: {
                        text: 'Array<IAvatarGroupItem>',
                        references: [{ name: 'IAvatarGroupItem', package: PACKAGE, module: 'dist/AvatarGroup.js' }]
                    },
                    default: '[]'
                } as CEM.ClassField
            ]
        };

        it('uses named import for non-types-path references', () => {
            const output = componentTemplate(distNameImportDeclaration, [], PACKAGE);
            expect(output).toContain("import { IAvatarGroupItem } from '@ui5/webcomponents/dist/AvatarGroup.js'");
        });
    });

    describe('type exports', () => {
        const typeExportDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Avatar',
            tagName: 'ui5-avatar',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'accessibilityAttributes',
                    privacy: 'public',
                    type: {
                        text: 'AvatarAccessibilityAttributes',
                        references: [
                            { name: 'AvatarAccessibilityAttributes', package: PACKAGE, module: 'dist/Avatar.js' }
                        ]
                    }
                } as CEM.ClassField
            ]
        };

        it('re-exports types from dist/ClassName.js at file footer', () => {
            const output = componentTemplate(typeExportDeclaration, [], PACKAGE);
            expect(output).toContain(
                "export { AvatarAccessibilityAttributes } from '@ui5/webcomponents/dist/Avatar.js'"
            );
        });
    });

    describe('readonly member — getter (no matching event parameter)', () => {
        const readonlyGetterDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'AvatarGroup',
            tagName: 'ui5-avatar-group',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'color-scheme',
                    privacy: 'public',
                    readonly: true,
                    type: { text: 'Array<AvatarColorScheme>' },
                    default: '[]'
                } as CEM.ClassField
            ],
            events: [{ name: 'click', _ui5privacy: 'public', type: { text: 'CustomEvent' } } as CEM.Event]
        };

        it('generates a getter for readonly member with no matching event parameter', () => {
            const output = componentTemplate(readonlyGetterDeclaration, [], PACKAGE);
            expect(output).toContain('get colorScheme()');
        });

        it('does not generate a signal for getter-style readonly', () => {
            const output = componentTemplate(readonlyGetterDeclaration, [], PACKAGE);
            expect(output).not.toContain('_colorSchemeSignal');
        });
    });

    describe('readonly member — signal (matching event parameter)', () => {
        const readonlySignalDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'FileUploader',
            tagName: 'ui5-file-uploader',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'files',
                    privacy: 'public',
                    readonly: true,
                    type: { text: 'FileList | null' },
                    default: 'undefined'
                } as CEM.ClassField
            ],
            events: [
                {
                    name: 'change',
                    _ui5privacy: 'public',
                    type: { text: 'CustomEvent' },
                    _ui5parameters: [{ name: 'files', type: { text: 'FileList | null' }, _ui5privacy: 'public' }]
                } as any
            ]
        };

        it('generates a private signal for readonly member with matching event parameter', () => {
            const output = componentTemplate(readonlySignalDeclaration, [], PACKAGE);
            expect(output).toContain('_filesSignal = signal<');
        });

        it('generates a computed property backed by the signal', () => {
            const output = componentTemplate(readonlySignalDeclaration, [], PACKAGE);
            expect(output).toContain('files = computed(');
        });

        it('does not generate a getter for signal-style readonly', () => {
            const output = componentTemplate(readonlySignalDeclaration, [], PACKAGE);
            expect(output).not.toContain('get files()');
        });
    });

    describe('CVA — boolean form property (non-radio)', () => {
        const cvaCheckedDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'CheckBox',
            tagName: 'ui5-checkbox',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'checked',
                    privacy: 'public',
                    type: { text: 'boolean' },
                    default: 'false',
                    _ui5formProperty: true,
                    _ui5formEvents: 'change'
                } as CEM.ClassField
            ]
        };

        it('adds GenericControlValueAccessor as hostDirective', () => {
            const output = componentTemplate(cvaCheckedDeclaration, [], PACKAGE);
            expect(output).toContain('hostDirectives: [GenericControlValueAccessor]');
        });

        it('adds CVA_CONFIG provider with boolean transformValue', () => {
            const output = componentTemplate(cvaCheckedDeclaration, [], PACKAGE);
            expect(output).toContain('transformValue: (v) => !!v');
        });

        it('sets the correct property in CVA_CONFIG', () => {
            const output = componentTemplate(cvaCheckedDeclaration, [], PACKAGE);
            expect(output).toContain("property: 'checked'");
        });
    });

    describe('CVA — string form property', () => {
        const cvaValueDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Input',
            tagName: 'ui5-input',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'value',
                    privacy: 'public',
                    type: { text: 'string | undefined' },
                    default: 'undefined',
                    _ui5formProperty: true,
                    _ui5formEvents: 'change'
                } as CEM.ClassField
            ]
        };

        it('uses string default transformValue', () => {
            const output = componentTemplate(cvaValueDeclaration, [], PACKAGE);
            expect(output).toContain("transformValue: (v) => v || ''");
        });
    });

    describe('CVA — array form property', () => {
        const cvaArrayDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'MultiSelect',
            tagName: 'ui5-multi-select',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'values',
                    privacy: 'public',
                    type: { text: 'string[]' },
                    default: '[]',
                    _ui5formProperty: true,
                    _ui5formEvents: 'change'
                } as CEM.ClassField
            ]
        };

        it('uses array default transformValue', () => {
            const output = componentTemplate(cvaArrayDeclaration, [], PACKAGE);
            expect(output).toContain('transformValue: (v) => v || []');
        });
    });

    describe('CVA — RadioButton (isRadioButton flag)', () => {
        const radioButtonDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'RadioButton',
            tagName: 'ui5-radio-button',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'checked',
                    privacy: 'public',
                    type: { text: 'boolean' },
                    default: 'false',
                    _ui5formProperty: true,
                    _ui5formEvents: 'change'
                } as CEM.ClassField
            ]
        };

        it('adds isRadioButton: true to CVA_CONFIG provider', () => {
            const output = componentTemplate(radioButtonDeclaration, [], PACKAGE);
            expect(output).toContain('isRadioButton: true');
        });

        it('does not include transformValue for radio button', () => {
            const output = componentTemplate(radioButtonDeclaration, [], PACKAGE);
            expect(output).not.toContain('transformValue');
        });
    });

    describe('CVA — multiple form events', () => {
        const multiEventDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'TextArea',
            tagName: 'ui5-textarea',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'value',
                    privacy: 'public',
                    type: { text: 'string | undefined' },
                    _ui5formProperty: true,
                    _ui5formEvents: 'change,input'
                } as CEM.ClassField
            ]
        };

        it('generates events array with all configured events', () => {
            const output = componentTemplate(multiEventDeclaration, [], PACKAGE);
            expect(output).toContain("events: ['change', 'input']");
        });
    });
});
