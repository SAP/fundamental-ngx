import { SchematicContext } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';

import { getSourceTreePath, getDistPath } from './package-utils';
import { supportedLanguages } from './supported-languages';

/**
 * adds/updates translations to host app if host app opts to have translations added to their app
 * @param options options passed for this schematic
 */
export function readTranslationFiles(options: any): any {
    return async (tree: Tree, context: SchematicContext) => {
        const translationPromise = new Promise<Tree>((resolve, reject) => {
            try {
                const angularJsonFile = tree.read('angular.json');

                if (angularJsonFile) {
                    const angularJsonFileObject = JSON.parse(angularJsonFile.toString('utf-8'));
                    const project = options.project || Object.keys(angularJsonFileObject['projects'])[0];

                    // set default project path
                    if (!options.project) {
                        options.name = project;
                    }

                    const projectObject = angularJsonFileObject.projects[project];
                    // TODO: get the languages supported from platform, and fetch from a separate file probably
                    const languages = supportedLanguages;

                    let availableLanguages = 0;
                    languages.forEach((language) => {
                        if (projectObject.architect.build.configurations[language]) {
                            availableLanguages++;
                        }
                    });

                    languages.forEach(async (language) => {
                        if (availableLanguages === 0 || languages.length > availableLanguages) {
                            if (!projectObject.architect.build.configurations[language]) {
                                // not present, add the language settings to serve and build configurations in angular.json
                                await writeToAngularConfig(tree, options, angularJsonFileObject, language);
                                // create the extraction .xlf files from the platform lib and place in host app's locale folder
                                await createExtractionFiles(tree, options, language);

                                context.logger.info(
                                    '✅️ Added translations for language "' +
                                        language +
                                        '" from ngx/platform to ' +
                                        project
                                );
                            }
                        } else {
                            const languageObject = projectObject.architect.build.configurations[language].i18nFile;
                            const hostAppXlfContent = tree.read(languageObject.toString());

                            if (hostAppXlfContent) {
                                // merge the extraction .xlf files from the platform lib into the host app's files
                                await updateExtractionFiles(tree, options, hostAppXlfContent, language);
                            }
                        }

                        resolve(tree);
                    });
                } else {
                    reject();
                }
            } catch (e) {
                context.logger.info('🚫 Failed to add translations correctly.\n' + e);
            }
        });

        tree = await translationPromise;

        return tree;
    };
}

/**
 * Merges the extraction .xlf files from the platform lib into the host app's files
 * @param tree the file tree
 * @param options options passed for this schematic
 * @param fileContent the host applications language .xlf file
 * @param language the language for which translations from lib will be applied to
 */
async function updateExtractionFiles(tree: Tree, options: any, fileContent: any, language: string): Promise<Tree> {
    const srcPath = await getSourceTreePath(tree, options);
    const libXlfFileContent = tree.read(
        'node_modules/@fundamental-ngx/platform/schematics/locale/' + language + '/messages.' + language + '.xlf'
    );

    if (libXlfFileContent) {
        const builder = new (require('xml2js').Builder)();
        let finalXlfContent: any;

        require('xml2js').parseString(libXlfFileContent.toString(), function (err: any, libFile: any): void {
            if (err) {
                console.log(err);
            }

            // replace lib paths with node_modules paths
            const modifiedLibFile = replaceLibPaths(libFile);

            if (fileContent) {
                // don't simply overwrite, merge here with existing file
                // add the transUnits from lib to this file
                require('xml2js').parseString(fileContent.toString(), function (error: any, hostFile: any): void {
                    if (error) {
                        console.log(error);
                    }

                    // compare the host file with the lib file to check if host file already has some lib trans-units
                    // and append these trans units only if it is not already existing
                    modifiedLibFile.xliff.file[0].body[0]['trans-unit'].forEach((libTransUnit: any) => {
                        // append trans-unit only if not found
                        let matchFound = false;
                        hostFile.xliff.file[0].body[0]['trans-unit'].forEach((transUnit: any, hostIndex: number) => {
                            if (transUnit['$'].id === libTransUnit['$'].id) {
                                // lib trans unit already present in host file, don't add it
                                matchFound = true;
                                // match found, overwrite existing trans-unit in host app with updated lib trans unit
                                hostFile.xliff.file[0].body[0]['trans-unit'][hostIndex] = libTransUnit;
                            }
                        });

                        // if not found, add this trans unit to host file
                        if (!matchFound) {
                            hostFile.xliff.file[0].body[0]['trans-unit'][
                                hostFile.xliff.file[0].body[0]['trans-unit'].length
                            ] = libTransUnit;
                        }
                    });

                    // write modified file as xml object
                    finalXlfContent = builder.buildObject(hostFile);
                });

                try {
                    tree.overwrite(srcPath + '/locale/' + language + '/messages.' + language + '.xlf', finalXlfContent);
                } catch (e) {
                    console.log('🚫 There was a problem with updating translation files.\n' + e);
                }
            }
        });
    }

    return tree;
}

