import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

@Component({
    selector: 'app-tabs',
    templateUrl: './focusable-list-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FocusableListDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'focusable-list-default-example',
            component: 'FocusableListDefaultExample'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'ts',
            fileName: 'focusable-list-default-example',
            component: 'FocusableListDefaultExample'
        }
    ];

    constructor() {}
}
