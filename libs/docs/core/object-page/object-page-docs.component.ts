import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const objectPageBasicExample = 'object-page-example.component.html';
const objectPageBasicExampleTsCode = 'object-page-example.component.ts';

@Component({
    selector: 'app-object-page',
    templateUrl: './object-page-docs.component.html'
})
export class ObjectPageDocsComponent {
    objectPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectPageBasicExample),
            fileName: 'object-page-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(objectPageBasicExampleTsCode),
            fileName: 'object-page-example',
            component: 'ObjectPageExampleComponent'
        }
    ];
}
