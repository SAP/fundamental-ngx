import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const basicExampleHtml = 'initial-focus-basic-example.component.html';
const basicExampleTs = 'initial-focus-basic-example.component.ts';

const complexExampleHtml = 'initial-focus-complex-example.component.html';
const complexExampleTs = 'initial-focus-complex-example.component.ts';

@Component({
    selector: 'fd-initial-focus-docs',
    templateUrl: './initial-focus-docs.component.html'
})
export class InitialFocusDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicExampleHtml),
            fileName: 'initial-focus-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicExampleTs),
            fileName: 'initial-focus-basic-example',
            component: 'AutofocusBasicExampleComponent'
        }
    ];

    complex: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(complexExampleHtml),
            fileName: 'initial-focus-complex-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(complexExampleTs),
            fileName: 'initial-focus-complex-example',
            component: 'AutofocusComplexExampleComponent'
        }
    ];
}
