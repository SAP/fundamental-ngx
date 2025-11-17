import { logger } from '@nx/devkit';
import { readFileSync } from 'fs';
import * as process from 'process';
import { major, parse } from 'semver';

const getVersions = () => {
    const packageJson = JSON.parse(readFileSync(`./package.json`, 'utf8'));
    const lernaJson = JSON.parse(readFileSync(`./lerna.json`, 'utf8'));

    logger.info(
        `🔍 [sync-versions] Environment FD_ENV_VERSION_PLACEHOLDER: ${process.env.FD_ENV_VERSION_PLACEHOLDER || 'NOT SET'}`
    );
    logger.info(`🔍 [sync-versions] Lerna.json version: ${lernaJson.version}`);

    // Try to get version from environment variable, lerna.json, or fallback to reading from a source package.json
    let currentVersion = process.env.FD_ENV_VERSION_PLACEHOLDER || lernaJson.version;
    let versionSource = 'lerna.json';

    if (process.env.FD_ENV_VERSION_PLACEHOLDER) {
        versionSource = 'environment variable';
        logger.info(`✅ [sync-versions] Using version from environment variable: ${currentVersion}`);
    } else {
        logger.info(`⚠️ [sync-versions] Environment variable not set, using lerna.json: ${currentVersion}`);

        // If environment variable is not set, try reading from an actual package that was updated by lerna
        try {
            const corePackageJson = JSON.parse(readFileSync(`./libs/core/package.json`, 'utf8'));
            if (corePackageJson.version && corePackageJson.version !== currentVersion) {
                logger.info(
                    `🔍 [sync-versions] Core package.json version: ${corePackageJson.version} (different from lerna.json: ${currentVersion})`
                );
                currentVersion = corePackageJson.version;
                versionSource = 'core package.json';
                logger.info(`✅ [sync-versions] Updated to use core package.json version: ${currentVersion}`);
            } else {
                logger.info(
                    `🔍 [sync-versions] Core package.json version matches lerna.json: ${corePackageJson.version}`
                );
            }
        } catch (e) {
            logger.warn(`❌ [sync-versions] Could not read core package.json, fallback to lerna.json: ${e.message}`);
        }
    }

    logger.info(`🎯 [sync-versions] Final VERSION_PLACEHOLDER will be: ${currentVersion} (source: ${versionSource})`);

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
    const verboseLogging = process.env.NX_VERBOSE_LOGGING === 'true';
    const versions = getVersions(); // Get versions dynamically each time

    logger.info(`📁 [sync-versions] Processing file: ${file}`);

    let replacements = 0;
    Object.keys(versions).forEach((key) => {
        const regex = new RegExp(`(FD_ENV_)?${key}`, 'g');
        const matches = fileContents.match(regex);
        if (matches) {
            const matchCount = matches.filter((m) => !m.startsWith('FD_ENV_')).length;
            if (matchCount > 0) {
                logger.info(`🔄 [sync-versions] Found ${matchCount} occurrences of "${key}" in ${file}`);
            }

            fileContents = fileContents.replace(regex, (substring) => {
                if (substring.startsWith('FD_ENV_')) {
                    return substring;
                }
                replacements++;
                const replacement = versions[key];
                if (verboseLogging || key === 'VERSION_PLACEHOLDER') {
                    logger.info(`✅ [sync-versions] Replaced "${key}" with "${replacement}" in ${file}`);
                }
                return replacement;
            });
        }
    });

    if (replacements === 0) {
        logger.info(`ℹ️ [sync-versions] No replacements made in ${file}`);
    } else {
        logger.info(`✨ [sync-versions] Made ${replacements} total replacements in ${file}`);
    }

    return fileContents;
};
