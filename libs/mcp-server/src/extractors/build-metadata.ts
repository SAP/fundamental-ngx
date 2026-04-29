import { mkdir, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
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
    '@fundamental-ngx/cdk': 'cdk'
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

    // Attach examples to matching components
    let enrichedCount = 0;
    for (const component of allComponents) {
        const libDir = LIBRARY_TO_DIR[component.library];
        if (!libDir) {
            continue;
        }

        const compDir = selectorToDir(component.selector);
        const key = `${libDir}/${compDir}`;
        const compExamples = examples.get(key);

        if (compExamples && compExamples.length > 0) {
            component.examples = compExamples.map((ex) => ({
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
        const key = `${libDir}/${compDir}`;
        const docsDesc = descriptions.get(key);

        if (docsDesc) {
            component.description = docsDesc;
            descriptionEnrichedCount++;
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
