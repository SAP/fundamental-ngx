import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { z } from 'zod';
import { SETUP_GUIDES } from './data/setup-guides';
import { USAGE_GUIDES } from './data/usage-guides';
import { ComponentCatalog, ComponentMetadata, LIBRARY_ALIAS_MAP, LibraryAlias } from './types/component-metadata';
import type { SetupGuide } from './types/setup-guide';
import { buildPitfalls, buildTemplate, deriveImportPath, getSelectorType } from './utils/selector-utils';

// Load component catalog from pre-built JSON
let catalog: ComponentCatalog;
try {
    const dataPath = resolve(__dirname, 'data', 'components.json');
    const raw = JSON.parse(readFileSync(dataPath, 'utf-8')) as ComponentCatalog;
    // Strip Signal<T> / WritableSignal<T> inputs — these are internal state properties
    // that TypeDoc exposes as public, not bindable Angular @Input() properties.
    catalog = {
        ...raw,
        components: raw.components.map((c) => ({
            ...c,
            inputs: c.inputs.filter((i) => !isSignalWrapperType(i.type))
        }))
    };
} catch {
    catalog = { generatedAt: new Date().toISOString(), version: 'unknown', components: [] };
    console.error('Warning: components.json not found. Run `nx run mcp-server:extract-metadata` first.');
}

const server = new McpServer({
    name: 'fundamental-ngx',
    version: catalog.version
});

// ---------------------------------------------------------------------------
// Tool: list_components
// ---------------------------------------------------------------------------
server.tool(
    'list_components',
    `List all Fundamental NGX components. Returns name, selector, library, and description.
Optionally filter by library (core, platform, btp, cx, cdk, ui5, ui5-fiori, ui5-ai)
or category (Action, Form, Layout, Display, Navigation, etc.).
Use this to discover what components are available.`,
    {
        library: z
            .enum(['core', 'platform', 'btp', 'cx', 'cdk', 'i18n', 'ui5', 'ui5-fiori', 'ui5-ai'] as const)
            .optional()
            .describe('Filter by library'),
        category: z.string().optional().describe('Filter by category')
    },
    async ({ library, category }) => {
        let components = catalog.components;

        if (library) {
            const fullLibrary = LIBRARY_ALIAS_MAP[library as LibraryAlias];
            if (fullLibrary) {
                components = components.filter((c) => c.library === fullLibrary);
            }
        }

        if (category) {
            const lowerCategory = category.toLowerCase();
            components = components.filter((c) => c.category.toLowerCase().includes(lowerCategory));
        }

        const summary = components.map((c) => ({
            name: c.name,
            selector: c.selector,
            library: c.library,
            description: truncate(c.description, 120)
        }));

        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify({ count: summary.length, components: summary }, null, 2)
                }
            ]
        };
    }
);

// ---------------------------------------------------------------------------
// Tool: search_components
// ---------------------------------------------------------------------------
server.tool(
    'search_components',
    `Search Fundamental NGX components by keyword. Searches across component names,
selectors, descriptions, and input/output property names.
Use this when you need to find a component by a partial name or feature keyword.`,
    {
        query: z.string().describe('Search keyword (e.g., "button", "table", "date", "navigation")'),
        library: z
            .enum(['core', 'platform', 'btp', 'cx', 'cdk', 'ui5', 'ui5-fiori', 'ui5-ai'] as const)
            .optional()
            .describe('Restrict search to a specific library')
    },
    async ({ query, library }) => {
        const lowerQuery = query.toLowerCase();
        let components = catalog.components;

        if (library) {
            const fullLibrary = LIBRARY_ALIAS_MAP[library as LibraryAlias];
            if (fullLibrary) {
                components = components.filter((c) => c.library === fullLibrary);
            }
        }

        // Multi-word queries: sum the per-word scores so that components matching
        // more words rank higher. Single-word queries use the existing path.
        const queryWords = lowerQuery.split(/\s+/).filter((w) => w.length > 2);
        const isMultiWord = queryWords.length > 1;

        const scored = components
            .map((c) => ({
                component: c,
                score: isMultiWord
                    ? queryWords.reduce((sum, word) => sum + scoreMatch(c, word), 0)
                    : scoreMatch(c, lowerQuery)
            }))
            .filter((s) => s.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 20);

        const results = scored.map((s) => ({
            name: s.component.name,
            selector: s.component.selector,
            library: s.component.library,
            category: s.component.category,
            description: truncate(s.component.description, 150),
            relevance: s.score
        }));

        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify({ query, count: results.length, results }, null, 2)
                }
            ]
        };
    }
);

