import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/** TypeDoc JSON reflection kinds */
const KIND_CLASS = 128;
const KIND_PROPERTY = 1024;
const KIND_METHOD = 2048;
const KIND_ACCESSOR = 262144;

/** Signal type names from Angular */
const SIGNAL_INPUT_TYPES = new Set(['InputSignal', 'InputSignalWithTransform']);
const SIGNAL_OUTPUT_TYPES = new Set(['OutputEmitterRef']);
const DECORATOR_OUTPUT_TYPES = new Set(['EventEmitter', 'OutputRef']);
const MODEL_TYPES = new Set(['ModelSignal']);

/** Angular lifecycle hooks to filter out */
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

interface ApiModel {
    name: string;
    selector: string | null;
    kind: string;
    sourceFile: string;
    sourceLine: number;
    sourceUrl: string;
    description: string;
    inputs: ApiMember[];
    outputs: ApiMember[];
    methods: ApiMethodEntry[];
    inherited: { from: string; inputs: ApiMember[]; methods: ApiMethodEntry[] } | null;
}

interface ApiMember {
    name: string;
    type: string;
    default: string | null;
    description: string;
    isSignal: boolean;
    deprecated: string | null;
    sourceLine: number;
    since: string | null;
}

interface ApiMethodEntry {
    name: string;
    signature: string;
    description: string;
    deprecated: string | null;
    sourceLine: number;
    since: string | null;
    parameters: { name: string; type: string; description: string; optional: boolean }[];
    returnType: string;
}

/**
 * Generate per-class API JSON files from TypeDoc JSON output.
 * Reads `typedoc.json` from the given outputDir, and writes individual
 * JSON files to `{outputDir}/../api-json/{lib}/`.
 */
export function generateApiJson(typedocJsonPath: string, apiOutputDir: string, lib: string): void {
    if (!existsSync(typedocJsonPath)) {
        console.warn(`[api-json] TypeDoc JSON not found at ${typedocJsonPath}, skipping API JSON generation.`);
        return;
    }

    const raw = readFileSync(typedocJsonPath, 'utf-8');
    const project = JSON.parse(raw);

    const libOutputDir = join(apiOutputDir, lib);
    if (!existsSync(libOutputDir)) {
        mkdirSync(libOutputDir, { recursive: true });
    }

    const children = project.children || [];
    let count = 0;

    for (const child of children) {
        if (child.kind !== KIND_CLASS) {
            continue;
        }

        const model = extractClassApi(child);
        if (!model) {
            continue;
        }

        const filename = child.name.toLowerCase() + '.json';
        writeFileSync(join(libOutputDir, filename), JSON.stringify(model, null, 2));
        count++;
    }

    console.log(`[api-json] Generated ${count} API JSON files for "${lib}" in ${libOutputDir}`);
}

/**
 * Read a source file and extract sets of @Input() and @Output() property names.
 * This handles the case where TypeDoc doesn't report decorator metadata.
 */
function extractDecoratorInfoFromSource(sourceFileName?: string): {
    inputs: Set<string>;
    outputs: Set<string>;
} {
    const result = { inputs: new Set<string>(), outputs: new Set<string>() };
    if (!sourceFileName || !existsSync(sourceFileName)) {
        return result;
    }
    try {
        const src = readFileSync(sourceFileName, 'utf-8');
        const inputRe = /@Input\s*\([^)]*\)\s*(?:(?:set|get)\s+)?(\w+)/g;
        let match;
        while ((match = inputRe.exec(src)) !== null) {
            result.inputs.add(match[1]);
        }
        const outputRe = /@Output\s*\([^)]*\)\s*(?:readonly\s+)?(\w+)/g;
        while ((match = outputRe.exec(src)) !== null) {
            result.outputs.add(match[1]);
        }
    } catch {
        // ignore
    }
    return result;
}

