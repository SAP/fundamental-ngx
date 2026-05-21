// Mock dependencies before requiring the module
jest.mock('child_process');

describe('detect-snapshot-update', () => {
    let detectSnapshotUpdate;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        // Re-require the module under test after resetting (it picks up the mocked deps).
        detectSnapshotUpdate = require('./detect-snapshot-update');
    });

    describe('pure detection function', () => {
        it('returns update=0 for an empty array', () => {
            expect(detectSnapshotUpdate([])).toEqual({ update: '0' });
        });

        it('returns update=0 when only non-snapshot paths are changed', () => {
            expect(detectSnapshotUpdate(['libs/core/button/button.component.ts'])).toEqual({ update: '0' });
        });

        it('returns update=1 when a single darwin snapshot path is changed', () => {
            expect(detectSnapshotUpdate(['apps/e2e-harness/e2e/snapshots/darwin/chromium/foo.png'])).toEqual({
                update: '1'
            });
        });

        it('returns update=1 when a darwin snapshot path is mixed with other changes', () => {
            expect(
                detectSnapshotUpdate([
                    'libs/core/button/button.component.ts',
                    'apps/e2e-harness/e2e/snapshots/darwin/chromium/foo.png',
                    'README.md'
                ])
            ).toEqual({ update: '1' });
        });

        it('returns update=0 when only linux snapshot paths are changed (linux must NOT trigger)', () => {
            expect(
                detectSnapshotUpdate([
                    'apps/e2e-harness/e2e/snapshots/linux/chromium/foo.png',
                    'apps/e2e-harness/e2e/snapshots/linux/chromium/bar.png'
                ])
            ).toEqual({ update: '0' });
        });

        it('returns update=1 when both darwin and linux snapshot paths are changed (darwin entry triggers)', () => {
            expect(
                detectSnapshotUpdate([
                    'apps/e2e-harness/e2e/snapshots/linux/chromium/foo.png',
                    'apps/e2e-harness/e2e/snapshots/darwin/chromium/foo.png'
                ])
            ).toEqual({ update: '1' });
        });

        it('returns update=0 for the near-miss path "apps/e2e-harness/e2e/snapshots/darwin" (no trailing slash, treated as a file)', () => {
            // Documented choice: prefix is `apps/e2e-harness/e2e/snapshots/darwin/`
            // (with trailing slash), so a path that *equals* `darwin` without
            // a trailing slash does not match. This avoids false positives on
            // a hypothetical sibling file or directory named `darwin`.
            expect(detectSnapshotUpdate(['apps/e2e-harness/e2e/snapshots/darwin'])).toEqual({ update: '0' });
        });

        it('returns update=0 when the prefix appears elsewhere in the path (must be at start)', () => {
            expect(detectSnapshotUpdate(['libs/core/apps/e2e-harness/e2e/snapshots/darwin/foo.png'])).toEqual({
                update: '0'
            });
        });

        it('returns update=0 for non-array inputs', () => {
            expect(detectSnapshotUpdate(null)).toEqual({ update: '0' });
            expect(detectSnapshotUpdate(undefined)).toEqual({ update: '0' });
            expect(detectSnapshotUpdate('apps/e2e-harness/e2e/snapshots/darwin/foo.png')).toEqual({
                update: '0'
            });
            expect(detectSnapshotUpdate(0)).toEqual({ update: '0' });
        });

        it('exposes the DARWIN_SNAPSHOT_PREFIX constant', () => {
            expect(detectSnapshotUpdate.DARWIN_SNAPSHOT_PREFIX).toBe('apps/e2e-harness/e2e/snapshots/darwin/');
        });

        it('exposes the named export alongside the default export', () => {
            expect(typeof detectSnapshotUpdate.detectSnapshotUpdate).toBe('function');
            expect(
                detectSnapshotUpdate.detectSnapshotUpdate(['apps/e2e-harness/e2e/snapshots/darwin/chromium/foo.png'])
            ).toEqual({ update: '1' });
        });

        it('ignores non-string entries within the array', () => {
            expect(
                detectSnapshotUpdate([null, undefined, 42, 'apps/e2e-harness/e2e/snapshots/darwin/chromium/foo.png'])
            ).toEqual({ update: '1' });

            expect(detectSnapshotUpdate([null, undefined, 42])).toEqual({ update: '0' });
        });
    });
});