// ---------------------------------------------------------------------------
// Tool: get_component_api
// ---------------------------------------------------------------------------
server.tool(
    'get_component_api',
    `Get full API details for a specific Fundamental NGX component.
Accepts component name (e.g., "ButtonComponent"), selector (e.g., "fd-button", "ui5-button"),
or partial match. Returns all inputs, outputs, slots, methods, and enum values.
Use this when you need to know how to use a specific component.`,
    {
        name: z.string().describe('Component name, selector, or search term')
    },
    async ({ name }) => {
        const component = findComponent(name);

        if (!component) {
            return {
                content: [
                    {
                        type: 'text' as const,
                        text: `Component "${name}" not found. Use search_components to find available components.`
                    }
                ]
            };
        }

        const result: Record<string, unknown> = { ...component };
        if (component.deprecated) {
            result.deprecationWarning = `This component is deprecated: ${component.deprecated}`;
        }

        result.selectorType = getSelectorType(component.selector);
        result.templateUsage = buildTemplate(component);
        result.importPath = deriveImportPath(component);

        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

// ---------------------------------------------------------------------------
// Tool: get_component_examples
// ---------------------------------------------------------------------------
server.tool(
    'get_component_examples',
    `Get working code examples for a Fundamental NGX component.
Returns TypeScript and HTML snippets from the documentation examples.
Use this when you need real usage patterns for a component.`,
    {
        name: z.string().describe('Component name or selector')
    },
    async ({ name }) => {
        const component = findComponent(name);

        if (!component) {
            return {
                content: [
                    {
                        type: 'text' as const,
                        text: `Component "${name}" not found. Use search_components to find available components.`
                    }
                ]
            };
        }

        if (!component.examples || component.examples.length === 0) {
            return {
                content: [
                    {
                        type: 'text' as const,
                        text: JSON.stringify(
                            {
                                component: component.name,
                                selector: component.selector,
                                docsUrl: component.docsUrl || 'https://sap.github.io/fundamental-ngx',
                                note: 'No examples found for this component. Check the docs site for usage guidance.'
                            },
                            null,
                            2
                        )
                    }
                ]
            };
        }

        const formatted = component.examples.map((ex) => {
            let code = `// --- ${ex.description} ---\n\n`;
            code += ex.typescript;
            if (ex.html) {
                code += `\n\n<!-- Template: ${ex.name}.component.html -->\n\n${ex.html}`;
            }
            return { name: ex.description, code };
        });

        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify(
                        {
                            component: component.name,
                            selector: component.selector,
                            exampleCount: formatted.length,
                            examples: formatted
                        },
                        null,
                        2
                    )
                }
            ]
        };
    }
);

