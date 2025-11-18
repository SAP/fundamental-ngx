import { readFileSync } from 'fs';
import * as process from 'process';
import { major, parse } from 'semver';

const getVersions = () => {
    const packageJson = JSON.parse(readFileSync(`./package.json`, 'utf8'));
    const lernaJson = JSON.parse(readFileSync(`./lerna.json`, 'utf8'));

    // Try to get version from environment variable, lerna.json, or fallback to reading from a source package.json
    let currentVersion = process.env.FD_ENV_VERSION_PLACEHOLDER || lernaJson.version;

    if (!process.env.FD_ENV_VERSION_PLACEHOLDER) {
        // If environment variable is not set, try reading from an actual package that was updated by lerna
        try {
            const corePackageJson = JSON.parse(readFileSync(`./libs/core/package.json`, 'utf8'));
            if (corePackageJson.version && corePackageJson.version !== currentVersion) {
                currentVersion = corePackageJson.version;
            }
        } catch (e) {
            // Fallback to lerna.json version
        }
    }

    const aboveMinorVersion = (version) => {
        const parsed = parse(version);
        return `^${parsed?.major}.${parsed?.minor}.0`;
    };

    const angularVersion =
        (packageJson.dependencies['@angular/core'] || packageJson.devDependencies['@angular/core'] || '').match(
            /\d+\.\d+\.\d+/
        )?.[0] || '';

    return {
        VERSION_PLACEHOLDER: currentVersion,
        // As Angular version listed as peerDependency it should be ^X.0.0 to support any minor version
        ANGULAR_VER_PLACEHOLDER: process.env.FD_ENV_ANGULAR_VER_PLACEHOLDER || `^${major(angularVersion)}.0.0`,
        RXJS_VER_PLACEHOLDER:
            process.env.FD_ENV_RXJS_VER_PLACEHOLDER || aboveMinorVersion(packageJson.dependencies.rxjs),
        FAST_DEEP_EQUAL_VER_PLACEHOLDER:
            process.env.FD_ENV_FAST_DEEP_EQUAL_VER_PLACEHOLDER || packageJson.dependencies['fast-deep-equal'],
        FDSTYLES_VER_PLACEHOLDER:
            process.env.FD_ENV_FDSTYLES_VER_PLACEHOLDER || packageJson.dependencies['fundamental-styles'],
        FDCXSTYLES_VER_PLACEHOLDER:
            process.env.FD_ENV_FDCXSTYLES_VER_PLACEHOLDER || packageJson.dependencies['@fundamental-styles/cx'],
        FOCUSTRAP_VER_PLACEHOLDER:
            process.env.FD_ENV_FOCUSTRAP_VER_PLACEHOLDER || aboveMinorVersion(packageJson.dependencies['focus-trap']),
        FOCUSVISIBLE_VER_PLACEHOLDER:
            process.env.FD_ENV_FOCUSVISIBLE_VER_PLACEHOLDER ||
            aboveMinorVersion(packageJson.dependencies['focus-visible']),
        LODASH_ES_VER_PLACEHOLDER:
            process.env.FD_ENV_LODASH_ES_VER_PLACEHOLDER || aboveMinorVersion(packageJson.dependencies['lodash-es']),
        COMPARE_VERSIONS_VER_PLACEHOLDER:
            process.env.FD_ENV_COMPARE_VERSIONS_VER_PLACEHOLDER ||
            aboveMinorVersion(packageJson.dependencies['compare-versions']),
        DAYJS_VER_PLACEHOLDER:
            process.env.FD_ENV_DAYJS_VER_PLACEHOLDER || aboveMinorVersion(packageJson.dependencies.dayjs),
        THEMING_VER_PLACEHOLDER:
            process.env.FD_ENV_THEMING_VER_PLACEHOLDER ||
            aboveMinorVersion(packageJson.dependencies['@sap-theming/theming-base-content']),
        MESSAGEFORMAT_VER_PLACEHOLDER:
            process.env.FD_ENV_MESSAGEFORMAT_VER_PLACEHOLDER ||
            aboveMinorVersion(packageJson.dependencies['intl-messageformat'])
    };
};

export const replaceInFile = (file: string, fileContents: string): string => {
    const versions = getVersions();

    // Special handling for package.json files to ensure version is correct
    if (file.endsWith('package.json') && process.env.FD_ENV_VERSION_PLACEHOLDER) {
        try {
            const packageData = JSON.parse(fileContents);
            const currentVersion = packageData.version;
            const expectedVersion = process.env.FD_ENV_VERSION_PLACEHOLDER;

            if (currentVersion && currentVersion !== expectedVersion) {
                packageData.version = expectedVersion;
                fileContents = JSON.stringify(packageData, null, 2) + '\n';
            }
        } catch (e) {
            // Could not parse package.json, continue with normal processing
        }
    }

    Object.keys(versions).forEach((key) => {
        const regex = new RegExp(`(FD_ENV_)?${key}`, 'g');
        fileContents = fileContents.replace(regex, (substring) => {
            if (substring.startsWith('FD_ENV_')) {
                return substring;
            }
            return versions[key];
        });
    });

    return fileContents;
};