function extractClassApi(classReflection: any): ApiModel | null {
    const name: string = classReflection.name;
    const members = classReflection.children || [];
    const comment = classReflection.comment;
    const sources = classReflection.sources || [];
    const source = sources[0] || {};

    const kind = detectClassKind(name);
    const selector = extractSelector(comment, source.fileName);
    const description = extractCommentText(comment);

    const inputs: ApiMember[] = [];
    const outputs: ApiMember[] = [];
    const methods: ApiMethodEntry[] = [];
    const inheritedInputs: ApiMember[] = [];
    const inheritedMethods: ApiMethodEntry[] = [];
    let inheritedFrom: string | null = null;

    // Extract @Input/@Output from source file for decorator-based properties
    const decoratorInfo = extractDecoratorInfoFromSource(source.fileName);

    for (const member of members) {
        const memberName: string = member.name;
        const isInherited = !!member.inheritedFrom;

        if (isInherited && member.inheritedFrom?.name) {
            const fromParts = member.inheritedFrom.name.split('.');
            inheritedFrom = inheritedFrom || fromParts[0];
        }

        if (member.kind === KIND_PROPERTY) {
            const typeName = member.type?.name || '';

            if (SIGNAL_INPUT_TYPES.has(typeName)) {
                const apiMember = extractInputMember(member, true);
                if (isInherited) {
                    inheritedInputs.push(apiMember);
                } else {
                    inputs.push(apiMember);
                }
            } else if (SIGNAL_OUTPUT_TYPES.has(typeName)) {
                const apiMember = extractOutputMember(member, true);
                if (isInherited) {
                    // outputs in inherited section count as inputs section for simplicity
                } else {
                    outputs.push(apiMember);
                }
            } else if (DECORATOR_OUTPUT_TYPES.has(typeName)) {
                const apiMember = extractOutputMember(member, false);
                if (isInherited) {
                    // skip inherited outputs
                } else {
                    outputs.push(apiMember);
                }
            } else if (MODEL_TYPES.has(typeName)) {
                // model() counts as both input and output
                const apiMember = extractInputMember(member, true);
                if (!isInherited) {
                    inputs.push(apiMember);
                    outputs.push({
                        ...apiMember,
                        name: apiMember.name + 'Change',
                        type: `EventEmitter<${apiMember.type}>`
                    });
                }
            } else if (decoratorInfo.inputs.has(memberName)) {
                // Decorator-based @Input() property
                const apiMember: ApiMember = {
                    name: memberName,
                    type: resolveTypeName(member.type),
                    default: member.defaultValue && member.defaultValue !== '...' ? member.defaultValue : null,
                    description: extractCommentText(member.comment),
                    isSignal: false,
                    deprecated: getDeprecatedMessage(member.comment),
                    sourceLine: member.sources?.[0]?.line || 0,
                    since: getSinceVersion(member.comment)
                };
                if (isInherited) {
                    inheritedInputs.push(apiMember);
                } else {
                    inputs.push(apiMember);
                }
            } else if (decoratorInfo.outputs.has(memberName)) {
                // Decorator-based @Output() property
                if (!isInherited) {
                    outputs.push({
                        name: memberName,
                        type: resolveTypeName(member.type?.typeArguments?.[0] || member.type),
                        default: null,
                        description: extractCommentText(member.comment),
                        isSignal: false,
                        deprecated: getDeprecatedMessage(member.comment),
                        sourceLine: member.sources?.[0]?.line || 0,
                        since: getSinceVersion(member.comment)
                    });
                }
            }
        } else if (member.kind === KIND_METHOD) {
            if (LIFECYCLE_HOOKS.has(memberName)) {
                continue;
            }
            // Skip private/protected
            if (member.flags?.isPrivate || member.flags?.isProtected) {
                continue;
            }

            const method = extractMethod(member);
            if (method) {
                if (isInherited) {
                    inheritedMethods.push(method);
                } else {
                    methods.push(method);
                }
            }
        } else if (member.kind === KIND_ACCESSOR) {
            // Accessors with @Input decorator (legacy pattern)
            const getSignature = member.getSignature;
            const setSignature = member.setSignature;
            const decorators = [
                ...(getSignature?.decorators || []),
                ...(setSignature?.decorators || []),
                ...(member.decorators || [])
            ];
            const decoratorNames = decorators.map((d: any) => d.name);

            if (decoratorNames.includes('Input')) {
                const apiMember = extractAccessorInput(member);
                if (isInherited) {
                    inheritedInputs.push(apiMember);
                } else {
                    inputs.push(apiMember);
                }
            } else if (decoratorNames.includes('Output')) {
                const apiMember = extractAccessorOutput(member);
                if (!isInherited) {
                    outputs.push(apiMember);
                }
            }
        }
    }

    // Only generate API for classes that have inputs, outputs, or methods
    if (inputs.length === 0 && outputs.length === 0 && methods.length === 0) {
        return null;
    }

    const inherited =
        inheritedInputs.length > 0 || inheritedMethods.length > 0
            ? { from: inheritedFrom || 'unknown', inputs: inheritedInputs, methods: inheritedMethods }
            : null;

    return {
        name,
        selector,
        kind,
        sourceFile: source.fileName?.split('/').pop() || '',
        sourceLine: source.line || 0,
        sourceUrl: source.url || '',
        description,
        inputs,
        outputs,
        methods,
        inherited
    };
}

