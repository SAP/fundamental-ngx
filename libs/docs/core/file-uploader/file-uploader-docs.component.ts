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
import { FileUploaderCompactExampleComponent } from './examples/file-uploader-compact-example/file-uploader-compact-example.component';
import { FileUploaderDisabledExampleComponent } from './examples/file-uploader-disabled-example/file-uploader-example.component';
import { FileUploaderDragDisabledExampleComponent } from './examples/file-uploader-drag-disabled-example/file-uploader-drag-disabled-example.component';
import { FileUploaderExampleComponent } from './examples/file-uploader-example/file-uploader-example.component';
import { FileUploaderMaxExampleComponent } from './examples/file-uploader-max-example/file-uploader-max-example.component';
import { FileUploaderMinExampleComponent } from './examples/file-uploader-min-example/file-uploader-min-example.component';
import { FileUploaderTruncationExampleComponent } from './examples/file-uploader-truncation-example/file-uploader-truncation-example.component';

const fileUploaderCompactH = 'file-uploader-compact-example/file-uploader-compact-example.component.html';
const fileUploaderCompactT = 'file-uploader-compact-example/file-uploader-compact-example.component.ts';

const fileUploaderTruncationH = 'file-uploader-truncation-example/file-uploader-truncation-example.component.html';
const fileUploaderTruncationT = 'file-uploader-truncation-example/file-uploader-truncation-example.component.ts';

const fileUploaderH = 'file-uploader-example/file-uploader-example.component.html';
const fileUploaderT = 'file-uploader-example/file-uploader-example.component.ts';

const fileUploaderInvalidH = 'file-uploader-drag-disabled-example/file-uploader-drag-disabled-example.component.html';
const fileUploaderInvalidT = 'file-uploader-drag-disabled-example/file-uploader-drag-disabled-example.component.ts';

const fileUploaderMaxT = 'file-uploader-max-example/file-uploader-max-example.component.ts';
const fileUploaderMaxH = 'file-uploader-max-example/file-uploader-max-example.component.html';

const fileUploaderMinT = 'file-uploader-min-example/file-uploader-min-example.component.ts';
const fileUploaderMinH = 'file-uploader-min-example/file-uploader-min-example.component.html';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader-docs.component.html',
    styleUrls: ['./file-uploader-docs.component.scss'],
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        FileUploaderExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        FileUploaderDisabledExampleComponent,
        FileUploaderTruncationExampleComponent,
        FileUploaderCompactExampleComponent,
        FileUploaderDragDisabledExampleComponent,
        FileUploaderMinExampleComponent,
        FileUploaderMaxExampleComponent
    ]
})
export class FileUploaderDocsComponent {
    fileUpladerCompactExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fileUploaderCompactH),
            fileName: 'file-uploader-compact-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderCompactExampleComponent',
            code: getAssetFromModuleAssets(fileUploaderCompactT),
            fileName: 'file-uploader-compact-example'
        }
    ];
    fileUpladerExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fileUploaderH),
            fileName: 'file-uploader-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderExampleComponent',
            code: getAssetFromModuleAssets(fileUploaderT),
            fileName: 'file-uploader-example'
        }
    ];

    fileInvalidCustom: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fileUploaderInvalidH),
            fileName: 'file-uploader-drag-disabled-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderDragDisabledExampleComponent',
            code: getAssetFromModuleAssets(fileUploaderInvalidT),
            fileName: 'file-uploader-drag-disabled-example'
        }
    ];

    fileMaxSize: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fileUploaderMaxH),
            fileName: 'file-uploader-max-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderMaxExampleComponent',
            code: getAssetFromModuleAssets(fileUploaderMaxT),
            fileName: 'file-uploader-max-example'
        }
    ];

    fileMinSize: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fileUploaderMinH),
            fileName: 'file-uploader-min-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderMinExampleComponent',
            code: getAssetFromModuleAssets(fileUploaderMinT),
            fileName: 'file-uploader-min-example'
        }
    ];

    fileTruncation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fileUploaderTruncationH),
            fileName: 'file-uploader-truncation-example'
        },
        {
            language: 'typescript',
            component: 'FileUploaderTruncationExampleComponent',
            code: getAssetFromModuleAssets(fileUploaderTruncationT),
            fileName: 'file-uploader-truncation-example'
        }
    ];
}
