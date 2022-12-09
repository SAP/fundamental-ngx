import sdk from '@stackblitz/sdk';
import { Inject, Injectable } from '@angular/core';
import { StackblitzFile } from './interfaces/stackblitz-parameters';
import { StackblitzDependencies } from './stackblitz-dependencies';
import { StackblitzProject } from './interfaces/stackblitz-project';
import { CURRENT_LIB, Libraries } from '../../utilities';
import { ExampleFile } from '../code-example/example-file';
import { StackblitzModuleWrapper } from './stackblitz-module-wrapper';
import { DocsService } from '../../services/docs.service';
import { getAsset } from '../../getAsset';

interface GeneratedFile {
    path: string;
    code: string;
}

interface GeneratedFiles {
    scss?: GeneratedFile;
    ts?: GeneratedFile;
    html?: GeneratedFile;
}

@Injectable()
export class StackblitzService {
    polyfills: Promise<string>;
    main: Promise<string>;
    styles: Promise<string>;
    tsconfig: Promise<string>;
    angular: Promise<string>;

    constructor(@Inject(CURRENT_LIB) private currentLib: Libraries, private _docsService: DocsService) {
        this.main = getAsset('./stackblitz/example-stack/main.ts');
        this.styles = getAsset('./stackblitz/example-stack/styles.scss');
        this.tsconfig = getAsset('./stackblitz/example-stack/tsconfig.json');
        this.angular = getAsset('./stackblitz/example-stack/angular.json');
        this.polyfills = getAsset('./stackblitz/example-stack/polyfills.ts');
    }

    async defaultProjectInfo(): Promise<StackblitzProject> {
        return {
            files: {
                'src/main.ts': await this.main,
                'src/polyfills.ts': await this.polyfills,
                'src/styles.scss': await this.styles,
                'angular.json': await this.angular,
                /**
                 * We're providing custom tsconfig with "enableIvy": false due to the StackBlitz issue
                 * https://github.com/stackblitz/core/issues/1364
                 */
                'tsconfig.json': await this.tsconfig
            },
            title: 'Fundamental-NGX Example',
            description: 'Generated for you by fundamental-ngx team',
            template: 'angular-cli',
            tags: ['stackblitz', 'sdk'],
            dependencies: StackblitzDependencies.getDependencies(this._docsService.getPackageJson())
        };
    }

