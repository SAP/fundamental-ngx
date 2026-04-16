const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const KIND_CLASS = 128;
const KIND_PROPERTY = 1024;
const KIND_METHOD = 2048;
const KIND_ACCESSOR = 262144;

const SIGNAL_INPUT_TYPES = new Set(['InputSignal', 'InputSignalWithTransform']);
const SIGNAL_OUTPUT_TYPES = new Set(['OutputEmitterRef']);
const DECORATOR_OUTPUT_TYPES = new Set(['EventEmitter', 'OutputRef']);
const MODEL_TYPES = new Set(['ModelSignal']);

const LIFECYCLE_HOOKS = new Set([
    'ngOnInit',
    'ngOnDestroy',
    'ngOnChanges',
    'ngDoCheck',
    'ngAfterContentInit',
    'ngAfterContentChecked',
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'writeValue',
    'registerOnChange',
    'registerOnTouched',
    'setDisabledState',
    'validate',
    'registerOnValidatorChange'
]);

function extractCommentText(comment) {
    if (!comment) {
        return '';
    }
    return (comment.summary || [])
        .map((p) => (p.kind === 'text' ? p.text : p.kind === 'code' ? p.text : ''))
        .join('')
        .trim();
}

function extractTagText(content) {
    if (!content) {
        return '';
    }
    return content
        .map((p) => (p.kind === 'text' ? p.text : p.kind === 'code' ? p.text : ''))
        .join('')
        .trim();
}

function getDeprecatedMessage(comment) {
    if (!comment) {
        return null;
    }
    for (const tag of comment.blockTags || []) {
        if (tag.tag === '@deprecated') {
            return extractTagText(tag.content) || 'Deprecated';
        }
    }
    if ((comment.modifierTags || []).includes('@deprecated')) {
        return 'Deprecated';
    }
    return null;
}

function getSinceVersion(comment) {
    if (!comment) {
        return null;
    }
    for (const tag of comment.blockTags || []) {
        if (tag.tag === '@since') {
            return extractTagText(tag.content) || null;
        }
    }
    return null;
}

function resolveTypeName(t) {
    if (!t) {
        return 'unknown';
    }
    switch (t.type) {
        case 'intrinsic':
            return t.name;
        case 'literal':
            return t.value === null ? 'null' : typeof t.value === 'string' ? `'${t.value}'` : String(t.value);
        case 'reference':
            if (t.typeArguments && t.typeArguments.length) {
                return `${t.name}<${t.typeArguments.map(resolveTypeName).join(', ')}>`;
            }
            return t.name;
        case 'union':
            return t.types
                .map(resolveTypeName)
                .filter((n) => n !== 'undefined')
                .join(' | ');
        case 'intersection':
            return t.types.map(resolveTypeName).join(' & ');
        case 'array':
            return `${resolveTypeName(t.elementType)}[]`;
        case 'reflection': {
            const d = t.declaration;
            if (!d) {
                return 'object';
            }
            if (d.signatures) {
                const s = d.signatures[0];
                const p = (s.parameters || []).map((pp) => `${pp.name}: ${resolveTypeName(pp.type)}`).join(', ');
                return `(${p}) => ${resolveTypeName(s.type)}`;
            }
            if (d.children) {
                const f = d.children
                    .slice(0, 5)
                    .map((c) => `${c.name}: ${resolveTypeName(c.type)}`)
                    .join('; ');
                return `{ ${f}${d.children.length > 5 ? '; ...' : ''} }`;
            }
            return 'object';
        }
        case 'tuple':
            return t.elements ? `[${t.elements.map(resolveTypeName).join(', ')}]` : 'unknown';
        case 'templateLiteral':
            return 'string';
        default:
            return t.name || 'unknown';
    }
}

function extractInputType(member) {
    const t = member.type;
    if (!t) {
        return 'unknown';
    }
    if (t.typeArguments && t.typeArguments.length > 0) {
        return resolveTypeName(t.typeArguments[0]);
    }
    return resolveTypeName(t);
}

function extractOutputType(member) {
    const t = member.type;
    if (!t) {
        return 'void';
    }
    if (t.typeArguments && t.typeArguments.length > 0) {
        return resolveTypeName(t.typeArguments[0]);
    }
    return 'void';
}

function detectClassKind(name) {
    if (name.endsWith('Component')) {
        return 'Component';
    }
    if (name.endsWith('Directive')) {
        return 'Directive';
    }
    if (name.endsWith('Service')) {
        return 'Service';
    }
    if (name.endsWith('Pipe')) {
        return 'Pipe';
    }
    if (name.endsWith('Module')) {
        return 'Module';
    }
    return 'Class';
}

