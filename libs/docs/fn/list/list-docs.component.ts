import { Component } from '@angular/core';

const listDefaultExampleHtml = 'default/list-default-example.component.html';
const listDefaultExampleTs = 'default/list-default-example.component.ts';

const listSelectableExampleHtml = 'selectable/list-selectable-example.component.html';
const listSelectableExampleTs = 'selectable/list-selectable-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-list',
    templateUrl: './list-docs.component.html'
})
export class ListDocsComponent {
    listDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'list-default-example',
            code: getAssetFromModuleAssets(listDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listDefaultExampleTs),
            fileName: 'list-default-example',
            component: 'ListDefaultExampleComponent'
        }
    ];
    listSelectableExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'list-selectable-example',
            code: getAssetFromModuleAssets(listSelectableExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listSelectableExampleTs),
            fileName: 'list-selectable-example',
            component: 'ListSelectableExampleComponent'
        }
    ];
}
