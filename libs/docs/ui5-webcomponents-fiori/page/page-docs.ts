import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BackgroundSample } from './examples/background-sample';
import { BasicSample } from './examples/basic-sample';
import { FooterSample } from './examples/footer-sample';
import { ScrollingSample } from './examples/scrolling-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const backgroundSampleTs = 'background-sample.ts';
const backgroundSampleHtml = 'background-sample.html';
const scrollingSampleTs = 'scrolling-sample.ts';
const scrollingSampleHtml = 'scrolling-sample.html';
const footerSampleTs = 'footer-sample.ts';
const footerSampleHtml = 'footer-sample.html';

@Component({
    selector: 'ui5-doc-page',
    templateUrl: './page-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        BackgroundSample,
        ScrollingSample,
        FooterSample
    ]
})
export class PageDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample',
            component: 'BasicSample'
        }
    ]);

    backgroundExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(backgroundSampleTs),
            originalFileName: 'background-sample',
            component: 'BackgroundSample',
            typescriptFileCode: getAssetFromModuleAssets(backgroundSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(backgroundSampleHtml),
            originalFileName: 'background-sample',
            component: 'BackgroundSample'
        }
    ]);

    scrollingExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(scrollingSampleTs),
            originalFileName: 'scrolling-sample',
            component: 'ScrollingSample',
            typescriptFileCode: getAssetFromModuleAssets(scrollingSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(scrollingSampleHtml),
            originalFileName: 'scrolling-sample',
            component: 'ScrollingSample'
        }
    ]);

    footerExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(footerSampleTs),
            originalFileName: 'footer-sample',
            component: 'FooterSample',
            typescriptFileCode: getAssetFromModuleAssets(footerSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(footerSampleHtml),
            originalFileName: 'footer-sample',
            component: 'FooterSample'
        }
    ]);
}