/**
 *
 * @param tree the file tree
 * @param options options passed for this schematic
 * @param angularJsonFileObject the angular.json file
 * @param language the language that will be added to the build and serve configurations
 */
async function writeToAngularConfig(
    tree: Tree,
    options: any,
    angularJsonFileObject: any,
    language: string
): Promise<void> {
    const srcPath = await getSourceTreePath(tree, options);
    const distPath = await getDistPath(tree, options);

    const project = options.project || Object.keys(angularJsonFileObject['projects'])[0];
    const projectObject = angularJsonFileObject.projects[project];

    if (projectObject) {
        // adding build configurations
        const buildConfigObject = projectObject.architect.build.configurations;
        // the output path and i18n file path for host app
        const languageObj = {
            [language]: {
                aot: true,
                outputPath: distPath + '/locale/' + language,
                i18nFile: srcPath + '/locale/' + language + '/messages.' + language + '.xlf',
                i18nFormat: 'xlf',
                i18nLocale: language,
                i18nMissingTranslation: 'error'
            }
        };
        projectObject.architect.build.configurations = Object.assign(buildConfigObject, languageObj);

        // adding serve configurations
        const serveConfigObject = projectObject.architect.serve.configurations;
        const defaultServeConfig = projectObject.architect['extract-i18n'].options.browserTarget;
        const languageServeObj = {
            [language]: {
                browserTarget: defaultServeConfig + ':' + language
            }
        };
        projectObject.architect.serve.configurations = Object.assign(serveConfigObject, languageServeObj);

        try {
            tree.overwrite('angular.json', JSON.stringify(angularJsonFileObject, null, 2));
        } catch (e) {
            console.log('🚫 There was a problem writing to file.\n' + e);
        }
    }
}

/**
 * Creates the extraction .xlf files from the platform lib and place in host app's locale folder
 * @param tree the file tree
 * @param options options passed for this schematic
 * @param language the language for which translations from lib will be applied to
 */
async function createExtractionFiles(tree: Tree, options: any, language: string): Promise<void> {
    const srcPath = await getSourceTreePath(tree, options);
    const libXlfFileContent = tree.read(
        'node_modules/@fundamental-ngx/platform/schematics/locale/' + language + '/messages.' + language + '.xlf'
    );

    if (libXlfFileContent) {
        const builder = new (require('xml2js').Builder)(); // builder that will write back to xml
        let finalXlfContent: any;

        require('xml2js').parseString(libXlfFileContent.toString(), function (err: any, libFile: any): void {
            if (err) {
                console.log(err);
            }

            // replace lib paths with node_modules paths
            const modifiedLibFile = replaceLibPaths(libFile);

            // write modified file as xml object
            finalXlfContent = builder.buildObject(modifiedLibFile);

            try {
                tree.create(srcPath + '/locale/' + language + '/messages.' + language + '.xlf', finalXlfContent);
            } catch (e) {
                console.log('🚫 There was a problem writing to file.\n' + e);
            }
        });
    } else {
        console.log(`Nothing found in lib to write to`);
    }
}

/**
 * Replaces the source path for lib trans-units in the host application's .xlf file to point to node_modules path
 * instead of the platform lib path.
 * i.e replaces ../../libs/platform/src/lib/components/form/text-area/text-area.component.html
 * with node_modules/@fundamental-ngx/platform/lib/components/form/text-area/text-area.component.d.ts
 * @param libFile the .xlf file from the lib where path replacement should happen before being copied to host app's .xlf file
 */
function replaceLibPaths(libFile: any): any {
    const modifiedLibFile = libFile;
    const transUnitsToRemove: string[] = []; // tracks non-platform-lib trans-units

    modifiedLibFile.xliff.file[0].body[0]['trans-unit'].forEach((transUnit: any, index: number) => {
        // transUnit['context-group'][0].context[0]._ resolves to the content of <context context-type="sourcefile"> in .xlf file
        const sourceFileString: string = transUnit['context-group'][0].context[0]._;
        // filtering only platform lib related paths
        if (sourceFileString.includes('libs/platform/src')) {
            // create the new source path from the existing source path
            let newSourcePath = '';
            newSourcePath += 'node_modules/@fundamental-ngx/platform';
            const pathTillLibs = sourceFileString.split('libs/platform/src');
            newSourcePath += pathTillLibs[1];
            // modify from .html to .d.ts
            newSourcePath = newSourcePath.replace('html', 'd.ts');
            transUnit['context-group'][0].context[0]._ = newSourcePath;
            // writes only lib trans units
            modifiedLibFile.xliff.file[0].body[0]['trans-unit'][index] = transUnit;
        } else {
            transUnitsToRemove.push(transUnit['$'].id);
        }
    });

    // remove non-lib related trans-units
    transUnitsToRemove.forEach((element) => {
        const index = modifiedLibFile.xliff.file[0].body[0]['trans-unit'].indexOf(element);
        modifiedLibFile.xliff.file[0].body[0]['trans-unit'].splice(index, 1);
    });

    return modifiedLibFile;
}
