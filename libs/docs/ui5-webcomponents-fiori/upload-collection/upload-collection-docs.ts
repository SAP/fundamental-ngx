import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSample } from './examples/basic-sample';
import { CustomHeaderSample } from './examples/custom-header-sample';
import { DragDropSample } from './examples/drag-drop-sample';
import { SelectionSample } from './examples/selection-sample';
import { UploadStatesSample } from './examples/upload-states-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const selectionSampleTs = 'selection-sample.ts';
const selectionSampleHtml = 'selection-sample.html';
const uploadStatesSampleTs = 'upload-states-sample.ts';
const uploadStatesSampleHtml = 'upload-states-sample.html';
const dragDropSampleTs = 'drag-drop-sample.ts';
const dragDropSampleHtml = 'drag-drop-sample.html';
const customHeaderSampleTs = 'custom-header-sample.ts';
const customHeaderSampleHtml = 'custom-header-sample.html';

@Component({
    selector: 'ui5-doc-upload-collection',
    templateUrl: './upload-collection-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        SelectionSample,
        UploadStatesSample,
        DragDropSample,
        CustomHeaderSample
    ]
})
export class UploadCollectionDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample',
            component: 'BasicSample'
        }
    ]);

    selectionExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(selectionSampleTs),
            originalFileName: 'selection-sample',
            component: 'SelectionSample',
            typescriptFileCode: getAssetFromModuleAssets(selectionSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectionSampleHtml),
            originalFileName: 'selection-sample',
            component: 'SelectionSample'
        }
    ]);

    uploadStatesExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(uploadStatesSampleTs),
            originalFileName: 'upload-states-sample',
            component: 'UploadStatesSample',
            typescriptFileCode: getAssetFromModuleAssets(uploadStatesSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadStatesSampleHtml),
            originalFileName: 'upload-states-sample',
            component: 'UploadStatesSample'
        }
    ]);

    dragDropExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dragDropSampleTs),
            originalFileName: 'drag-drop-sample',
            component: 'DragDropSample',
            typescriptFileCode: getAssetFromModuleAssets(dragDropSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(dragDropSampleHtml),
            originalFileName: 'drag-drop-sample',
            component: 'DragDropSample'
        }
    ]);

    customHeaderExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customHeaderSampleTs),
            originalFileName: 'custom-header-sample',
            component: 'CustomHeaderSample',
            typescriptFileCode: getAssetFromModuleAssets(customHeaderSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(customHeaderSampleHtml),
            originalFileName: 'custom-header-sample',
            component: 'CustomHeaderSample'
        }
    ]);
}
