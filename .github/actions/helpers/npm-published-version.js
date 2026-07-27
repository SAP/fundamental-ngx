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

const REGISTRY = 'https://registry.npmjs.org';
const TIMEOUT_S = 10;

/**
 * Highest valid version among a package's `prerelease` / `latest` dist-tags,
 * or null if it can't be read. Uses curl against the npm registry HTTP API —
 * no npm CLI config files, no PATH issues inside composite actions.
 *
 * @param {string} packageName
 * @returns {string | null}
 */
function highestPublishedForPackage(packageName) {
    try {
        // Encode scoped package name: @scope/name -> @scope%2fname
        const encoded = packageName.replace('/', '%2f');
        const url = `${REGISTRY}/${encoded}`;
        const raw = execFileSync('curl', ['--silent', '--fail', '--max-time', String(TIMEOUT_S), '--location', url], {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe'],
            timeout: (TIMEOUT_S + 2) * 1000
        });

        const distTags = JSON.parse(raw)['dist-tags'];
        if (!distTags) {
            return null;
        }

        const candidates = [distTags.prerelease, distTags.latest].filter((v) => semver.valid(v));
        return candidates.length > 0 ? semver.rsort(candidates)[0] : null;
    } catch (e) {
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
 * drift. Best-effort: a total registry outage returns null and never blocks releases.
 *
 * @returns {string | null} - Highest published version, or null
 */
module.exports = () => {
    const versions = RELEASE_PACKAGE_NAMES.map(highestPublishedForPackage).filter((v) => semver.valid(v));

    if (versions.length === 0) {
        console.log('No npm-published versions could be resolved; skipping npm floor.');
        return null;
    }

    return semver.rsort(versions)[0];
};

module.exports.RELEASE_PACKAGE_NAMES = RELEASE_PACKAGE_NAMES;
