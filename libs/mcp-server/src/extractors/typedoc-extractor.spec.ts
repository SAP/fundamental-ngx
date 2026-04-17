import { mkdir, rm, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { extractFromTypeDoc } from './typedoc-extractor';

// ---------------------------------------------------------------------------
// Test fixtures — minimal TypeDoc JSON structures
// ---------------------------------------------------------------------------

const TEMP_DIR = resolve(__dirname, '../../__test_tmp_typedoc__');
let tempCounter = 0;

async function writeTempTypeDoc(content: object): Promise<string> {
    const filePath = resolve(TEMP_DIR, `typedoc-${++tempCounter}.json`);
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

function makeTypeDocRoot(children: object[]): object {
    return { children };
}

function makeClassDecl(overrides: Record<string, unknown> = {}): object {
    return {
        name: 'ButtonComponent',
        kind: 128, // Class
        flags: {},
        comment: {
            summary: [{ kind: 'text', text: 'A test button component' }]
        },
        sources: [{ fileName: 'libs/core/button/button.component.ts', line: 10, character: 0 }],
        children: [],
        ...overrides
    };
}

function makeProperty(name: string, type: object, overrides: Record<string, unknown> = {}): object {
    return {
        name,
        kind: 1024, // Property
        flags: {},
        type,
        ...overrides
    };
}

function makeSignalInput(name: string, innerType: object, overrides: Record<string, unknown> = {}): object {
    return makeProperty(
        name,
        {
            type: 'reference',
            name: 'InputSignal',
            typeArguments: [innerType]
        },
        { flags: { isReadonly: true }, ...overrides }
    );
}

function makeOutput(name: string, innerType: object = { type: 'intrinsic', name: 'void' }): object {
    return makeProperty(
        name,
        {
            type: 'reference',
            name: 'OutputEmitterRef',
            typeArguments: [innerType]
        },
        { flags: { isReadonly: true } }
    );
}

function makeModelSignal(name: string, innerType: object): object {
    return makeProperty(
        name,
        {
            type: 'reference',
            name: 'ModelSignal',
            typeArguments: [innerType]
        },
        { flags: { isReadonly: true } }
    );
}

function makeMethod(name: string, overrides: Record<string, unknown> = {}): object {
    return {
        name,
        kind: 2048, // Method
        flags: {},
        signatures: [
            {
                name,
                kind: 4096,
                comment: { summary: [{ kind: 'text', text: `Does ${name}` }] },
                type: { type: 'intrinsic', name: 'void' },
                parameters: [],
                ...overrides
            }
        ]
    };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('typedoc-extractor', () => {
    describe('extractFromTypeDoc', () => {
        it('should extract a basic component class', async () => {
            const doc = makeTypeDocRoot([makeClassDecl()]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject({
                name: 'ButtonComponent',
                library: '@fundamental-ngx/core',
                description: 'A test button component',
                source: 'typedoc'
            });
        });

        it('should extract signal inputs (InputSignal<T>)', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeSignalInput('disabled', { type: 'intrinsic', name: 'boolean' }),
                        makeSignalInput('label', { type: 'intrinsic', name: 'string' })
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');
            const inputs = result[0].inputs;

            expect(inputs).toHaveLength(2);
            expect(inputs[0]).toMatchObject({ name: 'disabled', type: 'boolean' });
            expect(inputs[1]).toMatchObject({ name: 'label', type: 'string' });
        });

        it('should extract InputSignalWithTransform', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeProperty(
                            'compact',
                            {
                                type: 'reference',
                                name: 'InputSignalWithTransform',
                                typeArguments: [
                                    { type: 'intrinsic', name: 'boolean' },
                                    { type: 'intrinsic', name: 'unknown' }
                                ]
                            },
                            { flags: { isReadonly: true } }
                        )
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs).toHaveLength(1);
            expect(result[0].inputs[0]).toMatchObject({ name: 'compact', type: 'boolean' });
        });

        it('should extract OutputEmitterRef as outputs', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeOutput('clicked', { type: 'intrinsic', name: 'void' }),
                        makeOutput('valueChange', { type: 'intrinsic', name: 'string' })
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');
            const outputs = result[0].outputs;

            expect(outputs).toHaveLength(2);
            expect(outputs[0]).toMatchObject({ name: 'clicked', type: 'void' });
            expect(outputs[1]).toMatchObject({ name: 'valueChange', type: 'string' });
        });

        it('should extract legacy EventEmitter as outputs', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeProperty('onClose', {
                            type: 'reference',
                            name: 'EventEmitter',
                            typeArguments: [{ type: 'intrinsic', name: 'void' }]
                        })
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].outputs).toHaveLength(1);
            expect(result[0].outputs[0].name).toBe('onClose');
        });

        it('should extract ModelSignal as both input and output', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [makeModelSignal('value', { type: 'intrinsic', name: 'string' })]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs).toHaveLength(1);
            expect(result[0].inputs[0]).toMatchObject({ name: 'value', type: 'string' });

            expect(result[0].outputs).toHaveLength(1);
            expect(result[0].outputs[0]).toMatchObject({
                name: 'valueChange',
                type: 'string',
                description: expect.stringContaining('two-way binding')
            });
        });

        it('should extract public methods', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeMethod('open', {
                            parameters: [
                                {
                                    name: 'animate',
                                    kind: 32768,
                                    type: { type: 'intrinsic', name: 'boolean' },
                                    flags: { isOptional: true }
                                }
                            ],
                            type: { type: 'intrinsic', name: 'void' }
                        })
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');
            const methods = result[0].methods;

            expect(methods).toHaveLength(1);
            expect(methods[0]).toMatchObject({ name: 'open', returnType: 'void' });
            expect(methods[0].params).toHaveLength(1);
            expect(methods[0].params[0]).toMatchObject({
                name: 'animate',
                type: 'boolean',
                optional: true
            });
        });

        it('should skip lifecycle hooks', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeMethod('ngOnInit'),
                        makeMethod('ngOnDestroy'),
                        makeMethod('ngAfterViewInit'),
                        makeMethod('doSomething')
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].methods).toHaveLength(1);
            expect(result[0].methods[0].name).toBe('doSomething');
        });

        it('should skip underscore-prefixed methods', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [makeMethod('_internalSetup'), makeMethod('publicApi')]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].methods).toHaveLength(1);
            expect(result[0].methods[0].name).toBe('publicApi');
        });

        it('should skip private/protected members', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeSignalInput('publicInput', { type: 'intrinsic', name: 'string' }),
                        {
                            ...makeSignalInput('privateInput', { type: 'intrinsic', name: 'string' }),
                            flags: { isPrivate: true }
                        },
                        {
                            ...makeSignalInput('protectedInput', { type: 'intrinsic', name: 'string' }),
                            flags: { isProtected: true }
                        }
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs).toHaveLength(1);
            expect(result[0].inputs[0].name).toBe('publicInput');
        });

        it('should skip non-component/directive classes', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({ name: 'ButtonComponent' }), // should keep
                makeClassDecl({ name: 'SomeService' }), // should skip
                makeClassDecl({ name: 'AutoCompleteDirective' }), // should keep
                makeClassDecl({ name: 'ButtonModule' }) // should skip
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result).toHaveLength(2);
            expect(result.map((r) => r.name)).toEqual(['ButtonComponent', 'AutoCompleteDirective']);
        });

        it('should skip private/underscore-prefixed classes', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({ name: '_InternalComponent' }),
                makeClassDecl({ name: 'PublicComponent' })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('PublicComponent');
        });

        it('should derive selector from class name using prefix', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    name: 'ActionBarComponent',
                    comment: { summary: [{ kind: 'text', text: 'An action bar' }] }
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].selector).toBe('fd-action-bar');
        });

        it('should use platform prefix for platform library', async () => {
            const doc = makeTypeDocRoot([makeClassDecl({ name: 'SearchFieldComponent' })]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/platform');

            expect(result[0].selector).toBe('fdp-search-field');
        });

        it('should use @selector block tag when available', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    name: 'ButtonComponent',
                    comment: {
                        summary: [{ kind: 'text', text: 'A button' }],
                        blockTags: [
                            {
                                tag: '@selector',
                                content: [{ kind: 'text', text: 'button[fd-button], a[fd-button]' }]
                            }
                        ]
                    }
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].selector).toBe('button[fd-button], a[fd-button]');
        });

        it('should resolve enum values from union of string literals', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeSignalInput('type', {
                            type: 'union',
                            types: [
                                { type: 'literal', value: 'standard' },
                                { type: 'literal', value: 'positive' },
                                { type: 'literal', value: 'negative' }
                            ]
                        })
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs[0].enumValues).toEqual(['standard', 'positive', 'negative']);
        });

        it('should handle empty TypeDoc gracefully', async () => {
            const doc = { children: [] };
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result).toEqual([]);
        });

        it('should infer category from source file path', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    sources: [{ fileName: 'libs/core/dialog/dialog.component.ts', line: 1, character: 0 }]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].category).toBe('dialog');
        });

        it('should format union types correctly', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeSignalInput('size', {
                            type: 'union',
                            types: [
                                { type: 'literal', value: 'sm' },
                                { type: 'literal', value: 'md' },
                                { type: 'intrinsic', name: 'undefined' }
                            ]
                        })
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs[0].type).toBe("'sm' | 'md' | undefined");
        });

        it('should detect legacy @Input() properties (non-readonly, non-signal)', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeProperty(
                            'label',
                            { type: 'intrinsic', name: 'string' },
                            {
                                defaultValue: "''",
                                comment: { summary: [{ kind: 'text', text: 'Button label' }] }
                            }
                        )
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs).toHaveLength(1);
            expect(result[0].inputs[0]).toMatchObject({
                name: 'label',
                type: 'string',
                defaultValue: "''"
            });
        });

        it('should skip readonly properties that are not signal inputs', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeProperty(
                            'someService',
                            { type: 'reference', name: 'SomeService' },
                            {
                                flags: { isReadonly: true }
                            }
                        )
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs).toHaveLength(0);
        });

        it('should skip known internal reference types', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeProperty('items$', { type: 'reference', name: 'Observable' }),
                        makeProperty('destroy', { type: 'reference', name: 'Subject' }),
                        makeProperty('templateRef', { type: 'reference', name: 'TemplateRef' })
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs).toHaveLength(0);
        });

        it('should generate a fallback description when no JSDoc is present', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    name: 'InfoLabelComponent',
                    comment: undefined,
                    sources: [{ fileName: 'libs/core/info-label/info-label.component.ts', line: 1, character: 0 }],
                    children: [
                        makeSignalInput('color', { type: 'intrinsic', name: 'string' }),
                        makeSignalInput('numeric', { type: 'intrinsic', name: 'boolean' }),
                        makeOutput('clicked')
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].description).toContain('Info Label component (fd-info-label).');
            expect(result[0].description).toContain('Inputs: color, numeric.');
            expect(result[0].description).toContain('Outputs: clicked.');
        });

        it('should generate a fallback description for directives', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    name: 'InitialFocusDirective',
                    comment: undefined,
                    sources: [{ fileName: 'libs/core/utils/initial-focus.directive.ts', line: 1, character: 0 }]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].description).toContain('Initial Focus directive (fd-initial-focus).');
        });

        it('should use JSDoc description when present (not fallback)', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    name: 'InfoLabelComponent',
                    comment: { summary: [{ kind: 'text', text: 'Displays a categorization label.' }] }
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].description).toBe('Displays a categorization label.');
        });

        it('should extract class-level @deprecated tag', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    comment: {
                        summary: [{ kind: 'text', text: 'A module' }],
                        blockTags: [
                            { tag: '@deprecated', content: [{ kind: 'text', text: 'Use direct imports instead.' }] }
                        ]
                    }
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].deprecated).toBe('Use direct imports instead.');
        });

        it('should extract input-level @deprecated tag', async () => {
            const doc = makeTypeDocRoot([
                makeClassDecl({
                    children: [
                        makeSignalInput('oldProp', { type: 'intrinsic', name: 'string' }),
                        {
                            ...makeSignalInput('deprecatedProp', { type: 'intrinsic', name: 'boolean' }),
                            comment: {
                                summary: [{ kind: 'text', text: 'Old property' }],
                                blockTags: [
                                    { tag: '@deprecated', content: [{ kind: 'text', text: 'Use newProp instead' }] }
                                ]
                            }
                        }
                    ]
                })
            ]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].inputs[0].deprecated).toBeUndefined();
            expect(result[0].inputs[1].deprecated).toBe('Use newProp instead');
        });

        it('should not set deprecated when no @deprecated tag exists', async () => {
            const doc = makeTypeDocRoot([makeClassDecl()]);
            const filePath = await writeTempTypeDoc(doc);

            const result = await extractFromTypeDoc(filePath, '@fundamental-ngx/core');

            expect(result[0].deprecated).toBeUndefined();
        });
    });
});
