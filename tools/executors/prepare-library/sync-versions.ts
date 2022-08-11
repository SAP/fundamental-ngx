import { ProjectConfiguration } from '@nrwl/devkit';
import { readdirSync, readFileSync, writeFileSync } from 'fs-extra';

const packageJson = JSON.parse(readFileSync(`./package.json`, 'utf8'));
const excludedFileTypes = ['js', 'mjs', 'map', 'ts'];
const versions = {
    VERSION_PLACEHOLDER: packageJson.version,
    // As Angular version listed as peerDependency it should be ^X.0.0 to support any minor version
    ANGULAR_VER_PLACEHOLDER: `^${packageJson.dependencies['@angular/core'].match(/(.*)1./)[0].concat('.0.0')}`,
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

export async function syncVersions(projectConfig: ProjectConfiguration, projectName: string): Promise<void> {
    const [distFolder] = projectConfig.targets?.build.outputs as string[];
    if (!distFolder) {
        throw new Error(`No dist folder found for project ${projectName}`);
    }
    getFiles(distFolder).forEach(replaceInFile);
}

const replaceInFile = (file: string) => {
    let fileContents = readFileSync(file, 'utf8');
    let replaced = false;
    Object.keys(versions).forEach((key) => {
        while (fileContents.indexOf(key) > -1) {
            replaced = true;
            fileContents = fileContents.replace(key, versions[key]);
        }
    });
    if (replaced) {
        writeFileSync(file, fileContents);
    }
};

const getFiles = (dir: string) => {
    const files = readdirSync(dir, { withFileTypes: true });
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
