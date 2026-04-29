import { mkdir, rm, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { extractChangelogs } from './changelog-extractor';

const TEMP_DIR = resolve(__dirname, '../../__test_tmp_changelog__');

const SAMPLE_CHANGELOG_LERNA = `# [0.57.5](https://github.com/SAP/fundamental-ngx/compare/0.57.5-rc.3...0.57.5) (2025-11-14)

### Bug Fixes

* **core:** fix button alignment issue ([abc1234](https://github.com/SAP/fundamental-ngx/commit/abc1234))
* **core:** resolve dialog focus trap (#14050) ([def5678](https://github.com/SAP/fundamental-ngx/commit/def5678))

### Features

* **core:** add new icon variants (#14055) ([ghi9012](https://github.com/SAP/fundamental-ngx/commit/ghi9012))

### BREAKING CHANGES

* **core:** remove deprecated ButtonType enum

# [0.57.4](https://github.com/SAP/fundamental-ngx/compare/0.57.4-rc.0...0.57.4) (2025-11-10)

### Bug Fixes

* **core:** another fix (#14045) ([jkl3456](https://github.com/SAP/fundamental-ngx/commit/jkl3456))
`;

const SAMPLE_CHANGELOG_NX = `## 0.61.0-rc.2 (2026-04-11)

### 🩹 Fixes

- **core,platform:** migrate popover and menu to Angular signals ([#13886](https://github.com/SAP/fundamental-ngx/pull/13886))

### 🚀 Features

- **core:** add new card layout mode ([#13890](https://github.com/SAP/fundamental-ngx/pull/13890))

### ⚠️  Breaking Changes

- **core,platform:** migrate popover and menu to Angular signals  ([#13886](https://github.com/SAP/fundamental-ngx/pull/13886))
  PopoverBodyComponent.onClose is now an OutputEmitterRef instead of Subject.

## 0.61.0-rc.1 (2026-04-11)

### 🩹 Fixes

- **core:** restore missing popover inputs ([#13976](https://github.com/SAP/fundamental-ngx/pull/13976))

## 0.60.1-rc.7 (2026-04-11)

This was a version bump only for core to align it with other projects, there were no code changes.
`;

const SAMPLE_CHANGELOG = SAMPLE_CHANGELOG_NX + '\n' + SAMPLE_CHANGELOG_LERNA;

beforeAll(async () => {
    await mkdir(resolve(TEMP_DIR, 'libs/core'), { recursive: true });
    await mkdir(resolve(TEMP_DIR, 'libs/platform'), { recursive: true });
    await mkdir(resolve(TEMP_DIR, 'libs/btp'), { recursive: true });
    await mkdir(resolve(TEMP_DIR, 'libs/cx'), { recursive: true });
    await mkdir(resolve(TEMP_DIR, 'libs/cdk'), { recursive: true });
    await mkdir(resolve(TEMP_DIR, 'libs/i18n'), { recursive: true });

    // Write the changelog once for all tests
    await writeFile(resolve(TEMP_DIR, 'libs/core/CHANGELOG.md'), SAMPLE_CHANGELOG);
});

afterAll(async () => {
    try {
        await rm(TEMP_DIR, { recursive: true, force: true });
    } catch {
        // ignore cleanup errors
    }
});

describe('changelog-extractor', () => {
    it('should parse Lerna-format bug fixes', async () => {
        const entries = await extractChangelogs(TEMP_DIR);
        const lernaFixes = entries.filter((e) => e.type === 'fix' && e.version === '0.57.5');

        expect(lernaFixes).toHaveLength(2);
        expect(lernaFixes[0]).toMatchObject({
            library: '@fundamental-ngx/core',
            version: '0.57.5',
            type: 'fix'
        });
    });

    it('should parse NX-format fixes', async () => {
        const entries = await extractChangelogs(TEMP_DIR);
        const nxFixes = entries.filter((e) => e.type === 'fix' && e.version === '0.61.0-rc.2');

        expect(nxFixes).toHaveLength(1);
        expect(nxFixes[0]).toMatchObject({
            library: '@fundamental-ngx/core',
            version: '0.61.0-rc.2',
            type: 'fix',
            component: 'core,platform'
        });
    });

    it('should parse NX-format features', async () => {
        const entries = await extractChangelogs(TEMP_DIR);
        const nxFeatures = entries.filter((e) => e.type === 'feature' && e.version === '0.61.0-rc.2');

        expect(nxFeatures).toHaveLength(1);
        expect(nxFeatures[0]).toMatchObject({
            type: 'feature',
            description: expect.stringContaining('card layout')
        });
    });

    it('should parse NX-format breaking changes', async () => {
        const entries = await extractChangelogs(TEMP_DIR);
        const nxBreaking = entries.filter((e) => e.type === 'breaking' && e.version === '0.61.0-rc.2');

        expect(nxBreaking).toHaveLength(1);
        expect(nxBreaking[0]).toMatchObject({
            type: 'breaking',
            component: 'core,platform'
        });
    });

    it('should parse Lerna-format breaking changes', async () => {
        const entries = await extractChangelogs(TEMP_DIR);
        const lernaBreaking = entries.filter((e) => e.type === 'breaking' && e.version === '0.57.5');

        expect(lernaBreaking).toHaveLength(1);
        expect(lernaBreaking[0]).toMatchObject({
            type: 'breaking',
            description: expect.stringContaining('deprecated')
        });
    });

    it('should parse entries from both formats across multiple versions', async () => {
        const entries = await extractChangelogs(TEMP_DIR);
        const versions = new Set(entries.map((e) => e.version));

        expect(versions).toContain('0.61.0-rc.2');
        expect(versions).toContain('0.61.0-rc.1');
        expect(versions).toContain('0.57.5');
        expect(versions).toContain('0.57.4');
        // bump-only version should have no entries
        expect(versions).not.toContain('0.60.1-rc.7');
    });

    it('should strip PR links from NX-format descriptions', async () => {
        const entries = await extractChangelogs(TEMP_DIR);
        const nxEntries = entries.filter((e) => e.version.startsWith('0.61'));

        for (const entry of nxEntries) {
            expect(entry.description).not.toMatch(/\[#\d+\]/);
        }
    });

    it('should strip commit hash links from Lerna-format descriptions', async () => {
        const entries = await extractChangelogs(TEMP_DIR);
        const lernaEntries = entries.filter((e) => e.version.startsWith('0.57'));

        for (const entry of lernaEntries) {
            expect(entry.description).not.toMatch(/\[[\da-f]+\]/);
        }
    });

    it('should handle missing changelog files gracefully', async () => {
        // Use a dir that only has the core changelog
        const entries = await extractChangelogs(TEMP_DIR);

        // Should not throw — only core has a file, others are silently skipped
        expect(entries).toBeDefined();
        // Core changelog should still be parsed
        expect(entries.length).toBeGreaterThan(0);
    });

    it('should handle empty changelog gracefully', async () => {
        // Create a temp dir with only an empty changelog
        const emptyDir = resolve(TEMP_DIR, '__empty_changelog__');
        await mkdir(resolve(emptyDir, 'libs/core'), { recursive: true });
        await mkdir(resolve(emptyDir, 'libs/platform'), { recursive: true });
        await mkdir(resolve(emptyDir, 'libs/btp'), { recursive: true });
        await mkdir(resolve(emptyDir, 'libs/cx'), { recursive: true });
        await mkdir(resolve(emptyDir, 'libs/cdk'), { recursive: true });
        await mkdir(resolve(emptyDir, 'libs/i18n'), { recursive: true });
        await writeFile(resolve(emptyDir, 'libs/core/CHANGELOG.md'), '');

        const entries = await extractChangelogs(emptyDir);

        expect(entries).toBeDefined();
        expect(entries).toHaveLength(0);
    });
});
