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
 * Examples live at: libs/docs/{library}/{component}/examples/*-example.component.ts
 */
export async function extractExamples(basePath: string): Promise<Map<string, ComponentExample[]>> {
    const pattern = 'libs/docs/*/*/examples/*-example.component.ts';
    const files = await glob(pattern, { cwd: basePath, absolute: false });

    const exampleMap = new Map<string, ComponentExample[]>();

    for (const file of files) {
        // Parse path: libs/docs/{library}/{component}/examples/{name}.component.ts
        const parts = file.split('/');
        if (parts.length < 6) {
            continue;
        }

        const libraryDir = parts[2]; // e.g. "core", "platform"
        const componentDir = parts[3]; // e.g. "button", "dialog"
        const fileName = parts[5]; // e.g. "button-types-example.component.ts"

        // Skip non-example files
        if (!fileName.includes('-example.component.ts')) {
            continue;
        }

        const exampleName = fileName.replace('.component.ts', '');
        const description = formatExampleName(exampleName);

        try {
            const tsContent = await readFile(resolve(basePath, file), 'utf-8');

            // Check for a matching HTML template
            const htmlPath = file.replace('.component.ts', '.component.html');
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
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
