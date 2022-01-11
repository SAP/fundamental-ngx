import { Component } from '@angular/core';

import uploadCollectionDataProviderTs from '!./platform-upload-collection-examples/platform-upload-collection-base-data-provider?raw';
import uploadCollectionTs from '!./platform-upload-collection-examples/platform-upload-collection-example.component?raw';
import uploadCollectionHtml from '!./platform-upload-collection-examples/platform-upload-collection-example.component.html?raw';

import uploadCollectionDisabledTs from '!./platform-upload-collection-examples/platform-upload-collection-disabled-example.component?raw';
import uploadCollectionDisabledHtml from '!./platform-upload-collection-examples/platform-upload-collection-disabled-example.component.html?raw';

import uploadCollectionReadonlyTs from '!./platform-upload-collection-examples/platform-upload-collection-readonly-example.component?raw';
import uploadCollectionReadonlyHtml from '!./platform-upload-collection-examples/platform-upload-collection-readonly-example.component.html?raw';

import uploadCollectionTurnOffTs from '!./platform-upload-collection-examples/platform-upload-collection-turn-off-example.component?raw';
import uploadCollectionTurnOffHtml from '!./platform-upload-collection-examples/platform-upload-collection-turn-off-example.component.html?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-platform-upload-collection',
    templateUrl: './platform-upload-collection-docs.component.html'
})
export class PlatformUploadColletionDocsComponent {
    uploadCollection: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionHtml,
            fileName: 'upload-collection-example',
            name: 'Html'
        },
        {
            language: 'typescript',
            code: uploadCollectionTs,
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent',
            name: 'Component'
        },
        {
            language: 'typescript',
            code: uploadCollectionDataProviderTs,
            fileName: 'upload-collection-base',
            component: 'UploadCollectionBaseService',
            name: 'DataProvider'
        }
    ];

    uploadCollectionReadOnly: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionReadonlyHtml,
            fileName: 'upload-collection-example',
            name: 'Html'
        },
        {
            language: 'typescript',
            code: uploadCollectionReadonlyTs,
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent',
            name: 'Component'
        },
        {
            language: 'typescript',
            code: uploadCollectionDataProviderTs,
            fileName: 'upload-collection-base',
            component: 'UploadCollectionBaseService',
            name: 'DataProvider'
        }
    ];

    uploadCollectionDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionDisabledHtml,
            fileName: 'upload-collection-disabled-example',
            name: 'Html'
        },
        {
            language: 'typescript',
            code: uploadCollectionDisabledTs,
            fileName: 'upload-collection-disabled-example',
            component: 'UploadCollectionExampleComponent',
            name: 'Component'
        },
        {
            language: 'typescript',
            code: uploadCollectionDataProviderTs,
            fileName: 'upload-collection-base',
            component: 'UploadCollectionBaseService',
            name: 'DataProvider'
        }
    ];

    uploadCollectionTurnOff: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionTurnOffHtml,
            fileName: 'upload-collection-disabled-example',
            name: 'Html'
        },
        {
            language: 'typescript',
            code: uploadCollectionTurnOffTs,
            fileName: 'upload-collection-disabled-example',
            component: 'UploadCollectionExampleComponent',
            name: 'Component'
        },
        {
            language: 'typescript',
            code: uploadCollectionDataProviderTs,
            fileName: 'upload-collection-base',
            component: 'UploadCollectionBaseService',
            name: 'DataProvider'
        }
    ];
}
