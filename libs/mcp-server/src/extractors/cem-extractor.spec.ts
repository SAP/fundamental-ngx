import { mkdir, rm, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { extractFromCem } from './cem-extractor';

// ---------------------------------------------------------------------------
// Test fixtures — minimal CEM JSON structures
// ---------------------------------------------------------------------------

function makeCem(declarations: object[], modules?: object[]): object {
    return {
        schemaVersion: '2.0.0',
        modules: modules ?? [
            {
                kind: 'javascript-module',
                path: 'dist/TestComponent.js',
                declarations,
                exports: []
            }
        ]
    };
}

function makeClassDecl(overrides: Record<string, unknown> = {}): object {
    return {
        kind: 'class',
        name: 'TestButton',
        tagName: 'ui5-test-button',
        customElement: true,
        description: 'A test button component',
        _ui5since: '1.0.0',
        _ui5privacy: 'public',
        members: [],
        events: [],
        slots: [],
        attributes: [],
        cssProperties: [],
        ...overrides
    };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TEMP_DIR = resolve(__dirname, '../../__test_tmp__');
let tempCounter = 0;

async function writeTempCem(content: object): Promise<string> {
    const filePath = resolve(TEMP_DIR, `cem-${++tempCounter}.json`);
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(content), 'utf-8');
    return filePath;
}

afterAll(async () => {
    try {
        await rm(TEMP_DIR, { recursive: true, force: true });
    } catch {
        // ignore cleanup errors
    }
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('cem-extractor', () => {
    describe('extractFromCem', () => {
        it('should extract a basic custom element', async () => {
            const cem = makeCem([makeClassDecl()]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject({
                name: 'TestButton',
                selector: 'ui5-test-button',
                library: '@fundamental-ngx/ui5-webcomponents',
                description: 'A test button component',
                source: 'cem'
            });
        });

        it('should extract public field members as inputs', async () => {
            const cem = makeCem([
                makeClassDecl({
                    members: [
                        {
                            kind: 'field',
                            name: 'disabled',
                            type: { text: 'boolean' },
                            default: 'false',
                            description: 'Whether the button is disabled',
                            privacy: 'public'
                        },
                        {
                            kind: 'field',
                            name: 'text',
                            type: { text: 'string' },
                            default: '""',
                            description: 'Button text',
                            privacy: 'public'
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');
            const inputs = result[0].inputs;

            expect(inputs).toHaveLength(2);
            expect(inputs[0]).toMatchObject({
                name: 'disabled',
                type: 'boolean',
                defaultValue: 'false',
                description: 'Whether the button is disabled',
                required: false
            });
            expect(inputs[1]).toMatchObject({
                name: 'text',
                type: 'string'
            });
        });

        it('should skip readonly members from inputs', async () => {
            const cem = makeCem([
                makeClassDecl({
                    members: [
                        {
                            kind: 'field',
                            name: 'visible',
                            type: { text: 'boolean' },
                            privacy: 'public'
                        },
                        {
                            kind: 'field',
                            name: 'effectiveDir',
                            type: { text: 'string' },
                            privacy: 'public',
                            readonly: true
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].inputs).toHaveLength(1);
            expect(result[0].inputs[0].name).toBe('visible');
        });

        it('should skip private/protected members', async () => {
            const cem = makeCem([
                makeClassDecl({
                    members: [
                        { kind: 'field', name: 'publicProp', type: { text: 'string' }, privacy: 'public' },
                        { kind: 'field', name: 'privateProp', type: { text: 'string' }, privacy: 'private' },
                        { kind: 'field', name: 'protectedProp', type: { text: 'string' }, privacy: 'protected' }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].inputs).toHaveLength(1);
            expect(result[0].inputs[0].name).toBe('publicProp');
        });

        it('should map events to outputs with ui5 prefix', async () => {
            const cem = makeCem([
                makeClassDecl({
                    events: [
                        {
                            name: 'click',
                            type: { text: 'CustomEvent' },
                            description: 'Fired when clicked',
                            _ui5privacy: 'public'
                        },
                        {
                            name: 'selection-change',
                            type: { text: 'CustomEvent' },
                            description: 'Selection changed',
                            _ui5privacy: 'public'
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');
            const outputs = result[0].outputs;

            expect(outputs).toHaveLength(2);
            expect(outputs[0]).toMatchObject({
                name: 'ui5Click',
                description: 'Fired when clicked'
            });
            expect(outputs[1]).toMatchObject({
                name: 'ui5SelectionChange',
                description: 'Selection changed'
            });
        });

        it('should skip private/protected events', async () => {
            const cem = makeCem([
                makeClassDecl({
                    events: [
                        { name: 'click', _ui5privacy: 'public' },
                        { name: 'internal', _ui5privacy: 'private' }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].outputs).toHaveLength(1);
            expect(result[0].outputs[0].name).toBe('ui5Click');
        });

        it('should extract event detail parameters', async () => {
            const cem = makeCem([
                makeClassDecl({
                    events: [
                        {
                            name: 'selection-change',
                            _ui5privacy: 'public',
                            _ui5parameters: [
                                {
                                    name: 'selectedItems',
                                    type: { text: 'Array<ListItemBase>' },
                                    description: 'The selected items'
                                },
                                {
                                    name: 'previouslySelectedItems',
                                    type: { text: 'Array<ListItemBase>' },
                                    description: 'Previously selected'
                                }
                            ]
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');
            const detail = result[0].outputs[0].detail;

            expect(detail).toHaveLength(2);
            expect(detail![0]).toMatchObject({
                name: 'selectedItems',
                type: 'Array<ListItemBase>'
            });
        });

        it('should extract slots', async () => {
            const cem = makeCem([
                makeClassDecl({
                    slots: [
                        {
                            name: 'default',
                            description: 'Default slot content',
                            _ui5type: { text: 'Array<HTMLElement>' },
                            _ui5privacy: 'public'
                        },
                        {
                            name: 'header',
                            description: 'Header slot',
                            _ui5type: {
                                text: 'HTMLElement',
                                references: [{ name: 'TabSeparator', package: '', module: '' }]
                            },
                            _ui5privacy: 'public'
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');
            const slots = result[0].slots;

            expect(slots).toHaveLength(2);
            expect(slots[0]).toMatchObject({ name: 'default', description: 'Default slot content' });
            expect(slots[1]).toMatchObject({ name: 'header' });
            expect(slots[1].acceptedTypes).toContain('TabSeparator');
        });

        it('should extract public methods', async () => {
            const cem = makeCem([
                makeClassDecl({
                    members: [
                        {
                            kind: 'method',
                            name: 'openPicker',
                            privacy: 'public',
                            description: 'Opens the date picker',
                            return: { type: { text: 'void' } },
                            parameters: [
                                {
                                    name: 'preserveFocus',
                                    type: { text: 'boolean' },
                                    description: 'Keep focus'
                                }
                            ]
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');
            const methods = result[0].methods;

            expect(methods).toHaveLength(1);
            expect(methods[0]).toMatchObject({
                name: 'openPicker',
                returnType: 'void',
                description: 'Opens the date picker'
            });
            expect(methods[0].params).toHaveLength(1);
            expect(methods[0].params[0]).toMatchObject({
                name: 'preserveFocus',
                type: 'boolean'
            });
        });

        it('should extract CSS custom properties', async () => {
            const cem = makeCem([
                makeClassDecl({
                    cssProperties: [
                        {
                            name: '--_ui5-button-base-height',
                            description: 'Button height',
                            default: '2.75rem'
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].cssProperties).toHaveLength(1);
            expect(result[0].cssProperties[0]).toMatchObject({
                name: '--_ui5-button-base-height',
                description: 'Button height',
                defaultValue: '2.75rem'
            });
        });

        it('should resolve enum values from type references', async () => {
            const cem: object = {
                schemaVersion: '2.0.0',
                modules: [
                    {
                        kind: 'javascript-module',
                        path: 'dist/types/ButtonDesign.js',
                        declarations: [
                            {
                                kind: 'enum',
                                name: 'ButtonDesign',
                                members: [
                                    { kind: 'field', name: 'Default' },
                                    { kind: 'field', name: 'Emphasized' },
                                    { kind: 'field', name: 'Transparent' }
                                ]
                            }
                        ]
                    },
                    {
                        kind: 'javascript-module',
                        path: 'dist/Button.js',
                        declarations: [
                            makeClassDecl({
                                members: [
                                    {
                                        kind: 'field',
                                        name: 'design',
                                        type: {
                                            text: 'ButtonDesign',
                                            references: [
                                                {
                                                    name: 'ButtonDesign',
                                                    package: '@ui5/webcomponents',
                                                    module: 'types/ButtonDesign'
                                                }
                                            ]
                                        },
                                        default: '"Default"',
                                        privacy: 'public'
                                    }
                                ]
                            })
                        ]
                    }
                ]
            };
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');
            const designInput = result[0].inputs.find((i) => i.name === 'design');

            expect(designInput).toBeDefined();
            expect(designInput!.enumValues).toEqual(['Default', 'Emphasized', 'Transparent']);
        });

        it('should resolve inline union string literals as enum values', async () => {
            const cem = makeCem([
                makeClassDecl({
                    members: [
                        {
                            kind: 'field',
                            name: 'size',
                            type: { text: '"Small" | "Medium" | "Large"' },
                            privacy: 'public'
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');
            const sizeInput = result[0].inputs.find((i) => i.name === 'size');

            expect(sizeInput!.enumValues).toEqual(['Small', 'Medium', 'Large']);
        });

        it('should skip private custom elements', async () => {
            const cem = makeCem([
                makeClassDecl({ _ui5privacy: 'private' }),
                makeClassDecl({ name: 'PublicButton', tagName: 'ui5-public-btn' })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('PublicButton');
        });

        it('should skip abstract custom elements', async () => {
            const cem = makeCem([makeClassDecl({ _ui5abstract: true })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result).toHaveLength(0);
        });

        it('should skip non-custom-element classes', async () => {
            const cem = makeCem([makeClassDecl({ customElement: false })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result).toHaveLength(0);
        });

        it('should skip classes without a tagName', async () => {
            const cem = makeCem([makeClassDecl({ tagName: undefined })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result).toHaveLength(0);
        });

        it('should assign correct category for fiori library', async () => {
            const cem = makeCem([makeClassDecl()]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents-fiori');

            expect(result[0].category).toBe('Fiori');
        });

        it('should assign correct category for ai library', async () => {
            const cem = makeCem([makeClassDecl()]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents-ai');

            expect(result[0].category).toBe('AI');
        });

        it('should handle empty CEM gracefully', async () => {
            const cem = { schemaVersion: '2.0.0', modules: [] };
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result).toEqual([]);
        });

        it('should handle modules with no declarations', async () => {
            const cem = {
                schemaVersion: '2.0.0',
                modules: [{ kind: 'javascript-module', path: 'dist/test.js' }]
            };
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result).toEqual([]);
        });

        it('should mark input as required when no default and not optional', async () => {
            const cem = makeCem([
                makeClassDecl({
                    members: [
                        {
                            kind: 'field',
                            name: 'value',
                            type: { text: 'string' },
                            privacy: 'public'
                            // no default — required
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].inputs[0].required).toBe(true);
        });

        it('should mark input as not required when it has a default', async () => {
            const cem = makeCem([
                makeClassDecl({
                    members: [
                        {
                            kind: 'field',
                            name: 'value',
                            type: { text: 'string' },
                            default: '""',
                            privacy: 'public'
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].inputs[0].required).toBe(false);
        });

        it('should clean CEM descriptions — extract Overview section', async () => {
            const rawDesc =
                '### Overview\n\nThe button represents a simple push button.\nIt enables users to trigger actions.\n\n### Usage\n\nFor the button UI, you can define text.\n\n### ES6 Module Import\n\n`import "@ui5/webcomponents/dist/Button.js";`';
            const cem = makeCem([makeClassDecl({ description: rawDesc })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].description).toBe(
                'The button represents a simple push button.\nIt enables users to trigger actions.'
            );
            expect(result[0].description).not.toContain('### Overview');
            expect(result[0].description).not.toContain('ES6 Module Import');
        });

        it('should extract keyboard handling section', async () => {
            const rawDesc =
                '### Overview\n\nA button.\n\n### Keyboard Handling\n\n- [Space] / [Enter] - Fires the click event.\n- [Shift] - Releases without triggering.\n\n### ES6 Module Import\n\n`import "x";`';
            const cem = makeCem([makeClassDecl({ description: rawDesc })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].keyboardHandling).toContain('[Space]');
            expect(result[0].keyboardHandling).toContain('[Enter]');
        });

        it('should handle description with no ### Overview header', async () => {
            const cem = makeCem([makeClassDecl({ description: 'A simple plain text description.' })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].description).toBe('A simple plain text description.');
        });

        it('should strip markdown formatting from descriptions', async () => {
            const rawDesc =
                '### Overview\n\nThe `ui5-button` is a **push button** with *emphasis* and [link](http://x).';
            const cem = makeCem([makeClassDecl({ description: rawDesc })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].description).toBe('The ui5-button is a push button with emphasis and link.');
        });

        it('should return empty string for empty description', async () => {
            const cem = makeCem([makeClassDecl({ description: '' })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].description).toBe('');
        });

        it('should extract component-level deprecation', async () => {
            const cem = makeCem([
                makeClassDecl({
                    deprecated: 'Use ui5-table-selection-single instead.'
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].deprecated).toBe('Use ui5-table-selection-single instead.');
        });

        it('should extract input-level deprecation', async () => {
            const cem = makeCem([
                makeClassDecl({
                    members: [
                        {
                            kind: 'field',
                            name: 'interactive',
                            type: { text: 'boolean' },
                            default: 'false',
                            privacy: 'public',
                            deprecated: 'Set mode="Interactive" instead.'
                        }
                    ]
                })
            ]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].inputs[0].deprecated).toBe('Set mode="Interactive" instead.');
        });

        it('should handle boolean true deprecation', async () => {
            const cem = makeCem([makeClassDecl({ deprecated: true })]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].deprecated).toBe('Deprecated');
        });

        it('should not set deprecated when absent', async () => {
            const cem = makeCem([makeClassDecl()]);
            const filePath = await writeTempCem(cem);

            const result = await extractFromCem(filePath, '@fundamental-ngx/ui5-webcomponents');

            expect(result[0].deprecated).toBeUndefined();
        });
    });
});
