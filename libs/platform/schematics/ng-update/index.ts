import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getSourceTreePath } from '../utils/package-utils';
import {
    writeToAngularConfig,
    createExtractionFiles,
    replaceLibPaths,
    addLocalizeLib
} from '../utils/translation-utils';

/**
 * ng update schematic that will overwrite existing lib translations
 * or add new ones to the host app's translation files
 * Most apps that have an older version of platform lib will not do `ng add` to get the translations, this should
 * ideally be coming from `ng update`. Therefore we mostly do the same things as `ng add` except that we overwrite any
 * existing trans units coming from the lib
 * @param _options options passed for this schematic
 */
export function ngUpdate(_options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        return chain([addLocalizeLib(_options), readTranslationFiles(_options), endInstallTask()]);
    };
}

/**
 * adds/updates translations, including existing ones, to host application's translation files
 * @param options options passed for this schematic
 */
function readTranslationFiles(options: any): any {
    return async (tree: Tree, context: SchematicContext) => {
      const readFilePromise = new Promise<Tree>((resolve, reject) => {
        if (options.translations) {
            try {
                const angularJsonFile = tree.read('angular.json');
                if (angularJsonFile) {
                    const angularJsonFileObject = JSON.parse(angularJsonFile.toString('utf-8'));
                    const project = options.project
                        ? options.project
                        : Object.keys(angularJsonFileObject['projects'])[0];
                    // set default project path
                    if (!options.project) {
                        options.name = project;
                    }
                    const projectObject = angularJsonFileObject.projects[project];
                    // todo get the languages supported from platform, and fetch from a separate file probably
                    const languages = ['ar', 'fr'];

                    let availableLanguages = 0;
                    languages.forEach((language) => {
                        if (projectObject.architect.build.configurations[language]) {
                            availableLanguages++;
                        }
                    });
                    languages.forEach(async (language) => {
                        if (availableLanguages === 0 || languages.length > availableLanguages) {
                            if (!projectObject.architect.build.configurations[language]) {
                                context.logger.info(
                                    'Adding translations for language "' +
                                        language +
                                        '" from ngx/platform to ' +
                                        project
                                );
                                // not present, add the language settings to serve and build configurations in angular.json
                                await writeToAngularConfig(tree, options, angularJsonFileObject, language);
                                // create the extraction .xlf files from the platform lib and place in host app's locale folder
                                await createExtractionFiles(tree, options, language);
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
                }
            } catch (e) {
                context.logger.log('info', e + '\n🚫 Failed to add translations correctly.');
                reject('failed');
            }
        }
      });
      tree = await readFilePromise;
      return tree;
    };
}

/**
 * overwrites existing lib translations
 * or adds new ones to the host app's translation files
 * @param tree the file tree
 * @param options options passed for this schematic
 * @param fileContent the host applications language .xlf file
 * @param language the language for which translations from lib will be applied to
 */
async function updateExtractionFiles(tree: Tree, options: any, fileContent: any, language: string): Promise<void> {
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
                    modifiedLibFile.xliff.file[0].body[0]['trans-unit'].forEach((libTransUnit: any) => {
                        // append trans-unit only if not found
                        let matchFound = false;
                        hostFile.xliff.file[0].body[0]['trans-unit'].forEach((transUnit: any, hostIndex: number) => {
                            if (transUnit['$'].id === libTransUnit['$'].id) {
                                // match found, overwrite existing trans-unit in host app with updated lib trans unit
                                matchFound = true;
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
                    console.log(e + '\n🚫 There was a problem writing to file. ');
                }
            }
        });
    }
}

/**
 *  Runs npm install. Called as the last rule.
 */

function endInstallTask(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
}