function detectClassKind(name: string): string {
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

function extractSelector(comment: any, sourceFileName?: string): string | null {
    if (comment) {
        // Check blockTags for @selector
        const blockTags = comment.blockTags || [];
        for (const tag of blockTags) {
            if (tag.tag === '@selector') {
                return extractTagText(tag.content);
            }
        }
        // Try to find selector in the summary text
        const summaryText = extractCommentText(comment);
        const selectorMatch = summaryText.match(/selector:\s*`?([^`\n]+)`?/i);
        if (selectorMatch) {
            return selectorMatch[1].trim();
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

function extractCommentText(comment: any): string {
    if (!comment) {
        return '';
    }
    const summary = comment.summary || [];
    return summary
        .map((part: any) => {
            if (part.kind === 'text') {
                return part.text;
            }
            if (part.kind === 'code') {
                return part.text;
            }
            if (part.kind === 'inline-tag' && part.text) {
                return part.text;
            }
            return '';
        })
        .join('')
        .trim();
}

function extractTagText(content: any[]): string {
    if (!content) {
        return '';
    }
    return content
        .map((part: any) => {
            if (part.kind === 'text') {
                return part.text;
            }
            if (part.kind === 'code') {
                return part.text;
            }
            return '';
        })
        .join('')
        .trim();
}

function getDeprecatedMessage(comment: any): string | null {
    if (!comment) {
        return null;
    }
    const blockTags = comment.blockTags || [];
    for (const tag of blockTags) {
        if (tag.tag === '@deprecated') {
            const text = extractTagText(tag.content);
            return text || 'Deprecated';
        }
    }
    const modifierTags = comment.modifierTags || [];
    if (modifierTags.includes('@deprecated')) {
        return 'Deprecated';
    }
    return null;
}

function getSinceVersion(comment: any): string | null {
    if (!comment) {
        return null;
    }
    const blockTags = comment.blockTags || [];
    for (const tag of blockTags) {
        if (tag.tag === '@since') {
            return extractTagText(tag.content) || null;
        }
    }
    return null;
}

function resolveTypeName(typeObj: any): string {
    if (!typeObj) {
        return 'unknown';
    }

    switch (typeObj.type) {
        case 'intrinsic':
            return typeObj.name;
        case 'literal':
            if (typeObj.value === null) {
                return 'null';
            }
            if (typeof typeObj.value === 'string') {
                return `'${typeObj.value}'`;
            }
            return String(typeObj.value);
        case 'reference':
            if (typeObj.typeArguments?.length) {
                const args = typeObj.typeArguments.map(resolveTypeName).join(', ');
                return `${typeObj.name}<${args}>`;
            }
            return typeObj.name;
        case 'union':
            return typeObj.types
                .map(resolveTypeName)
                .filter((t: string) => t !== 'undefined')
                .join(' | ');
        case 'intersection':
            return typeObj.types.map(resolveTypeName).join(' & ');
        case 'array':
            return `${resolveTypeName(typeObj.elementType)}[]`;
        case 'reflection':
            return formatReflectionType(typeObj);
        case 'tuple':
            if (typeObj.elements) {
                return `[${typeObj.elements.map(resolveTypeName).join(', ')}]`;
            }
            return 'unknown';
        case 'mapped':
            return 'Record<string, unknown>';
        case 'predicate':
            return `${typeObj.name} is ${resolveTypeName(typeObj.targetType)}`;
        case 'conditional':
            return resolveTypeName(typeObj.trueType);
        case 'indexedAccess':
            return `${resolveTypeName(typeObj.objectType)}[${resolveTypeName(typeObj.indexType)}]`;
        case 'typeOperator':
            return `${typeObj.operator} ${resolveTypeName(typeObj.target)}`;
        case 'query':
            return `typeof ${resolveTypeName(typeObj.queryType)}`;
        case 'templateLiteral':
            return 'string';
        default:
            return typeObj.name || 'unknown';
    }
}

function formatReflectionType(typeObj: any): string {
    const decl = typeObj.declaration;
    if (!decl) {
        return 'object';
    }

    // Function signature
    if (decl.signatures) {
        const sig = decl.signatures[0];
        const params = (sig.parameters || []).map((p: any) => `${p.name}: ${resolveTypeName(p.type)}`).join(', ');
        const ret = resolveTypeName(sig.type);
        return `(${params}) => ${ret}`;
    }

    // Object literal
    if (decl.children) {
        const fields = decl.children
            .slice(0, 5)
            .map((c: any) => `${c.name}: ${resolveTypeName(c.type)}`)
            .join('; ');
        const suffix = decl.children.length > 5 ? '; ...' : '';
        return `{ ${fields}${suffix} }`;
    }

    return 'object';
}

function extractInputType(member: any): string {
    const typeObj = member.type;
    if (!typeObj) {
        return 'unknown';
    }

    // For InputSignal<T> or InputSignalWithTransform<T, U>, extract T
    if (typeObj.typeArguments?.length > 0) {
        const innerType = typeObj.typeArguments[0];
        return resolveTypeName(innerType);
    }

    return resolveTypeName(typeObj);
}

function extractOutputType(member: any): string {
    const typeObj = member.type;
    if (!typeObj) {
        return 'void';
    }

    // For EventEmitter<T> or OutputEmitterRef<T>, extract T
    if (typeObj.typeArguments?.length > 0) {
        return resolveTypeName(typeObj.typeArguments[0]);
    }

    return 'void';
}

function extractInputMember(member: any, isSignal: boolean): ApiMember {
    return {
        name: member.name,
        type: extractInputType(member),
        default: member.defaultValue && member.defaultValue !== '...' ? member.defaultValue : null,
        description: extractCommentText(member.comment),
        isSignal,
        deprecated: getDeprecatedMessage(member.comment),
        sourceLine: member.sources?.[0]?.line || 0,
        since: getSinceVersion(member.comment)
    };
}

function extractOutputMember(member: any, isSignal: boolean): ApiMember {
    return {
        name: member.name,
        type: extractOutputType(member),
        default: null,
        description: extractCommentText(member.comment),
        isSignal,
        deprecated: getDeprecatedMessage(member.comment),
        sourceLine: member.sources?.[0]?.line || 0,
        since: getSinceVersion(member.comment)
    };
}

function extractAccessorInput(member: any): ApiMember {
    const getSignature = member.getSignature;
    const setSignature = member.setSignature;
    const comment = getSignature?.comment || setSignature?.comment || member.comment;
    const type = getSignature?.type || setSignature?.parameters?.[0]?.type;

    return {
        name: member.name,
        type: resolveTypeName(type),
        default: member.defaultValue && member.defaultValue !== '...' ? member.defaultValue : null,
        description: extractCommentText(comment),
        isSignal: false,
        deprecated: getDeprecatedMessage(comment),
        sourceLine: member.sources?.[0]?.line || 0,
        since: getSinceVersion(comment)
    };
}

function extractAccessorOutput(member: any): ApiMember {
    const getSignature = member.getSignature;
    const comment = getSignature?.comment || member.comment;
    const type = getSignature?.type;

    return {
        name: member.name,
        type: resolveTypeName(type?.typeArguments?.[0]),
        default: null,
        description: extractCommentText(comment),
        isSignal: false,
        deprecated: getDeprecatedMessage(comment),
        sourceLine: member.sources?.[0]?.line || 0,
        since: getSinceVersion(comment)
    };
}

function extractMethod(member: any): ApiMethodEntry | null {
    const signatures = member.signatures;
    if (!signatures || signatures.length === 0) {
        return null;
    }

    const sig = signatures[0];
    const params = (sig.parameters || []).map((p: any) => ({
        name: p.name,
        type: resolveTypeName(p.type),
        description: extractCommentText(p.comment),
        optional: !!p.flags?.isOptional
    }));

    const returnType = resolveTypeName(sig.type);
    const paramStr = params.map((p: any) => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ');
    const signature = `(${paramStr}) => ${returnType}`;

    return {
        name: member.name,
        signature,
        description: extractCommentText(sig.comment),
        deprecated: getDeprecatedMessage(sig.comment),
        sourceLine: member.sources?.[0]?.line || 0,
        since: getSinceVersion(sig.comment),
        parameters: params,
        returnType
    };
}
