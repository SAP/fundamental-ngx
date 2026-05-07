import { readFile } from 'fs/promises';
import { resolve } from 'path';
import {
    ComponentMetadata,
    InputMetadata,
    Library,
    MethodMetadata,
    MethodParam,
    OutputMetadata
} from '../types/component-metadata';

// ---------------------------------------------------------------------------
// TypeDoc JSON shape (minimal subset we need)
// ---------------------------------------------------------------------------

/** TypeDoc reflection kinds we care about. */
const enum ReflectionKind {
    Class = 128,
    Property = 1024,
    Method = 2048,
    CallSignature = 4096,
    Parameter = 32768
}

/** Signal / observable wrapper names recognised as Angular inputs. */
const INPUT_TYPE_NAMES = new Set(['InputSignal', 'InputSignalWithTransform']);

/** Signal / observable wrapper names recognised as Angular outputs. */
const OUTPUT_TYPE_NAMES = new Set(['OutputEmitterRef', 'EventEmitter']);

/** Signal wrapper name for two-way bound model inputs. */
const MODEL_TYPE_NAME = 'ModelSignal';

// Minimal TypeDoc interfaces —— only the fields we actually read.

interface TypeDocRoot {
    children?: TypeDocDeclaration[];
}

interface TypeDocDeclaration {
    id?: number;
    name: string;
    kind: number;
    flags?: TypeDocFlags;
    comment?: TypeDocComment;
    children?: TypeDocDeclaration[];
    sources?: TypeDocSource[];
    signatures?: TypeDocSignature[];
    type?: TypeDocType;
    defaultValue?: string;
    extendedTypes?: TypeDocType[];
    implementedTypes?: TypeDocType[];
}

interface TypeDocFlags {
    isReadonly?: boolean;
    isProtected?: boolean;
    isPrivate?: boolean;
    isOptional?: boolean;
    isAbstract?: boolean;
    isStatic?: boolean;
}

interface TypeDocComment {
    summary?: TypeDocCommentPart[];
    blockTags?: TypeDocBlockTag[];
}

interface TypeDocCommentPart {
    kind: string; // "text" | "code" | "inline-tag"
    text: string;
}

interface TypeDocBlockTag {
    tag: string; // e.g. "@selector", "@deprecated", "@returns"
    content?: TypeDocCommentPart[];
}

interface TypeDocSource {
    fileName: string;
    line: number;
    character: number;
    url?: string;
}

interface TypeDocSignature {
    name: string;
    kind: number;
    flags?: TypeDocFlags;
    comment?: TypeDocComment;
    parameters?: TypeDocParameter[];
    type?: TypeDocType;
}

interface TypeDocParameter {
    name: string;
    kind: number;
    flags?: TypeDocFlags;
    comment?: TypeDocComment;
    type?: TypeDocType;
}

interface TypeDocType {
    type: string; // "intrinsic" | "reference" | "union" | "literal" | "array" | "reflection"
    name?: string;
    value?: unknown;
    types?: TypeDocType[];
    typeArguments?: TypeDocType[];
    elementType?: TypeDocType;
    target?: unknown;
    package?: string;
    declaration?: TypeDocDeclaration;
}

// ---------------------------------------------------------------------------
// Library configuration
// ---------------------------------------------------------------------------

interface LibraryConfig {
    relativePath: string;
    library: Library;
    prefix: string;
}

