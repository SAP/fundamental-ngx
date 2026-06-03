#!/usr/bin/env tsx
/**
 * Generate structured component list for llms.txt from components.json.
 *
 * Outputs markdown blocks in the format:
 *   #### ComponentName (https://sap.github.io/fundamental-ngx/library/component)
 *     - tag: `selector`
 *     - selectors: `selector1, selector2`
 *     - library: `@fundamental-ngx/library`
 *     - kind: `component`
 *     - description: ...
 *
 * Usage:
 *   npx tsx scripts/generate-llms-component-list.ts [--library core|platform|...]
 */

import { readFileSync } from 'fs';
import { join } from 'path';

interface ComponentCatalog {
    generatedAt: string;
    version: string;
    components: ComponentEntry[];
}

interface ComponentEntry {
    name: string;
    selector: string;
    library: string;
    category: string;
    description?: string;
    sourceFile: string;
    source: 'typedoc' | 'cem';
}

/**
 * Extract the primary selector for use as the "tag".
 * For attribute selectors like "[fd-button]", return "fd-button".
 * For element selectors like "fd-button", return as-is.
 */
function extractPrimaryTag(selector: string): string {
    const first = selector.split(',')[0].trim();
    // Attribute selector: [fd-button] → fd-button
    const attrMatch = first.match(/\[([^\]]+)\]/);
    if (attrMatch) {
        return attrMatch[1];
    }
    return first;
}

/**
 * Determine component kind from selector.
 * - "component" for element selectors (fd-button, ui5-button)
 * - "directive" for attribute selectors ([fd-button])
 */
function determineKind(selector: string): string {
    const first = selector.split(',')[0].trim();
    // Element selectors are components, attribute selectors are directives
    if (first.startsWith('[')) {
        return 'directive';
    }
    return 'component';
}

/**
 * Format a component entry as a structured markdown block.
 * Compact format for readability while remaining parseable.
 */
function formatComponent(component: ComponentEntry): string {
    const tag = extractPrimaryTag(component.selector);
    const kind = determineKind(component.selector);

    // Truncate long descriptions at first sentence or 120 chars
    let description = component.description || `${component.name} ${kind}.`;
    description = description.split('\n')[0].trim(); // First line only
    if (description.length > 120) {
        description = description.substring(0, 117) + '...';
    }

    return `- **${component.name}** (\`${tag}\`) - ${description}`;
}

/**
 * Generate component list grouped by library.
 */
function generateComponentList(catalog: ComponentCatalog, filterLibrary?: string): string {
    const componentsByLibrary = new Map<string, ComponentEntry[]>();

    // Group components by library
    for (const component of catalog.components) {
        if (filterLibrary && !component.library.includes(filterLibrary)) {
            continue;
        }
        const lib = component.library;
        if (!componentsByLibrary.has(lib)) {
            componentsByLibrary.set(lib, []);
        }
        const components = componentsByLibrary.get(lib);
        if (components) {
            components.push(component);
        }
    }

    // Sort libraries by a canonical order
    const libraryOrder = [
        '@fundamental-ngx/core',
        '@fundamental-ngx/platform',
        '@fundamental-ngx/cdk',
        '@fundamental-ngx/btp',
        '@fundamental-ngx/cx',
        '@fundamental-ngx/i18n',
        '@fundamental-ngx/ui5-webcomponents',
        '@fundamental-ngx/ui5-webcomponents-fiori',
        '@fundamental-ngx/ui5-webcomponents-ai'
    ];

    const sections: string[] = [];

    for (const library of libraryOrder) {
        const components = componentsByLibrary.get(library);
        if (!components || components.length === 0) {
            continue;
        }

        // Sort components within each library by name
        components.sort((a, b) => a.name.localeCompare(b.name));

        // Show up to 25 components per library for a good balance
        const displayed = components.slice(0, 25);
        const remaining = components.length - displayed.length;

        sections.push(`### ${library}`);
        sections.push('');
        for (const component of displayed) {
            sections.push(formatComponent(component));
        }
        sections.push('');

        if (remaining > 0) {
            sections.push(
                `_...and ${remaining} more. Full catalog: [components.json](https://sap.github.io/fundamental-ngx/components.json)_`
            );
            sections.push('');
        }
    }

    return sections.join('\n');
}

function main(): void {
    const args = process.argv.slice(2);
    const filterLibrary = args.find((arg) => arg.startsWith('--library='))?.split('=')[1];

    const catalogPath = join(__dirname, '../libs/mcp-server/src/data/components.json');
    const catalogContent = readFileSync(catalogPath, 'utf-8');
    const catalog: ComponentCatalog = JSON.parse(catalogContent);

    const output = generateComponentList(catalog, filterLibrary);
    console.log(output);
}

if (require.main === module) {
    main();
}
