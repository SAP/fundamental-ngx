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
    standalone: true,
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
            fileName: 'disabled-default-example',
            component: 'DisabledDefaultExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'typescript',
            fileName: 'disabled-default-example',
            component: 'DisabledDefaultExampleComponent'
        }
    ];
    diExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(diExampleHtml),
            language: 'html',
            fileName: 'disabled-di-example',
            component: 'DisabledDIExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(diExampleTs),
            language: 'typescript',
            fileName: 'disabled-di-example',
            component: 'DisabledDIExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(diRecipientExampleTs),
            language: 'typescript',
            fileName: 'disabled-recipient.directive',
            component: 'DisabledRecipientDirective'
        }
    ];

    constructor() {}
}
