import * as ts from 'typescript';
import type * as CEM from './cem-types';
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

        it('does not subscribe to web component renders', () => {
            const output = componentTemplate(readonlyGetterDeclaration, [], PACKAGE);
            expect(output).not.toContain('_renderVersion');
            expect(output).not.toContain('attachComponentStateFinalized');
            expect(output).not.toContain('linkedSignal');
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

        it('generates a private signal re-derived from the web component on every render', () => {
            const output = componentTemplate(readonlySignalDeclaration, [], PACKAGE);
            expect(output).toContain('private readonly _filesSignal = linkedSignal((): FileList | null => {');
            expect(output).toContain('this._renderVersion();');
            expect(output).toContain('return this.element.files ?? undefined;');
            expect(output).toContain("linkedSignal\n} from '@angular/core';");
        });

        it('bumps the render version whenever the web component finalizes a render', () => {
            const output = componentTemplate(readonlySignalDeclaration, [], PACKAGE);
            expect(output).toContain('private readonly _renderVersion = signal(0);');
            expect(output).toContain('wcElement.attachComponentStateFinalized?.(onRender);');
            expect(output).toContain('wcElement.detachComponentStateFinalized?.(onRender)');
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

    describe('readonly member — signal initialization (DOM element values)', () => {
        // Mirrors ui5-select, whose selectedOption is a DOM element that cannot be JSON-serialized.
        const selectDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Select',
            tagName: 'ui5-select',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'selectedOption',
                    privacy: 'public',
                    readonly: true,
                    type: { text: 'IOption | undefined' }
                } as CEM.ClassField
            ],
            events: [
                {
                    name: 'change',
                    _ui5privacy: 'public',
                    type: { text: 'CustomEvent' },
                    _ui5parameters: [
                        { name: 'selectedOption', type: { text: 'IOption | undefined' }, _ui5privacy: 'public' }
                    ]
                } as any
            ]
        };

        it('reads the current value from the web component without an eager copy', () => {
            const output = componentTemplate(selectDeclaration, [], PACKAGE);
            expect(output).toContain('return this.element.selectedOption ?? undefined;');
            expect(output).not.toContain('requestAnimationFrame');
        });

        it('does not emit a JSON.stringify equality guard', () => {
            const output = componentTemplate(selectDeclaration, [], PACKAGE);
            expect(output).not.toContain('JSON.stringify');
        });
    });

    describe('readonly member — falsy event values', () => {
        const booleanReadonlyDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'FlexibleColumnLayout',
            tagName: 'ui5-flexible-column-layout',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'startColumnVisible',
                    privacy: 'public',
                    readonly: true,
                    type: { text: 'boolean' },
                    default: 'true'
                } as CEM.ClassField
            ],
            events: [
                {
                    name: 'layout-change',
                    _ui5privacy: 'public',
                    type: { text: 'CustomEvent' },
                    _ui5parameters: [{ name: 'startColumnVisible', type: { text: 'boolean' }, _ui5privacy: 'public' }]
                } as any
            ]
        };

        it('keeps false instead of replacing it with the default', () => {
            const output = componentTemplate(booleanReadonlyDeclaration, [], PACKAGE);
            expect(output).toContain('customEvent.detail?.startColumnVisible ?? wcElement.startColumnVisible ?? true');
            expect(output).toContain('return this.element.startColumnVisible ?? true;');
            expect(output).not.toContain('|| true');
        });
    });

    describe('readonly member — array signal', () => {
        const arrayReadonlyDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'SegmentedButton',
            tagName: 'ui5-segmented-button',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'selectedItems',
                    privacy: 'public',
                    readonly: true,
                    type: { text: 'Array<ISegmentedButtonItem>' },
                    default: '[]'
                } as CEM.ClassField
            ],
            events: [
                {
                    name: 'selection-change',
                    _ui5privacy: 'public',
                    type: { text: 'CustomEvent' },
                    _ui5parameters: [
                        { name: 'selectedItems', type: { text: 'Array<ISegmentedButtonItem>' }, _ui5privacy: 'public' }
                    ]
                } as any
            ]
        };

        it('compares items so renders without a selection change do not notify consumers', () => {
            const output = componentTemplate(arrayReadonlyDeclaration, [], PACKAGE);
            expect(output).toContain(
                '}, { equal: (a, b): boolean => a.length === b.length && a.every((item, i): boolean => item === b[i]) });'
            );
        });
    });

    describe('readonly member — runtime behavior', () => {
        const selectWithLiveChange: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Select',
            tagName: 'ui5-select',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'selectedOption',
                    privacy: 'public',
                    readonly: true,
                    type: { text: 'IOption | undefined' }
                } as CEM.ClassField
            ],
            events: ['change', 'live-change'].map(
                (name) =>
                    ({
                        name,
                        _ui5privacy: 'public',
                        type: { text: 'CustomEvent' },
                        _ui5parameters: [
                            { name: 'selectedOption', type: { text: 'IOption | undefined' }, _ui5privacy: 'public' }
                        ]
                    }) as any
            )
        };

        /** Minimal stand-in for a UI5 element: renders on demand and notifies state-finalized listeners. */
        class FakeSelectElement extends EventTarget {
            selectedOption: unknown;
            readonly renderListeners = new Set<() => void>();

            attachComponentStateFinalized(fn: () => void): void {
                this.renderListeners.add(fn);
            }

            detachComponentStateFinalized(fn: () => void): void {
                this.renderListeners.delete(fn);
            }

            render(): void {
                this.renderListeners.forEach((fn) => fn());
            }
        }

        /** Runs the generated ngAfterViewInit body against the fake element and records signal writes. */
        function setup(element: FakeSelectElement): {
            renderVersion: () => number;
            selectedOption: () => unknown;
            destroy: () => void;
        } {
            const output = componentTemplate(selectWithLiveChange, [], PACKAGE);
            const start = output.indexOf('ngAfterViewInit(): void {') + 'ngAfterViewInit(): void {'.length;
            const body = output.slice(start, output.lastIndexOf('}', output.lastIndexOf('}') - 1));
            const js = ts.transpileModule(body, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;

            let version = 0;
            let selectedOption: unknown;
            const destroyCallbacks: Array<() => void> = [];
            const host = {
                ui5Change: { emit: jest.fn() },
                ui5LiveChange: { emit: jest.fn() },
                _destroyRef: { onDestroy: (fn: () => void): number => destroyCallbacks.push(fn) },
                _renderVersion: { update: (fn: (v: number) => number): number => (version = fn(version)) },
                _selectedOptionSignal: { set: (value: unknown): unknown => (selectedOption = value) }
            };

            new Function('wcElement', js.replace('const wcElement = this.element;', '')).call(host, element);

            return {
                renderVersion: () => version,
                selectedOption: () => selectedOption,
                destroy: () => destroyCallbacks.forEach((fn) => fn())
            };
        }

        it('invalidates readonly state each time the web component renders', () => {
            const element = new FakeSelectElement();
            const wrapper = setup(element);

            element.render();
            element.render();

            expect(wrapper.renderVersion()).toBe(2);
        });

        it('stops listening for renders on destroy', () => {
            const element = new FakeSelectElement();
            const wrapper = setup(element);

            wrapper.destroy();
            element.render();

            expect(element.renderListeners.size).toBe(0);
            expect(wrapper.renderVersion()).toBe(0);
        });

        it('takes the value from the event detail while the element is still mid-update', () => {
            const element = new FakeSelectElement();
            const wrapper = setup(element);
            const nextOption = { value: 'mouse' };

            // ui5-select fires live-change after deselecting the old option but before selecting the new one
            element.selectedOption = undefined;
            element.dispatchEvent(new CustomEvent('live-change', { detail: { selectedOption: nextOption } }));

            expect(wrapper.selectedOption()).toBe(nextOption);
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

    describe('RouterLink bridge (href components)', () => {
        const hrefDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Link',
            tagName: 'ui5-link',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'href',
                    privacy: 'public',
                    type: { text: 'string | undefined' }
                } as CEM.ClassField
            ]
        };

        const noHrefDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Button',
            tagName: 'ui5-button',
            customElement: true
        };

        it('imports Ui5RouterLinkBridgeDirective for components with href', () => {
            const result = componentTemplate(hrefDeclaration, [], PACKAGE);
            expect(result).toContain(
                `import { Ui5RouterLinkBridgeDirective } from '@fundamental-ngx/ui5-webcomponents-base/router-link'`
            );
        });

        it('adds Ui5RouterLinkBridgeDirective to hostDirectives for components with href', () => {
            const result = componentTemplate(hrefDeclaration, [], PACKAGE);
            expect(result).toContain('hostDirectives: [Ui5RouterLinkBridgeDirective]');
        });

        it('does NOT import Ui5RouterLinkBridgeDirective for components without href', () => {
            const result = componentTemplate(noHrefDeclaration, [], PACKAGE);
            expect(result).not.toContain('Ui5RouterLinkBridgeDirective');
        });

        it('does NOT add hostDirectives for components without href (unless CVA requires it)', () => {
            const result = componentTemplate(noHrefDeclaration, [], PACKAGE);
            expect(result).not.toContain('hostDirectives');
        });
    });

    describe('output listener cleanup (NG0953 prevention)', () => {
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

        it('injects DestroyRef when component has outputs', () => {
            const result = componentTemplate(eventDeclaration, [], PACKAGE);
            expect(result).toContain('DestroyRef');
        });

        it('removes event listeners on destroy', () => {
            const result = componentTemplate(eventDeclaration, [], PACKAGE);
            expect(result).toContain('removeEventListener');
        });

        it('does not inject DestroyRef when component has no outputs', () => {
            const result = componentTemplate(minimalDeclaration, [], PACKAGE);
            expect(result).not.toContain('DestroyRef');
        });
    });

    describe('input synchronization', () => {
        const linkDeclaration: CEM.CustomElementDeclaration = {
            kind: 'class',
            name: 'Link',
            tagName: 'ui5-link',
            customElement: true,
            members: [
                {
                    kind: 'field',
                    name: 'href',
                    privacy: 'public',
                    type: { text: 'string | undefined' },
                    default: 'undefined'
                } as CEM.ClassField
            ]
        };

        it('generates guard code to prevent clobbering imperatively-set properties', () => {
            const output = componentTemplate(linkDeclaration, [], PACKAGE);
            expect(output).toContain('if (value === undefined && lastWritten === undefined && wcElement[inputName]) {');
            expect(output).toContain('lastWritten = value;');
        });

        it('generates code that still writes non-undefined values', () => {
            const output = componentTemplate(linkDeclaration, [], PACKAGE);
            // After the guard, the effect should still write when value is not undefined
            expect(output).toContain('wcElement[inputName] = value;');
        });

        describe('runtime behavior', () => {
            /** Runs the generated ngAfterViewInit body against a fake element and a manually re-runnable effect. */
            function setup(
                declaration: CEM.CustomElementDeclaration,
                wcElement: Record<string, unknown>
            ): { set: (name: string, value: unknown) => void } {
                const output = componentTemplate(declaration, [], PACKAGE);
                const start = output.indexOf('ngAfterViewInit(): void {') + 'ngAfterViewInit(): void {'.length;
                const body = output.slice(start, output.lastIndexOf('}', output.lastIndexOf('}') - 1));
                const js = ts.transpileModule(body, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;

                const values: Record<string, unknown> = {};
                const effects: Array<() => void> = [];
                const host: Record<string, unknown> = { injector: {} };
                for (const member of declaration.members ?? []) {
                    host[member.name] = (): unknown => values[member.name];
                }

                new Function(
                    'runInInjectionContext',
                    'effect',
                    'wcElement',
                    js.replace('const wcElement = this.element;', '')
                ).call(
                    host,
                    (_: unknown, fn: () => void) => fn(),
                    (fn: () => void) => {
                        effects.push(fn);
                        fn();
                    },
                    wcElement
                );

                return {
                    set: (name, value): void => {
                        values[name] = value;
                        effects.forEach((fn) => fn());
                    }
                };
            }

            const inputDeclaration: CEM.CustomElementDeclaration = {
                kind: 'class',
                name: 'Input',
                tagName: 'ui5-input',
                customElement: true,
                members: [
                    {
                        kind: 'field',
                        name: 'maxlength',
                        privacy: 'public',
                        type: { text: 'number | undefined' },
                        default: 'undefined'
                    } as CEM.ClassField
                ]
            };

            it('resets a previously bound property when the input becomes undefined', () => {
                const element: Record<string, unknown> = {};
                const { set } = setup(inputDeclaration, element);

                set('maxlength', 5);
                expect(element['maxlength']).toBe(5);

                set('maxlength', undefined);
                expect(element['maxlength']).toBeUndefined();
            });

            it('does not clobber an externally-set property while the input was never bound', () => {
                const element: Record<string, unknown> = { href: '/external' };
                const { set } = setup(linkDeclaration, element);

                expect(element['href']).toBe('/external');

                set('href', undefined);
                expect(element['href']).toBe('/external');
            });
        });
    });
});