// ---------------------------------------------------------------------------
// Tool: get_usage_guide
// ---------------------------------------------------------------------------
server.tool(
    'get_usage_guide',
    `Get a practical usage guide for a Fundamental NGX component.
Returns the correct import path, a minimal template snippet showing proper selector usage,
required inputs that must be provided, and common pitfalls to avoid.
Use this as the first step when adding a new component to an Angular template.
Use "setup" or "installation" as the component name to get the complete project setup guide
(angular.json configuration, ThemingService wiring, and ng add instructions).
Use "ui5" or "ui5-webcomponents" to get the UI5 package setup guide (correct package name,
peer dependencies, import paths).
Use "i18n" or "FdTranslatePipe" to get the translation guide (FD_LANGUAGE_SIGNAL, fdTranslate pipe,
patchLanguage, runtime language switching).
Use "migrate-from-ui5-webcomponents-ngx" to get the migration guide from the deprecated
@ui5/webcomponents-ngx package (camelCase inputs, ValueState renames, ThemingService bridge,
additionalText replacing status).`,
    {
        name: z
            .string()
            .describe(
                'Component name or selector. Examples: "fd-button", "fdp-table", "ui5-input", "setup", "ui5", "i18n", "FdTranslatePipe", "migrate-from-ui5-webcomponents-ngx"'
            )
    },
    async ({ name }) => {
        const lowerComponent = name.toLowerCase().replace(/\s+/g, '-');
        const curatedGuide = USAGE_GUIDES[lowerComponent];
        if (curatedGuide) {
            return { content: [{ type: 'text' as const, text: JSON.stringify(curatedGuide, null, 2) }] };
        }

        const found = findComponent(name);

        if (!found) {
            return {
                content: [
                    {
                        type: 'text' as const,
                        text: `Component "${name}" not found. Use search_components to find available components.`
                    }
                ]
            };
        }

        const importPath = deriveImportPath(found);
        const templateUsage = buildTemplate(found);
        const pitfalls = buildPitfalls(found, importPath);
        const requiredInputs = found.inputs.filter((i) => i.required && !i.defaultValue);
        const firstExample = found.examples && found.examples.length > 0 ? found.examples[0] : null;

        const result: Record<string, unknown> = {
            component: found.name,
            selector: found.selector,
            library: found.library,
            importPath,
            selectorType: getSelectorType(found.selector),
            templateUsage,
            requiredInputs: requiredInputs.map((i) => ({ name: i.name, type: i.type, description: i.description })),
            pitfalls,
            docsUrl: found.docsUrl
        };

        if (found.deprecated) {
            result.deprecated = found.deprecated;
        }

        if (firstExample) {
            result.example = {
                name: firstExample.description,
                typescript: firstExample.typescript,
                html: firstExample.html
            };
        }

        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

// ---------------------------------------------------------------------------
// Tool: compare_components
// ---------------------------------------------------------------------------
server.tool(
    'compare_components',
    `Compare two Fundamental NGX components side by side.
Returns shared and unique inputs, outputs, slots, and methods.
Useful for choosing between core (fd-) and UI5 (ui5-) variants,
or comparing alternative components for the same use case.`,
    {
        component_a: z.string().describe('First component name or selector (e.g., "fd-button")'),
        component_b: z.string().describe('Second component name or selector (e.g., "ui5-button")')
    },
    async ({ component_a, component_b }) => {
        const compA = findComponent(component_a);
        const compB = findComponent(component_b);

        if (!compA || !compB) {
            const missing = [...(!compA ? [component_a] : []), ...(!compB ? [component_b] : [])];
            return {
                content: [
                    {
                        type: 'text' as const,
                        text: `Component(s) not found: ${missing.map((m) => `"${m}"`).join(', ')}. Use search_components to find available components.`
                    }
                ]
            };
        }

        // Compare inputs by name
        const inputNamesA = new Set(compA.inputs.map((i) => i.name));
        const inputNamesB = new Set(compB.inputs.map((i) => i.name));

        const sharedInputs = compA.inputs
            .filter((i) => inputNamesB.has(i.name))
            .map((i) => {
                const bInput = compB.inputs.find((bi) => bi.name === i.name)!;
                return {
                    name: i.name,
                    typeA: i.type,
                    typeB: bInput.type,
                    defaultA: i.defaultValue,
                    defaultB: bInput.defaultValue
                };
            });
        const onlyInA_inputs = compA.inputs
            .filter((i) => !inputNamesB.has(i.name))
            .map((i) => ({ name: i.name, type: i.type, defaultValue: i.defaultValue }));
        const onlyInB_inputs = compB.inputs
            .filter((i) => !inputNamesA.has(i.name))
            .map((i) => ({ name: i.name, type: i.type, defaultValue: i.defaultValue }));

        // Compare outputs by name
        const outputNamesA = new Set(compA.outputs.map((o) => o.name));
        const outputNamesB = new Set(compB.outputs.map((o) => o.name));

        const sharedOutputs = compA.outputs
            .filter((o) => outputNamesB.has(o.name))
            .map((o) => {
                const bOutput = compB.outputs.find((bo) => bo.name === o.name)!;
                return { name: o.name, typeA: o.type, typeB: bOutput.type };
            });
        const onlyInA_outputs = compA.outputs
            .filter((o) => !outputNamesB.has(o.name))
            .map((o) => ({ name: o.name, type: o.type }));
        const onlyInB_outputs = compB.outputs
            .filter((o) => !outputNamesA.has(o.name))
            .map((o) => ({ name: o.name, type: o.type }));

        // Build summary
        const summaryParts: string[] = [];
        summaryParts.push(`${compA.selector} is from ${compA.library}; ${compB.selector} is from ${compB.library}.`);
        summaryParts.push(`Inputs: ${compA.inputs.length} vs ${compB.inputs.length} (${sharedInputs.length} shared).`);
        summaryParts.push(
            `Outputs: ${compA.outputs.length} vs ${compB.outputs.length} (${sharedOutputs.length} shared).`
        );

        if (compA.slots.length > 0 || compB.slots.length > 0) {
            const slotsA = compA.slots.map((s) => s.name).join(', ') || 'none';
            const slotsB = compB.slots.map((s) => s.name).join(', ') || 'none';
            summaryParts.push(`Slots: ${compA.selector} [${slotsA}], ${compB.selector} [${slotsB}].`);
        }

        if (compA.deprecated) {
            summaryParts.push(`${compA.selector} is deprecated: ${compA.deprecated}`);
        }
        if (compB.deprecated) {
            summaryParts.push(`${compB.selector} is deprecated: ${compB.deprecated}`);
        }

        // Find alternatives from UI_PATTERNS
        const alternatives = findAlternatives(compA.selector, compB.selector);

        const result = {
            componentA: {
                name: compA.name,
                selector: compA.selector,
                library: compA.library,
                category: compA.category,
                description: truncate(compA.description, 200)
            },
            componentB: {
                name: compB.name,
                selector: compB.selector,
                library: compB.library,
                category: compB.category,
                description: truncate(compB.description, 200)
            },
            comparison: {
                sharedInputs,
                onlyInA: onlyInA_inputs,
                onlyInB: onlyInB_inputs,
                sharedOutputs,
                onlyOutputsInA: onlyInA_outputs,
                onlyOutputsInB: onlyInB_outputs,
                slotsA: compA.slots.map((s) => ({ name: s.name, description: truncate(s.description, 80) })),
                slotsB: compB.slots.map((s) => ({ name: s.name, description: truncate(s.description, 80) })),
                methodsA: compA.methods.map((m) => m.name),
                methodsB: compB.methods.map((m) => m.name),
                summary: summaryParts.join(' ')
            },
            alternatives
        };

        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify(result, null, 2)
                }
            ]
        };
    }
);

