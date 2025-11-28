import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ButtonExample } from './examples/button-sample';

const basicSampleHtml = 'button-sample.html';
const basicSampleTs = 'button-sample.ts';

@Component({
    selector: 'ui5-button-docs',
    templateUrl: './button-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        ButtonExample
    ]
})
export class ButtonDocs {
    examples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'button-sample'
        },
        {
            language: 'typescript',
            component: 'ButtonExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'button-sample'
        }
    ];
}
