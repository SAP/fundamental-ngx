import { Component } from '@angular/core';

import * as uploadCollectionDataProviderTs from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-base-data-provider';
import * as uploadCollectionTs from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-example.component';
import * as uploadCollectionHtml from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-example.component.html';

import * as uploadCollectionDisabledTs from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-disabled-example.component';
import * as uploadCollectionDisabledHtml from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-disabled-example.component.html';

import * as uploadCollectionReadonlyTs from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-readonly-example.component';
import * as uploadCollectionReadonlyHtml from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-readonly-example.component.html';

import * as uploadCollectionTurnOffTs from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-turn-off-example.component';
import * as uploadCollectionTurnOffHtml from '!raw-loader!./platform-upload-collection-examples/platform-upload-collection-turn-off-example.component.html';

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
