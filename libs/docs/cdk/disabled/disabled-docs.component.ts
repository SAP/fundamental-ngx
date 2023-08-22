import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { DiExampleComponent } from './examples/di-example/di-example.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
            component: 'fdkDisabledDefaultExample'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'ts',
            fileName: 'disabled-default-example',
            component: 'fdkDisabledDefaultExample'
        }
    ];
    diExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(diExampleHtml),
            language: 'html',
            fileName: 'disabled-di-example',
            component: 'fdkDisabledDIExample'
        },
        {
            code: getAssetFromModuleAssets(diExampleTs),
            language: 'ts',
            fileName: 'disabled-di-example',
            component: 'fdkDisabledDIExample'
        },
        {
            code: getAssetFromModuleAssets(diRecipientExampleTs),
            language: 'ts',
            fileName: 'disabled-recipient.directive',
            component: 'fdkDisabledRecipientDirective'
        }
    ];

    constructor() {}
}
