import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { ChangelogEntry, Library } from '../types/component-metadata';

interface LibraryConfig {
    path: string;
    library: Library;
}

const LIBRARY_CHANGELOGS: LibraryConfig[] = [
    { path: 'libs/core/CHANGELOG.md', library: '@fundamental-ngx/core' },
    { path: 'libs/platform/CHANGELOG.md', library: '@fundamental-ngx/platform' },
    { path: 'libs/btp/CHANGELOG.md', library: '@fundamental-ngx/btp' },
    { path: 'libs/cx/CHANGELOG.md', library: '@fundamental-ngx/cx' },
    { path: 'libs/cdk/CHANGELOG.md', library: '@fundamental-ngx/cdk' },
    { path: 'libs/i18n/CHANGELOG.md', library: '@fundamental-ngx/i18n' }
];

/**
 * Extract changelog entries from all library CHANGELOG.md files.
 * Parses conventional-changelog format into structured entries.
 */
export async function extractChangelogs(basePath: string): Promise<ChangelogEntry[]> {
    const allEntries: ChangelogEntry[] = [];

    for (const config of LIBRARY_CHANGELOGS) {
        try {
            const content = await readFile(resolve(basePath, config.path), 'utf-8');
            const entries = parseChangelog(content, config.library);
            allEntries.push(...entries);
        } catch {
            // CHANGELOG.md may not exist for all libraries
        }
    }

    return allEntries;
}

/**
 * Parse a CHANGELOG.md into structured entries.
 *
 * Supports two formats:
 *
 * Lerna (pre-0.58):
 * ```
 * # [0.58.0-rc.25](url) (2025-11-26)
 * ### Bug Fixes
 * * **core:** description (#1234) (hash)
 * ### Features
 * * **platform:** description (#1234) (hash)
 * ### BREAKING CHANGES
 * * **core:** description
 * ```
 *
 * NX Release (0.58+):
 * ```
 * ## 0.62.0-rc.67 (2026-04-11)
 * ### 🩹 Fixes
 * - **core:** description ([#1234](url))
 * ### 🚀 Features
 * - **platform:** description ([#1234](url))
 * ### ⚠️  Breaking Changes
 * - **core:** description
 * ```
 */
function parseChangelog(content: string, library: Library): ChangelogEntry[] {
    const entries: ChangelogEntry[] = [];
    const lines = content.split('\n');

    let currentVersion = '';
    let currentSection: 'fix' | 'feature' | 'breaking' | 'deprecation' | null = null;

    for (const line of lines) {
        // Version header - Lerna: # [0.58.0-rc.25](url) (date)
        const lernaVersionMatch = line.match(/^#\s+\[([^\]]+)\]/);
        if (lernaVersionMatch) {
            currentVersion = lernaVersionMatch[1];
            currentSection = null;
            continue;
        }

        // Version header - NX: ## 0.62.0-rc.67 (date)
        const nxVersionMatch = line.match(/^## (\d+\.\d+\.\d+(?:-[^\s]+)?)\s+\(/);
        if (nxVersionMatch) {
            currentVersion = nxVersionMatch[1];
            currentSection = null;
            continue;
        }

        // Section header - matches both Lerna ("Bug Fixes", "Features") and NX ("🩹 Fixes", "🚀 Features")
        if (line.match(/^###?\s+(?:🩹\s+)?(?:Bug )?Fixes/i)) {
            currentSection = 'fix';
            continue;
        }
        if (line.match(/^###?\s+(?:🚀\s+)?Features/i)) {
            currentSection = 'feature';
            continue;
        }
        if (line.match(/^###?\s+(?:⚠️\s+)?Breaking Change/i)) {
            currentSection = 'breaking';
            continue;
        }
        if (line.match(/^###?\s+Deprecat/i)) {
            currentSection = 'deprecation';
            continue;
        }

        // Entry line - Lerna: * **scope:** desc  |  NX: - **scope:** desc
        if (currentSection && currentVersion) {
            const entryMatch = line.match(/^[-*]\s+(?:⚠️\s+)?\*\*([^*:]+):\*\*\s+(.+)/);
            if (entryMatch) {
                const scope = entryMatch[1].trim();
                const rawDescription = entryMatch[2]
                    .replace(/\s*\(\[[\da-f]+\]\([^)]+\)\)$/, '') // Remove commit hash link (Lerna)
                    .replace(/\s*\(\[#\d+\]\([^)]+\)\)$/, '') // Remove PR link (NX)
                    .replace(/\s*\(#\d+\)/, '') // Remove bare issue reference
                    .trim();

                entries.push({
                    library,
                    version: currentVersion,
                    type: currentSection,
                    description: rawDescription,
                    component: scope !== library.split('/')[1] ? scope : undefined
                });
            }
        }
    }

    return entries;
}