// ---------------------------------------------------------------------------
// Tool: get_setup_guide
// ---------------------------------------------------------------------------
server.tool(
    'get_setup_guide',
    `Get a complete Angular project setup guide for @fundamental-ngx.
Returns the full theming dependency chain, the exact angular.json styles array in load order,
font fix steps for the esbuild application builder, and known issues with fixes.

Use this tool when:
- Setting up a new Angular project with @fundamental-ngx/core
- Diagnosing unstyled components, missing CSS variables, or empty-square icons
- Adding @fundamental-ngx/ui5-webcomponents to an existing project

Pass "core" for a project using only @fundamental-ngx/core.
Pass "core+ui5" or "ui5" for a project that also uses @fundamental-ngx/ui5-webcomponents.`,
    {
        packages: z
            .enum(['core', 'core+ui5', 'ui5'])
            .describe(
                'Which packages are being set up. ' +
                    '"core" — @fundamental-ngx/core only. ' +
                    '"core+ui5" (or the alias "ui5") — @fundamental-ngx/core plus @fundamental-ngx/ui5-webcomponents.'
            )
    },
    async ({ packages }) => {
        const guide: SetupGuide | undefined = SETUP_GUIDES[packages];

        if (!guide) {
            return {
                content: [
                    {
                        type: 'text' as const,
                        text: `No setup guide found for "${packages}". Valid options: "core", "core+ui5", "ui5".`
                    }
                ]
            };
        }

        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify(guide, null, 2)
                }
            ]
        };
    }
);

