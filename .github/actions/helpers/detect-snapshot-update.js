const { execFileSync } = require('child_process');
const fs = require('fs');

const DARWIN_SNAPSHOT_PREFIX = 'apps/e2e-harness/e2e/snapshots/darwin/';

/**
 * Detect whether any of the given changed paths represents a darwin
 * Playwright snapshot update.
 *
 * The check is a literal `startsWith` on `DARWIN_SNAPSHOT_PREFIX` — no globbing
 * — and matches only entries that are *under* the darwin snapshot folder
 * (note the trailing slash on the prefix).
 *
 * - `'apps/e2e-harness/e2e/snapshots/darwin/chromium/foo.png'` -> match
 * - `'apps/e2e-harness/e2e/snapshots/linux/chromium/foo.png'`  -> no match
 * - `'apps/e2e-harness/e2e/snapshots/darwin'` (no trailing slash) -> no match
 * - `'libs/core/apps/e2e-harness/e2e/snapshots/darwin/foo.png'` -> no match (prefix not at start)
 *
 * @param {string[]} changedPaths - Array of file paths from `git diff --name-only`.
 * @returns {{ update: '0' | '1' }} - `'1'` when at least one darwin snapshot path is present, `'0'` otherwise.
 */
function detectSnapshotUpdate(changedPaths) {
    if (!Array.isArray(changedPaths) || changedPaths.length === 0) {
        return { update: '0' };
    }
    const hasDarwin = changedPaths.some((p) => typeof p === 'string' && p.startsWith(DARWIN_SNAPSHOT_PREFIX));
    return { update: hasDarwin ? '1' : '0' };
}

module.exports = detectSnapshotUpdate;
module.exports.detectSnapshotUpdate = detectSnapshotUpdate;
module.exports.DARWIN_SNAPSHOT_PREFIX = DARWIN_SNAPSHOT_PREFIX;

// CLI entrypoint: when executed as `node detect-snapshot-update.js`, resolve
// the list of changed paths via `git diff --name-only` and write
// `update=0` / `update=1` either to $GITHUB_OUTPUT or to stdout.
if (require.main === module) {
    const { BASE_SHA, HEAD_SHA } = process.env;

    /**
     * Run `git diff --name-only <args>` and return its trimmed lines, or `null`
     * on any failure (so the caller can fall back / treat as "no changes").
     */
    function runGitDiff(args) {
        try {
            const out = execFileSync('git', ['diff', '--name-only', ...args], {
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe']
            });
            return out
                .split('\n')
                .map((l) => l.trim())
                .filter((l) => l.length > 0);
        } catch (e) {
            return null;
        }
    }

    let changedPaths = null;

    if (BASE_SHA && HEAD_SHA) {
        // Three-dot range: diff against the merge-base. Matches the
        // `detect-scope` job in the same workflow.
        changedPaths = runGitDiff([`${BASE_SHA}...${HEAD_SHA}`]);
    }

    if (changedPaths === null) {
        // Fallback: last commit only (e.g. workflow_dispatch with no PR context).
        changedPaths = runGitDiff(['HEAD~1', 'HEAD']);
    }

    if (changedPaths === null) {
        // Even that failed (shallow checkout, brand-new repo, etc.) — treat
        // as "no changes" rather than throwing.
        changedPaths = [];
    }

    const { update } = detectSnapshotUpdate(changedPaths);
    const line = `update=${update}\n`;

    if (process.env.GITHUB_OUTPUT) {
        fs.appendFileSync(process.env.GITHUB_OUTPUT, line);
    } else {
        process.stdout.write(line);
    }

    if (update === '1') {
        // GitHub Actions notice annotation — visible in the run summary.
        console.log('::notice::darwin snapshot changes detected — Playwright will run with --update-snapshots');
    }
}
