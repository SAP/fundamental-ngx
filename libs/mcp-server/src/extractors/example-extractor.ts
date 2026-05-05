import { glob } from 'fast-glob';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export interface ComponentExample {
    /** Component directory name, e.g. "button", "dialog" */
    componentDir: string;
    /** Library name, e.g. "core", "platform" */
    libraryDir: string;
    /** Example file name, e.g. "button-types-example" */
    name: string;
    /** Description derived from file name */
    description: string;
    /** TypeScript source code */
    typescript: string;
    /** HTML template (if separate file exists) */
    html?: string;
}

/**
 * Extract example components from the docs folder.
 * Core/platform examples: libs/docs/{library}/{component}/examples/*-example.component.ts
 * UI5 examples (named):   libs/docs/{library}/{component}/examples/*-sample.ts
 * UI5 examples (plain):   libs/docs/ui5-webcomponents/{component}/examples/*.ts  (excluding index.ts)
 */
export async function extractExamples(basePath: string): Promise<Map<string, ComponentExample[]>> {
    const patterns = [
        'libs/docs/*/*/examples/*-example.component.ts',
        'libs/docs/*/*/examples/*-sample.ts',
        // UI5 docs also use plain .ts files (e.g. "basic-popover.ts", "states.ts")
        'libs/docs/ui5-webcomponents/*/examples/*.ts',
        'libs/docs/ui5-webcomponents-fiori/*/examples/*.ts',
        'libs/docs/ui5-webcomponents-ai/*/examples/*.ts'
    ];
    const files = await glob(patterns, { cwd: basePath, absolute: false });

    // Deduplicate: a file like "button-sample.ts" matches both pattern 2 and the UI5 pattern
    const uniqueFiles = [...new Set(files)];

    const exampleMap = new Map<string, ComponentExample[]>();

    for (const file of uniqueFiles) {
        // Parse path: libs/docs/{library}/{component}/examples/{name}.ts
        const parts = file.split('/');
        if (parts.length < 6) {
            continue;
        }

        const libraryDir = parts[2]; // e.g. "core", "platform", "ui5-webcomponents"
        const componentDir = parts[3]; // e.g. "button", "dialog"
        const fileName = parts[5]; // e.g. "button-types-example.component.ts" or "button-sample.ts"

        // Skip non-example files
        if (
            fileName === 'index.ts' ||
            fileName.endsWith('.spec.ts') ||
            fileName.endsWith('.module.ts') ||
            fileName.endsWith('.service.ts')
        ) {
            continue;
        }

        const isSample = fileName.endsWith('-sample.ts');
        const isExample = fileName.includes('-example.component.ts');
        const isPlainTs = !isSample && !isExample && fileName.endsWith('.ts');

        if (!isSample && !isExample && !isPlainTs) {
            continue;
        }

        const exampleName = isExample ? fileName.replace('.component.ts', '') : fileName.replace('.ts', '');
        const description = formatExampleName(exampleName);

        try {
            const tsContent = await readFile(resolve(basePath, file), 'utf-8');

            // Check for a matching HTML template (different suffix conventions)
            const htmlPath = isExample
                ? file.replace('.component.ts', '.component.html')
                : file.replace('.ts', '.html');
            let htmlContent: string | undefined;
            try {
                htmlContent = await readFile(resolve(basePath, htmlPath), 'utf-8');
            } catch {
                // No separate HTML file — template is inline in the TS file
            }

            const example: ComponentExample = {
                componentDir,
                libraryDir,
                name: exampleName,
                description,
                typescript: tsContent,
                html: htmlContent
            };

            const key = `${libraryDir}/${componentDir}`;
            const existing = exampleMap.get(key) ?? [];
            existing.push(example);
            exampleMap.set(key, existing);
        } catch {
            // Skip unreadable files
        }
    }

    return exampleMap;
}

/**
 * Convert a file name like "button-types-example" to "Button Types".
 */
function formatExampleName(name: string): string {
    return name
        .replace(/-example$/, '')
        .replace(/-sample$/, '')
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
