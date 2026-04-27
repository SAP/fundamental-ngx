/**
 * Unified component metadata schema for the Fundamental NGX MCP server.
 *
 * This schema normalizes metadata from two sources:
 * - Custom Elements Manifest (CEM) for UI5 Web Component wrappers
 * - TypeDoc JSON for hand-written Angular components (core, platform, btp, cx, cdk)
 */

/** Top-level metadata for a single component or directive. */
export interface ComponentMetadata {
    /** Component class name, e.g. "ButtonComponent" or "Button" */
    name: string;
    /** CSS selector, e.g. "fd-button", "ui5-button", "button[fd-button]" */
    selector: string;
    /** Whether the selector is used as an element, attribute, or both */
    selectorType: 'element' | 'attribute' | 'both';
    /** HTML snippet showing correct template usage, e.g. "<button fd-button>...</button>" */
    templateUsage: string;
    /** npm package, e.g. "@fundamental-ngx/core", "@fundamental-ngx/ui5-webcomponents" */
    library: Library;
    /** Functional category for grouping/filtering */
    category: string;
    /** Human-readable description (markdown) */
    description: string;
    /** Version when the component was introduced */
    since?: string;
    /** Component inputs (properties that accept values) */
    inputs: InputMetadata[];
    /** Component outputs (events emitted) */
    outputs: OutputMetadata[];
    /** Named content projection slots (primarily UI5 components) */
    slots: SlotMetadata[];
    /** Public methods callable on the component */
    methods: MethodMetadata[];
    /** CSS custom properties the component exposes */
    cssProperties: CssPropertyMetadata[];
    /** Source file path relative to repo root */
    sourceFile?: string;
    /** URL to the online documentation page */
    docsUrl?: string;
    /** Where this metadata was extracted from */
    source: 'cem' | 'typedoc';
    /** Code examples from the docs app */
    examples?: ComponentExample[];
    /** Keyboard handling notes (extracted from CEM descriptions) */
    keyboardHandling?: string;
    /** Deprecation message, if the component is deprecated */
    deprecated?: string;
}

/** A code example for a component from the docs app. */
export interface ComponentExample {
    /** Example name, e.g. "Button Types" */
    name: string;
    /** Description derived from file name */
    description: string;
    /** TypeScript source code */
    typescript: string;
    /** HTML template (if separate file exists) */
    html?: string;
}

export interface InputMetadata {
    /** Property name, e.g. "disabled", "fdType" */
    name: string;
    /** TypeScript type as a string, e.g. "boolean", "ButtonType", "string | undefined" */
    type: string;
    /** Default value as a string, e.g. "false", "'standard'" */
    defaultValue?: string;
    /** Human-readable description (markdown) */
    description: string;
    /** Whether a value must be provided */
    required: boolean;
    /** Available enum values when the type is an enum */
    enumValues?: string[];
    /** Version when this input was introduced */
    since?: string;
    /** Deprecation message, if this input is deprecated */
    deprecated?: string;
}

export interface OutputMetadata {
    /** Event name, e.g. "clicked", "ui5Click", "selectionChange" */
    name: string;
    /** Event payload type, e.g. "void", "MouseEvent", "CustomEvent<ButtonClickEventDetail>" */
    type: string;
    /** Human-readable description (markdown) */
    description: string;
    /** Event detail fields for CustomEvent payloads */
    detail?: EventDetailField[];
    /** Version when this output was introduced */
    since?: string;
    /** Deprecation message, if this output is deprecated */
    deprecated?: string;
}

export interface EventDetailField {
    /** Parameter name */
    name: string;
    /** Parameter type */
    type: string;
    /** Parameter description */
    description: string;
}

export interface SlotMetadata {
    /** Slot name ("default" for unnamed slot) */
    name: string;
    /** Human-readable description (markdown) */
    description: string;
    /** Accepted element types, e.g. ["ButtonBadge", "HTMLElement"] */
    acceptedTypes?: string[];
    /** Version when this slot was introduced */
    since?: string;
    /** Deprecation message, if this slot is deprecated */
    deprecated?: string;
}