    async openCode(exampleFiles: ExampleFile<string>[]): Promise<void> {
        const defaultProjectInfo = await this.defaultProjectInfo();
        const stackBlitzFiles: StackblitzFile[] = [];

        for (const example of exampleFiles) {
            let generatedFiles: GeneratedFiles | undefined;

            /**
             * Main Component Will be bootstrapped on app module and added to index.html
             * */
            const mainComponent: boolean = exampleFiles.length === 1 || !!example.main;

            if (example.language === 'html') {
                generatedFiles = await this.handleHtmlFile(exampleFiles, example);
            } else if (example.language === 'typescript') {
                generatedFiles = await this.handleTsFile(example);
            } else if (example.language === 'scss') {
                generatedFiles = await this.handleScssFile(example);
            } else if (example.path !== undefined) {
                defaultProjectInfo.files[`${example.path}/${example.fileName}.${example.language}`] = example.code;
                continue;
            }

            if (generatedFiles?.html) {
                defaultProjectInfo.files[generatedFiles.html.path] = generatedFiles.html.code;
            }

            const scssFilePath = this.getFilePath(example, 'scss');

            if (generatedFiles?.scss) {
                defaultProjectInfo.files[generatedFiles.scss.path] = generatedFiles.scss.code;
            } else if (!defaultProjectInfo.files[scssFilePath] && this.containsStyleUrls(generatedFiles?.ts)) {
                // Typescript files created by default has got scss file included, so it's mandatory to create
                // Empty scss file, to avoid errors
                defaultProjectInfo.files[scssFilePath] = '';
            }

            if (generatedFiles?.ts) {
                defaultProjectInfo.files[generatedFiles.ts.path] = generatedFiles.ts.code;
                if (!example.pure) {
                    stackBlitzFiles.push(this.getStackBlitzTsFile(example, mainComponent));
                }
            }
        }

        defaultProjectInfo.files['src/app/app.module.ts'] = this.getModule(stackBlitzFiles);

        const mainFileSelector: string =
            stackBlitzFiles.find((file) => file.main)?.selector || stackBlitzFiles[0].selector;

        defaultProjectInfo.files['src/index.html'] = `
<html>
    <head>
        <link rel="stylesheet" href="node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css" />
        <link rel="stylesheet" href="node_modules/fundamental-styles/dist/theming/sap_fiori_3.css" />
        <link rel="stylesheet" href="node_modules/fundamental-styles/dist/fonts.css" />
        <link rel="stylesheet" href="node_modules/fundamental-styles/dist/icon.css" />
    </head>
    <body>
        <${mainFileSelector}></${mainFileSelector}>
    </body>
</html>`;

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
export class ${componentName} {}`;
    }

    private getLibraryPrefix(): string {
        if (this.currentLib === 'platform') {
            return 'fdp-';
        } else {
            return 'fd-';
        }
    }

    private containsStyleUrls(tsFile?: GeneratedFile): boolean {
        if (tsFile && tsFile.code) {
            return tsFile.code.includes('styleUrls');
        } else {
            return false;
        }
    }

    private getFilePath(file: ExampleFile, extension: string): string {
        return 'src/app/' + this.getFileBasis(file) + '.' + extension;
    }

    private getFileBasis(file: ExampleFile): string {
        if (file.service) {
            return file.fileName + '.service';
        }
        if (file.pipe) {
            return file.fileName + '.pipe';
        }
        if (file.pure) {
            return file.fileName + '';
        }
        return file.fileName + '.component';
    }

    /** this function transform that-word, or that_word to ThatWord */
    private transformSnakeCaseToPascalCase(snakeCase: string): string {
        if (snakeCase) {
            const snakeToCamel = (str): string => str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
            const camelCase = snakeToCamel(snakeCase);
            return camelCase[0].toUpperCase() + camelCase.substr(1);
        } else {
            return '';
        }
    }

    private getStackBlitzTsFile(example: ExampleFile, mainComponent: boolean): StackblitzFile {
        const path = this.getFilePath(example, 'ts');
        const componentName = example.component || this.transformSnakeCaseToPascalCase(example.fileName ?? '');

        return {
            path,
            componentName,
            basis: this.getFileBasis(example),
            selector: this.getLibraryPrefix() + example.fileName,
            entryComponent: !!example.entryComponent,
            main: mainComponent,
            service: !!example.service
        };
    }

    private getModule(files: StackblitzFile[]): string {
        return StackblitzModuleWrapper.GetModule(files);
    }

    private async handleHtmlFile(exampleFiles: ExampleFile[], file: ExampleFile<string>): Promise<GeneratedFiles> {
        const generatedFile: GeneratedFiles = {};

        generatedFile.html = {
            path: this.getFilePath(file, 'html'),
            code: file.code
        };

        if (file.scssFileCode) {
            generatedFile.scss = {
                path: this.getFilePath(file, 'scss'),
                code: typeof file.scssFileCode === 'string' ? file.scssFileCode || '' : await file.scssFileCode
            };
        }

        // If there is only HTML added, file is standalone or it has typescript code,
        // the typescript file is added
        if (this.isStandAlone(exampleFiles, file)) {
            const getCode = async (): Promise<string> => {
                if (!file.typescriptFileCode) {
                    return this.getDefaultTypescriptFile(file.fileName ?? '');
                }
                if (typeof file.typescriptFileCode === 'string') {
                    return file.typescriptFileCode;
                }
                return file.typescriptFileCode;
            };
            generatedFile.ts = {
                path: this.getFilePath(file, 'ts'),
                code: await getCode()
            };
        }
        return generatedFile;
    }

    private async handleTsFile(file: ExampleFile<string>): Promise<GeneratedFiles> {
        const generatedFile: GeneratedFiles = {};

        if (file.scssFileCode) {
            generatedFile.scss = {
                path: this.getFilePath(file, 'scss'),
                code: typeof file.scssFileCode === 'string' ? file.scssFileCode || '' : await file.scssFileCode
            };
        }

        generatedFile.ts = {
            path: this.getFilePath(file, 'ts'),
            code: file.code
        };

        return generatedFile;
    }

    private async handleScssFile(file: ExampleFile<string>): Promise<GeneratedFiles> {
        const generatedFile: GeneratedFiles = {};

        generatedFile.scss = {
            path: this.getFilePath(file, 'scss'),
            code: file.code
        };

        return generatedFile;
    }

    private isStandAlone(exampleFiles: ExampleFile[], file: ExampleFile): boolean {
        return !!(file.standalone || exampleFiles.length === 1 || file.typescriptFileCode);
    }
}
