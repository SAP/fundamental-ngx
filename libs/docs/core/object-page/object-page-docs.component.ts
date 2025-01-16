import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ObjectPageExampleComponent } from './examples/object-page-example.component';

const objectPageBasicExample = 'object-page-example.component.html';
const objectPageBasicExampleTsCode = 'object-page-example.component.ts';

@Component({
    selector: 'app-object-page',
    templateUrl: './object-page-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ObjectPageExampleComponent,
        CodeExampleComponent
    ]
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