export interface MethodMetadata {
    /** Method name */
    name: string;
    /** Return type */
    returnType: string;
    /** Human-readable description (markdown) */
    description: string;
    /** Method parameters */
    params: MethodParam[];
    /** Deprecation message, if this method is deprecated */
    deprecated?: string;
}

export interface MethodParam {
    /** Parameter name */
    name: string;
    /** Parameter type */
    type: string;
    /** Parameter description */
    description: string;
    /** Whether the parameter is optional */
    optional: boolean;
}

export interface CssPropertyMetadata {
    /** CSS custom property name, e.g. "--sapBackgroundColor" */
    name: string;
    /** Description of the property */
    description: string;
    /** Default value */
    defaultValue?: string;
}

/** Library identifiers matching the npm package names. */
export type Library =
    | '@fundamental-ngx/core'
    | '@fundamental-ngx/platform'
    | '@fundamental-ngx/btp'
    | '@fundamental-ngx/cx'
    | '@fundamental-ngx/cdk'
    | '@fundamental-ngx/i18n'
    | '@fundamental-ngx/datetime-adapter'
    | '@fundamental-ngx/moment-adapter'
    | '@fundamental-ngx/ui5-webcomponents'
    | '@fundamental-ngx/ui5-webcomponents-fiori'
    | '@fundamental-ngx/ui5-webcomponents-ai';

/** Short aliases for library filtering in MCP tools. */
export type LibraryAlias =
    | 'core'
    | 'platform'
    | 'btp'
    | 'cx'
    | 'cdk'
    | 'i18n'
    | 'datetime-adapter'
    | 'moment-adapter'
    | 'ui5'
    | 'ui5-fiori'
    | 'ui5-ai';

export const LIBRARY_ALIAS_MAP: Record<LibraryAlias, Library> = {
    core: '@fundamental-ngx/core',
    platform: '@fundamental-ngx/platform',
    btp: '@fundamental-ngx/btp',
    cx: '@fundamental-ngx/cx',
    cdk: '@fundamental-ngx/cdk',
    i18n: '@fundamental-ngx/i18n',
    'datetime-adapter': '@fundamental-ngx/datetime-adapter',
    'moment-adapter': '@fundamental-ngx/moment-adapter',
    ui5: '@fundamental-ngx/ui5-webcomponents',
    'ui5-fiori': '@fundamental-ngx/ui5-webcomponents-fiori',
    'ui5-ai': '@fundamental-ngx/ui5-webcomponents-ai'
};

/** The complete metadata catalog written to components.json. */
export interface ComponentCatalog {
    /** ISO timestamp of when the metadata was generated */
    generatedAt: string;
    /** Library version this metadata corresponds to */
    version: string;
    /** All component metadata entries */
    components: ComponentMetadata[];
}

/** Changelog entry for migration guide. */
export interface ChangelogEntry {
    /** Library this change belongs to */
    library: Library;
    /** Version where the change was introduced */
    version: string;
    /** Type of change */
    type: 'breaking' | 'feature' | 'fix' | 'deprecation';
    /** Description of the change (markdown) */
    description: string;
    /** Component affected, if applicable */
    component?: string;
}

/** Design token metadata. */
export interface DesignToken {
    /** Token name, e.g. "--sapBackgroundColor" or "fd-margin-top--sm" */
    name: string;
    /** Token category */
    category: 'color' | 'spacing' | 'typography' | 'elevation' | 'border' | 'size';
    /** Human-readable description */
    description: string;
    /** Default/example value */
    value?: string;
    /** Usage example in CSS or HTML */
    example?: string;
}

// Re-export deriveSelectorInfo from its canonical location so existing
// consumers that import from this module continue to work.
export { deriveSelectorInfo } from '../utils/selector-utils';
