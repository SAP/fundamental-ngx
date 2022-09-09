import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformFormLayoutContainerSrc = 'platform-form-container-recommended-example.component.html';
const platformFormLayoutContainerTsCode = 'platform-form-container-recommended-example.component.ts';
const platformPossibleFormContainerSrc = 'platform-form-container-possible-example.component.html';
const platformPossibleFormContainerTsCode = 'platform-form-container-possible-example.component.ts';
const platformNotRecommendedFormContainerSrc = 'platform-form-container-not-recommended-example.component.html';
const platformNotRecommendedFormContainerTsCode = 'platform-form-container-not-recommended-example.component.ts';
const platformComplexFormContainerSrc = 'platform-form-container-complex-example.component.html';
const platformComplexFormContainerTsCode = 'platform-form-container-complex-example.component.ts';
const platformColFormContainerSrc = 'platform-form-basic/platform-form-basic-example.component.html';
const platformGFormContainerSrc = 'platform-form-group/platform-form-group-example.component.html';
const platformFormFieldLayoutSrc = 'platform-field-layout/platform-field-column-change-example.component.html';
const platformFormFieldLayoutTsCode = 'platform-field-layout/platform-field-column-change-example.component.ts';
const platformFormFieldInlineLayoutSrc = 'platform-field-layout/platform-field-isinline-change-example.component.html';
const platformFormFieldInlineLayoutTsCode = 'platform-field-layout/platform-field-isinline-change-example.component.ts';

@Component({
    selector: 'app-form-container',
    templateUrl: './platform-form-container-docs.component.html'
})
export class PlatformFormContainerDocsComponent {
    formContainerRecommended: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFormLayoutContainerSrc),
            fileName: 'platform-form-container-recommended-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFormLayoutContainerTsCode),
            fileName: 'platform-form-container-recommended-example',
            component: 'PlatformFormContainerRecommendedExampleComponent'
        }
    ];

    formContainerPossible: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformPossibleFormContainerSrc),
            fileName: 'platform-form-container-possible-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformPossibleFormContainerTsCode),
            fileName: 'platform-form-container-possible-example',
            component: 'PlatformFormContainerPossibleExampleComponent'
        }
    ];

    formContainerNotRecommended: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformNotRecommendedFormContainerSrc),
            fileName: 'platform-form-container-not-recommended-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformNotRecommendedFormContainerTsCode),
            fileName: 'platform-form-container-not-recommended-example',
            component: 'PlatformFormContainerNotRecommendedExampleComponent'
        }
    ];
    formContainerComplex: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformComplexFormContainerSrc),
            fileName: 'platform-form-container-complex-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformComplexFormContainerTsCode),
            fileName: 'platform-form-container-complex-example',
            component: 'PlatformFormContainerComplexExampleComponent'
        }
    ];

    formContainerColumn: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformColFormContainerSrc),
            fileName: 'platform-form-container-columns-example',
            component: 'PlatformFormContainerBasicExampleComponent'
        }
    ];

    formContainerGroup: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformGFormContainerSrc),
            fileName: 'platform-form-container-grouping-example',
            component: 'PlatformFormContainerGroupExampleComponent'
        }
    ];

    formFieldColumnLayout: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFormFieldLayoutSrc),
            fileName: 'platform-field-column-change-example',
            component: 'PlatformFieldColumnChangeExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFormFieldLayoutTsCode),
            fileName: 'platform-field-column-change-example',
            component: 'PlatformFieldColumnChangeExampleComponent'
        }
    ];

    formFieldInlineLayout: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFormFieldInlineLayoutSrc),
            fileName: 'platform-field-isinline-change-example',
            component: 'PlatformFieldIsInlineChangeExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFormFieldInlineLayoutTsCode),
            fileName: 'platform-field-isinline-change-example',
            component: 'PlatformFieldIsInlineChangeExampleComponent'
        }
    ];
}
