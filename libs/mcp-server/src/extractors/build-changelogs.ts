import { readFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { ChangelogEntry, LIBRARY_ALIAS_MAP, RawChangelogEntry } from '../types/component-metadata';
import { extractChangelogs } from './changelog-extractor';

const OUTPUT_PATH = resolve(__dirname, '../data/changelogs.json');

/**
 * Supplement LIBRARY_ALIAS_MAP with scopes that exist in commit history but are
 * not user-facing component libraries (e.g. mcp-server publishes as @fundamental-ngx/mcp).
 */
const EXTRA_SCOPES: Record<string, string> = {
    mcp: '@fundamental-ngx/mcp'
};

const SCOPE_TO_LIBRARY: Record<string, string> = {
    ...LIBRARY_ALIAS_MAP,
    ...EXTRA_SCOPES
};

/**
 * Resolve all libraries from a raw commit scope.
 *
 * Scopes can be a single token ("core") or a comma-separated list
 * ("docs, platform, core, cdk"). We collect every token that maps to a
 * known package. If none match, fall back to ["@fundamental-ngx/<first-token>"].
 */
export function resolveLibraries(scope: string): string[] {
    const parts = scope.split(/[\s,]+/).filter(Boolean);
    const libs: string[] = [];
    for (const part of parts) {
        const lib = SCOPE_TO_LIBRARY[part];
        if (lib && !libs.includes(lib)) {
            libs.push(lib);
        }
    }
    if (libs.length === 0 && parts.length > 0) {
        libs.push(`@fundamental-ngx/${parts[0]}`);
    }
    return libs;
}

/**
 * Build the deduplicated changelog catalog.
 *
 * NX Release with projectsRelationship="fixed" writes the full set of commits to
 * every library's CHANGELOG.md (since all packages release together). Reading all
 * changelogs therefore produces N copies of each entry. We deduplicate on
 * version+type+description+library, then expand multi-library scopes so each
 * recognized library gets its own entry.
 */
export async function buildChangelogs(basePath: string): Promise<ChangelogEntry[]> {
    const allEntries: RawChangelogEntry[] = await extractChangelogs(basePath);

    const seen = new Set<string>();
    const output: ChangelogEntry[] = [];

    for (const { component, ...rest } of allEntries) {
        const libraries = component ? resolveLibraries(component) : [rest.library];

        for (const library of libraries) {
            const key = `${rest.version}|${rest.type}|${rest.description}|${library}`;
            if (!seen.has(key)) {
                seen.add(key);
                output.push({ ...rest, library });
            }
        }
    }

    return output;
}

async function main(): Promise<void> {
    const basePath = resolve(__dirname, '../../../../');
    const isDryRun = process.argv.includes('--dry-run');

    const entries = await buildChangelogs(basePath);

    if (isDryRun) {
        try {
            const existing = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8')) as ChangelogEntry[];
            if (existing.length !== entries.length) {
                console.error(`STALE: changelogs.json (${existing.length} → ${entries.length} entries)`);
                console.error('\nRun `nx run mcp-server:extract-changelogs` to update.');
                process.exit(1);
            }
            console.log(`changelogs.json is up to date (${entries.length} entries).`);
        } catch {
            console.error('MISSING: changelogs.json');
            console.error('\nRun `nx run mcp-server:extract-changelogs` to update.');
            process.exit(1);
        }
        return;
    }

    await mkdir(resolve(__dirname, '../data'), { recursive: true });
    await writeFile(OUTPUT_PATH, JSON.stringify(entries, null, 2), 'utf-8');
    console.log(`changelogs.json: ${entries.length} deduplicated entries`);
    console.log(`Output: ${OUTPUT_PATH}`);
}

if (require.main === module) {
    main().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
