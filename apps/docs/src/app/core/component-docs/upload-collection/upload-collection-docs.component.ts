import { Component } from '@angular/core';

import * as uploadCollectionHtml from '!raw-loader!./examples/upload-collection-example.component.html';
import * as uploadCollectionTs from '!raw-loader!./examples/upload-collection-example.component.ts';
import * as uploadCollectionSmallHtml from '!raw-loader!./examples/upload-collection-small-example.component.html';
import * as uploadCollectionSmallTs from '!raw-loader!./examples/upload-collection-small-example.component.ts';
import * as uploadCollectionCustomHtml from '!raw-loader!./examples/upload-collection-custom-example.component.html';
import * as uploadCollectionCustomTs from '!raw-loader!./examples/upload-collection-custom-example.component.ts';
import * as uploadCollectionComplexHtml from '!raw-loader!./examples/upload-collection-complex-example.component.html';
import * as uploadCollectionComplexTs from '!raw-loader!./examples/upload-collection-complex-example.component.ts';
import * as uploadCollectionEmptyHtml from '!raw-loader!./examples/upload-collection-empty-example.component.html';
import * as uploadCollectionEmptyTs from '!raw-loader!./examples/upload-collection-empty-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-upload-collection',
    templateUrl: './upload-collection-docs.component.html'
})
export class UploadCollectionDocsComponent {
    uploadCollection: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionHtml,
            typescriptFileCode: uploadCollectionTs,
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent'
        },
        {
            language: 'TypeScript',
            code: uploadCollectionTs,
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent'
        }
    ];
    uploadCollectionSmall: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionSmallHtml,
            typescriptFileCode: uploadCollectionSmallTs,
            fileName: 'upload-collection-small-example',
            component: 'UploadCollectionSmallExampleComponent'
        },
        {
            language: 'TypeScript',
            code: uploadCollectionSmallTs,
            fileName: 'upload-collection-small-example',
            component: 'UploadCollectionSmallExampleComponent'
        }
    ];
    uploadCollectionCustom: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionCustomHtml,
            typescriptFileCode: uploadCollectionCustomTs,
            fileName: 'upload-collection-custom-example',
            component: 'UploadCollectionCustomExampleComponent'
        },
        {
            language: 'TypeScript',
            code: uploadCollectionCustomTs,
            fileName: 'upload-collection-custom-example',
            component: 'UploadCollectionCustomExampleComponent'
        }
    ];
    uploadCollectionComplex: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionComplexHtml,
            typescriptFileCode: uploadCollectionComplexTs,
            fileName: 'upload-collection-complex-example',
            component: 'UploadCollectionComplexExampleComponent'
        },
        {
            language: 'TypeScript',
            code: uploadCollectionComplexTs,
            fileName: 'upload-collection-complex-example',
            component: 'UploadCollectionComplexExampleComponent'
        }
    ];
    uploadCollectionEmpty: ExampleFile[] = [
        {
            language: 'html',
            code: uploadCollectionEmptyHtml,
            typescriptFileCode: uploadCollectionEmptyTs,
            fileName: 'upload-collection-empty-example',
            component: 'UploadCollectionEmptyExampleComponent'
        },
        {
            language: 'TypeScript',
            code: uploadCollectionEmptyTs,
            fileName: 'upload-collection-empty-example',
            component: 'UploadCollectionEmptyExampleComponent'
        }
    ];
}
