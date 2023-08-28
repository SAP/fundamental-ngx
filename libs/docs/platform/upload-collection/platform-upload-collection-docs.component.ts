import { Component } from '@angular/core';

const uploadCollectionDataProviderTs = 'platform-upload-collection-base-data-provider.ts';
const uploadCollectionTs = 'platform-upload-collection-example.component.ts';
const uploadCollectionHtml = 'platform-upload-collection-example.component.html';

const uploadCollectionDisabledTs = 'platform-upload-collection-disabled-example.component.ts';
const uploadCollectionDisabledHtml = 'platform-upload-collection-disabled-example.component.html';

const uploadCollectionReadonlyTs = 'platform-upload-collection-readonly-example.component.ts';
const uploadCollectionReadonlyHtml = 'platform-upload-collection-readonly-example.component.html';

const uploadCollectionTurnOffTs = 'platform-upload-collection-turn-off-example.component.ts';
const uploadCollectionTurnOffHtml = 'platform-upload-collection-turn-off-example.component.html';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformUploadCollectionDisabledExampleComponent } from './examples/platform-upload-collection-disabled-example.component';
import { PlatformUploadCollectionExampleComponent } from './examples/platform-upload-collection-example.component';
import { PlatformUploadCollectionReadonlyExampleComponent } from './examples/platform-upload-collection-readonly-example.component';
import { PlatformUploadCollectionTurnOffExampleComponent } from './examples/platform-upload-collection-turn-off-example.component';

@Component({
    selector: 'app-platform-upload-collection',
    templateUrl: './platform-upload-collection-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformUploadCollectionExampleComponent,
        CodeExampleComponent,
        PlatformUploadCollectionDisabledExampleComponent,
        PlatformUploadCollectionReadonlyExampleComponent,
        PlatformUploadCollectionTurnOffExampleComponent
    ]
})
export class PlatformUploadColletionDocsComponent {
    uploadCollection: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionHtml),
            fileName: 'upload-collection-example',
            name: 'Html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadCollectionTs),
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent',
            name: 'Component'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadCollectionDataProviderTs),
            fileName: 'upload-collection-base',
            component: 'UploadCollectionBaseService',
            name: 'DataProvider'
        }
    ];

    uploadCollectionReadOnly: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionReadonlyHtml),
            fileName: 'upload-collection-example',
            name: 'Html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadCollectionReadonlyTs),
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent',
            name: 'Component'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadCollectionDataProviderTs),
            fileName: 'upload-collection-base',
            component: 'UploadCollectionBaseService',
            name: 'DataProvider'
        }
    ];

    uploadCollectionDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionDisabledHtml),
            fileName: 'upload-collection-disabled-example',
            name: 'Html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadCollectionDisabledTs),
            fileName: 'upload-collection-disabled-example',
            component: 'UploadCollectionExampleComponent',
            name: 'Component'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadCollectionDataProviderTs),
            fileName: 'upload-collection-base',
            component: 'UploadCollectionBaseService',
            name: 'DataProvider'
        }
    ];

    uploadCollectionTurnOff: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionTurnOffHtml),
            fileName: 'upload-collection-disabled-example',
            name: 'Html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadCollectionTurnOffTs),
            fileName: 'upload-collection-disabled-example',
            component: 'UploadCollectionExampleComponent',
            name: 'Component'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadCollectionDataProviderTs),
            fileName: 'upload-collection-base',
            component: 'UploadCollectionBaseService',
            name: 'DataProvider'
        }
    ];
}
