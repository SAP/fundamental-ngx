import { logger, ProjectConfiguration } from '@nx/devkit';
import { readFileSync, writeFileSync } from 'fs-extra';
import { glob } from 'glob';
import { major, minor, parse } from 'semver';
import { PrepareOptions } from './prepare.options';

const packageJson = JSON.parse(readFileSync(`./package.json`, 'utf8'));
const lernaJson = JSON.parse(readFileSync(`./lerna.json`, 'utf8'));
const excludedFilesPatterns = ['md', 'mjs', 'map', 'ts'].map((fileType) => `**/*.${fileType}`);

const aboveMinorVersion = (version) => {
    const parsed = parse(version);
    return `^${parsed!.major}.${parsed!.minor}.0`;
};

const angularVersion =
    (packageJson.dependencies['@angular/core'] || packageJson.devDependencies['@angular/core'] || '').match(
        /\d+\.\d+\.\d+/
    )?.[0] || '';

const versions = {
    VERSION_PLACEHOLDER: lernaJson.version,
    // As Angular version listed as peerDependency it should be ^X.0.0 to support any minor version
    ANGULAR_VER_PLACEHOLDER: `^${major(angularVersion)}.${minor(angularVersion)}.0`,
    RXJS_VER_PLACEHOLDER: aboveMinorVersion(packageJson.dependencies.rxjs),
    FAST_DEEP_EQUAL_VER_PLACEHOLDER: packageJson.dependencies['fast-deep-equal'],
    FDSTYLES_VER_PLACEHOLDER: packageJson.dependencies['fundamental-styles'],
    FDCXSTYLES_VER_PLACEHOLDER: packageJson.dependencies['@fundamental-styles/cx'],
    FOCUSTRAP_VER_PLACEHOLDER: aboveMinorVersion(packageJson.dependencies['focus-trap']),
    FOCUSVISIBLE_VER_PLACEHOLDER: aboveMinorVersion(packageJson.dependencies['focus-visible']),
    LODASH_ES_VER_PLACEHOLDER: aboveMinorVersion(packageJson.dependencies['lodash-es']),
    COMPARE_VERSIONS_VER_PLACEHOLDER: aboveMinorVersion(packageJson.dependencies['compare-versions']),
    DAYJS_VER_PLACEHOLDER: aboveMinorVersion(packageJson.dependencies.dayjs),
    THEMING_VER_PLACEHOLDER: aboveMinorVersion(packageJson.dependencies['@sap-theming/theming-base-content']),
    MESSAGEFORMAT_VER_PLACEHOLDER: aboveMinorVersion(packageJson.dependencies['intl-messageformat'])
};

const transformOverrideParamToPlaceholderKey = (param: string): keyof typeof versions => {
    if (param === 'projectVersion') {
        return 'VERSION_PLACEHOLDER';
    }
    throw new Error(`${param} does not match any available mapping`);
};

export async function syncVersions(
    targetOptions: PrepareOptions,
    projectConfig: ProjectConfiguration,
    versionOverrides: Record<string, string> = {},
    projectName: string
): Promise<void> {
    logger.info(`=== Syncing versions in ${projectName} ===`);
    const { distPath } = targetOptions;
    const versionsDictionary = {
        ...versions,
        ...Object.keys(versionOverrides)
            .filter((k) => !!versionOverrides[k])
            .reduce((acc, next) => {
                acc[transformOverrideParamToPlaceholderKey(next)] = versionOverrides[next];
                return acc;
            }, {})
    };
    const replaced = getFiles(distPath)
        .map((filePath) => replaceInFile(filePath, versionsDictionary))
        .filter(Boolean);
    if (replaced.length === 0) {
        logger.warn(`⚠ No version placeholders found in ${projectName}`);
        return;
    }
}

const replaceInFile = (file: string, versionsDictionary: Record<string, string>) => {
    let fileContents = readFileSync(file, 'utf8');
    let replaced = false;
    Object.keys(versionsDictionary).forEach((key) => {
        while (fileContents.indexOf(key) > -1) {
            replaced = true;
            fileContents = fileContents.replace(key, versionsDictionary[key]);
            logger.info(`✅ Replaced "${key}" with "${versionsDictionary[key]}" in ${file}`);
        }
        writeFileSync(file, fileContents);
    });
    return replaced;
};

const getFiles = (dir: string) =>
    glob.sync(`${dir}/**/*.*`, {
        ignore: excludedFilesPatterns
    });
