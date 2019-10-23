import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { CopyService } from '../../services/copy.service';
import { ExampleFile } from './example-file';
import { height } from '../../utilities/animations/collapse';
import { AlertService } from '@fundamental-ngx/core';
import hljs from 'highlight.js/lib';
import sdk from '@stackblitz/sdk';
import * as polyfills from '!raw-loader!./code-example-stack/polyfills.ts';
import * as maints from '!raw-loader!./code-example-stack/main.ts';


@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [height({ time: 200 })]
})
export class CodeExampleComponent implements OnInit, AfterViewInit {

    @ViewChildren('code') codeElements: QueryList<ElementRef>;

    /**
     * List of files to display in this code example.
     */
    @Input()
    exampleFiles: ExampleFile[] = [];
    smallScreen: boolean;
    selectedFileIndex: number = 0;

    isOpen: boolean = false;
    parameters = {
        addonAppModule: '',
        html_tag: '',
        app_module: '',
        app_module_file: '',
        app_component: '',
        app_component_basis: '',
        app_component_html: '',
        app_component_ts: '',
        app_component_html_path: '',
        app_component_ts_path: ''
    };

    app_app_component = ``

    project = {
        files: {},
        title: 'Fundamental-NGX Example',
        description: 'Generated for you by fundamental-ngx team',
        template: 'angular-cli',
        tags: ['stackblitz', 'sdk'],
        dependencies: {
            moment: '*',
            '@fundamental-ngx/core': 'latest',
            'fundamental-styles': 'latest',
            '@angular/animations': '*',
            '@angular/http': 'latest',
            '@angular/cdk': 'latest',
            '@angular/material': 'latest',
            'popper.js': 'latest',

        }
    };


    constructor(private element: ElementRef, private copyService: CopyService, private alertService: AlertService) { }


    get expandIcon(): string {
        return this.isOpen ? 'navigation-up-arrow' : 'navigation-down-arrow';
    }

    copyText(): void {
        this.copyService.copyText(this.exampleFiles[this.selectedFileIndex].code.default);
        this.alertService.open('Code copied!', { type: 'success', duration: 5000 });
    }

