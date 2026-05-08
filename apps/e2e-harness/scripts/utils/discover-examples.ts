import { globSync } from 'fs';
import { basename, resolve } from 'path';
import { extractClassName } from './class-name-extractor';

export interface ExampleMetadata {
    library: string;
    component: string;
    exampleName: string;
    filePath: string;
    className: string;
    routePath: string;
}

interface LibraryGlob {
    pattern: string;
    library: 'auto' | string;
}

const LIBRARY_GLOBS: LibraryGlob[] = [
    { pattern: 'libs/docs/{core,platform,btp,cx,i18n}/**/examples/**/*-example.component.ts', library: 'auto' },
    { pattern: 'libs/docs/cdk/**/examples/**/*.component.ts', library: 'cdk' },
    { pattern: 'libs/docs/ui5-webcomponents/**/examples/*-sample.ts', library: 'ui5' },
    { pattern: 'libs/docs/ui5-webcomponents-fiori/**/examples/*-sample.ts', library: 'ui5-fiori' },
    { pattern: 'libs/docs/ui5-webcomponents-ai/**/examples/*-sample.ts', library: 'ui5-ai' }
];

export function discoverExamples(workspaceRoot: string): ExampleMetadata[] {
    const results: ExampleMetadata[] = [];
    const seen = new Set<string>();

    for (const { pattern, library: libHint } of LIBRARY_GLOBS) {
        const files = globSync(pattern, { cwd: workspaceRoot });

        for (const file of files) {
            if (seen.has(file)) {continue;}
            seen.add(file);

            const absPath = resolve(workspaceRoot, file);
            const className = extractClassName(absPath);
            if (!className) {continue;}

            const metadata = parseFilePath(file, libHint);
            if (!metadata) {continue;}

            results.push({
                ...metadata,
                filePath: file,
                className,
                routePath: `${metadata.library}/${metadata.component}/${metadata.exampleName}`
            });
        }
    }

    deduplicateRoutes(results);
    results.sort((a, b) => a.routePath.localeCompare(b.routePath));
    return results;
}

function deduplicateRoutes(results: ExampleMetadata[]): void {
    const routeCounts = new Map<string, number>();
    for (const r of results) {
        routeCounts.set(r.routePath, (routeCounts.get(r.routePath) || 0) + 1);
    }

    for (const ex of results) {
        if ((routeCounts.get(ex.routePath) || 0) > 1) {
            const fileSlug = deriveFromFilename(basename(ex.filePath), ex.component);
            ex.exampleName = `${ex.exampleName}/${fileSlug}`;
            ex.routePath = `${ex.library}/${ex.component}/${ex.exampleName}`;
        }
    }
}

function deriveFromFilename(fileName: string, component: string): string {
    let name = fileName;
    name = name.replace(/\.component\.ts$/, '').replace(/\.ts$/, '');
    name = name.replace(/-example$/, '').replace(/-sample$/, '');
    const componentSlug = component.toLowerCase();
    if (name.startsWith(`${componentSlug}-`)) {
        name = name.slice(componentSlug.length + 1);
    }
    if (name.startsWith(`platform-${componentSlug}-`)) {
        name = name.slice(`platform-${componentSlug}-`.length);
    } else if (name.startsWith('platform-')) {
        name = name.replace(/^platform-/, '');
        if (name.startsWith(`${componentSlug}-`)) {
            name = name.slice(componentSlug.length + 1);
        }
    }
    return slugify(name) || 'default';
}

function parseFilePath(
    filePath: string,
    libHint: 'auto' | string
): Pick<ExampleMetadata, 'library' | 'component' | 'exampleName'> | null {
    // filePath: libs/docs/<library>/<component>/examples/.../<filename>
    const parts = filePath.split('/');
    const docsIdx = parts.indexOf('docs');
    if (docsIdx === -1) {return null;}

    const rawLibrary = parts[docsIdx + 1]; // e.g. 'core', 'platform', 'ui5-webcomponents'
    const component = parts[docsIdx + 2]; // e.g. 'button', 'combobox'

    const library = libHint === 'auto' ? rawLibrary : libHint;

    const fileName = basename(filePath);
    const exampleName = deriveExampleName(fileName, component, filePath);

    return { library, component, exampleName };
}

function deriveExampleName(fileName: string, component: string, filePath: string): string {
    const componentSlug = component.toLowerCase();

    // Check if file is in a named subdirectory under examples/
    const parts = filePath.split('/');
    const examplesIdx = parts.indexOf('examples');
    if (examplesIdx !== -1 && parts.length - examplesIdx > 2) {
        // File is in a subdirectory — use the subdir name
        const subdir = parts[examplesIdx + 1];
        // If the subdir looks like a meaningful name (not the same as the file), use it
        if (!fileName.startsWith(subdir)) {
            let subdirName = subdir;
            if (subdirName.startsWith(`platform-${componentSlug}-`)) {
                subdirName = subdirName.slice(`platform-${componentSlug}-`.length);
            } else if (subdirName.startsWith('platform-')) {
                subdirName = subdirName.slice('platform-'.length);
                if (subdirName.startsWith(`${componentSlug}-`)) {
                    subdirName = subdirName.slice(componentSlug.length + 1);
                }
            } else if (subdirName.startsWith(`${componentSlug}-`)) {
                subdirName = subdirName.slice(componentSlug.length + 1);
            }
            return slugify(subdirName);
        }
    }

    let name = fileName;

    // Strip extensions
    name = name.replace(/\.component\.ts$/, '').replace(/\.ts$/, '');

    // Strip suffixes
    name = name.replace(/-example$/, '').replace(/-sample$/, '');

    // Strip component prefix (e.g. "button-types" → "types")
    if (name.startsWith(`${componentSlug}-`)) {
        name = name.slice(componentSlug.length + 1);
    }

    // Strip "platform-<component>-" prefix
    if (name.startsWith(`platform-${componentSlug}-`)) {
        name = name.slice(`platform-${componentSlug}-`.length);
    } else if (name.startsWith('platform-')) {
        name = name.replace(/^platform-/, '');
        if (name.startsWith(`${componentSlug}-`)) {
            name = name.slice(componentSlug.length + 1);
        }
    }

    return slugify(name) || 'default';
}

function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
