const VERSION_REGEX = /^(\d+)\.(\d+)\.?(\d+)?(-[a-zA-Z0-9-.]+)?$/;

/**
 * @hidden
 * Utility function to process `@fundamental-ngx` package version. Supports only strict versions.
 * Based on provided input returns the closest version, that is "frozen" on the minor level.
 *
 * Is needed to address the issue with stackblitz not able to retrieve the recently published version.
 * Refer https://github.com/stackblitz/core/issues/624 for extra details.
 *
 * @example
 * ```
 * parseVersion("0.32.1") // "~0.32"
 * parseVersion("0.32.1-rc.1") // "~0.32"
 * parseVersion("0.32.0-rc.1") // "~0.31" - returning the closest previous version
 * ```
 */
export function parseVersion(versionInput: string): string {
    const matched = versionInput?.match(VERSION_REGEX);
    if (!matched || matched.length < 3) {
        throw new Error(`Could not resolve version from ${versionInput?.toString()}`);
    }
    const [, major, minor, patch, extra] = matched;

    let updatedMinor = +minor;

    if (extra || +patch === 0) {
        // If provided version is a release candidate or it has no previous patch versions, return the closest previous version
        if (updatedMinor > 0) {
            updatedMinor--;
        } else {
            return `^${+major - 1}`;
        }
    }

    return `~${major}.${updatedMinor}`;
}
