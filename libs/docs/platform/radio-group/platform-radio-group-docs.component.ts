import { Component } from '@angular/core';

const listItemsRadioGroupSrc = 'platform-radio-group-list-items-example.component.html';
const listItemsRadioGroupSrcCode = 'platform-radio-group-list-items-examples.component.ts';
const listRadioGroupSrc = 'platform-radio-group-list-example.component.html';
const listRadioGroupSrcCode = 'platform-radio-group-list-examples.component.ts';
const contentRadioGroupSrc = 'platform-radio-group-content-example.component.html';
const contentRadioGroupSrcCode = 'platform-radio-group-content-examples.component.ts';
const disabledRadioGroupSrc = 'platform-radio-group-disabled-example.component.html';
const disabledRadioGroupSrcCode = 'platform-radio-group-disabled-examples.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformRadioGroupDisabledExampleComponent } from './examples/platform-radio-group-disabled-examples.component';
import { PlatformRadioGroupListItemsExampleComponent } from './examples/platform-radio-group-list-items-examples.component';
import { PlatformRadioGroupListExampleComponent } from './examples/platform-radio-group-list-examples.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformRadioGroupContentExampleComponent } from './examples/platform-radio-group-content-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-radio-group',
    templateUrl: './platform-radio-group-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformRadioGroupContentExampleComponent,
        CodeExampleComponent,
        PlatformRadioGroupListExampleComponent,
        PlatformRadioGroupListItemsExampleComponent,
        PlatformRadioGroupDisabledExampleComponent
    ]
})
export class PlatformRadioGroupDocsComponent {
    listItemsRadioGroup: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listItemsRadioGroupSrc),
            fileName: 'platform-radio-group-list-items-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listItemsRadioGroupSrcCode),
            fileName: 'platform-radio-group-list-items-example',
            component: 'PlatformRadioGroupListItemsExampleComponent'
        }
    ];

    listRadioGroup: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listRadioGroupSrc),
            fileName: 'platform-radio-group-list-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listRadioGroupSrcCode),
            fileName: 'platform-radio-group-list-example',
            component: 'PlatformRadioGroupListExampleComponent'
        }
    ];

    contentRadioGroup: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(contentRadioGroupSrc),
            fileName: 'platform-radio-group-content-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentRadioGroupSrcCode),
            fileName: 'platform-radio-group-content-example',
            component: 'PlatformRadioGroupContentExampleComponent'
        }
    ];

    disabledRadioGroup: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledRadioGroupSrc),
            fileName: 'platform-radio-group-disabled-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(disabledRadioGroupSrcCode),
            fileName: 'platform-radio-group-disabled-example',
            component: 'PlatformRadioGroupDisabledExampleComponent'
        }
    ];
}
