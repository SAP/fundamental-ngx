import { mkdir, rm, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { buildChangelogs, resolveLibraries } from './build-changelogs';

// ---------------------------------------------------------------------------
// resolveLibraries
// ---------------------------------------------------------------------------

describe('resolveLibraries', () => {
    it('should resolve a single known scope to one library', () => {
        expect(resolveLibraries('core')).toEqual(['@fundamental-ngx/core']);
    });

    it('should resolve comma-separated scopes to all matching libraries', () => {
        expect(resolveLibraries('core,platform')).toEqual(['@fundamental-ngx/core', '@fundamental-ngx/platform']);
    });

    it('should handle spaces after commas', () => {
        expect(resolveLibraries('core, platform, cdk')).toEqual([
            '@fundamental-ngx/core',
            '@fundamental-ngx/platform',
            '@fundamental-ngx/cdk'
        ]);
    });

    it('should ignore unrecognised tokens and include only known libraries', () => {
        const libs = resolveLibraries('docs, platform, core, cdk');
        expect(libs).toEqual(['@fundamental-ngx/platform', '@fundamental-ngx/core', '@fundamental-ngx/cdk']);
        expect(libs).not.toContain('@fundamental-ngx/docs');
    });

    it('should deduplicate when the same alias appears twice', () => {
        expect(resolveLibraries('ui5, ui5')).toEqual(['@fundamental-ngx/ui5-webcomponents']);
    });

    it('should fall back to @fundamental-ngx/<first-token> when no token is recognised', () => {
        expect(resolveLibraries('unknown-scope')).toEqual(['@fundamental-ngx/unknown-scope']);
    });

    it('should resolve the mcp extra scope', () => {
        expect(resolveLibraries('mcp')).toEqual(['@fundamental-ngx/mcp']);
    });

    it('should fall back using only the first token when all tokens are unknown', () => {
        expect(resolveLibraries('foo, bar')).toEqual(['@fundamental-ngx/foo']);
    });
});

// ---------------------------------------------------------------------------
// buildChangelogs integration
// ---------------------------------------------------------------------------

const TEMP_DIR = resolve(__dirname, '../../__test_tmp_build_changelogs__');

// Simulates what NX Release writes: the same changelog in every library's file.
const MULTI_SCOPE_CHANGELOG = `## 0.62.0 (2026-04-01)

### 🩹 Fixes

- **core,platform:** fix shared form alignment ([#100](https://github.com/SAP/fundamental-ngx/pull/100))

### 🚀 Features

- **core:** add new button type ([#101](https://github.com/SAP/fundamental-ngx/pull/101))
`;

beforeAll(async () => {
    await mkdir(resolve(TEMP_DIR, 'libs/core'), { recursive: true });
    await mkdir(resolve(TEMP_DIR, 'libs/platform'), { recursive: true });
    // NX Release writes the full commit set to every library's CHANGELOG.md
    await writeFile(resolve(TEMP_DIR, 'libs/core/CHANGELOG.md'), MULTI_SCOPE_CHANGELOG);
    await writeFile(resolve(TEMP_DIR, 'libs/platform/CHANGELOG.md'), MULTI_SCOPE_CHANGELOG);
});

afterAll(async () => {
    try {
        await rm(TEMP_DIR, { recursive: true, force: true });
    } catch {
        // ignore cleanup errors
    }
});

describe('buildChangelogs', () => {
    it('should expand a multi-library scope into one entry per library', async () => {
        const entries = await buildChangelogs(TEMP_DIR);
        const fixEntries = entries.filter((e) => e.description.includes('form alignment'));

        expect(fixEntries).toHaveLength(2);
        const libraries = fixEntries.map((e) => e.library).sort();
        expect(libraries).toEqual(['@fundamental-ngx/core', '@fundamental-ngx/platform']);
    });

    it('should not produce duplicate entries for the same library+version+description', async () => {
        const entries = await buildChangelogs(TEMP_DIR);
        // Both core and platform CHANGELOG.md files contain the same fix entry,
        // but dedup should keep only one per library.
        const coreFixEntries = entries.filter(
            (e) => e.library === '@fundamental-ngx/core' && e.description.includes('form alignment')
        );
        expect(coreFixEntries).toHaveLength(1);
    });

    it('should not include a component field on any output entry', async () => {
        const entries = await buildChangelogs(TEMP_DIR);
        for (const entry of entries) {
            expect(entry).not.toHaveProperty('component');
        }
    });

    it('should produce a single-library entry for single-scope commits', async () => {
        const entries = await buildChangelogs(TEMP_DIR);
        const featureEntries = entries.filter((e) => e.description.includes('new button type'));

        expect(featureEntries).toHaveLength(1);
        expect(featureEntries[0].library).toBe('@fundamental-ngx/core');
    });
});
