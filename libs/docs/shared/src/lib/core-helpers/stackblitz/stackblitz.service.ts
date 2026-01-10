import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemingService } from '@fundamental-ngx/core/theming';
import sdk from '@stackblitz/sdk';
import { map, zip } from 'rxjs';
import { getAsset } from '../../getAsset';
import { DocsService } from '../../services/docs.service';
import { CURRENT_LIB } from '../../utilities';
import { ExampleFile } from '../code-example/example-file';
import { StackblitzFile } from './interfaces/stackblitz-parameters';
import { StackblitzProject } from './interfaces/stackblitz-project';
import { StackblitzDependencies } from './stackblitz-dependencies';

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
 * Returns formatted import string.
 */
function getImport(file: StackblitzFileObject): string {
    return `import { ${file.name} } from '${file.path}'`;
}

/**
 * Extracts CSS imports from TypeScript code.
 */
function extractCssImports(code: string): string[] {
    const cssImports: string[] = [];
    const importRegex = /import\s+['"]([^'"]+\.css)['"]/g;
    let match;

    while ((match = importRegex.exec(code)) !== null) {
        const importPath = match[1];
        // Convert package imports to node_modules paths
        if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
            cssImports.push(`node_modules/${importPath}`);
        }
    }

    return cssImports;
}

/**
 * Extracts metadata from TypeScript component code.
 */
