import { Rule, SchematicContext, Tree, chain, externalSchematic, noop } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { hasPackage, getSourceTreePath } from '../utils/package-utils';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import {
    writeToAngularConfig,
    createExtractionFiles,
    replaceLibPaths,
    addLocalizeLib,
    callLocalizeSchematic
} from '../utils/translation-utils';
import { supportedLanguages } from '../utils/supported-languages';

/**
 * ng add schematic that
 * - adds Core and Platform lib and their dependencies to package.json
 * - adds `ng add @fundamental-ngx/core` external schematic to task list
 * - adds `@angular/localize` to package.json
 * - adds `ng add @angular/localize` external schematic to task list
 * - adds lib translations and angular.json locale configurations to host app if no translations available
 * - updates lib translations to host app's translations if available by appending at the end of host app's files
 * - replaces lib source paths with node_modules source paths for lib-related trans units
 * - installs dependent libraries and runs their external schematics
 * @param _options options passed for this schematic
 */
export function ngAdd(_options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        return chain([
            addCoreLib(_options),
            addLocalizeLib(_options),
            readTranslationFiles(_options),
            _options.installations ? callCoreSchematic(_options) : noop(),
            _options.installations ? callLocalizeSchematic(_options) : noop(),
            endInstallTask()
        ]);
    };
}

/**
 * installs `@fundamental-ngx/core` lib and makes call to core's schematic
 * @param options options passed for this schematic
 */
export function callCoreSchematic(options: any): Rule {
    return (_tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding Fundamental NGX Core schematic to tasks');
        const installTaskId = context.addTask(
            new NodePackageInstallTask({
                packageName: '@fundamental-ngx/core'
            })
        );

        // Chain won't work here since we need the externals to be actually installed before we call their schemas
        // This ensures the externals are a dependency of the node install, so they exist when their schemas run.
        context.addTask(new RunSchematicTask('addCoreSchematic', options), [installTaskId]);
        return _tree;
    };
}

/**
 * runs the core library's ng-add schematic
 * @param options options passed for this schematic
 */
export function addCoreSchematic(options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        _context.logger.info('Running core schematics...\n');
        return chain([externalSchematic('@fundamental-ngx/core', 'ng-add', options)]);
    };
}

/**
 * adds the latest versions of core and platform libraries to package.json
 * @param _options options passed for this schematic
 */
function addCoreLib(_options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('***** Adding Platform dependencies to your application *****');
        const dependencies: NodeDependency[] = [];

        if (!hasPackage(tree, '@fundamental-ngx/core')) {
            dependencies.push({
                type: NodeDependencyType.Default,
                version: `latest`,
                name: '@fundamental-ngx/core'
            });
        }

        dependencies.forEach((dependency) => {
            addPackageJsonDependency(tree, dependency);
            console.log(`✅️ Added ${dependency.name} to ${dependency.type} to your application`);
        });

        return tree;
    };
}
/**
 * adds/updates translations to host app if host app opts to have translations added to their app
 * @param options options passed for this schematic
 */
export function readTranslationFiles(options: any): any {
    return async (_tree: Tree, _context: SchematicContext) => {
        const translationPromise = new Promise<Tree>((resolve, reject) => {
            if (options.translations) {
                try {
                    const angularJsonFile = _tree.read('angular.json');

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
                                    _context.logger.info(
                                        'Adding translations for language "' +
                                            language +
                                            '" from ngx/platform to ' +
                                            project
                                    );
                                    // not present, add the language settings to serve and build configurations in angular.json
                                    await writeToAngularConfig(_tree, options, angularJsonFileObject, language);
                                    // create the extraction .xlf files from the platform lib and place in host app's locale folder
                                    await createExtractionFiles(_tree, options, language);
                                }
                            } else {
                                const languageObject = projectObject.architect.build.configurations[language].i18nFile;

                                const hostAppXlfContent = _tree.read(languageObject.toString());
                                if (hostAppXlfContent) {
                                    // merge the extraction .xlf files from the platform lib into the host app's files
                                    await updateExtractionFiles(_tree, options, hostAppXlfContent, language);
                                }
                            }
                            resolve(_tree);
                        });
                    } else {
                        reject('error in promise');
                    }
                } catch (e) {
                    _context.logger.log('info', e + '\n🚫 Failed to add translations correctly.');
                }
            }
        });
        _tree = await translationPromise;
        return _tree;
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
                        hostFile.xliff.file[0].body[0]['trans-unit'].forEach((transUnit: any) => {
                            if (transUnit['$'].id === libTransUnit['$'].id) {
                                // lib trans unit already present in host file, don't add it
                                matchFound = true;
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
    return tree;
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
