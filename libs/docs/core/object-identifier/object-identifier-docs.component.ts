import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ObjectIdentifierTableExampleComponent } from './examples/object-identifier-table-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    ObjectIdentifierDefaultExampleComponent,
    ObjectIdentifierBoldExampleComponent,
    ObjectIdentifierLinkExampleComponent,
    ObjectIdentifierDescriptiveExampleComponent
} from './examples/object-identifier-components';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const ObjectIdentifierDefaultExample = 'object-identifier-default-example.component.html';
const ObjectIdentifierLinksExample = 'object-identifier-link-example.component.html';
const ObjectIdentifierBoldExampleHtml = 'object-identifier-bold-example.component.html';
const ObjectIdentifierDescriptiveExampleHtml = 'object-identifier-descriptive-example.component.html';
const ObjectIdentifierTableExampleHtml = 'object-identifier-table-example.component.html';
const ObjectIdentifierTableExampleTs = 'object-identifier-table-example.component.ts';

@Component({
    selector: 'app-object-identifier',
    templateUrl: './object-identifier-docs.component.html',
    standalone: true,
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
