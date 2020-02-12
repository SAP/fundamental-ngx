import * as polyfills from '!raw-loader!./code-example-stack/polyfills.ts';
import * as maints from '!raw-loader!./code-example-stack/main.ts';
import sdk from '@stackblitz/sdk';
import { StackblitzFile } from './interfaces/stackblitz-parameters';
import { StackblitzDependencies } from './stackblitz-dependencies';
import { StackblitzProject } from './interfaces/stackblitz-project';
import { Inject, Injectable } from '@angular/core';
import { Libraries } from '../../utilities/libraries';
import { ExampleFile } from '../code-example/example-file';
import { StackblitzModuleWrapper } from './stackblitz-module-wrapper';

@Injectable()
export class StackblitzService {

    constructor (
        @Inject('CURRENT_LIB') private currentLib: Libraries
    ) {}

    get defaultProjectInfo(): StackblitzProject {
        return {
            files: {
                'src/main.ts': maints.default,
                'src/polyfills.ts': polyfills.default,
                'src/styles.scss': ''
            },
            title: 'Fundamental-NGX Example',
            description: 'Generated for you by fundamental-ngx team',
            template: 'angular-cli',
            tags: ['stackblitz', 'sdk'],
            dependencies: StackblitzDependencies.GetDependencies()
        };
    };

    openCode(exampleFiles: ExampleFile[]): void {

        const defaultProjectInfo = this.defaultProjectInfo;
        const stackBlitzFiles: StackblitzFile[] = [];

        exampleFiles.forEach((example: ExampleFile) => {

            /**
             * Main Component Will be bootstrapped on app module and added to index.html
             * */
            const mainComponent: boolean = exampleFiles.length === 1 || example.main;

            if (example.language === 'html') {

                const _pathHTML = this.getFilePath(example.fileName, 'html');
                defaultProjectInfo.files[_pathHTML] = example.code.default;
                const _pathSCSS = this.getFilePath(example.fileName, 'scss');

                if (example.scssFileCode || !defaultProjectInfo.files[_pathSCSS]) {
                    defaultProjectInfo.files[_pathSCSS] = example.scssFileCode ? example.scssFileCode.default : '';
                }

                if (example.standalone || exampleFiles.length === 1 || example.typescriptFileCode) {
                    // If there is only HTML added, file is standalone or it has typescript code,
                    // the typescript file is added

                    const _pathTS = this.getFilePath(example.fileName, 'ts');

                    if (example.typescriptFileCode) {
                        defaultProjectInfo.files[_pathTS] = example.typescriptFileCode.default;
                    } else {
                        // If there is no TS code provided, typescript file is generated
                        defaultProjectInfo.files[_pathTS] = this.getDefaultTypescriptFile(example.fileName);
                    }

                    stackBlitzFiles.push(
                        this.getStackBlitzTsFile(
                            example,
                            mainComponent
                        )
                    );

                }
            } else if (example.language === 'typescript') {
                const _pathTS = this.getFilePath(example.fileName, 'ts');
                defaultProjectInfo.files[_pathTS] = example.code.default;

                if (example.scssFileCode) {
                    const _pathSCSS = this.getFilePath(example.fileName, 'scss');
                    defaultProjectInfo.files[_pathSCSS] = example.scssFileCode.default;
                }

                stackBlitzFiles.push(
                    this.getStackBlitzTsFile(
                        example,
                        mainComponent
                    )
                );
            }
        });

        defaultProjectInfo.files['src/app/app.module.ts'] = this.getModule(stackBlitzFiles);

        const mainFileSelector: string =  stackBlitzFiles.find(file => file.main) ?
            stackBlitzFiles.find(file => file.main).selector : stackBlitzFiles[0].selector;

        defaultProjectInfo.files['src/index.html'] = `
            <link rel="stylesheet" href="node_modules/fundamental-styles/dist/fonts.css"></link>
            <link rel="stylesheet" href="node_modules/fundamental-styles/dist/icon.css"></link>
            <${mainFileSelector}></${mainFileSelector}>
        `;


        sdk.openProject(<any>defaultProjectInfo);
    }

    private getDefaultTypescriptFile(fileName: string): string {

        const libraryPrefix = this.getLibraryPrefix();
        const componentName: string = this.transformSnakeCaseToPascalCase(fileName);

        return `
import { Component } from '@angular/core';
    @Component({
        selector: '${libraryPrefix}${fileName}',
        templateUrl: './${fileName}.component.html',
        styleUrls: ['./${fileName}.component.scss']
    })
    export class ${componentName} {}`
;
    }

    private getLibraryPrefix(): string {
        if (this.currentLib === 'platform') {
            return 'fdp-';
        } else {
            return 'fd-';
        }
    }

    private getFilePath(fileName: string, extension: string): string {
        return  'src/app/' + this.getFileBasis(fileName) + '.' + extension;
    }

    private getFileBasis(fileName: string): string {
        return fileName + '.component';
    }

    /** this function transform that-word, or that_word to ThatWord */
    private transformSnakeCaseToPascalCase(snakeCase: string): string {
        if (snakeCase) {
            const snakeToCamel = str => str.replace(/([-_]\w)/g, g => g[1].toUpperCase());
            const camelCase = snakeToCamel(snakeCase);
            return camelCase[0].toUpperCase() + camelCase.substr(1);
        } else {
            return '';
        }
    }

    private getStackBlitzTsFile(
        example: ExampleFile,
        mainComponent: boolean
    ): StackblitzFile {

        const path = this.getFilePath(example.fileName, 'ts');
        const componentName = example.component || this.transformSnakeCaseToPascalCase(example.fileName);

        return {
            path: path,
            componentName: componentName,
            basis: this.getFileBasis(example.fileName),
            selector: this.getLibraryPrefix() + example.fileName,
            entryComponent: example.entryComponent,
            main: mainComponent
        };
    }

    private getModule(files: StackblitzFile[]): string {
        return StackblitzModuleWrapper.GetModule(files);
    }
}
