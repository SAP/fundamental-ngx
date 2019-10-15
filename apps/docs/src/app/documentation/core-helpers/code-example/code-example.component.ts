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
// import * as maints from '!raw-loader!./code-example-stack/main.ts';



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

    // @Input() fileName: string;

    // @Input() component: string;

    addonScss = '';
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

    app_app_component = ``// TODO make non inline

    maints = `import { enableProdMode } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { AppModule } from './app/app.module';
    
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));`

    project = {
        files: {},
        title: 'Fundamental-NGX Example',
        description: 'Generated for you by fundamental-ngx team',
        template: 'angular-cli',
        tags: ['stackblitz', 'sdk'],
        dependencies: {
            moment: '*',
            '@fundamental-ngx/core': 'v0.12.0-rc.5',
            'fundamental-styles': 'v0.3.0-rc.6',
            '@angular/animations': '*',
            '@angular/http': '^7.2.15',
            '@angular/cdk': '^8.2.3',
            '@angular/material': '^8.2.3'
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
        // TODO make non inline


        this.project = {
            files: {
                'src/main.ts': this.maints,
                'src/polyfills.ts': polyfills.default,
                'src/styles.scss': '',
            },
            title: 'Fundamental-NGX Example',
            description: 'Generated for you by fundamental-ngx team',
            template: 'angular-cli',
            tags: ['stackblitz', 'sdk'],
            dependencies: {
                moment: '*',
                '@fundamental-ngx/core': 'v0.12.0-rc.5',
                'fundamental-styles': 'v0.3.0-rc.6',
                '@angular/animations': '*',
                '@angular/http': '^7.2.15',
                '@angular/cdk': '^8.2.3',
                '@angular/material': '^8.2.3'
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
                console.log('rfrfr' + this.parameters.app_component);

            }


            if (example.language === 'html') {
                console.log('sec' + this.parameters.app_component);
                const _pathHTML = `src/app/${example.fileName}.component.html`;
                this.project.files[_pathHTML] = example.code.default;
                const _pathSCSS = `src/app/${example.fileName}.component.scss`;
                this.project.files[_pathSCSS] = '';
                if (example.scssFileCode) {
                    this.project.files[_pathSCSS] = example.scssFileCode.default;
                }
                if (example.secondFile) {
                    // if (example.scss) { this.addonScss = example.scss; }
                    const _pathTS = `src/app/${example.secondFile}.component.ts`;
                    this.parameters.app_component_basis = example.secondFile + '.component';
                    this.project.files[_pathTS] =
                        // tslint:disable-next-line: no-unused-expression
                        `import { Component } from '@angular/core';

                    @Component({
                        selector: 'fd-${example.fileName}',
                        templateUrl: './${example.fileName}.component.html',
                        styleUrls: ['${example.fileName}.component.scss']
                    })
                    export class ${example.component} {
                        ${example.addonExport}
                    }`;
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
            else if (example.language === 'typescript' && (example.secondFile !== undefined && example.thirdFile === undefined && example.module === undefined)) {
                const _pathTS2 = `src/app/${example.secondFile}.component.ts`;
                this.project.files[_pathTS2] = example.code.default;

            }
            else if (example.language === 'typescript' && (example.thirdFile !== undefined && example.secondFile === undefined && example.module === undefined)) {
                const _pathTS2 = `src/app/${example.thirdFile}.component.ts`;
                this.project.files[_pathTS2] = example.code.default;

            }
            else if (example.language === 'typescript' && example.secondFile === undefined && example.thirdFile === undefined && example.module !== undefined) {
                this.project.files['src/app/app.module.ts'] = example.code.default;

            }
        });

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
        // TODO make non inline

        // if (example.tagname) {
        //     this.parameters.html_tag = example.tagname;
        //     this.parameters.app_component = example.component;
        // }



        this.project.files['src/index.html'] = `
        <link rel="stylesheet" href="node_modules/fundamental-styles/dist/fundamental-styles.css"></link>
            <${this.parameters.html_tag}></${this.parameters.html_tag}>
        `;
        // TODO make non inline


        // console.log(this.project);
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
