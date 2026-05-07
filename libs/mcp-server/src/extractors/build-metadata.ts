import { readdirSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { ComponentCatalog } from '../types/component-metadata';
import { extractAllUi5Components } from './cem-extractor';
import { extractDescriptions } from './description-extractor';
import { extractExamples } from './example-extractor';
import { extractAllTypeDocComponents } from './typedoc-extractor';

/** Map npm package name to the docs directory alias used in example paths. */
const LIBRARY_TO_DIR: Record<string, string> = {
    '@fundamental-ngx/core': 'core',
    '@fundamental-ngx/platform': 'platform',
    '@fundamental-ngx/btp': 'btp',
    '@fundamental-ngx/cx': 'cx',
    '@fundamental-ngx/cdk': 'cdk',
    '@fundamental-ngx/ui5-webcomponents': 'ui5-webcomponents',
    '@fundamental-ngx/ui5-webcomponents-fiori': 'ui5-webcomponents-fiori',
    '@fundamental-ngx/ui5-webcomponents-ai': 'ui5-webcomponents-ai'
};

/** Derive the example directory name from a selector.
 *  "fd-date-picker" → "date-picker"
 *  "fdp-table" → "table"
 *  "button[fd-button], a[fd-button]" → "button"
 *  "[fdOverflowLayout]" → "overflow-layout"
 */
function selectorToDir(selector: string): string {
    // Handle attribute selectors like "button[fd-button], a[fd-button]" or "[fdOverflowLayout]"
    const attrMatch = selector.match(/\[(fd[pbk]?)-([^\]]+)\]/);
    if (attrMatch) {
        return attrMatch[2];
    }
    // Handle camelCase attribute selectors like "[fdOverflowLayout]"
    const camelMatch = selector.match(/\[fd([A-Z][^\]]*)\]/);
    if (camelMatch) {
        // Convert camelCase to kebab-case: "OverflowLayout" → "overflow-layout"
        return camelMatch[1]
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .replace(/^-/, '');
    }
    // Simple prefix selectors: "fd-button" → "button"
    return selector
        .split(',')[0]
        .trim()
        .replace(/^(fd[pbk]?|cx|ui5)-/, '');
}

/**
 * Build a normalized-name → actual-directory-name index for all docs directories.
 * Normalization strips all hyphens so that "checkbox" matches "check-box",
 * "combobox" matches "combo-box", "tabcontainer" matches "tab-container", etc.
 */
function buildDirIndex(basePath: string, libDirs: string[]): Map<string, string[]> {
    const index = new Map<string, string[]>();

    for (const libDir of libDirs) {
        const docsPath = join(basePath, 'libs', 'docs', libDir);
        let entries: string[];
        try {
            entries = readdirSync(docsPath, { withFileTypes: true })
                .filter((e) => e.isDirectory())
                .map((e) => e.name);
        } catch {
            continue;
        }

        for (const dir of entries) {
            const key = `${libDir}/${dir}`;
            const normalized = dir.replace(/-/g, '');
            const indexKey = `${libDir}/${normalized}`;
            const existing = index.get(indexKey) ?? [];
            existing.push(key);
            index.set(indexKey, existing);
        }
    }

    return index;
}

/**
 * Manual mapping for UI5 sub-component selectors whose abbreviated CEM names
 * don't correspond to any docs directory via prefix stripping.
 *
 * Maps: selectorSuffix (after stripping "ui5-") → docs directory name.
 * Only entries that cannot be resolved algorithmically belong here.
 */
const UI5_SELECTOR_TO_DIR: Record<string, string> = {
    // ComboBox item children
    'cb-item': 'combo-box',
    // List item variants
    li: 'list',
    'li-custom': 'list',
    'li-group': 'list',
    // Notification list item variants
    'li-notification': 'notification-list',
    'li-notification-group': 'notification-list',
    // MultiComboBox item children
    'mcb-item': 'multi-combobox',
    'mcb-item-group': 'multi-combobox',
    // Select children
    option: 'select',
    'option-custom': 'select',
    // Input / ComboBox suggestion children
    'suggestion-item-custom': 'input',
    'suggestion-item-group': 'input',
    // UserSettingsDialog sub-views
    'user-settings-account-view': 'user-settings-dialog',
    'user-settings-appearance-view': 'user-settings-dialog',
    'user-settings-appearance-view-group': 'user-settings-dialog',
    'user-settings-appearance-view-item': 'user-settings-dialog',
    'user-settings-item': 'user-settings-dialog',
    'user-settings-view': 'user-settings-dialog'
};

