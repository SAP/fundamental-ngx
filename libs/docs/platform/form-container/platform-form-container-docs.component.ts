import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformFormCustomLayoutComponent } from './examples/platform-form-custom-layout.component';
import { PlatformFieldIsInlineChangeExampleComponent } from './examples/platform-field-layout/platform-field-isinline-change-example.component';
import { PlatformFieldColumnChangeExampleComponent } from './examples/platform-field-layout/platform-field-column-change-example.component';
import { PlatformFormGroupExampleComponent } from './examples/platform-form-group/platform-form-group-example.component';
import { PlatformFormBasicExampleComponent } from './examples/platform-form-basic/platform-form-basic-example.component';
import { PlatformFormContainerComplexExampleComponent } from './examples/platform-form-container-complex-example.component';
import { PlatformFormContainerNotRecommendedExampleComponent } from './examples/platform-form-container-not-recommended-example.component';
import { PlatformFormContainerPossibleExampleComponent } from './examples/platform-form-container-possible-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformFormContainerRecommendedExampleComponent } from './examples/platform-form-container-recommended-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
    templateUrl: './platform-form-container-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformFormContainerRecommendedExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformFormContainerPossibleExampleComponent,
        PlatformFormContainerNotRecommendedExampleComponent,
        PlatformFormContainerComplexExampleComponent,
        PlatformFormBasicExampleComponent,
        PlatformFormGroupExampleComponent,
        PlatformFieldColumnChangeExampleComponent,
        PlatformFieldIsInlineChangeExampleComponent,
        PlatformFormCustomLayoutComponent
    ]
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
