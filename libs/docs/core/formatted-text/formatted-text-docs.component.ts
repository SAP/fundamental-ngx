import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { FormattedTextExampleComponent } from './examples/base/formatted-text-example.component';
import { FormattedTextLinksExampleComponent } from './examples/links/formatted-text-links-example.component';
import { FormattedTextScriptExampleComponent } from './examples/script/formatted-text-script-example.component';

const formattedTextHtml = 'base/formatted-text-example.component.html';
const formattedTextTs = 'base/formatted-text-example.component.ts';

const linkFormattedTextHtml = 'links/formatted-text-links-example.component.html';
const linkFormattedTextTs = 'links/formatted-text-links-example.component.ts';

const scriptFormattedTextHtml = 'script/formatted-text-script-example.component.html';
const scriptFormattedTextTs = 'script/formatted-text-script-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './formatted-text-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        FormattedTextExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        FormattedTextLinksExampleComponent,
        FormattedTextScriptExampleComponent
    ]
})
export class FormattedTextDocsComponent {
    formattedTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formattedTextHtml),
            fileName: 'formatted-text-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formattedTextTs),
            fileName: 'formatted-text-example',
            component: 'FormattedTextExampleComponent'
        }
    ];

    linkFormattedTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(linkFormattedTextHtml),
            fileName: 'formatted-text-links-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(linkFormattedTextTs),
            fileName: 'formatted-text-links-example',
            component: 'FormattedTextLinksExampleComponent'
        }
    ];

    scriptFormattedTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(scriptFormattedTextHtml),
            fileName: 'formatted-text-script-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(scriptFormattedTextTs),
            fileName: 'formatted-text-script-example',
            component: 'FormattedTextScriptExampleComponent'
        }
    ];
}
