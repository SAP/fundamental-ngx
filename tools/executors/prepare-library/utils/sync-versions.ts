import { logger, ProjectConfiguration } from '@nrwl/devkit';
import { readdirSync, readFileSync, writeFileSync } from 'fs-extra';
import { major } from 'semver';
import { PrepareOptions } from './prepare.options';

const packageJson = JSON.parse(readFileSync(`./package.json`, 'utf8'));
const excludedFileTypes = ['js', 'mjs', 'map', 'ts'];
const versions = {
    VERSION_PLACEHOLDER: packageJson.version,
    // As Angular version listed as peerDependency it should be ^X.0.0 to support any minor version
    ANGULAR_VER_PLACEHOLDER: `^${major(packageJson.dependencies['@angular/core'])}.0.0`,
    RXJS_VER_PLACEHOLDER: packageJson.dependencies.rxjs,
    FAST_DEEP_EQUAL_VER_PLACEHOLDER: packageJson.dependencies['fast-deep-equal'],
    FDSTYLES_VER_PLACEHOLDER: packageJson.dependencies['fundamental-styles'],
    FDNSTYLES_VER_PLACEHOLDER: packageJson.dependencies['@fundamental-styles/fn'],
    FOCUSTRAP_VER_PLACEHOLDER: packageJson.dependencies['focus-trap'],
    FOCUSVISIBLE_VER_PLACEHOLDER: packageJson.dependencies['focus-visible'],
    LODASH_ES_VER_PLACEHOLDER: packageJson.dependencies['lodash-es'],
    COMPARE_VERSIONS_VER_PLACEHOLDER: packageJson.dependencies['compare-versions'],
    DAYJS_VER_PLACEHOLDER: packageJson.dependencies['dayjs'],
    THEMING_VER_PLACEHOLDER: packageJson.dependencies['@sap-theming/theming-base-content']
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

const getFiles = (dir: string, excludeFileTypes = true) => {
    const files = readdirSync(dir, { withFileTypes: true });
    return files
        .filter((file) =>
            excludeFileTypes ? excludedFileTypes.every((fileType) => !file.name.endsWith('.' + fileType)) : true
        )
        .map((file) => {
            if (file.isDirectory()) {
                return getFiles(`${dir}/${file.name}`, !excludeFileTypes ? false : file.name !== 'schematics');
            }
            return `${dir}/${file.name}`;
        })
        .reduce((acc, next) => {
            if (Array.isArray(next)) {
                return [...acc, ...next];
            }
            acc.push(next);
            return acc;
        }, []);
};
