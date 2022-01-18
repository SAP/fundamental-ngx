import { Component } from '@angular/core';

import uploadCollectionHtml from '!./examples/upload-collection-example.component.html?raw';
import uploadCollectionTs from '!./examples/upload-collection-example.component.ts?raw';
import uploadCollectionSmallHtml from '!./examples/upload-collection-small-example.component.html?raw';
import uploadCollectionSmallTs from '!./examples/upload-collection-small-example.component.ts?raw';
import uploadCollectionCustomHtml from '!./examples/upload-collection-custom-example.component.html?raw';
import uploadCollectionCustomTs from '!./examples/upload-collection-custom-example.component.ts?raw';
import uploadCollectionComplexHtml from '!./examples/upload-collection-complex-example.component.html?raw';
import uploadCollectionComplexTs from '!./examples/upload-collection-complex-example.component.ts?raw';
import uploadCollectionEmptyHtml from '!./examples/upload-collection-empty-example.component.html?raw';
import uploadCollectionEmptyTs from '!./examples/upload-collection-empty-example.component.ts?raw';
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