/**
 * Resolve a component selector to one or more example map keys.
 *
 * Returns candidate keys in priority order:
 * 1. Exact match: libDir/compDir
 * 2. Normalized match (hyphens stripped): e.g. "checkbox" → "check-box"
 * 3. Manual mapping for abbreviated sub-components: e.g. "li" → "list"
 * 4. Sub-component parent fallback: e.g. "card-header" → "card",
 *    "table-row" → "table"
 *
 * For UI5 AI library, also strips the "ai-" prefix since the directory
 * just uses the base name (e.g. "ai-button" → "button").
 */
function resolveExampleKeys(
    libDir: string,
    compDir: string,
    exampleKeys: Set<string>,
    dirIndex: Map<string, string[]>
): string[] {
    const candidates: string[] = [];

    // 1. Exact match
    const exactKey = `${libDir}/${compDir}`;
    if (exampleKeys.has(exactKey)) {
        return [exactKey];
    }

    // For UI5 AI, strip "ai-" prefix: "ai-button" → "button"
    if (libDir === 'ui5-webcomponents-ai' && compDir.startsWith('ai-')) {
        const stripped = compDir.slice(3);
        const strippedKey = `${libDir}/${stripped}`;
        if (exampleKeys.has(strippedKey)) {
            return [strippedKey];
        }
    }

    // 2. Normalized match (strip hyphens): "checkbox" → "check-box"
    const normalizedCompDir = compDir.replace(/-/g, '');
    const normalizedKey = `${libDir}/${normalizedCompDir}`;
    const normalizedMatches = dirIndex.get(normalizedKey);
    if (normalizedMatches) {
        const matched = normalizedMatches.filter((k) => exampleKeys.has(k));
        if (matched.length > 0) {
            return matched;
        }
    }

    // 3. Manual mapping for abbreviated sub-component selectors
    const mappedDir = UI5_SELECTOR_TO_DIR[compDir];
    if (mappedDir) {
        const mappedKey = `${libDir}/${mappedDir}`;
        if (exampleKeys.has(mappedKey)) {
            return [mappedKey];
        }
        // Also try normalized version of the mapped directory
        const normalizedMapped = mappedDir.replace(/-/g, '');
        const normalizedMappedKey = `${libDir}/${normalizedMapped}`;
        const normalizedMappedMatches = dirIndex.get(normalizedMappedKey);
        if (normalizedMappedMatches) {
            const matched = normalizedMappedMatches.filter((k) => exampleKeys.has(k));
            if (matched.length > 0) {
                return matched;
            }
        }
    }

    // 4. Sub-component parent fallback: try progressively shorter prefixes.
    // "table-header-cell" → try "table-header", then "table"
    // "card-header" → try "card"
    const parts = compDir.split('-');
    for (let i = parts.length - 1; i >= 1; i--) {
        const parentDir = parts.slice(0, i).join('-');
        const parentKey = `${libDir}/${parentDir}`;
        if (exampleKeys.has(parentKey)) {
            candidates.push(parentKey);
            break;
        }

        // Also try normalized parent
        const normalizedParent = parentDir.replace(/-/g, '');
        const normalizedParentKey = `${libDir}/${normalizedParent}`;
        const parentMatches = dirIndex.get(normalizedParentKey);
        if (parentMatches) {
            const matched = parentMatches.filter((k) => exampleKeys.has(k));
            if (matched.length > 0) {
                candidates.push(...matched);
                break;
            }
        }
    }

    return candidates;
}

/**
 * Build the complete MCP metadata catalog.
 *
 * Orchestrates all extractors and writes the unified components.json.
 * Can be run as a standalone script or via an NX executor.
 */