function extractSelector(comment, sourceFileName) {
    // Try from comment first
    if (comment) {
        for (const tag of comment.blockTags || []) {
            if (tag.tag === '@selector') {
                return extractTagText(tag.content);
            }
        }
        const text = extractCommentText(comment);
        const match = text.match(/selector:\s*`?([^`\n]+)`?/i);
        if (match) {
            return match[1].trim();
        }
    }
    // Try reading selector from the source file
    if (sourceFileName && existsSync(sourceFileName)) {
        try {
            const src = readFileSync(sourceFileName, 'utf-8');
            const m = src.match(/selector:\s*['"]([^'"]+)['"]/);
            if (m) {
                return m[1];
            }
        } catch {
            // ignore
        }
    }
    return null;
}

/** Internal types to skip when they appear as bare properties (not inputs/outputs) */
const SKIP_TYPES = new Set([
    'ElementRef',
    'Injector',
    'ChangeDetectorRef',
    'Renderer2',
    'ViewContainerRef',
    'TemplateRef',
    'DomSanitizer',
    'NgZone',
    'QueryList',
    'InjectionToken',
    'Observable',
    'Subject',
    'BehaviorSubject'
]);

/**
 * Read a source file and extract sets of @Input() and @Output() property names.
 * This handles the case where TypeDoc doesn't report decorator metadata.
 */
function extractDecoratorInfo(sourceFileName) {
    const result = { inputs: new Set(), outputs: new Set() };
    if (!sourceFileName || !existsSync(sourceFileName)) {
        return result;
    }
    try {
        const src = readFileSync(sourceFileName, 'utf-8');
        // Match @Input() / @Input('alias') followed by property name
        const inputRe = /@Input\s*\([^)]*\)\s*(?:(?:set|get)\s+)?(\w+)/g;
        let match;
        while ((match = inputRe.exec(src)) !== null) {
            result.inputs.add(match[1]);
        }
        // Match @Output() followed by property name
        const outputRe = /@Output\s*\([^)]*\)\s*(?:readonly\s+)?(\w+)/g;
        while ((match = outputRe.exec(src)) !== null) {
            result.outputs.add(match[1]);
        }
    } catch {
        // ignore
    }
    return result;
}

function generateApiJson(typedocJsonPath, apiOutputDir, lib) {
    if (!existsSync(typedocJsonPath)) {
        console.log(`Skipped ${lib}: no typedoc.json`);
        return;
    }

    const project = JSON.parse(readFileSync(typedocJsonPath, 'utf-8'));
    const libOutputDir = join(apiOutputDir, lib);
    if (!existsSync(libOutputDir)) {
        mkdirSync(libOutputDir, { recursive: true });
    }

    let count = 0;
    for (const child of project.children || []) {
        if (child.kind !== KIND_CLASS) {
            continue;
        }

        const name = child.name;
        const members = child.children || [];
        const comment = child.comment;
        const sources = child.sources || [];
        const source = sources[0] || {};

        const inputs = [];
        const outputs = [];
        const methods = [];
        const inheritedInputs = [];
        const inheritedMethods = [];
        let inheritedFrom = null;

        // Extract @Input/@Output from source file for decorator-based properties
        const decoratorInfo = extractDecoratorInfo(source.fileName);

        for (const m of members) {
            const isInherited = !!m.inheritedFrom;
            if (isInherited && m.inheritedFrom && m.inheritedFrom.name) {
                inheritedFrom = inheritedFrom || m.inheritedFrom.name.split('.')[0];
            }

            if (m.kind === KIND_PROPERTY) {
                const typeName = (m.type || {}).name || '';

                if (SIGNAL_INPUT_TYPES.has(typeName)) {
                    const entry = {
                        name: m.name,
                        type: extractInputType(m),
                        default: m.defaultValue && m.defaultValue !== '...' ? m.defaultValue : null,
                        description: extractCommentText(m.comment),
                        isSignal: true,
                        deprecated: getDeprecatedMessage(m.comment),
                        sourceLine: (m.sources || [])[0]?.line || 0,
                        since: getSinceVersion(m.comment)
                    };
                    if (isInherited) {
                        inheritedInputs.push(entry);
                    } else {
                        inputs.push(entry);
                    }
                } else if (SIGNAL_OUTPUT_TYPES.has(typeName)) {
                    if (!isInherited) {
                        outputs.push({
                            name: m.name,
                            type: extractOutputType(m),
                            default: null,
                            description: extractCommentText(m.comment),
                            isSignal: true,
                            deprecated: getDeprecatedMessage(m.comment),
                            sourceLine: (m.sources || [])[0]?.line || 0,
                            since: getSinceVersion(m.comment)
                        });
                    }
                } else if (DECORATOR_OUTPUT_TYPES.has(typeName)) {
                    if (!isInherited) {
                        outputs.push({
                            name: m.name,
                            type: extractOutputType(m),
                            default: null,
                            description: extractCommentText(m.comment),
                            isSignal: false,
                            deprecated: getDeprecatedMessage(m.comment),
                            sourceLine: (m.sources || [])[0]?.line || 0,
                            since: getSinceVersion(m.comment)
                        });
                    }
                } else if (MODEL_TYPES.has(typeName)) {
                    if (!isInherited) {
                        const entry = {
                            name: m.name,
                            type: extractInputType(m),
                            default: m.defaultValue && m.defaultValue !== '...' ? m.defaultValue : null,
                            description: extractCommentText(m.comment),
                            isSignal: true,
                            deprecated: getDeprecatedMessage(m.comment),
                            sourceLine: (m.sources || [])[0]?.line || 0,
                            since: getSinceVersion(m.comment)
                        };
                        inputs.push(entry);
                        outputs.push({ ...entry, name: entry.name + 'Change', type: `EventEmitter<${entry.type}>` });
                    }
                } else if (decoratorInfo.inputs.has(m.name)) {
                    // Decorator-based @Input() property
                    const entry = {
                        name: m.name,
                        type: resolveTypeName(m.type),
                        default: m.defaultValue && m.defaultValue !== '...' ? m.defaultValue : null,
                        description: extractCommentText(m.comment),
                        isSignal: false,
                        deprecated: getDeprecatedMessage(m.comment),
                        sourceLine: (m.sources || [])[0]?.line || 0,
                        since: getSinceVersion(m.comment)
                    };
                    if (isInherited) {
                        inheritedInputs.push(entry);
                    } else {
                        inputs.push(entry);
                    }
                } else if (decoratorInfo.outputs.has(m.name)) {
                    // Decorator-based @Output() property
                    if (!isInherited) {
                        outputs.push({
                            name: m.name,
                            type: resolveTypeName(m.type?.typeArguments?.[0] || m.type),
                            default: null,
                            description: extractCommentText(m.comment),
                            isSignal: false,
                            deprecated: getDeprecatedMessage(m.comment),
                            sourceLine: (m.sources || [])[0]?.line || 0,
                            since: getSinceVersion(m.comment)
                        });
                    }
                }
            } else if (m.kind === KIND_METHOD) {
                if (LIFECYCLE_HOOKS.has(m.name)) {
                    continue;
                }
                if (m.flags && (m.flags.isPrivate || m.flags.isProtected)) {
                    continue;
                }
                const sigs = m.signatures;
                if (!sigs || !sigs.length) {
                    continue;
                }
                const sig = sigs[0];
                const params = (sig.parameters || []).map((p) => ({
                    name: p.name,
                    type: resolveTypeName(p.type),
                    description: extractCommentText(p.comment),
                    optional: !!(p.flags && p.flags.isOptional)
                }));
                const returnType = resolveTypeName(sig.type);
                const paramStr = params.map((p) => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ');
                const entry = {
                    name: m.name,
                    signature: `(${paramStr}) => ${returnType}`,
                    description: extractCommentText(sig.comment),
                    deprecated: getDeprecatedMessage(sig.comment),
                    sourceLine: (m.sources || [])[0]?.line || 0,
                    since: getSinceVersion(sig.comment),
                    parameters: params,
                    returnType
                };
                if (isInherited) {
                    inheritedMethods.push(entry);
                } else {
                    methods.push(entry);
                }
            }
        }

        if (inputs.length === 0 && outputs.length === 0 && methods.length === 0) {
            continue;
        }

        const model = {
            name,
            selector: extractSelector(comment, source.fileName),
            kind: detectClassKind(name),
            sourceFile: (source.fileName || '').split('/').pop() || '',
            sourceLine: source.line || 0,
            sourceUrl: source.url || '',
            description: extractCommentText(comment),
            inputs,
            outputs,
            methods,
            inherited:
                inheritedInputs.length > 0 || inheritedMethods.length > 0
                    ? { from: inheritedFrom || 'unknown', inputs: inheritedInputs, methods: inheritedMethods }
                    : null
        };

        writeFileSync(join(libOutputDir, child.name.toLowerCase() + '.json'), JSON.stringify(model, null, 2));
        count++;
    }

    console.log(`[api-json] Generated ${count} files for "${lib}"`);
}

// Run for all libraries that have typedoc.json
const libs = ['core', 'platform', 'cdk', 'btp', 'cx', 'i18n', 'datetime-adapter'];
const apiOutputDir = 'libs/docs/typedoc/api-json';

for (const lib of libs) {
    generateApiJson(`libs/docs/typedoc/${lib}/typedoc.json`, apiOutputDir, lib);
}
