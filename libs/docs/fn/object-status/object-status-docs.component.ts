import { Component } from '@angular/core';

const objectStatusDefaultExampleHtml = 'default/object-status-default-example.component.html';
const objectStatusDefaultExampleTs = 'default/object-status-default-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-object-status',
    templateUrl: './object-status-docs.component.html'
})
export class ObjectStatusDocsComponent {
    objectStatusDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'object-status-default-example',
            code: getAssetFromModuleAssets(objectStatusDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(objectStatusDefaultExampleTs),
            fileName: 'object-status-default-example',
            component: 'ObjectStatusDefaultExampleComponent'
        }
    ];
}
