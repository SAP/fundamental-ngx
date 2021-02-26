import { Tree } from '@angular-devkit/schematics/src/tree/interface';

import {
    getSourceTreePath,
    getDistPath,
    hasPackage,
    getPackageVersionFromPackageJson,
    getDefaultProject
} from './package-utils';
import { SchematicContext, Rule, externalSchematic, chain } from '@angular-devkit/schematics';
import { NodeDependency, addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

/**
 * adds `@angular/localize` to package.json as dependency, and adds call to localize schematic to tasks.
 * @param _options options passed for this schematic
 */
export function addLocalizeLib(_options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (_options.translations) {
            context.logger.info('***** Adding @angular/localize to your application *****');
            let ngCoreVersionTag = getPackageVersionFromPackageJson(tree, '@angular/core');
            const tempVersion = ngCoreVersionTag ? ngCoreVersionTag : '9.0.0';
            let majorVersionString = tempVersion.split('.')[0];
            if (majorVersionString.startsWith('~') || majorVersionString.startsWith('^')) {
                majorVersionString = majorVersionString.slice(1, majorVersionString.length);
            }
            const majorVersion: number = parseInt(majorVersionString, 10);
            // placing the first version of localize lib, ideally host app should be upgrading to version > 9.
            if (majorVersion < 9) {
                ngCoreVersionTag = '9.0.0';
            }
            let dependency: NodeDependency;
            if (!hasPackage(tree, '@angular/localize')) {
                dependency = {
                    type: NodeDependencyType.Default,
                    version: `${ngCoreVersionTag}`,
                    name: '@angular/localize'
                };
                addPackageJsonDependency(tree, dependency);
                console.log(`✅️ Added ${dependency.name} to ${dependency.type} to your application`);
            }
        }
        return tree;
    };
}

/**
 * installs `@angular/localize` lib and makes call to the localize schematic
 * @param options options passed for this schematic
 */
export function callLocalizeSchematic(_options: any): any {
    return async (_tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding localize schematic to tasks');
        const installTaskId = context.addTask(
            new NodePackageInstallTask({
                packageName: '@angular/localize'
            })
        );

        // check if project name is available
        if (!_options.project) {
            _options.name = await getDefaultProject(_tree, _options);
        }

        // Calling only chain won't work here since we need the external lib to be actually installed before we call their schemas.
        // This ensures the external lib is a dependency of the node install, so they exist when their schemas run.
        context.addTask(new RunSchematicTask('addLocalizeSchematic', _options), [installTaskId]);
        return _tree;
    };
}

/**
 * runs the localize library's ng-add schematic that will also write to polyfills.ts
 * @param options options passed for this schematic
 */
export function addLocalizeSchematic(options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        _context.logger.info('Running localize schematics...\n');
        return chain([externalSchematic('@angular/localize', 'ng-add', options)]);
    };
}

/**
 *
 * @param tree the file tree
 * @param options options passed for this schematic
 * @param angularJsonFileObject the angular.json file
 * @param language the language that will be added to the build and serve configurations
 */
export async function writeToAngularConfig(
    tree: Tree,
    options: any,
    angularJsonFileObject: any,
    language: string
): Promise<void> {
    const srcPath = await getSourceTreePath(tree, options);
    const distPath = await getDistPath(tree, options);

    const project = options.project ? options.project : Object.keys(angularJsonFileObject['projects'])[0];
    const projectObject = angularJsonFileObject.projects[project];
    if (projectObject) {
        // adding build configurations
        const buildConfigObject = projectObject.architect.build.configurations;
        let languageObj = {};
        let languageServeObj = {};
        // the output path and i18n file path for host app
        languageObj = {
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
        const defaultServeConfig = projectObject.architect.serve.options.browserTarget;
        languageServeObj = {
            [language]: {
                browserTarget: defaultServeConfig + ':' + language
            }
        };
        projectObject.architect.serve.configurations = Object.assign(serveConfigObject, languageServeObj);

        try {
            tree.overwrite('angular.json', JSON.stringify(angularJsonFileObject, null, 2));
        } catch (e) {
            console.log(e + '\n🚫 There was a problem writing to file. ');
        }
    }
}

/**
 * Creates the extraction .xlf files from the platform lib and place in host app's locale folder
 * @param tree the file tree
 * @param options options passed for this schematic
 * @param language the language for which translations from lib will be applied to
 */
export async function createExtractionFiles(tree: Tree, options: any, language: string): Promise<void> {
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
                console.log(e + '\n🚫 There was a problem writing to file. ');
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
export function replaceLibPaths(libFile: any): any {
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