export async function buildMetadata(basePath: string, outputPath: string): Promise<ComponentCatalog> {
    console.log('Starting metadata extraction...');
    const startTime = Date.now();

    // Run CEM and TypeDoc extraction in parallel
    const [cemComponents, typeDocComponents] = await Promise.all([
        extractAllUi5Components(basePath).then((components) => {
            console.log(`  CEM: extracted ${components.length} UI5 components`);
            return components;
        }),
        extractAllTypeDocComponents(basePath).then((components) => {
            console.log(`  TypeDoc: extracted ${components.length} hand-written components`);
            return components;
        })
    ]);

    // Merge all components
    const allComponents = [...cemComponents, ...typeDocComponents];

    // Enrich with examples
    const examples = await extractExamples(basePath);
    console.log(`  Examples: found ${examples.size} components with examples`);

    // Build a directory index for fuzzy matching (handles naming mismatches
    // like "checkbox" → "check-box", "combobox" → "combo-box", etc.)
    const libDirs = [...new Set(Object.values(LIBRARY_TO_DIR))];
    const dirIndex = buildDirIndex(basePath, libDirs);
    const exampleKeys = new Set(examples.keys());

    // Attach examples to matching components
    let enrichedCount = 0;
    for (const component of allComponents) {
        const libDir = LIBRARY_TO_DIR[component.library];
        if (!libDir) {
            continue;
        }

        const compDir = selectorToDir(component.selector);
        const keys = resolveExampleKeys(libDir, compDir, exampleKeys, dirIndex);

        // Collect examples from all matched keys (e.g. sub-component inherits parent)
        const allExamples = keys.flatMap((key) => examples.get(key) ?? []);

        if (allExamples.length > 0) {
            component.examples = allExamples.map((ex) => ({
                name: ex.name,
                description: ex.description,
                typescript: ex.typescript,
                html: ex.html
            }));
            enrichedCount++;
        }
    }
    console.log(`  Examples: enriched ${enrichedCount} components`);

    // Enrich with docs descriptions (for components missing JSDoc)
    const descriptions = await extractDescriptions(basePath);
    console.log(`  Descriptions: found ${descriptions.size} docs descriptions`);

    const descriptionKeys = new Set(descriptions.keys());
    let descriptionEnrichedCount = 0;
    for (const component of allComponents) {
        // Skip components that already have a real description (from JSDoc)
        if (component.description && !component.description.match(/^\w[\w ]+ (?:component|directive) \(/)) {
            continue;
        }

        const libDir = LIBRARY_TO_DIR[component.library];
        if (!libDir) {
            continue;
        }

        const compDir = selectorToDir(component.selector);
        const keys = resolveExampleKeys(libDir, compDir, descriptionKeys, dirIndex);

        for (const key of keys) {
            const docsDesc = descriptions.get(key);
            if (docsDesc) {
                component.description = docsDesc;
                descriptionEnrichedCount++;
                break;
            }
        }
    }
    console.log(`  Descriptions: enriched ${descriptionEnrichedCount} components`);

    // Sort alphabetically by selector for consistent output
    allComponents.sort((a, b) => a.selector.localeCompare(b.selector));

    const catalog: ComponentCatalog = {
        generatedAt: new Date().toISOString(),
        version: '0.62.0-rc.67',
        components: allComponents
    };

    // Write output
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, JSON.stringify(catalog, null, 2), 'utf-8');

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\nMetadata extraction complete in ${elapsed}s`);
    console.log(`  Total components: ${allComponents.length}`);
    console.log(`  Output: ${outputPath}`);

    return catalog;
}

/**
 * CLI entry point for running extraction standalone.
 * Usage: npx ts-node libs/mcp-server/src/extractors/build-metadata.ts [--dry-run]
 */
async function main(): Promise<void> {
    const basePath = resolve(__dirname, '../../../../');
    const outputPath = resolve(__dirname, '../data/components.json');
    const isDryRun = process.argv.includes('--dry-run');

    try {
        const catalog = await buildMetadata(basePath, isDryRun ? '/dev/null' : outputPath);

        if (isDryRun) {
            // In dry-run mode, compare with existing file
            const { readFile } = await import('fs/promises');
            try {
                const existing = await readFile(outputPath, 'utf-8');
                const existingCatalog = JSON.parse(existing) as ComponentCatalog;

                if (existingCatalog.components.length !== catalog.components.length) {
                    console.error(
                        `\nSTALE: Component count changed (${existingCatalog.components.length} → ${catalog.components.length})`
                    );
                    process.exit(1);
                }

                // Compare component names/selectors
                const existingSelectors = new Set(existingCatalog.components.map((c) => c.selector));
                const newSelectors = new Set(catalog.components.map((c) => c.selector));
                const added = catalog.components.filter((c) => !existingSelectors.has(c.selector));
                const removed = existingCatalog.components.filter((c) => !newSelectors.has(c.selector));

                if (added.length > 0 || removed.length > 0) {
                    if (added.length) {
                        console.error(`  Added: ${added.map((c) => c.selector).join(', ')}`);
                    }
                    if (removed.length) {
                        console.error(`  Removed: ${removed.map((c) => c.selector).join(', ')}`);
                    }
                    console.error('\nSTALE: Run `nx run mcp-server:extract-metadata` to update.');
                    process.exit(1);
                }

                console.log('\ncomponents.json is up to date.');
            } catch {
                console.error('\nSTALE: components.json does not exist. Run `nx run mcp-server:extract-metadata`.');
                process.exit(1);
            }
        }
    } catch (error) {
        console.error('Metadata extraction failed:', error);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    main();
}
