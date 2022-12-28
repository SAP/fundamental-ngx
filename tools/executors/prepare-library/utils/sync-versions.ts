import { logger, ProjectConfiguration } from '@nrwl/devkit';
import { readFileSync, writeFileSync } from 'fs-extra';
import { major, minor } from 'semver';
import { PrepareOptions } from './prepare.options';
import { glob } from 'glob';

const packageJson = JSON.parse(readFileSync(`./package.json`, 'utf8'));
const excludedFilesPatterns = ['md', 'mjs', 'map', 'ts'].map((fileType) => `**/*.${fileType}`);

const versions = {
    VERSION_PLACEHOLDER: packageJson.version,
    // As Angular version listed as peerDependency it should be ^X.0.0 to support any minor version
    ANGULAR_VER_PLACEHOLDER: `^${major(packageJson.dependencies['@angular/core'])}.0.0`,
    RXJS_VER_PLACEHOLDER: `^${major(packageJson.dependencies.rxjs)}.${minor(packageJson.dependencies.rxjs)}.0`,
    FAST_DEEP_EQUAL_VER_PLACEHOLDER: packageJson.dependencies['fast-deep-equal'],
    FDSTYLES_VER_PLACEHOLDER: packageJson.dependencies['fundamental-styles'],
    FDNSTYLES_VER_PLACEHOLDER: packageJson.dependencies['@fundamental-styles/fn'],
    FDCXSTYLES_VER_PLACEHOLDER: packageJson.dependencies['@fundamental-styles/cx'],
    FOCUSTRAP_VER_PLACEHOLDER: packageJson.dependencies['focus-trap'],
    FOCUSVISIBLE_VER_PLACEHOLDER: packageJson.dependencies['focus-visible'],
    LODASH_ES_VER_PLACEHOLDER: packageJson.dependencies['lodash-es'],
    COMPARE_VERSIONS_VER_PLACEHOLDER: `^${major(packageJson.dependencies['compare-versions'])}.${minor(
        packageJson.dependencies['compare-versions']
    )}.0`,
    DAYJS_VER_PLACEHOLDER: `^${major(packageJson.dependencies.dayjs)}.${minor(packageJson.dependencies.dayjs)}.0`,
    THEMING_VER_PLACEHOLDER: `^${major(packageJson.dependencies['@sap-theming/theming-base-content'])}.${minor(
        packageJson.dependencies['@sap-theming/theming-base-content']
    )}.0`
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

const getFiles = (dir: string) => {
    return glob.sync(`${dir}/**/*.*`, {
        ignore: excludedFilesPatterns
    });
};