// ---------------------------------------------------------------------------
// Resource: component catalog
// ---------------------------------------------------------------------------
server.resource('component-catalog', 'fundamental-ngx://components/catalog', async (uri) => ({
    contents: [
        {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(catalog, null, 2)
        }
    ]
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findComponent(nameOrSelector: string): ComponentMetadata | undefined {
    const lower = nameOrSelector.toLowerCase();

    // Exact match on selector
    const bySelector = catalog.components.find((c) => c.selector.toLowerCase() === lower);
    if (bySelector) {
        return bySelector;
    }

    // Exact match on name
    const byName = catalog.components.find((c) => c.name.toLowerCase() === lower);
    if (byName) {
        return byName;
    }

    // Partial match on selector or name — rank by score to avoid compound
    // directives beating the primary component when selectors share a substring.
    // Selector matching requires a dash-boundary: "fd-input" must NOT match
    // "fd-input-group" because the query is a prefix segment of a longer name.
    const partialMatches = catalog.components.filter(
        (c) => selectorHasBoundaryMatch(c.selector.toLowerCase(), lower) || c.name.toLowerCase().includes(lower)
    );
    if (partialMatches.length > 0) {
        return partialMatches.sort((a, b) => scoreMatch(b, lower) - scoreMatch(a, lower))[0];
    }

    return undefined;
}

/**
 * Returns true if `query` appears in `selector` and is NOT immediately followed
 * by a dash. A trailing dash would mean the query is merely a prefix segment of
 * a longer compound name (e.g. "fd-input" in "fd-input-group"), which should not
 * count as a match.
 */
function selectorHasBoundaryMatch(selector: string, query: string): boolean {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped + '(?!-)').test(selector);
}

/**
 * Returns true when a type string is a plain Signal or WritableSignal wrapper
 * (e.g. "Signal<boolean>", "WritableSignal<number>").
 * These are internal state properties exposed by TypeDoc, not bindable @Input() members.
 */
function isSignalWrapperType(type: string | undefined): boolean {
    return !!type && /^(Writable)?Signal</.test(type);
}

function scoreMatch(component: ComponentMetadata, query: string): number {
    let score = 0;

    if (component.selector.toLowerCase() === query) {
        score += 100;
    } else if (component.selector.toLowerCase().includes(query)) {
        score += 50;
        // Prefer selectors where the query covers most of the primary part.
        // Avoids picking compound directives (e.g. [fd-button][fdbNestedButton])
        // over the primary component (e.g. button[fd-button], a[fd-button]).
        const selectorParts = component.selector.split(',').map((p) => p.trim().toLowerCase());
        const matchingParts = selectorParts.filter((p) => p.includes(query));
        if (matchingParts.length > 0) {
            const shortestPart = Math.min(...matchingParts.map((p) => p.length));
            score += Math.max(0, 20 - (shortestPart - query.length));
        }
    }

    if (component.name.toLowerCase() === query) {
        score += 90;
    } else if (component.name.toLowerCase().includes(query)) {
        score += 40;
    }

    if (component.description.toLowerCase().includes(query)) {
        score += 20;
    }
    if (component.category.toLowerCase().includes(query)) {
        score += 30;
    }

    // Search in input/output names
    for (const input of component.inputs) {
        if (input.name.toLowerCase().includes(query)) {
            score += 15;
            break;
        }
    }
    for (const output of component.outputs) {
        if (output.name.toLowerCase().includes(query)) {
            score += 15;
            break;
        }
    }

    return score;
}

function truncate(text: string, maxLength: number): string {
    if (!text) {
        return '';
    }
    // Take only the first line/paragraph for summaries
    const firstLine = text.split('\n')[0];
    if (firstLine.length <= maxLength) {
        return firstLine;
    }
    return firstLine.slice(0, maxLength - 3) + '...';
}

/** Find alternative components from UI_PATTERNS that share a category with either selector. */
function findAlternatives(selectorA: string, selectorB: string): string[] {
    const alternatives = new Set<string>();
    for (const componentSelectors of Object.values(UI_PATTERNS)) {
        const hasA = componentSelectors.includes(selectorA);
        const hasB = componentSelectors.includes(selectorB);
        if (hasA || hasB) {
            for (const sel of componentSelectors) {
                if (sel !== selectorA && sel !== selectorB) {
                    alternatives.add(sel);
                }
            }
        }
    }
    return [...alternatives];
}

// ---------------------------------------------------------------------------
// UI Pattern recommendations
// ---------------------------------------------------------------------------
const UI_PATTERNS: Record<string, string[]> = {
    'table|data table|grid': ['fd-table', 'fdp-table', 'ui5-table'],
    // login/register are common form-building queries; replaced non-existent fd-form and fd-radio with real selectors
    'form|input form|login|register|registration': [
        'fd-form-group',
        'fd-form-item',
        'fd-form-label',
        'fd-form-control',
        'fd-input-group',
        'fd-checkbox',
        'fd-radio-button',
        'fd-select',
        'fd-switch'
    ],
    'dialog|modal|popup': ['fd-dialog', 'ui5-dialog', 'fd-message-box'],
    'date|calendar|date picker': ['fd-date-picker', 'fd-calendar', 'ui5-date-picker', 'ui5-calendar'],
    // fd-side-navigation is deprecated — use fd-vertical-navigation
    'navigation|nav|sidebar': ['fd-vertical-navigation', 'ui5-side-navigation'],
    // fd-button does not exist as an element selector; real selector is button[fd-button], a[fd-button]
    'button|action': [
        'button[fd-button], a[fd-button]',
        'fdp-button',
        'ui5-button',
        'fd-split-button',
        'fd-segmented-button'
    ],
    'list|items': ['fd-list', 'ui5-list', 'fd-grid-list'],
    'menu|dropdown': ['fd-menu', 'fd-popover', 'ui5-menu'],
    'tabs|tab': ['fd-tabs', 'ui5-tab-container'],
    'wizard|stepper|step': ['fd-wizard', 'ui5-wizard'],
    'card|tile': ['fd-card', 'fd-tile', 'ui5-card'],
    'tree|hierarchy': ['fd-tree', 'ui5-tree'],
    'upload|file': ['fd-file-uploader', 'ui5-file-uploader', 'fd-upload-collection'],
    'search|filter': ['fdb-search-field', 'fdp-search-field', 'fdp-smart-filter-bar'],
    'toolbar|header bar': ['fd-toolbar', 'fd-bar', 'ui5-toolbar'],
    'notification|alert|message': ['fd-message-strip', 'fd-message-toast', 'fd-notification', 'ui5-notification-list'],
    'avatar|user|profile': ['fd-avatar', 'fd-avatar-group', 'ui5-avatar'],
    'pagination|paging': ['fd-pagination'],
    'master detail|split|column': ['fd-flexible-column-layout', 'ui5-flexible-column-layout'],
    breadcrumb: ['fd-breadcrumb', 'ui5-breadcrumbs'],
    'progress|loading|busy': ['fd-busy-indicator', 'fd-progress-indicator', 'ui5-busy-indicator'],
    'timeline|feed': ['fd-timeline', 'fd-feed-list-item', 'ui5-timeline'],
    'approval|workflow': ['fdp-approval-flow'],
    'shell|app header': ['fdb-tool-header', 'ui5-shell-bar'],
    'slider|range': ['fd-slider', 'fdp-slider', 'ui5-slider', 'ui5-range-slider'],
    'token|tag|chip': ['fd-token', 'ui5-token', 'ui5-tag'],
    'combobox|autocomplete': ['fd-combobox', 'fd-multi-combobox', 'ui5-combo-box', 'ui5-multi-combo-box'],
    'rating|star': ['fd-rating-indicator', 'ui5-rating-indicator'],
    'icon|symbol': ['fd-icon', 'ui5-icon'],
    'skeleton|placeholder': ['fd-skeleton'],
    'panel|section': ['fd-panel', 'fd-layout-panel', 'ui5-panel'],
    'dynamic page|object page': ['fd-dynamic-page', 'fdp-dynamic-page', 'ui5-dynamic-page'],
    'splitter|resizable': ['fdb-splitter'],
    'ai|artificial intelligence|prompt': [
        'ui5-ai-button',
        'ui5-ai-prompt-input',
        'ui5-ai-text-area',
        'ui5-ai-writing-assistant'
    ]
};

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------

/** Start in MCP stdio transport mode (normal operation). */
export async function startStdioServer(): Promise<void> {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

export { server };
