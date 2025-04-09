import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { PlatformFieldColumnChangeExampleComponent } from './examples/platform-field-layout/platform-field-column-change-example.component';
import { PlatformFieldIsInlineChangeExampleComponent } from './examples/platform-field-layout/platform-field-isinline-change-example.component';
import { PlatformFormBasicExampleComponent } from './examples/platform-form-basic/platform-form-basic-example.component';
import { PlatformFormContainerComplexExampleComponent } from './examples/platform-form-container-complex-example.component';
import { PlatformFormContainerPossibleExampleComponent } from './examples/platform-form-container-possible-example.component';
import { PlatformFormContainerRecommendedExampleComponent } from './examples/platform-form-container-recommended-example.component';
import { PlatformFormCustomLayoutComponent } from './examples/platform-form-custom-layout.component';
import { PlatformFormGroupExampleComponent } from './examples/platform-form-group/platform-form-group-example.component';

const platformFormLayoutContainerSrc = 'platform-form-container-recommended-example.component.html';
const platformFormLayoutContainerTsCode = 'platform-form-container-recommended-example.component.ts';
const platformPossibleFormContainerSrc = 'platform-form-container-possible-example.component.html';
const platformPossibleFormContainerTsCode = 'platform-form-container-possible-example.component.ts';
const platformComplexFormContainerSrc = 'platform-form-container-complex-example.component.html';
const platformComplexFormContainerTsCode = 'platform-form-container-complex-example.component.ts';

@Component({
    selector: 'app-form-container',
    templateUrl: './platform-form-container-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformFormContainerRecommendedExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformFormContainerPossibleExampleComponent,
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
        getExampleFile('platform-form-basic/platform-form-basic-example.component.html'),
        getExampleFile('platform-form-basic/platform-form-basic-example.component.ts', {
            selector: 'platform-form-basic-example',
            component: 'PlatformFormBasicExampleComponent'
        })
    ];

    formContainerGroup: ExampleFile[] = [
        getExampleFile('platform-form-group/platform-form-group-example.component.html'),
        getExampleFile('platform-form-group/platform-form-group-example.component.ts', {
            selector: 'platform-form-group-example',
            component: 'PlatformFormGroupExampleComponent'
        })
    ];

    formFieldColumnLayout: ExampleFile[] = [
        getExampleFile('platform-field-layout/platform-field-column-change-example.component.html'),
        getExampleFile('platform-field-layout/platform-field-column-change-example.component.ts', {
            selector: 'platform-form-column-change-example',
            component: 'PlatformFieldColumnChangeExampleComponent'
        })
    ];

    formFieldInlineLayout: ExampleFile[] = [
        getExampleFile('platform-field-layout/platform-field-isinline-change-example.component.html'),
        getExampleFile('platform-field-layout/platform-field-isinline-change-example.component.ts', {
            selector: 'platform-form-isinline-change-example',
            component: 'PlatformFieldIsInlineChangeExampleComponent'
        })
    ];
}
