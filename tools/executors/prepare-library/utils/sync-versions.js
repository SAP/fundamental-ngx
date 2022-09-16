'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.syncVersions = void 0;
const devkit_1 = require('@nrwl/devkit');
const fs_extra_1 = require('fs-extra');
const semver_1 = require('semver');
const packageJson = JSON.parse((0, fs_extra_1.readFileSync)(`./package.json`, 'utf8'));
const excludedFileTypes = ['js', 'mjs', 'map', 'ts'];
const versions = {
    VERSION_PLACEHOLDER: packageJson.version,
    // As Angular version listed as peerDependency it should be ^X.0.0 to support any minor version
    ANGULAR_VER_PLACEHOLDER: `^${(0, semver_1.major)(packageJson.dependencies['@angular/core'])}.0.0`,
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
const transformOverrideParamToPlaceholderKey = (param) => {
    if (param === 'projectVersion') {
        return 'VERSION_PLACEHOLDER';
    }
    throw new Error(`${param} does not match any available mapping`);
};
async function syncVersions(targetOptions, projectConfig, versionOverrides = {}, projectName) {
    devkit_1.logger.info(`=== Syncing versions in ${projectName} ===`);
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
        devkit_1.logger.warn(`⚠ No version placeholders found in ${projectName}`);
        return;
    }
}
exports.syncVersions = syncVersions;
const replaceInFile = (file, versionsDictionary) => {
    let fileContents = (0, fs_extra_1.readFileSync)(file, 'utf8');
    let replaced = false;
    Object.keys(versionsDictionary).forEach((key) => {
        while (fileContents.indexOf(key) > -1) {
            replaced = true;
            fileContents = fileContents.replace(key, versionsDictionary[key]);
            devkit_1.logger.info(`✅ Replaced "${key}" with "${versionsDictionary[key]}" in ${file}`);
        }
        (0, fs_extra_1.writeFileSync)(file, fileContents);
    });
    return replaced;
};
const getFiles = (dir) => {
    const files = (0, fs_extra_1.readdirSync)(dir, { withFileTypes: true });
    return files
        .filter((file) => excludedFileTypes.every((fileType) => !file.name.endsWith('.' + fileType)))
        .map((file) => {
            if (file.isDirectory()) {
                return getFiles(`${dir}/${file.name}`);
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
//# sourceMappingURL=sync-versions.js.map