function extractComponentMetadata(code: string): {
    selector?: string;
    templateUrl?: string;
    styleUrls?: string[];
} {
    const metadata: { selector?: string; templateUrl?: string; styleUrls?: string[] } = {};

    // Extract selector
    const selectorMatch = code.match(/selector:\s*['"`]([^'"`]+)['"`]/);
    if (selectorMatch) {
        metadata.selector = selectorMatch[1];
    }

    // Extract templateUrl - matches patterns like './button-sample.html' or 'button-sample.html'
    const templateUrlMatch = code.match(/templateUrl:\s*['"`](?:\.\/)?([a-zA-Z0-9_-]+)\.html['"`]/);
    if (templateUrlMatch) {
        metadata.templateUrl = templateUrlMatch[1];
    }

    // Extract styleUrls - handles array with single or multiple urls
    const styleUrlsMatch = code.match(/styleUrls:\s*\[\s*['"`](?:\.\/)?([a-zA-Z0-9_-]+)\.(?:scss|css)['"`]/);
    if (styleUrlsMatch) {
        metadata.styleUrls = [styleUrlsMatch[1]];
    }

    return metadata;
}

@Injectable()
export class StackblitzService {
    // Public computed signals for reactive access
    readonly styles = computed(() => this._assetsSignal().styles);
    readonly tsconfig = computed(() => this._assetsSignal().tsconfig);
    readonly angular = computed(() => this._assetsSignal().angular);
    readonly packageJson = computed(() => this._assetsSignal().packageJson);
    readonly stackblitzrc = computed(() => this._assetsSignal().stackblitzrc);

    // Preserved properties for API compatibility (currently unused but kept for potential future use)
    main: string;
    fioriFonts: string;
    horizonFonts: string;

    /** @hidden */
    private readonly _themingService = inject(ThemingService, {
        optional: true
    });

    /** @hidden */
    private readonly _currentLib = inject(CURRENT_LIB);
    /** @hidden */
    private readonly _docsService = inject(DocsService);

    // Load assets reactively using toSignal
    private readonly _assetsSignal = toSignal(
        zip(
            getAsset('./stackblitz/example-stack/styles.scss'),
            getAsset('./stackblitz/example-stack/tsconfig.json'),
            getAsset('./stackblitz/example-stack/angular.json'),
            getAsset('./stackblitz/example-stack/package.json'),
            getAsset('./stackblitz/example-stack/stackblitzrc')
        ).pipe(
            map(([styles, tsconfig, angular, packageJson, stackblitzrc]) => ({
                styles,
                tsconfig,
                angular,
                packageJson: this._setDependencies(packageJson),
                stackblitzrc
            }))
        ),
        { initialValue: { styles: '', tsconfig: '', angular: '', packageJson: '', stackblitzrc: '' } }
    );

    defaultProjectInfo(): StackblitzProject {
        return {
            files: {
                // Main file content will be populated later when the project structure is formed.
                'src/main.ts': '',
                'src/styles.scss': this.styles(),
                'angular.json': this.angular(),
                'tsconfig.json': this.tsconfig(),
                'package.json': this.packageJson(),
                '.stackblitzrc': this.stackblitzrc()
                // TODO: We need to somehow store the lockfile of generated package.json file
            },
            title: 'Fundamental-NGX Example',
            description: 'Generated for you by fundamental-ngx team',
            template: 'node',
            tags: ['stackblitz', 'sdk']
        };
    }

    openCode(exampleFiles: ExampleFile<string, string, string>[]): void {
        const defaultProjectInfo = this.defaultProjectInfo();
        const stackBlitzFiles: StackblitzFile[] = [];

        // First pass: extract metadata and CSS imports from TypeScript files
        const metadataMap = new Map<ExampleFile, ReturnType<typeof extractComponentMetadata>>();
        const cssImports = new Set<string>();

        for (const example of exampleFiles) {
            if (example.language === 'typescript' && example.code) {
                const metadata = extractComponentMetadata(example.code);
                metadataMap.set(example, metadata);

                // Extract CSS imports from the code
                const imports = extractCssImports(example.code);
                imports.forEach((imp) => cssImports.add(imp));
            }
        }

        for (const example of exampleFiles) {
            let generatedFiles: GeneratedFiles | undefined;

            /**
             * Main Component Will be bootstrapped in main.ts and added to index.html
             * */
            const mainComponent: boolean = exampleFiles.length === 1 || !!example.main;

            // Get metadata for this file (if it's a TS file) or find corresponding TS file metadata
            const tsFile =
                example.language === 'typescript'
                    ? example
                    : exampleFiles.find(
                          (f) =>
                              f.language === 'typescript' &&
                              (f.originalFileName === example.originalFileName || f.fileName === example.fileName)
                      );
            const metadata = tsFile ? metadataMap.get(tsFile) : undefined;

            if (example.language === 'html') {
                generatedFiles = this.handleHtmlFile(exampleFiles, example, metadata);
            } else if (example.language === 'typescript') {
                generatedFiles = this.handleTsFile(example, metadata);
            } else if (example.language === 'scss') {
                generatedFiles = this.handleScssFile(example, metadata);
            } else if (example.path !== undefined) {
                defaultProjectInfo.files[`${example.path}/${example.fileName}.${example.language}`] = example.code;
                continue;
            }

            if (generatedFiles?.html) {
                defaultProjectInfo.files[generatedFiles.html.path] = generatedFiles.html.code;
            }

            const scssFilePath = this.getFilePath(example, 'scss', metadata);

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
                    stackBlitzFiles.push(this.getStackBlitzTsFile(example, mainComponent, metadata));
                }
            }
        }

        defaultProjectInfo.files['src/main.ts'] = this.getMainFile(stackBlitzFiles);

        const mainFileSelector: string =
            stackBlitzFiles.find((file) => file.main)?.selector || stackBlitzFiles[0].selector;

        defaultProjectInfo.files['src/index.html'] = `
<html>
    <head>
        <link rel="stylesheet" href="assets/theming-base/sap_horizon/css_variables.css" />
        <link rel="stylesheet" href="assets/fundamental-styles-theming/sap_horizon.css" />
    </head>
    <body>
        <${mainFileSelector}></${mainFileSelector}>
    </body>
</html>`;

        // Add extracted CSS imports to angular.json
        if (cssImports.size > 0) {
            const angularConfig = JSON.parse(this.angular());
            const existingStyles =
                angularConfig.projects['fundamental-ngx-example'].architect.build.options.styles || [];
            const updatedStyles = [...existingStyles, ...Array.from(cssImports)];
            angularConfig.projects['fundamental-ngx-example'].architect.build.options.styles = updatedStyles;
            defaultProjectInfo.files['angular.json'] = JSON.stringify(angularConfig, null, 4);
        }

        sdk.openProject(<any>defaultProjectInfo);
    }

    private _setDependencies(packageJson: string): string {
        const parsedPackageJson = JSON.parse(packageJson);

        parsedPackageJson['dependencies'] = StackblitzDependencies.getDependencies(
            this._docsService.getPackageJson(),
            this._docsService.getVersion()
        );

        return JSON.stringify(parsedPackageJson, null, 4);
    }

    private getDefaultTypescriptFile(fileName: string): string {
        const libraryPrefix = this.getLibraryPrefix();
        const componentName: string = this.transformSnakeCaseToPascalCase(fileName);

        // Since we don't know what part of the library is used, import all modules.
        return `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

@Component({
    selector: '${libraryPrefix}${fileName}',
    templateUrl: './${fileName}.component.html',
    styleUrl: './${fileName}.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FundamentalNgxCoreModule, FundamentalNgxPlatformModule]
})
export class ${componentName} {}
`;
    }

    private getLibraryPrefix(): string {
        switch (this._currentLib) {
            case 'core':
                return 'fd-';
            case 'platform':
                return 'fdp-';
            case 'cdk':
                return 'fdk-';
            case 'cx':
                return 'fdx-';
            case 'btp':
                return 'fdb-';
            default:
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

    private getFilePath(
        file: ExampleFile,
        extension: string,
        extractedMetadata?: { templateUrl?: string; styleUrls?: string[] }
    ): string {
        return `src/app/${this.getFileBasis(file, extractedMetadata, extension)}.${extension}`;
    }

    private getFileBasis(
        file: ExampleFile,
        extractedMetadata?: { templateUrl?: string; styleUrls?: string[] },
        extension?: string
    ): string {
        // If we have extracted metadata with templateUrl, use it as the base filename for all related files
        const extractedBaseFileName = extractedMetadata?.templateUrl;

        // Use extracted filename, originalFileName, or fall back to fileName
        const baseFileName = extractedBaseFileName || file.originalFileName || file.fileName;

        // For HTML files, use the extracted templateUrl directly
        if (extension === 'html' && extractedBaseFileName) {
            return `${file.path ? file.path + '/' : ''}${extractedBaseFileName}`;
        }

        // For SCSS files, try to use the extracted styleUrls
        if (extension === 'scss' && extractedMetadata?.styleUrls?.[0]) {
            return `${file.path ? file.path + '/' : ''}${extractedMetadata.styleUrls[0]}`;
        }

        // For TypeScript files, if we have the extracted base filename, use it directly without adding suffixes
        if (extension === 'ts' && extractedBaseFileName) {
            return `${file.path ? file.path + '/' : ''}${extractedBaseFileName}`;
        }

        let fileBasis: string;
        if (file.service) {
            fileBasis = baseFileName + '.service';
        } else if (file.pipe) {
            fileBasis = baseFileName + '.pipe';
        } else if (file.pure) {
            fileBasis = baseFileName + '';
        } else if (file.directive) {
            fileBasis = baseFileName + '.directive';
        } else {
            fileBasis = baseFileName + '.component';
        }

        return `${file.path ? file.path + '/' : ''}${fileBasis}`;
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

    private getStackBlitzTsFile(
        example: ExampleFile,
        mainComponent: boolean,
        metadata?: ReturnType<typeof extractComponentMetadata>
    ): StackblitzFile {
        const path = this.getFilePath(example, 'ts', metadata);
        const componentName = example.component || this.transformSnakeCaseToPascalCase(example.fileName ?? '');

        // Use extracted selector from metadata if available, otherwise fall back to default logic
        const selector =
            metadata?.selector ||
            this.getLibraryPrefix() + (example.selector || example.originalFileName || example.fileName);

        return {
            path,
            componentName,
            basis: this.getFileBasis(example, metadata, 'ts'),
            selector,
            entryComponent: !!example.entryComponent,
            main: mainComponent,
            service: !!example.service
        };
    }

    private getMainFile(files: StackblitzFile[]): string {
        // Main component that will be added as a root, if there is no component with main flag, first is chosen
        const mainComponent = files.find((file) => file.main) || files[0];

        return `import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideDialogService } from '@fundamental-ngx/core/dialog';
import { provideTheming, ThemingService } from '@fundamental-ngx/core/theming';
import { RtlService } from '@fundamental-ngx/cdk/utils';
${getImport({ name: mainComponent.componentName, path: './app/' + mainComponent.basis })};

bootstrapApplication(${mainComponent.componentName}, {
    providers: [
        provideRouter([]),
        provideTheming({
            defaultTheme: '${this._themingService?.getCurrentTheme()?.id || 'sap_horizon'}'
        }),
        provideDialogService(),
        RtlService
    ]
}).then((appRef: ApplicationRef) => appRef.injector.get(ThemingService).init());
`;
    }

    private handleHtmlFile(
        exampleFiles: ExampleFile<string, string, string>[],
        file: ExampleFile<string, string, string>,
        metadata?: ReturnType<typeof extractComponentMetadata>
    ): GeneratedFiles {
        const generatedFile: GeneratedFiles = {};

        generatedFile.html = {
            path: this.getFilePath(file, 'html', metadata),
            code: file.code
        };

        if (file.scssFileCode) {
            generatedFile.scss = {
                path: this.getFilePath(file, 'scss', metadata),
                code: file.scssFileCode
            };
        }

        // If there is only HTML added, file is standalone or it has typescript code,
        // the typescript file is added
        if (this.isStandAlone(exampleFiles, file)) {
            const getCode = (): string => {
                if (!file.typescriptFileCode) {
                    return this.getDefaultTypescriptFile(file.originalFileName || file.fileName || '');
                }
                return file.typescriptFileCode;
            };
            generatedFile.ts = {
                path: this.getFilePath(file, 'ts', metadata),
                code: getCode()
            };
        }
        return generatedFile;
    }

    private handleTsFile(
        file: ExampleFile<string, string, string>,
        metadata?: ReturnType<typeof extractComponentMetadata>
    ): GeneratedFiles {
        const generatedFile: GeneratedFiles = {};

        if (file.scssFileCode) {
            generatedFile.scss = {
                path: this.getFilePath(file, 'scss', metadata),
                code: file.scssFileCode
            };
        }

        // Remove CSS import statements and related comments from the TypeScript code
        // They will be added to angular.json instead
        let cleanedCode = file.code;

        // Remove CSS import lines
        cleanedCode = cleanedCode.replace(/^import\s+['"][^'"]+\.css['"];?\s*$/gm, '');

        // Remove common CSS-related comments (case insensitive)
        cleanedCode = cleanedCode.replace(
            /^\/\/\s*Import\s+(Fundamental\s+Styles?|SAP\s+UI\s+Common\s+CSS)\s*$/gim,
            ''
        );

        // Remove excessive blank lines (3 or more consecutive newlines become 2)
        cleanedCode = cleanedCode.replace(/\n{3,}/g, '\n\n');

        // Trim leading/trailing whitespace
        cleanedCode = cleanedCode.trim();

        generatedFile.ts = {
            path: this.getFilePath(file, 'ts', metadata),
            code: cleanedCode
        };

        return generatedFile;
    }

    private handleScssFile(
        file: ExampleFile<string>,
        metadata?: ReturnType<typeof extractComponentMetadata>
    ): GeneratedFiles {
        const generatedFile: GeneratedFiles = {};

        generatedFile.scss = {
            path: this.getFilePath(file, 'scss', metadata),
            code: file.code
        };

        return generatedFile;
    }

    private isStandAlone(exampleFiles: ExampleFile[], file: ExampleFile): boolean {
        return !!(file.standalone || exampleFiles.length === 1 || file.typescriptFileCode);
    }
}
