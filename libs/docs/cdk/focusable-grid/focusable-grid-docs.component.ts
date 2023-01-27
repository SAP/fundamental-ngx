import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

const shortRowsExampleHtml = 'short-rows-example/short-rows-example.component.html';
const shortRowsExampleTs = 'short-rows-example/short-rows-example.component.ts';

@Component({
    selector: 'app-tabs',
    templateUrl: './focusable-grid-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FocusableGridDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'focusable-grid-default-example',
            component: 'DefaultExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'ts',
            fileName: 'focusable-grid-default-example',
            component: 'DefaultExampleComponent'
        }
    ];

    shortRows: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(shortRowsExampleHtml),
            language: 'html',
            fileName: 'short-rows-example',
            component: 'ShortRowsExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(shortRowsExampleTs),
            language: 'ts',
            fileName: 'short-rows-example',
            component: 'ShortRowsExampleComponent'
        }
    ];

    constructor() {}
}
