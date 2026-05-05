import { readFile } from 'fs/promises';
import { resolve } from 'path';
import {
    ComponentMetadata,
    CssPropertyMetadata,
    EventDetailField,
    InputMetadata,
    Library,
    MethodMetadata,
    MethodParam,
    OutputMetadata,
    SlotMetadata
} from '../types/component-metadata';
import { deriveSelectorInfo } from '../utils/selector-utils';

// ---------------------------------------------------------------------------
// CEM JSON type definitions (subset needed for extraction)
// These mirror the Custom Elements Manifest schema used by @ui5/webcomponents.
// ---------------------------------------------------------------------------

interface CemPackage {
    schemaVersion: string;
    modules: CemModule[];
}

interface CemModule {
    kind: string;
    path: string;
    declarations?: CemDeclaration[];
    exports?: CemExport[];
}

type CemDeclaration = CemClassDeclaration | CemEnumDeclaration;

interface CemClassDeclaration {
    kind: 'class';
    name: string;
    tagName?: string;
    customElement?: boolean;
    description?: string;
    deprecated?: string | boolean;
    _ui5since?: string;
    _ui5privacy?: string;
    _ui5abstract?: boolean;
    members?: CemMember[];
    events?: CemEvent[];
    slots?: CemSlot[];
    attributes?: CemAttribute[];
    cssProperties?: CemCssProperty[];
}

interface CemEnumDeclaration {
    kind: 'enum';
    name: string;
    _ui5privacy?: string;
    members?: CemEnumMember[];
}

interface CemEnumMember {
    kind: 'field';
    name: string;
    default?: string;
}

interface CemMember {
    kind: 'field' | 'method';
    name: string;
    type?: CemType;
    default?: string;
    description?: string;
    deprecated?: string | boolean;
    privacy?: string;
    readonly?: boolean;
    _ui5since?: string;
    return?: { type?: CemType; description?: string };
    parameters?: CemParameter[];
}

interface CemEvent {
    name: string;
    type?: CemType;
    description?: string;
    deprecated?: string | boolean;
    _ui5privacy?: string;
    _ui5since?: string;
    _ui5parameters?: CemEventParameter[];
}

interface CemEventParameter {
    name: string;
    type?: CemType;
    description?: string;
    _ui5privacy?: string;
}

interface CemSlot {
    name: string;
    description?: string;
    deprecated?: string | boolean;
    _ui5type?: CemType;
    _ui5since?: string;
    _ui5privacy?: string;
}

interface CemAttribute {
    name: string;
    fieldName?: string;
    type?: CemType;
    description?: string;
    default?: string;
}

interface CemCssProperty {
    name: string;
    description?: string;
    default?: string;
}

interface CemType {
    text: string;
    references?: CemTypeReference[];
}

interface CemTypeReference {
    name: string;
    package: string;
    module: string;
}

interface CemExport {
    kind: string;
    name: string;
    declaration?: { name: string; module: string };
}

// ---------------------------------------------------------------------------
// CEM package → Library mapping
// ---------------------------------------------------------------------------

interface CemSource {
    /** Path to the CEM JSON file relative to node_modules */
    cemPath: string;
    /** Target fundamental-ngx library */
    library: Library;
}

