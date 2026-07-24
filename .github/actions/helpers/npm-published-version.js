const { execFileSync } = require('child_process');
const semver = require('semver');

/**
 * npm package names published by the release pipeline. Kept in sync with
 * RELEASE_PACKAGES in create-release.yml. Note: `mcp-server` publishes as
 * `@fundamental-ngx/mcp`.
 */
const RELEASE_PACKAGE_NAMES = [
    '@fundamental-ngx/i18n',
    '@fundamental-ngx/cdk',
    '@fundamental-ngx/core',
    '@fundamental-ngx/platform',
    '@fundamental-ngx/moment-adapter',
    '@fundamental-ngx/datetime-adapter',
    '@fundamental-ngx/cx',
    '@fundamental-ngx/btp',
    '@fundamental-ngx/ui5-webcomponents-base',
    '@fundamental-ngx/ui5-webcomponents',
    '@fundamental-ngx/ui5-webcomponents-fiori',
    '@fundamental-ngx/ui5-webcomponents-ai',
    '@fundamental-ngx/mcp'
];

/** Per-package hard cap so a dead/slow registry degrades in seconds, not minutes. */
const NPM_VIEW_TIMEOUT_MS = 15000;

/**
 * Highest valid version among a package's `prerelease` / `latest` dist-tags,
 * or null if it can't be read. Uses execFileSync with an argv array (no shell)
 * to avoid any injection surface.
 *
 * @param {string} packageName
 * @param {string} registry
 * @returns {string | null}
 */
function highestPublishedForPackage(packageName, registry) {
    try {
        // --fetch-retries=0 and a short --fetch-timeout make a registry outage
        // fail fast (npm would otherwise retry with backoff for minutes).
        const args = ['view', packageName, 'dist-tags', '--json', '--fetch-retries=0', '--fetch-timeout=10000'];
        if (registry) {
            args.push('--registry', registry);
        }
        const raw = execFileSync('npm', args, {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe'],
            timeout: NPM_VIEW_TIMEOUT_MS
        }).trim();

        if (!raw) {
            return null;
        }

        const distTags = JSON.parse(raw);
        const candidates = [distTags.prerelease, distTags.latest].filter((v) => semver.valid(v));

        if (candidates.length === 0) {
            return null;
        }

        return semver.rsort(candidates)[0];
    } catch (e) {
        // Unpublished package, registry error, offline, timeout, malformed JSON.
        // Non-fatal: this package simply does not contribute to the floor.
        console.warn(`Could not read npm dist-tags for ${packageName}: ${e.message}`);
        return null;
    }
}

/**
 * Highest version published to npm across all release packages, or null if none
 * could be read.
 *
 * npm — not git tags — is the authority on "already published". An orphaned
 * release commit hides its tag from `git tag --merged HEAD`, so the resolver
 * would recompute an already-published version and 403. Used as a version floor
 * to make that impossible. The max spans all packages to catch partial-publish
 * drift. Best-effort: a total npm outage returns null and never blocks releases.
 *
 * @param {string} [registry] - Optional registry URL (defaults to npm's configured one)
 * @returns {string | null} - Highest published version, or null
 */
module.exports = (registry = null) => {
    const versions = RELEASE_PACKAGE_NAMES.map((name) => highestPublishedForPackage(name, registry)).filter((v) =>
        semver.valid(v)
    );

    if (versions.length === 0) {
        console.log('No npm-published versions could be resolved; skipping npm floor.');
        return null;
    }

    return semver.rsort(versions)[0];
};

module.exports.RELEASE_PACKAGE_NAMES = RELEASE_PACKAGE_NAMES;
