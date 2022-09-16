import { Component } from '@angular/core';

const listDefaultExampleHtml = 'default/list-byline-default-example.component.html';
const listDefaultExampleTs = 'default/list-byline-default-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-list',
    templateUrl: './list-byline-docs.component.html'
})
export class ListBylineDocsComponent {
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
}