    openCode(): void {


        this.app_app_component = `
        import { Component } from '@angular/core';

        @Component({
            selector: '${this.parameters.html_tag}',
            templateUrl: './${this.parameters.app_component_html}'
        })
        export class ${this.parameters.app_component} {
            title = 'my-fd-ngx-dream-app';
        }
        `;



        this.project = {
            files: {
                'src/main.ts': maints.default,
                'src/polyfills.ts': polyfills.default,
                'src/styles.scss': '',
            },
            title: 'Fundamental-NGX Example',
            description: 'Generated for you by fundamental-ngx team',
            template: 'angular-cli',
            tags: ['stackblitz', 'sdk'],
            dependencies: {
                moment: '*',
                '@fundamental-ngx/core': 'latest',
                'fundamental-styles': 'latest',
                '@angular/animations': '*',
                '@angular/http': 'latest',
                '@angular/cdk': 'latest',
                '@angular/material': 'latest',
                'popper.js': 'latest',

            }
        };



        this.exampleFiles.forEach(example => {

            if (example.fileName && example.component) {
                this.parameters.html_tag = 'fd-' + example.fileName;
                this.parameters.addonAppModule = example.appModuleAddon;
                this.parameters.app_module = 'AppModule';
                this.parameters.app_module_file = 'app.module';
                this.parameters.app_component = example.component;
                this.parameters.app_component_basis = example.fileName + '.component';
                this.parameters.app_component_html = example.fileName + '.component.html';
                this.parameters.app_component_ts = example.fileName + '.component.ts';
                this.parameters.app_component_html_path = 'src/app/' + example.fileName + '.component.html';
                this.parameters.app_component_ts_path = 'src/app/' + example.fileName + '.component.ts';
            }


            if (example.language === 'html') {
                const _pathHTML = `src/app/${example.fileName}.component.html`;
                this.project.files[_pathHTML] = example.code.default;
                const _pathSCSS = `src/app/${example.fileName}.component.scss`;
                this.project.files[_pathSCSS] = '';
                if (example.scssFileCode) {
                    this.project.files[_pathSCSS] = example.scssFileCode.default;
                }
                if (example.secondFile) {
                    const _pathTS = `src/app/${example.secondFile}.component.ts`;
                    this.parameters.app_component_basis = example.secondFile + '.component';
                    this.project.files[_pathTS] =
                        // tslint:disable-next-line: no-unused-expression
                        `import { Component } from '@angular/core';

                    @Component({
                        selector: 'fd-${example.fileName}',
                        templateUrl: './${example.fileName}.component.html',
                        styleUrls: ['./${example.fileName}.component.scss']
                    })
                    export class ${example.component} {}`;
                }
                else if (example.typescriptFileCode) {
                    const _pathTS = `src/app/${example.fileName}.component.ts`;
                    this.project.files[_pathTS] = example.typescriptFileCode.default;
                }
            }
            if (example.language === 'typescript' && (example.secondFile === undefined && example.thirdFile === undefined && example.module === undefined)) {
                const _pathTS = `src/app/${example.fileName}.component.ts`;
                this.project.files[_pathTS] = example.code.default;
            }
            // tslint:disable-next-line: max-line-length
            else if (example.language === 'typescript' && (example.secondFile !== undefined && example.thirdFile === undefined && example.module === undefined)) {
                const _pathTS2 = `src/app/${example.secondFile}.component.ts`;
                this.project.files[_pathTS2] = example.code.default;

            }
            // tslint:disable-next-line: max-line-length
            else if (example.language === 'typescript' && (example.thirdFile !== undefined && example.secondFile === undefined && example.module === undefined)) {
                const _pathTS2 = `src/app/${example.thirdFile}.component.ts`;
                this.project.files[_pathTS2] = example.code.default;

            }
            if (example.module === undefined) {
                this.project.files['src/app/app.module.ts'] = `
                import { BrowserModule } from '@angular/platform-browser';
                import { NgModule } from '@angular/core';
                import { FormsModule, ReactiveFormsModule } from '@angular/forms';
                import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
                import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
                import { HttpClientModule, HttpClient } from '@angular/common/http';
                import { HttpModule } from '@angular/http';
                import { MatTableModule } from '@angular/material';
                import {CdkTableModule } from '@angular/cdk/table';
                import { DragDropModule } from '@angular/cdk/drag-drop';  
                import {RouterModule, Routes} from '@angular/router'
                import { ${this.parameters.app_component} } from './${this.parameters.app_component_basis}';
        
        
                @NgModule({
                  declarations: [
                    ${this.parameters.app_component},
                  ],
                  imports: [
                    BrowserModule,
                    FormsModule,
                    HttpClientModule,
                    MatTableModule,
                    DragDropModule,
                    RouterModule.forRoot([{path: '#', component:${this.parameters.app_component}}], 
                    { useHash: true }),
                    CdkTableModule,
                    HttpModule,
                    ReactiveFormsModule,
                    FundamentalNgxCoreModule,
                    BrowserAnimationsModule
                  ],
                  providers: [],
                  bootstrap: [${this.parameters.app_component}]
                })
                export class ${this.parameters.app_module} { }
                `;
            }
            else if (example.language === 'typescript' && example.secondFile === undefined && example.thirdFile === undefined && example.module !== undefined) {
                this.project.files['src/app/app.module.ts'] = example.code.default;
            }
        });

        this.project.files['src/index.html'] = `
        <link rel="stylesheet" href="node_modules/fundamental-styles/dist/fonts.css"></link>
        <link rel="stylesheet" href="node_modules/fundamental-styles/dist/icon.css"></link>
                    <${this.parameters.html_tag}></${this.parameters.html_tag}>
        `;


        sdk.openProject(this.project);
    }

    ngOnInit(): void {
        this.smallScreen = window.innerWidth <= 768;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.smallScreen = window.innerWidth <= 768;
    }

    ngAfterViewInit() {
        /** Highlight.js init */
        this.codeElements.forEach(element => hljs.highlightBlock(element.nativeElement));
    }
}

const app_component_module = ``;