const TYPEDOC_LIBRARIES: LibraryConfig[] = [
    { relativePath: 'libs/docs/typedoc/core/typedoc.json', library: '@fundamental-ngx/core', prefix: 'fd' },
    { relativePath: 'libs/docs/typedoc/platform/typedoc.json', library: '@fundamental-ngx/platform', prefix: 'fdp' },
    { relativePath: 'libs/docs/typedoc/btp/typedoc.json', library: '@fundamental-ngx/btp', prefix: 'fdb' },
    { relativePath: 'libs/docs/typedoc/cx/typedoc.json', library: '@fundamental-ngx/cx', prefix: 'cx' },
    { relativePath: 'libs/docs/typedoc/cdk/typedoc.json', library: '@fundamental-ngx/cdk', prefix: 'fdk' }
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Extract component metadata from a single TypeDoc JSON file.
 *
 * @param typeDocPath Absolute path to the typedoc.json file.
 * @param library     The `@fundamental-ngx/*` library identifier.
 * @param basePath    Absolute repo root path. When provided, selectors are read
 *                    from the actual Angular source files, preserving bracket syntax
 *                    for attribute directives (e.g. `[fd-form-item]`). Omit in tests.
 * @returns An array of {@link ComponentMetadata} for every public Component / Directive class found.
 */
export async function extractFromTypeDoc(
    typeDocPath: string,
    library: Library,
    basePath?: string
): Promise<ComponentMetadata[]> {
    const prefix = TYPEDOC_LIBRARIES.find((l) => l.library === library)?.prefix ?? 'fd';
    const raw = await readFile(typeDocPath, 'utf-8');
    const root: TypeDocRoot = JSON.parse(raw);

    const results: ComponentMetadata[] = [];

    for (const declaration of root.children ?? []) {
        if (!isComponentOrDirective(declaration)) {
            continue;
        }

        const metadata = await extractClassMetadata(declaration, library, prefix, basePath);
        if (metadata) {
            results.push(metadata);
        }
    }

    return results;
}

/**
 * Extract component metadata from all five Angular TypeDoc libraries.
 *
 * @param basePath Absolute path to the repository root.
 * @returns Combined metadata from core, platform, btp, cx, and cdk.
 */
export async function extractAllTypeDocComponents(basePath: string): Promise<ComponentMetadata[]> {
    const allComponents: ComponentMetadata[] = [];

    for (const config of TYPEDOC_LIBRARIES) {
        const fullPath = resolve(basePath, config.relativePath);
        try {
            const components = await extractFromTypeDoc(fullPath, config.library, basePath);
            allComponents.push(...components);
        } catch {
            // TypeDoc JSON may not exist for a library — skip silently.
        }
    }

    return allComponents;
}

// ---------------------------------------------------------------------------
// Class-level extraction
// ---------------------------------------------------------------------------

/**
 * Determine whether a TypeDoc declaration represents a public Component or Directive class.
 */
function isComponentOrDirective(decl: TypeDocDeclaration): boolean {
    if (decl.kind !== ReflectionKind.Class) {
        return false;
    }

    const name = decl.name;

    // Skip internal / private classes.
    if (name.startsWith('_') || decl.flags?.isPrivate || decl.flags?.isProtected) {
        return false;
    }

    return name.endsWith('Component') || name.endsWith('Directive');
}

/**
 * Build a {@link ComponentMetadata} from a TypeDoc class declaration.
 */
async function extractClassMetadata(
    decl: TypeDocDeclaration,
    library: Library,
    prefix: string,
    basePath?: string
): Promise<ComponentMetadata | null> {
    const sourceFile = decl.sources?.[0]?.fileName;
    const description = flattenComment(decl.comment);
    const selector = await resolveSelector(decl, prefix, sourceFile, basePath);
    const category = inferCategory(sourceFile, library);

    const inputs: InputMetadata[] = [];
    const outputs: OutputMetadata[] = [];
    const methods: MethodMetadata[] = [];

    for (const member of decl.children ?? []) {
        if (isPrivateOrProtected(member)) {
            continue;
        }

        if (member.kind === ReflectionKind.Property) {
            classifyProperty(member, inputs, outputs);
        } else if (member.kind === ReflectionKind.Method) {
            const method = extractMethod(member);
            if (method) {
                methods.push(method);
            }
        }
    }

    return {
        name: decl.name,
        selector,
        library,
        category,
        description:
            description || generateFallbackDescription(decl.name, selector, category, inputs, outputs, methods),
        deprecated: extractDeprecation(decl.comment),
        inputs,
        outputs,
        slots: [], // Angular components don't declare named slots in TypeDoc
        methods,
        cssProperties: [], // Not available from TypeDoc
        sourceFile,
        source: 'typedoc'
    };
}

// ---------------------------------------------------------------------------
// Property classification (inputs vs outputs vs skip)
// ---------------------------------------------------------------------------

/**
 * Classify a property declaration as an input, output, or neither,
 * and push it into the corresponding array.
 */
function classifyProperty(member: TypeDocDeclaration, inputs: InputMetadata[], outputs: OutputMetadata[]): void {
    const typeName = member.type?.name;

    // --- Signal inputs: InputSignal<T> / InputSignalWithTransform<T, U> ---
    if (typeName && INPUT_TYPE_NAMES.has(typeName)) {
        inputs.push(buildSignalInput(member));
        return;
    }

    // --- Model signals: ModelSignal<T> (two-way binding — counted as input AND output) ---
    if (typeName === MODEL_TYPE_NAME) {
        inputs.push(buildModelInput(member));
        outputs.push(buildModelOutput(member));
        return;
    }

    // --- Signal outputs: OutputEmitterRef<T> / legacy EventEmitter<T> ---
    if (typeName && OUTPUT_TYPE_NAMES.has(typeName)) {
        outputs.push(buildOutput(member));
        return;
    }

    // --- Legacy @Input() properties (plain typed, non-readonly, public) ---
    // Heuristic: not a signal, not an output, not readonly (unless explicitly set),
    // and not a complex service / observer type that happens to be public.
    if (isLikelyLegacyInput(member)) {
        inputs.push(buildLegacyInput(member));
    }
}

/**
 * Build an {@link InputMetadata} from a signal input property
 * (`InputSignal<T>` or `InputSignalWithTransform<T, U>`).
 */
function buildSignalInput(member: TypeDocDeclaration): InputMetadata {
    const innerType = member.type?.typeArguments?.[0];
    const typeStr = innerType ? formatType(innerType) : 'unknown';
    const description = flattenComment(member.comment);
    const enumValues = innerType ? extractEnumValues(innerType) : undefined;

    return {
        name: member.name,
        type: typeStr,
        description,
        required: isRequiredInput(innerType),
        enumValues: enumValues?.length ? enumValues : undefined,
        deprecated: extractDeprecation(member.comment)
    };
}

/**
 * Build an {@link InputMetadata} from a `ModelSignal<T>` property.
 */
function buildModelInput(member: TypeDocDeclaration): InputMetadata {
    const innerType = member.type?.typeArguments?.[0];
    const typeStr = innerType ? formatType(innerType) : 'unknown';

    return {
        name: member.name,
        type: typeStr,
        description: flattenComment(member.comment),
        required: false,
        deprecated: extractDeprecation(member.comment)
    };
}

/**
 * Build an {@link OutputMetadata} for the "Change" event emitted by a `ModelSignal<T>`.
 * Angular model signals automatically emit `<name>Change` events.
 */
function buildModelOutput(member: TypeDocDeclaration): OutputMetadata {
    const innerType = member.type?.typeArguments?.[0];
    const typeStr = innerType ? formatType(innerType) : 'unknown';

    return {
        name: `${member.name}Change`,
        type: typeStr,
        description: `Emitted when \`${member.name}\` changes (two-way binding).`,
        deprecated: extractDeprecation(member.comment)
    };
}

/**
 * Build an {@link OutputMetadata} from an `OutputEmitterRef<T>` or `EventEmitter<T>`.
 */
function buildOutput(member: TypeDocDeclaration): OutputMetadata {
    const innerType = member.type?.typeArguments?.[0];
    const typeStr = innerType ? formatType(innerType) : 'void';

    return {
        name: member.name,
        type: typeStr,
        description: flattenComment(member.comment),
        deprecated: extractDeprecation(member.comment)
    };
}

/**
 * Build an {@link InputMetadata} from a legacy `@Input()` property.
 */
function buildLegacyInput(member: TypeDocDeclaration): InputMetadata {
    const typeStr = member.type ? formatType(member.type) : 'unknown';
    const defaultValue = member.defaultValue && member.defaultValue !== '...' ? member.defaultValue : undefined;

    return {
        name: member.name,
        type: typeStr,
        defaultValue,
        description: flattenComment(member.comment),
        required: !member.flags?.isOptional && defaultValue === undefined,
        deprecated: extractDeprecation(member.comment)
    };
}

/**
 * Heuristic to detect legacy `@Input()` properties.
 *
 * These are plain-typed public properties that are not outputs, not readonly service
 * injections, and not Angular lifecycle / internal fields.
 */
function isLikelyLegacyInput(member: TypeDocDeclaration): boolean {
    // Skip readonly properties — they are typically injected services or computed fields.
    // Exception: signal inputs are readonly but handled before this check.
    if (member.flags?.isReadonly) {
        return false;
    }

    // Skip static members.
    if (member.flags?.isStatic) {
        return false;
    }

    const typeType = member.type?.type;
    const typeName = member.type?.name;

    // Skip reflection types (callback signatures, object shapes) — rarely inputs.
    if (typeType === 'reflection') {
        // Allow simple callback-style properties that could be @Input() (e.g. displayFn).
        // But skip complex declarations without a defaultValue (likely internal).
        if (!member.defaultValue) {
            return false;
        }
    }

    // Skip known non-input reference types (services, observables, etc.).
    if (typeName && isInternalReferenceName(typeName)) {
        return false;
    }

    // Must have a basic type (intrinsic, reference, union, literal, array).
    return (
        typeType === 'intrinsic' ||
        typeType === 'reference' ||
        typeType === 'union' ||
        typeType === 'literal' ||
        typeType === 'array' ||
        typeType === 'reflection'
    );
}

/** Reference type names that indicate internal / injected dependencies, not inputs. */
const INTERNAL_REFERENCE_NAMES = new Set([
    'Observable',
    'Subject',
    'BehaviorSubject',
    'Subscription',
    'TemplateRef',
    'ElementRef',
    'ViewContainerRef',
    'ChangeDetectorRef',
    'ContentDensityObserver',
    'DestroyRef',
    'Injector',
    'NgZone',
    'Renderer2',
    'FormControl',
    'FormGroup',
    'QueryList'
]);

function isInternalReferenceName(name: string): boolean {
    return INTERNAL_REFERENCE_NAMES.has(name);
}

// ---------------------------------------------------------------------------
// Method extraction
// ---------------------------------------------------------------------------

/**
 * Extract a {@link MethodMetadata} from a TypeDoc method declaration.
 * Returns `null` if the method should be skipped (lifecycle hooks, internal, etc.).
 */
function extractMethod(member: TypeDocDeclaration): MethodMetadata | null {
    if (isPrivateOrProtected(member)) {
        return null;
    }

    const sig = member.signatures?.[0];
    if (!sig) {
        return null;
    }

    const name = member.name;

    // Skip Angular lifecycle hooks — they are implementation details.
    if (isLifecycleHook(name)) {
        return null;
    }

    // Skip internal methods (prefixed with underscore).
    if (name.startsWith('_')) {
        return null;
    }

    const description = flattenComment(sig.comment);
    const returnType = sig.type ? formatType(sig.type) : 'void';

    const params: MethodParam[] = (sig.parameters ?? []).map((p) => ({
        name: p.name,
        type: p.type ? formatType(p.type) : 'unknown',
        description: flattenComment(p.comment),
        optional: p.flags?.isOptional ?? false
    }));

    return { name, returnType, description, params, deprecated: extractDeprecation(sig.comment) };
}

const LIFECYCLE_HOOKS = new Set([
    'ngOnInit',
    'ngOnDestroy',
    'ngOnChanges',
    'ngDoCheck',
    'ngAfterContentInit',
    'ngAfterContentChecked',
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'ngAfterRender',
    'ngAfterNextRender'
]);

function isLifecycleHook(name: string): boolean {
    return LIFECYCLE_HOOKS.has(name);
}

// ---------------------------------------------------------------------------
// Type formatting
// ---------------------------------------------------------------------------

/**
 * Recursively format a TypeDoc type object into a human-readable TypeScript string.
 */
function formatType(type: TypeDocType): string {
    switch (type.type) {
        case 'intrinsic':
            return type.name ?? 'unknown';

        case 'literal':
            if (type.value === null) {
                return 'null';
            }
            if (typeof type.value === 'string') {
                return `'${type.value}'`;
            }
            return String(type.value);

        case 'union':
            return (type.types ?? []).map(formatType).join(' | ');

        case 'array':
            if (type.elementType) {
                const inner = formatType(type.elementType);
                // Wrap union types in parens for readability: (A | B)[]
                return inner.includes('|') ? `(${inner})[]` : `${inner}[]`;
            }
            return 'unknown[]';

        case 'reference': {
            const refName = type.name ?? 'unknown';

            // Unwrap Angular signal wrappers to expose the inner type.
            if (INPUT_TYPE_NAMES.has(refName) || refName === MODEL_TYPE_NAME) {
                return type.typeArguments?.[0] ? formatType(type.typeArguments[0]) : 'unknown';
            }
            if (OUTPUT_TYPE_NAMES.has(refName)) {
                return type.typeArguments?.[0] ? formatType(type.typeArguments[0]) : 'void';
            }

            // Generic reference with type arguments: Map<K, V>, Nullable<T>, etc.
            if (type.typeArguments?.length) {
                const args = type.typeArguments.map(formatType).join(', ');
                return `${refName}<${args}>`;
            }

            return refName;
        }

        case 'reflection': {
            // Attempt to render a simple function signature: (a: T) => R
            const sig = type.declaration?.signatures?.[0];
            if (sig) {
                const params = (sig.parameters ?? [])
                    .map((p) => `${p.name}: ${p.type ? formatType(p.type) : 'unknown'}`)
                    .join(', ');
                const ret = sig.type ? formatType(sig.type) : 'void';
                return `(${params}) => ${ret}`;
            }
            return 'object';
        }

        default:
            return type.name ?? 'unknown';
    }
}

/**
 * For union types whose members are all string literals, extract them as enum values.
 */
function extractEnumValues(type: TypeDocType): string[] | undefined {
    if (type.type !== 'union' || !type.types) {
        return undefined;
    }

    const literals: string[] = [];

    for (const t of type.types) {
        if (t.type === 'literal' && typeof t.value === 'string') {
            literals.push(t.value);
        }
    }

    // Only return if all non-null/undefined members are string literals.
    const nonNullMembers = type.types.filter(
        (t) => !(t.type === 'intrinsic' && t.name === 'undefined') && !(t.type === 'literal' && t.value === null)
    );

    if (nonNullMembers.length > 0 && literals.length === nonNullMembers.length) {
        return literals;
    }

    return undefined;
}

/**
 * Determine whether a signal input is required (has no `undefined` in its type union).
 */
function isRequiredInput(innerType: TypeDocType | undefined): boolean {
    if (!innerType) {
        return false;
    }

    // If the inner type is a union containing undefined or null, it is optional.
    if (innerType.type === 'union' && innerType.types) {
        return !innerType.types.some(
            (t) => (t.type === 'intrinsic' && t.name === 'undefined') || (t.type === 'literal' && t.value === null)
        );
    }

    // Scalar type with no defaults — technically required unless the signal has a default.
    // Since TypeDoc shows `...` for signal defaults, we cannot distinguish; default to false.
    return false;
}

// ---------------------------------------------------------------------------
// Selector derivation
// ---------------------------------------------------------------------------

/**
 * Resolve the CSS selector for a Component or Directive.
 *
 * Strategy (in priority order):
 * 1. `@selector` block tag in the JSDoc comment.
 * 2. Read `selector:` directly from the Angular `@Component`/`@Directive` decorator
 *    in the source `.ts` file. This preserves the exact value including bracket syntax
 *    for attribute directives (e.g. `[fd-form-item]`, `input[fd-form-control]`).
 *    Only attempted when `basePath` is provided.
 * 3. Inline `` selector: ... `` in the comment summary text.
 * 4. Derived from the class name using the library prefix convention.
 */
async function resolveSelector(
    decl: TypeDocDeclaration,
    prefix: string,
    sourceFile: string | undefined,
    basePath?: string
): Promise<string> {
    // 1. @selector block tag.
    const selectorTag = decl.comment?.blockTags?.find((t) => t.tag === '@selector');
    if (selectorTag?.content?.length) {
        const tagText = selectorTag.content
            .map((c) => c.text)
            .join('')
            .trim();
        if (tagText) {
            return tagText;
        }
    }

    // 2. Read selector from the Angular decorator in the source file.
    if (basePath !== undefined && sourceFile) {
        const fullPath = resolve(basePath, sourceFile);
        try {
            const content = await readFile(fullPath, 'utf-8');
            const fromSource = extractSelectorFromSource(content, decl.name);
            if (fromSource) {
                return fromSource;
            }
        } catch {
            // File not found or unreadable — fall through.
        }
    }

    // 3. Parse from inline comment: ``` selector: ... ```
    //    Only match when the text appears inside backtick fences (not in example code blocks).
    const commentText = flattenComment(decl.comment);
    const selectorMatch = commentText.match(/```\s*selector:\s*([^`]+)```/);
    if (selectorMatch) {
        // Trim trailing whitespace and stray formatting artifacts.
        return selectorMatch[1].trim();
    }

    // 4. Derive from class name.
    return deriveSelectorFromClassName(decl.name, prefix);
}

/**
 * Extract the `selector` value from an Angular `@Component` or `@Directive` decorator
 * in the source file that defines `className`.
 *
 * Finds the class declaration, then searches backwards through the preceding ~2 KB of
 * source text for the last `selector: '...'` assignment. This correctly handles
 * multi-line decorators and preserves the full selector string including brackets
 * (e.g. `[fd-form-item]`, `input[fd-form-control], textarea[fd-form-control]`).
 */
function extractSelectorFromSource(content: string, className: string): string | null {
    const classIndex = content.search(new RegExp(`\\bclass\\s+${className}\\b`));
    if (classIndex === -1) {
        return null;
    }

    // Look at the 2000 chars before the class keyword — the decorator lives there.
    const decoratorSection = content.slice(Math.max(0, classIndex - 2000), classIndex);

    // Match selector: '...' or selector: "..." or selector: `...`
    const matches = [...decoratorSection.matchAll(/selector:\s*['"`]([^'"`]+)['"`]/g)];
    if (matches.length === 0) {
        return null;
    }

    // Take the last match (closest to the class declaration).
    return matches[matches.length - 1][1].trim();
}

/**
 * Derive a CSS selector from a class name.
 *
 * Examples:
 * - `ButtonComponent`          -> `fd-button`          (prefix "fd")
 * - `ActionBarComponent`       -> `fd-action-bar`      (prefix "fd")
 * - `ActionListItemComponent`  -> `fdp-action-list-item` (prefix "fdp")
 * - `AutoCompleteDirective`    -> `[fdk-auto-complete]` (prefix "fdk")
 * - `CardTitleDirective`       -> `[fd-card-title]`    (prefix "fd")
 *
 * The class name is converted from PascalCase to kebab-case, with the
 * `Component` / `Directive` suffix stripped and the library prefix prepended.
 * Classes ending with `Directive` produce attribute selectors (wrapped in brackets).
 */
function deriveSelectorFromClassName(className: string, prefix: string): string {
    const isDirective = className.endsWith('Directive');

    // Strip Component / Directive suffix.
    const baseName = className.replace(/Component$|Directive$/, '');

    // PascalCase -> kebab-case.
    const kebab = baseName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    const elementSelector = `${prefix}-${kebab}`;

    return isDirective ? `[${elementSelector}]` : elementSelector;
}

// ---------------------------------------------------------------------------
// Category inference
// ---------------------------------------------------------------------------

/**
 * Infer a functional category from the source file path.
 *
 * For `libs/core/button/button.component.ts` → `"button"`
 * For `libs/platform/list/action-list-item/action-list-item.component.ts` → `"list"`
 *
 * Falls back to the library short name (e.g. `"core"`) when the path structure is unexpected.
 */
function inferCategory(sourceFile: string | undefined, library: Library): string {
    if (!sourceFile) {
        return libraryShortName(library);
    }

    // Expected pattern: libs/<library-dir>/<category>/...
    const parts = sourceFile.split('/');
    // parts[0] = "libs", parts[1] = library dir, parts[2] = category
    if (parts.length >= 3 && parts[0] === 'libs') {
        const category = parts[2];
        // Avoid returning overly generic folders like "utils" or "directives"
        if (category && category !== 'utils' && category !== 'directives' && category !== 'src') {
            return category;
        }
    }

    return libraryShortName(library);
}

/** Extract the short name from a full library identifier. */
function libraryShortName(library: Library): string {
    // '@fundamental-ngx/core' → 'core'
    return library.split('/').pop() ?? library;
}

// ---------------------------------------------------------------------------
// Comment helpers
// ---------------------------------------------------------------------------

/**
 * Flatten a TypeDoc comment into a single markdown string.
 * Concatenates all `summary` parts and preserves code blocks.
 */
function flattenComment(comment: TypeDocComment | undefined): string {
    if (!comment?.summary?.length) {
        return '';
    }

    return comment.summary
        .map((part) => part.text)
        .join('')
        .trim();
}

/**
 * Extract the `@deprecated` block tag from a TypeDoc comment.
 * Returns the deprecation message or `undefined` if not deprecated.
 */
function extractDeprecation(comment: TypeDocComment | undefined): string | undefined {
    const tag = comment?.blockTags?.find((t) => t.tag === '@deprecated');
    if (!tag) {
        return undefined;
    }
    const text = tag.content
        ?.map((c) => c.text)
        .join('')
        .trim();
    return text || 'Deprecated';
}

/**
 * Generate a fallback description when no JSDoc comment is present.
 *
 * Summarises the component from its API surface: key inputs, outputs, and methods.
 */
function generateFallbackDescription(
    className: string,
    selector: string,
    category: string,
    inputs: InputMetadata[],
    outputs: OutputMetadata[],
    methods: MethodMetadata[]
): string {
    const kind = className.endsWith('Directive') ? 'directive' : 'component';
    const humanName = className.replace(/Component$|Directive$/, '').replace(/([a-z0-9])([A-Z])/g, '$1 $2');

    const parts: string[] = [`${humanName} ${kind} (${selector}).`];

    if (inputs.length > 0) {
        const inputNames = inputs.slice(0, 5).map((i) => i.name);
        const suffix = inputs.length > 5 ? ` and ${inputs.length - 5} more` : '';
        parts.push(`Inputs: ${inputNames.join(', ')}${suffix}.`);
    }

    if (outputs.length > 0) {
        const outputNames = outputs.slice(0, 3).map((o) => o.name);
        const suffix = outputs.length > 3 ? ` and ${outputs.length - 3} more` : '';
        parts.push(`Outputs: ${outputNames.join(', ')}${suffix}.`);
    }

    if (methods.length > 0) {
        const methodNames = methods.slice(0, 3).map((m) => m.name);
        parts.push(`Methods: ${methodNames.join(', ')}.`);
    }

    return parts.join(' ');
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function isPrivateOrProtected(decl: TypeDocDeclaration): boolean {
    return !!(decl.flags?.isPrivate || decl.flags?.isProtected);
}