const CEM_SOURCES: CemSource[] = [
    {
        cemPath: '@ui5/webcomponents/dist/custom-elements-internal.json',
        library: '@fundamental-ngx/ui5-webcomponents'
    },
    {
        cemPath: '@ui5/webcomponents-fiori/dist/custom-elements-internal.json',
        library: '@fundamental-ngx/ui5-webcomponents-fiori'
    },
    {
        cemPath: '@ui5/webcomponents-ai/dist/custom-elements-internal.json',
        library: '@fundamental-ngx/ui5-webcomponents-ai'
    }
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Extract component metadata from a single Custom Elements Manifest JSON file.
 *
 * @param cemFilePath Absolute path to a `custom-elements-internal.json` file.
 * @param library The fundamental-ngx library this CEM belongs to.
 * @returns Array of normalized `ComponentMetadata` entries.
 */
export async function extractFromCem(cemFilePath: string, library: Library): Promise<ComponentMetadata[]> {
    const raw = await readFile(cemFilePath, 'utf-8');
    const cem: CemPackage = JSON.parse(raw);

    const enumMap = buildEnumMap(cem);
    const components: ComponentMetadata[] = [];

    for (const mod of cem.modules) {
        for (const decl of mod.declarations ?? []) {
            if (!isPublicCustomElement(decl)) {
                continue;
            }

            const component = mapDeclaration(decl, mod.path, library, enumMap);
            components.push(component);
        }
    }

    return components;
}

/**
 * Convenience function that extracts metadata from all three UI5 Web Components
 * CEM files and returns a merged array.
 *
 * @param basePath Absolute path to the repository root (where `node_modules` lives).
 * @returns Combined array of `ComponentMetadata` for all UI5 packages.
 */
export async function extractAllUi5Components(basePath: string): Promise<ComponentMetadata[]> {
    const results: ComponentMetadata[] = [];

    for (const source of CEM_SOURCES) {
        const cemFilePath = resolve(basePath, 'node_modules', source.cemPath);
        try {
            const components = await extractFromCem(cemFilePath, source.library);
            results.push(...components);
        } catch {
            // CEM file may not exist (e.g. ai package not installed)
        }
    }

    return results;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Type guard: declaration is a public, non-abstract custom element. */
function isPublicCustomElement(decl: CemDeclaration): decl is CemClassDeclaration {
    if (decl.kind !== 'class') {
        return false;
    }
    const cls = decl as CemClassDeclaration;
    return (
        cls.customElement === true &&
        !!cls.tagName &&
        cls._ui5privacy !== 'private' &&
        cls._ui5privacy !== 'protected' &&
        cls._ui5abstract !== true
    );
}

// ---------------------------------------------------------------------------
// Enum resolution
// ---------------------------------------------------------------------------

type EnumMap = Map<string, string[]>;

/** Build a lookup from enum name to its member values. */
function buildEnumMap(cem: CemPackage): EnumMap {
    const map: EnumMap = new Map();

    for (const mod of cem.modules) {
        for (const decl of mod.declarations ?? []) {
            if (decl.kind === 'enum') {
                const enumDecl = decl as CemEnumDeclaration;
                const values = (enumDecl.members ?? []).map((m) => m.name);
                map.set(enumDecl.name, values);
            }
        }
    }

    return map;
}

/** Try to resolve enum values from a type reference. */
function resolveEnumValues(type: CemType | undefined, enumMap: EnumMap): string[] | undefined {
    if (!type) {
        return undefined;
    }

    // Check direct references first
    if (type.references?.length) {
        for (const ref of type.references) {
            const refValues = enumMap.get(ref.name);
            if (refValues?.length) {
                return refValues;
            }
        }
    }

    // Fall back to matching the type text against known enum names
    const typeName = type.text.replace(/\s*\|.*$/, '').trim();
    const typeValues = enumMap.get(typeName);
    if (typeValues?.length) {
        return typeValues;
    }

    // Handle inline union types like '"Auto" | "Accent1" | "Accent2"'
    if (type.text.includes('"') && type.text.includes('|')) {
        const matches = type.text.match(/"([^"]+)"/g);
        if (matches?.length) {
            return matches.map((m) => m.replace(/"/g, ''));
        }
    }

    return undefined;
}

// ---------------------------------------------------------------------------
// Declaration → ComponentMetadata mapping
// ---------------------------------------------------------------------------

function mapDeclaration(
    decl: CemClassDeclaration,
    modulePath: string,
    library: Library,
    enumMap: EnumMap
): ComponentMetadata {
    const rawDescription = decl.description ?? '';
    const selector = decl.tagName!;
    const { selectorType, templateUsage } = deriveSelectorInfo(selector);
    return {
        name: decl.name,
        selector,
        selectorType,
        templateUsage,
        library,
        category: inferCategory(modulePath, library),
        description: cleanCemDescription(rawDescription),
        since: decl._ui5since,
        deprecated: normalizeDeprecated(decl.deprecated),
        inputs: mapInputs(decl.members, enumMap),
        outputs: mapOutputs(decl.events),
        slots: mapSlots(decl.slots),
        methods: mapMethods(decl.members),
        cssProperties: mapCssProperties(decl.cssProperties),
        keyboardHandling: extractSection(rawDescription, 'Keyboard Handling'),
        sourceFile: modulePath,
        source: 'cem'
    };
}

// ---------------------------------------------------------------------------
// Input mapping
// ---------------------------------------------------------------------------

function mapInputs(members: CemMember[] | undefined, enumMap: EnumMap): InputMetadata[] {
    if (!members) {
        return [];
    }

    return members
        .filter((m) => m.kind === 'field' && m.privacy === 'public' && !m.readonly)
        .map((m) => ({
            name: m.name,
            type: m.type?.text ?? 'unknown',
            defaultValue: m.default,
            description: m.description ?? '',
            required: m.default === undefined && !isOptionalType(m.type?.text),
            enumValues: resolveEnumValues(m.type, enumMap),
            since: m._ui5since,
            deprecated: normalizeDeprecated(m.deprecated)
        }));
}

/** Returns true if the type string indicates the value is optional. */
function isOptionalType(typeText: string | undefined): boolean {
    if (!typeText) {
        return false;
    }
    return typeText.includes('undefined') || typeText.includes('null') || typeText.endsWith('?');
}

// ---------------------------------------------------------------------------
// Output mapping
// ---------------------------------------------------------------------------

function mapOutputs(events: CemEvent[] | undefined): OutputMetadata[] {
    if (!events) {
        return [];
    }

    return events
        .filter((e) => e._ui5privacy !== 'private' && e._ui5privacy !== 'protected')
        .map((e) => ({
            name: toUi5OutputName(e.name),
            type: e.type?.text ?? 'CustomEvent',
            description: e.description ?? '',
            detail: mapEventDetail(e._ui5parameters),
            since: e._ui5since,
            deprecated: normalizeDeprecated(e.deprecated)
        }));
}

/**
 * Convert a DOM event name to the Angular output name used by the UI5 wrappers.
 * Prefix with "ui5" and PascalCase the rest.
 *
 * Examples:
 * - "click"            → "ui5Click"
 * - "selection-change" → "ui5SelectionChange"
 * - "close"            → "ui5Close"
 */
function toUi5OutputName(eventName: string): string {
    const pascal = eventName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    return `ui5${pascal}`;
}

function mapEventDetail(params: CemEventParameter[] | undefined): EventDetailField[] | undefined {
    if (!params?.length) {
        return undefined;
    }

    return params
        .filter((p) => p._ui5privacy !== 'private' && p._ui5privacy !== 'protected')
        .map((p) => ({
            name: p.name,
            type: p.type?.text ?? 'unknown',
            description: p.description ?? ''
        }));
}

// ---------------------------------------------------------------------------
// Slot mapping
// ---------------------------------------------------------------------------

function mapSlots(slots: CemSlot[] | undefined): SlotMetadata[] {
    if (!slots) {
        return [];
    }

    return slots
        .filter((s) => s._ui5privacy !== 'private' && s._ui5privacy !== 'protected')
        .map((s) => ({
            name: s.name,
            description: s.description ?? '',
            acceptedTypes: extractAcceptedTypes(s._ui5type),
            since: s._ui5since,
            deprecated: normalizeDeprecated(s.deprecated)
        }));
}

/** Extract accepted type names from a slot's _ui5type field. */
function extractAcceptedTypes(type: CemType | undefined): string[] | undefined {
    if (!type) {
        return undefined;
    }

    // References give the most accurate type names
    if (type.references?.length) {
        return type.references.map((ref) => ref.name);
    }

    // Fall back to parsing the text, e.g. "Array<HTMLElement>" → ["HTMLElement"]
    const genericMatch = type.text.match(/Array<(.+)>/);
    if (genericMatch) {
        return genericMatch[1].split('|').map((t) => t.trim());
    }

    return [type.text];
}

// ---------------------------------------------------------------------------
// Method mapping
// ---------------------------------------------------------------------------

function mapMethods(members: CemMember[] | undefined): MethodMetadata[] {
    if (!members) {
        return [];
    }

    return members
        .filter((m) => m.kind === 'method' && m.privacy === 'public')
        .map((m) => ({
            name: m.name,
            returnType: m.return?.type?.text ?? 'void',
            description: m.description ?? '',
            params: mapMethodParams(m.parameters),
            deprecated: normalizeDeprecated(m.deprecated)
        }));
}

function mapMethodParams(params: CemParameter[] | undefined): MethodParam[] {
    if (!params) {
        return [];
    }

    return params.map((p) => ({
        name: p.name,
        type: p.type?.text ?? 'unknown',
        description: p.description ?? '',
        optional: p.name.endsWith('?') || (p.type?.text?.includes('undefined') ?? false)
    }));
}

// CemParameter is the same shape used in method parameters
interface CemParameter {
    name: string;
    type?: CemType;
    description?: string;
    _ui5privacy?: string;
}

// ---------------------------------------------------------------------------
// CSS property mapping
// ---------------------------------------------------------------------------

function mapCssProperties(props: CemCssProperty[] | undefined): CssPropertyMetadata[] {
    if (!props) {
        return [];
    }

    return props.map((p) => ({
        name: p.name,
        description: p.description ?? '',
        defaultValue: p.default
    }));
}

// ---------------------------------------------------------------------------
// Description cleaning
// ---------------------------------------------------------------------------

/** Normalize a CEM `deprecated` field (string message or boolean) to a string or undefined. */
function normalizeDeprecated(value: string | boolean | undefined): string | undefined {
    if (typeof value === 'string') {
        return value;
    }
    if (value === true) {
        return 'Deprecated';
    }
    return undefined;
}

/**
 * Extract the content of a named `### Section` from a CEM markdown description.
 * Returns `undefined` if the section is not found.
 *
 * @param sectionName Plain text section name (must not contain regex special characters).
 */
function extractSection(markdown: string, sectionName: string): string | undefined {
    const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`###\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n###\\s|$)`);
    const match = markdown.match(pattern);
    if (!match) {
        return undefined;
    }
    return match[1].trim() || undefined;
}

/**
 * Clean a CEM markdown description into plain-text suitable for MCP output.
 *
 * 1. Extract the "### Overview" section content (if present)
 * 2. Otherwise use everything before the first `###` header
 * 3. Strip known boilerplate sections (ES6 Module Import, Keyboard Handling)
 * 4. Remove markdown formatting
 */
function cleanCemDescription(raw: string): string {
    if (!raw) {
        return '';
    }

    // Try to extract Overview section
    let text = extractSection(raw, 'Overview');

    if (!text) {
        // No ### Overview — use text before the first ### header
        const firstHeader = raw.indexOf('###');
        text = firstHeader > 0 ? raw.slice(0, firstHeader).trim() : raw;
    }

    // Remove remaining ### sections that may have leaked through
    text = text.replace(/###\s+[\s\S]*$/m, '').trim();

    // Strip markdown formatting
    text = text
        .replace(/`([^`]+)`/g, '$1') // inline code
        .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
        .replace(/\*([^*]+)\*/g, '$1') // italic
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
        .replace(/\n{2,}/g, '\n') // collapse blank lines
        .trim();

    return text;
}

// ---------------------------------------------------------------------------
// Category inference
// ---------------------------------------------------------------------------

/** Infer a human-readable category from the module path and library. */
function inferCategory(modulePath: string, library: Library): string {
    switch (library) {
        case '@fundamental-ngx/ui5-webcomponents-fiori':
            return 'Fiori';
        case '@fundamental-ngx/ui5-webcomponents-ai':
            return 'AI';
        default:
            break;
    }

    // For the base @ui5/webcomponents package, try to derive category from path
    // Module paths look like "dist/Button.js", "dist/CalendarDate.js"
    const fileName = modulePath.replace(/^dist\//, '').replace(/\.js$/, '');

    // Group by common prefixes
    const categoryPrefixes: Record<string, string> = {
        Avatar: 'User & Identity',
        Badge: 'Indicators',
        Bar: 'Layout',
        Breadcrumbs: 'Navigation',
        BusyIndicator: 'Indicators',
        Button: 'Actions',
        Calendar: 'Date & Time',
        Card: 'Data Display',
        Carousel: 'Data Display',
        CheckBox: 'Form',
        ColorPalette: 'Form',
        ColorPicker: 'Form',
        ComboBox: 'Form',
        DatePicker: 'Date & Time',
        DateRangePicker: 'Date & Time',
        DateTimePicker: 'Date & Time',
        Dialog: 'Popover & Dialog',
        DragDrop: 'Utilities',
        FileUploader: 'Form',
        Form: 'Form',
        Icon: 'Data Display',
        Input: 'Form',
        Label: 'Form',
        Link: 'Navigation',
        List: 'Data Display',
        Menu: 'Navigation',
        MessageStrip: 'Feedback',
        MultiComboBox: 'Form',
        MultiInput: 'Form',
        Panel: 'Layout',
        Popover: 'Popover & Dialog',
        Progress: 'Indicators',
        Radio: 'Form',
        RangeSlider: 'Form',
        RatingIndicator: 'Form',
        ResponsivePopover: 'Popover & Dialog',
        SegmentedButton: 'Actions',
        Select: 'Form',
        Slider: 'Form',
        SplitButton: 'Actions',
        StepInput: 'Form',
        Switch: 'Form',
        Tab: 'Navigation',
        Table: 'Data Display',
        TextArea: 'Form',
        TimePicker: 'Date & Time',
        Title: 'Data Display',
        Toast: 'Feedback',
        ToggleButton: 'Actions',
        Token: 'Data Display',
        Toolbar: 'Actions',
        Tree: 'Data Display',
        Tag: 'Data Display'
    };

    for (const [prefix, category] of Object.entries(categoryPrefixes)) {
        if (fileName.startsWith(prefix)) {
            return category;
        }
    }

    return 'UI5 Component';
}
