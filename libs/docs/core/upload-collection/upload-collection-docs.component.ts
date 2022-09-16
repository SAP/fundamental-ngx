import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const uploadCollectionHtml = 'upload-collection-example.component.html';
const uploadCollectionTs = 'upload-collection-example.component.ts';
const uploadCollectionSmallHtml = 'upload-collection-small-example.component.html';
const uploadCollectionSmallTs = 'upload-collection-small-example.component.ts';
const uploadCollectionCustomHtml = 'upload-collection-custom-example.component.html';
const uploadCollectionCustomTs = 'upload-collection-custom-example.component.ts';
const uploadCollectionComplexHtml = 'upload-collection-complex-example.component.html';
const uploadCollectionComplexTs = 'upload-collection-complex-example.component.ts';
const uploadCollectionEmptyHtml = 'upload-collection-empty-example.component.html';
const uploadCollectionEmptyTs = 'upload-collection-empty-example.component.ts';

@Component({
    selector: 'app-upload-collection',
    templateUrl: './upload-collection-docs.component.html'
})
export class UploadCollectionDocsComponent {
    uploadCollection: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionHtml),
            typescriptFileCode: getAssetFromModuleAssets(uploadCollectionTs),
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent'
        },
        {
            language: 'TypeScript',
            code: getAssetFromModuleAssets(uploadCollectionTs),
            fileName: 'upload-collection-example',
            component: 'UploadCollectionExampleComponent'
        }
    ];
    uploadCollectionSmall: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionSmallHtml),
            typescriptFileCode: getAssetFromModuleAssets(uploadCollectionSmallTs),
            fileName: 'upload-collection-small-example',
            component: 'UploadCollectionSmallExampleComponent'
        },
        {
            language: 'TypeScript',
            code: getAssetFromModuleAssets(uploadCollectionSmallTs),
            fileName: 'upload-collection-small-example',
            component: 'UploadCollectionSmallExampleComponent'
        }
    ];
    uploadCollectionCustom: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionCustomHtml),
            typescriptFileCode: getAssetFromModuleAssets(uploadCollectionCustomTs),
            fileName: 'upload-collection-custom-example',
            component: 'UploadCollectionCustomExampleComponent'
        },
        {
            language: 'TypeScript',
            code: getAssetFromModuleAssets(uploadCollectionCustomTs),
            fileName: 'upload-collection-custom-example',
            component: 'UploadCollectionCustomExampleComponent'
        }
    ];
    uploadCollectionComplex: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionComplexHtml),
            typescriptFileCode: getAssetFromModuleAssets(uploadCollectionComplexTs),
            fileName: 'upload-collection-complex-example',
            component: 'UploadCollectionComplexExampleComponent'
        },
        {
            language: 'TypeScript',
            code: getAssetFromModuleAssets(uploadCollectionComplexTs),
            fileName: 'upload-collection-complex-example',
            component: 'UploadCollectionComplexExampleComponent'
        }
    ];
    uploadCollectionEmpty: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(uploadCollectionEmptyHtml),
            typescriptFileCode: getAssetFromModuleAssets(uploadCollectionEmptyTs),
            fileName: 'upload-collection-empty-example',
            component: 'UploadCollectionEmptyExampleComponent'
        },
        {
            language: 'TypeScript',
            code: getAssetFromModuleAssets(uploadCollectionEmptyTs),
            fileName: 'upload-collection-empty-example',
            component: 'UploadCollectionEmptyExampleComponent'
        }
    ];
}
