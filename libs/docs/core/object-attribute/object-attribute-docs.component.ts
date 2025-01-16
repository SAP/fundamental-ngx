import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import {
    ObjectAttributeExampleComponent,
    ObjectAttributeTruncateExampleComponent
} from './examples/object-attribute-examples.component';
import { ObjectAttributeLinkExampleComponent } from './examples/object-attribute-link-example.component';

const objectAttribute = 'object-attribute-example.component.html';
const objectAttributeTruncate = 'object-attribute-truncate-example.component.html';
const objectAttributeLink = 'object-attribute-link-example.component.html';
const objectAttributeLinkTs = 'object-attribute-link-example.component.ts';

@Component({
    selector: 'app-object-attribute',
    templateUrl: './object-attribute-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ObjectAttributeExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ObjectAttributeTruncateExampleComponent,
        ObjectAttributeLinkExampleComponent
    ]
})
export class ObjectAttributeDocsComponent {
    objectAttribute: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectAttribute),
            fileName: 'object-attribute-example'
        }
    ];

    objectAttributeTruncate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectAttributeTruncate),
            fileName: 'object-attribute-truncate-example'
        }
    ];

    objectAttributeLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(objectAttributeLink),
            fileName: 'object-attribute-link-example'
        },
        {
            language: 'typescript',
            fileName: 'object-attribute-link-example',
            code: getAssetFromModuleAssets(objectAttributeLinkTs),
            component: 'ObjectAttributeLinkExampleComponent'
        }
    ];
}
