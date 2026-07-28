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
import { ObjectIdentifierBoldExampleComponent } from './examples/object-identifier-bold-example.component';
import { ObjectIdentifierDefaultExampleComponent } from './examples/object-identifier-default-example.component';
import { ObjectIdentifierDescriptiveExampleComponent } from './examples/object-identifier-descriptive-example.component';
import { ObjectIdentifierLinkExampleComponent } from './examples/object-identifier-link-example.component';
import { ObjectIdentifierTableExampleComponent } from './examples/object-identifier-table-example.component';

const ObjectIdentifierDefaultExample = 'object-identifier-default-example.component.html';
const ObjectIdentifierLinksExample = 'object-identifier-link-example.component.html';
const ObjectIdentifierBoldExampleHtml = 'object-identifier-bold-example.component.html';
const ObjectIdentifierDescriptiveExampleHtml = 'object-identifier-descriptive-example.component.html';
const ObjectIdentifierTableExampleHtml = 'object-identifier-table-example.component.html';
const ObjectIdentifierTableExampleTs = 'object-identifier-table-example.component.ts';

@Component({
    selector: 'app-object-identifier',
    templateUrl: './object-identifier-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ObjectIdentifierDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ObjectIdentifierBoldExampleComponent,
        ObjectIdentifierLinkExampleComponent,
        ObjectIdentifierDescriptiveExampleComponent,
        ObjectIdentifierTableExampleComponent
    ]
})
export class ObjectIdentifierDocsComponent {
    defaultObjectIdentifier: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectIdentifierDefaultExample),
            fileName: 'object-identifier-default-example'
        }
    ];

    linkObjectIdentifier: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectIdentifierLinksExample),
            fileName: 'object-identifier-link-example'
        }
    ];

    boldObjectIdentifier: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectIdentifierBoldExampleHtml),
            fileName: 'object-identifier-bold-example'
        }
    ];

    descriptiveObjectIdentifier: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectIdentifierDescriptiveExampleHtml),
            fileName: 'object-identifier-descriptive-example'
        }
    ];

    tableObjectIdentifierType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectIdentifierTableExampleHtml),
            fileName: 'object-identifier-table-example',
            component: 'ObjectIdentifierTableExampleComponent'
        },
        {
            language: 'typescript',
            component: 'ObjectIdentifierTableExampleComponent',
            code: getAssetFromModuleAssets(ObjectIdentifierTableExampleTs),
            fileName: 'object-identifier-table-example'
        }
    ];
}
