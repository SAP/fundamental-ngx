import sdk from '@stackblitz/sdk';
import { Inject, Injectable } from '@angular/core';
import { StackblitzFile } from './interfaces/stackblitz-parameters';
import { StackblitzDependencies } from './stackblitz-dependencies';
import { StackblitzProject } from './interfaces/stackblitz-project';
import { CURRENT_LIB, Libraries } from '../../utilities';
import { ExampleFile } from '../code-example/example-file';
import { DocsService } from '../../services/docs.service';
import { getAsset } from '../../getAsset';
import { first, tap, zip } from 'rxjs';

interface GeneratedFile {
    path: string;
    code: string;
}

interface GeneratedFiles {
    scss?: GeneratedFile;
    ts?: GeneratedFile;
    html?: GeneratedFile;
}

export interface StackblitzFileObject {
    path: string;
    name: string;
}

/**
 * Retuens formatted import string.
 */
function getImport(file: StackblitzFileObject): string {
    return `import { ${file.name} } from '${file.path}'`;
}

@Injectable()
export class StackblitzService {
    polyfills: string;
    main: string;
    styles: string;
    tsconfig: string;
    angular: string;

    constructor(@Inject(CURRENT_LIB) private currentLib: Libraries, private _docsService: DocsService) {
        zip(
            getAsset('./stackblitz/example-stack/main.ts'),
            getAsset('./stackblitz/example-stack/styles.scss'),
            getAsset('./stackblitz/example-stack/tsconfig.json'),
            getAsset('./stackblitz/example-stack/angular.json'),
            getAsset('./stackblitz/example-stack/polyfills.ts')
        )
            .pipe(
                first(),
                tap(([main, styles, tsconfig, angular, polyfills]) => {
                    this.main = main;
                    this.styles = styles;
                    this.tsconfig = tsconfig;
                    this.angular = angular;
                    this.polyfills = polyfills;
                })
            )
            .subscribe();
    }

    defaultProjectInfo(): StackblitzProject {
        return {
            files: {
                'src/main.ts': this.main,
                'src/polyfills.ts': this.polyfills,
                'src/styles.scss': this.styles,
                'angular.json': this.angular,
                'tsconfig.json': this.tsconfig
            },
            title: 'Fundamental-NGX Example',
            description: 'Generated for you by fundamental-ngx team',
            template: 'angular-cli',
            tags: ['stackblitz', 'sdk'],
            dependencies: StackblitzDependencies.getDependencies(
                this._docsService.getPackageJson(),
                this._docsService.getLernaJson()
            )
        };
    }

    openCode(exampleFiles: ExampleFile<string, string, string>[]): void {
        const defaultProjectInfo = this.defaultProjectInfo();
        const stackBlitzFiles: StackblitzFile[] = [];

        for (const example of exampleFiles) {
            let generatedFiles: GeneratedFiles | undefined;

            /**
             * Main Component Will be bootstrapped in main.ts and added to index.html
             * */
            const mainComponent: boolean = exampleFiles.length === 1 || !!example.main;

            if (example.language === 'html') {
                generatedFiles = this.handleHtmlFile(exampleFiles, example);
            } else if (example.language === 'typescript') {
                generatedFiles = this.handleTsFile(example);
            } else if (example.language === 'scss') {
                generatedFiles = this.handleScssFile(example);
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

        defaultProjectInfo.files['src/main.ts'] = this.getMainFile(stackBlitzFiles);

        const mainFileSelector: string =
            stackBlitzFiles.find((file) => file.main)?.selector || stackBlitzFiles[0].selector;

        defaultProjectInfo.files['src/index.html'] = `
<html>
    <head>
        <link rel="stylesheet" href="node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css" />
        <link rel="stylesheet" href="node_modules/fundamental-styles/dist/theming/sap_horizon.css" />
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

        // Since we don't know what part of the library is used, import all modules.
        return `
import { Component } from '@angular/core';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

@Component({
    selector: '${libraryPrefix}${fileName}',
    templateUrl: './${fileName}.component.html',
    styleUrls: ['./${fileName}.component.scss'],
    standalone: true,
    imports: [FundamentalNgxCoreModule, FundamentalNgxPlatformModule]
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

    private getMainFile(files: StackblitzFile[]): string {
        // Main component that will be added as a root, if there is no component with main flag, first is chosen
        const mainComponent = files.find((file) => file.main) || files[0];

        return `
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RtlService } from '@fundamental-ngx/cdk/utils';
${getImport({ name: mainComponent.componentName, path: './app/' + mainComponent.basis })};

bootstrapApplication(${mainComponent.componentName}, {
    providers: [provideAnimations(), RtlService]
});`;
    }

    private handleHtmlFile(
        exampleFiles: ExampleFile<string, string, string>[],
        file: ExampleFile<string, string, string>
    ): GeneratedFiles {
        const generatedFile: GeneratedFiles = {};

        generatedFile.html = {
            path: this.getFilePath(file, 'html'),
            code: file.code
        };

        if (file.scssFileCode) {
            generatedFile.scss = {
                path: this.getFilePath(file, 'scss'),
                code: file.scssFileCode
            };
        }

        // If there is only HTML added, file is standalone or it has typescript code,
        // the typescript file is added
        if (this.isStandAlone(exampleFiles, file)) {
            const getCode = (): string => {
                if (!file.typescriptFileCode) {
                    return this.getDefaultTypescriptFile(file.fileName ?? '');
                }
                return file.typescriptFileCode;
            };
            generatedFile.ts = {
                path: this.getFilePath(file, 'ts'),
                code: getCode()
            };
        }
        return generatedFile;
    }

    private handleTsFile(file: ExampleFile<string, string, string>): GeneratedFiles {
        const generatedFile: GeneratedFiles = {};

        if (file.scssFileCode) {
            generatedFile.scss = {
                path: this.getFilePath(file, 'scss'),
                code: file.scssFileCode
            };
        }

        generatedFile.ts = {
            path: this.getFilePath(file, 'ts'),
            code: file.code
        };

        return generatedFile;
    }

    private handleScssFile(file: ExampleFile<string>): GeneratedFiles {
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
