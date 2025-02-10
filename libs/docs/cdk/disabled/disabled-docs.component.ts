import { Component, ViewEncapsulation } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { DiExampleComponent } from './examples/di-example/di-example.component';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

const diExampleHtml = 'di-example/di-example.component.html';
const diExampleTs = 'di-example/di-example.component.ts';
const diRecipientExampleTs = 'di-example/disabled-recipient.directive.ts';

@Component({
    selector: 'app-tabs',
    templateUrl: './disabled-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DefaultExampleComponent,
        CodeExampleComponent,
        DiExampleComponent
    ]
})
export class DisabledDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'default-example'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'typescript',
            fileName: 'default-example',
            selector: 'disabled-default-example',
            component: 'DefaultExampleComponent'
        }
    ];
    diExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(diExampleHtml),
            language: 'html',
            fileName: 'di-example'
        },
        {
            code: getAssetFromModuleAssets(diExampleTs),
            language: 'typescript',
            fileName: 'di-example',
            selector: 'disabled-di-example',
            component: 'DiExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(diRecipientExampleTs),
            language: 'typescript',
            fileName: 'disabled-recipient',
            directive: true
        }
    ];

    constructor() {}
}
