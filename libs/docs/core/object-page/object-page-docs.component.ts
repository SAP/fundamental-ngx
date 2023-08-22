import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { ObjectPageExampleComponent } from './examples/object-page-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const objectPageBasicExample = 'object-page-example.component.html';
const objectPageBasicExampleTsCode = 'object-page-example.component.ts';

@Component({
    selector: 'app-object-page',
    templateUrl: './object-page-docs.component.html',
    standalone: true,
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
