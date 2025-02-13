import { logger } from '@nx/devkit';
import { readFileSync } from 'fs';
import * as process from 'process';
import { major, parse } from 'semver';

const packageJson = JSON.parse(readFileSync(`./package.json`, 'utf8'));
const lernaJson = JSON.parse(readFileSync(`./lerna.json`, 'utf8'));

const aboveMinorVersion = (version) => {
    const parsed = parse(version);
    return `^${parsed?.major}.${parsed?.minor}.0`;
};

const angularVersion =
    (packageJson.dependencies['@angular/core'] || packageJson.devDependencies['@angular/core'] || '').match(
        /\d+\.\d+\.\d+/
    )?.[0] || '';

const versions = {
    VERSION_PLACEHOLDER: process.env.FD_ENV_VERSION_PLACEHOLDER || lernaJson.version,
    // As Angular version listed as peerDependency it should be ^X.0.0 to support any minor version
    ANGULAR_VER_PLACEHOLDER: process.env.FD_ENV_ANGULAR_VER_PLACEHOLDER || `^${major(angularVersion)}.0.0`,
    RXJS_VER_PLACEHOLDER: process.env.FD_ENV_RXJS_VER_PLACEHOLDER || aboveMinorVersion(packageJson.dependencies.rxjs),
    FAST_DEEP_EQUAL_VER_PLACEHOLDER:
        process.env.FD_ENV_FAST_DEEP_EQUAL_VER_PLACEHOLDER || packageJson.dependencies['fast-deep-equal'],
    FDSTYLES_VER_PLACEHOLDER:
        process.env.FD_ENV_FDSTYLES_VER_PLACEHOLDER || packageJson.dependencies['fundamental-styles'],
    FDCXSTYLES_VER_PLACEHOLDER:
        process.env.FD_ENV_FDCXSTYLES_VER_PLACEHOLDER || packageJson.dependencies['@fundamental-styles/cx'],
    FOCUSTRAP_VER_PLACEHOLDER:
        process.env.FD_ENV_FOCUSTRAP_VER_PLACEHOLDER || aboveMinorVersion(packageJson.dependencies['focus-trap']),
    FOCUSVISIBLE_VER_PLACEHOLDER:
        process.env.FD_ENV_FOCUSVISIBLE_VER_PLACEHOLDER || aboveMinorVersion(packageJson.dependencies['focus-visible']),
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

export const replaceInFile = (file: string, fileContents: string): string => {
    const verboseLogging = process.env.NX_VERBOSE_LOGGING === 'true';
    Object.keys(versions).forEach((key) => {
        const regex = new RegExp(`(FD_ENV_)?${key}`, 'g');
        const matches = fileContents.match(regex);
        if (matches) {
            fileContents = fileContents.replace(regex, (substring) => {
                if (substring.startsWith('FD_ENV_')) {
                    return substring;
                }
                if (verboseLogging) {
                    logger.info(`✅ Replaced "${key}" with "${versions[key]}" in ${file}`);
                }
                return versions[key];
            });
        }
    });
    return fileContents;
};
