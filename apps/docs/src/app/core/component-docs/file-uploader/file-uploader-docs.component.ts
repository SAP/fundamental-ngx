import { Component } from '@angular/core';

import fileUploaderCompactH from '!./examples/file-uploader-compact-example/file-uploader-compact-example.component.html?raw';
import fileUploaderCompactT from '!./examples/file-uploader-compact-example/file-uploader-compact-example.component.ts?raw';

import fileUploaderTruncationH from '!./examples/file-uploader-truncation-example/file-uploader-truncation-example.component.html?raw';
import fileUploaderTruncationT from '!./examples/file-uploader-truncation-example/file-uploader-truncation-example.component.ts?raw';

import fileUploaderH from '!./examples/file-uploader-example/file-uploader-example.component.html?raw';
import fileUploaderT from '!./examples/file-uploader-example/file-uploader-example.component.ts?raw';

import fileUploaderInvalidH from '!./examples/file-uploader-drag-disabled-example/file-uploader-drag-disabled-example.component.html?raw';
import fileUploaderInvalidT from '!./examples/file-uploader-drag-disabled-example/file-uploader-drag-disabled-example.component.ts?raw';

import fileUploaderMaxT from '!./examples/file-uploader-max-example/file-uploader-max-example.component.ts?raw';
import fileUploaderMaxH from '!./examples/file-uploader-max-example/file-uploader-max-example.component.html?raw';

import fileUploaderMinT from '!./examples/file-uploader-min-example/file-uploader-min-example.component.ts?raw';
import fileUploaderMinH from '!./examples/file-uploader-min-example/file-uploader-min-example.component.html?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader-docs.component.html',
    styleUrls: ['./file-uploader-docs.component.scss']
})
export class FileUploaderDocsComponent {
    fileUpladerCompactExample: ExampleFile[] = [
        {
            language: 'html',
            code: fileUploaderCompactH,
            fileName: 'file-uploader-compact-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderCompactExampleComponent',
            code: fileUploaderCompactT,
            fileName: 'file-uploader-compact-example'
        }
    ];
    fileUpladerExample: ExampleFile[] = [
        {
            language: 'html',
            code: fileUploaderH,
            fileName: 'file-uploader-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderExampleComponent',
            code: fileUploaderT,
            fileName: 'file-uploader-example'
        }
    ];

    fileInvalidCustom: ExampleFile[] = [
        {
            language: 'html',
            code: fileUploaderInvalidH,
            fileName: 'file-uploader-drag-disabled-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderDragDisabledExampleComponent',
            code: fileUploaderInvalidT,
            fileName: 'file-uploader-drag-disabled-example'
        }
    ];

    fileMaxSize: ExampleFile[] = [
        {
            language: 'html',
            code: fileUploaderMaxH,
            fileName: 'file-uploader-max-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderMaxExampleComponent',
            code: fileUploaderMaxT,
            fileName: 'file-uploader-max-example'
        }
    ];

    fileMinSize: ExampleFile[] = [
        {
            language: 'html',
            code: fileUploaderMinH,
            fileName: 'file-uploader-min-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderMinExampleComponent',
            code: fileUploaderMinT,
            fileName: 'file-uploader-min-example'
        }
    ];

    fileTruncation: ExampleFile[] = [
        {
            language: 'html',
            code: fileUploaderTruncationH,
            fileName: 'file-uploader-truncation-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderTruncationExampleComponent',
            code: fileUploaderTruncationT,
            fileName: 'file-uploader-truncation-example'
        }
    ];
}
