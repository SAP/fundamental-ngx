// libs/mcp-server/src/types/setup-guide.ts

/**
 * Type definitions for SetupGuide — the data structure returned by the
 * get_setup_guide MCP tool. Each guide describes the full Angular project
 * configuration needed to use @fundamental-ngx packages correctly.
 */

/** One entry in the angular.json styles array, with an explanation of why it is needed. */
export interface StyleEntry {
    /** Exact path string to insert in angular.json styles array */
    path: string;
    /** What this file provides (e.g. "SAP design tokens", "UI5 component variables") */
    purpose: string;
}

/** One entry in the angular.json assets array. */
export interface AssetEntry {
    /** Glob pattern for matched files, e.g. "**\/css_variables.css" */
    glob: string;
    /** Source directory relative to the workspace root, e.g. "./node_modules/@sap-theming/..." */
    input: string;
    /** Destination path in the output directory, e.g. "./assets/theming-base/" */
    output: string;
    /** Why this asset group is needed */
    purpose: string;
}

/** A manual fix step that some setups require (e.g. copying font files). */
export interface ManualStep {
    /** Short title shown to the LLM as a heading */
    title: string;
    /** When this step is required */
    condition: string;
    /** Multi-line string of shell commands or CSS/TypeScript code to execute or insert, shown verbatim to the user */
    commands: string;
    /** Explanation of why this is needed */
    why: string;
}

/** A known issue with symptom, root cause, and fix. */
export interface SetupKnownIssue {
    /** Observable symptom, e.g. "Icons render as empty squares" */
    symptom: string;
    /** Root cause explanation */
    cause: string;
    /** Actionable fix — may be a shell command, prose instruction, or code snippet */
    fix: string;
}

/** A complete project setup guide returned by the get_setup_guide tool. */
export interface SetupGuide {
    /** Short identifier, e.g. "core" or "core+ui5" */
    id: string;
    /** One-sentence summary */
    summary: string;
    /**
     * Ordered styles array for angular.json.
     * Entries must be inserted in this exact order — later entries depend on tokens defined by earlier ones.
     */
    angularJsonStyles: StyleEntry[];
    /**
     * Asset groups for angular.json (dynamic theming only).
     * Null when the setup uses only static styles.
     */
    angularJsonAssets: AssetEntry[] | null;
    /** Manual steps required in addition to angular.json changes */
    manualSteps: ManualStep[];
    /** Known issues that commonly arise, with root cause and fix */
    knownIssues: SetupKnownIssue[];
    /** Ready-to-paste angular.json styles array snippet */
    angularJsonStylesSnippet: string;
    /** Ready-to-paste app.config.ts providers snippet (null for static setup) */
    appConfigSnippet: string | null;
    /** Install command covering all required packages */
    installCommand: string;
}
