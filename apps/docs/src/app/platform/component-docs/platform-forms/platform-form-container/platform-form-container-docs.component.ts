import { Component } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import platformFormLayoutContainerSrc from '!./platform-form-container-examples/platform-form-container-recommended-example.component.html?raw';
import platformFormLayoutContainerTsCode from '!./platform-form-container-examples/platform-form-container-recommended-example.component.ts?raw';
import platformPossibleFormContainerSrc from '!./platform-form-container-examples/platform-form-container-possible-example.component.html?raw';
import platformPossibleFormContainerTsCode from '!./platform-form-container-examples/platform-form-container-possible-example.component.ts?raw';
import platformNotRecommendedFormContainerSrc from '!./platform-form-container-examples/platform-form-container-not-recommended-example.component.html?raw';
import platformNotRecommendedFormContainerTsCode from '!./platform-form-container-examples/platform-form-container-not-recommended-example.component.ts?raw';
import platformComplexFormContainerSrc from '!./platform-form-container-examples/platform-form-container-complex-example.component.html?raw';
import platformComplexFormContainerTsCode from '!./platform-form-container-examples/platform-form-container-complex-example.component.ts?raw';
import platformColFormContainerSrc from '!./platform-form-container-examples/platform-form-basic/platform-form-basic-example.component.html?raw';
import platformGFormContainerSrc from '!./platform-form-container-examples/platform-form-group/platform-form-group-example.component.html?raw';
import platformFormFieldLayoutSrc from '!./platform-form-container-examples/platform-field-layout/platform-field-column-change-example.component.html?raw';
import platformFormFieldLayoutTsCode from '!./platform-form-container-examples/platform-field-layout/platform-field-column-change-example.component.ts?raw';
import platformFormFieldInlineLayoutSrc from '!./platform-form-container-examples/platform-field-layout/platform-field-isinline-change-example.component.html?raw';
import platformFormFieldInlineLayoutTsCode from '!./platform-form-container-examples/platform-field-layout/platform-field-isinline-change-example.component.ts?raw';

@Component({
    selector: 'app-form-container',
    templateUrl: './platform-form-container-docs.component.html'
})
export class PlatformFormContainerDocsComponent {
    formContainerRecommended: ExampleFile[] = [
        {
            language: 'html',
            code: platformFormLayoutContainerSrc,
            fileName: 'platform-form-container-recommended-example'
        },
        {
            language: 'typescript',
            code: platformFormLayoutContainerTsCode,
            fileName: 'platform-form-container-recommended-example',
            component: 'PlatformFormContainerRecommendedExampleComponent'
        }
    ];

    formContainerPossible: ExampleFile[] = [
        {
            language: 'html',
            code: platformPossibleFormContainerSrc,
            fileName: 'platform-form-container-possible-example'
        },
        {
            language: 'typescript',
            code: platformPossibleFormContainerTsCode,
            fileName: 'platform-form-container-possible-example',
            component: 'PlatformFormContainerPossibleExampleComponent'
        }
    ];

    formContainerNotRecommended: ExampleFile[] = [
        {
            language: 'html',
            code: platformNotRecommendedFormContainerSrc,
            fileName: 'platform-form-container-not-recommended-example'
        },
        {
            language: 'typescript',
            code: platformNotRecommendedFormContainerTsCode,
            fileName: 'platform-form-container-not-recommended-example',
            component: 'PlatformFormContainerNotRecommendedExampleComponent'
        }
    ];
    formContainerComplex: ExampleFile[] = [
        {
            language: 'html',
            code: platformComplexFormContainerSrc,
            fileName: 'platform-form-container-complex-example'
        },
        {
            language: 'typescript',
            code: platformComplexFormContainerTsCode,
            fileName: 'platform-form-container-complex-example',
            component: 'PlatformFormContainerComplexExampleComponent'
        }
    ];

    formContainerColumn: ExampleFile[] = [
        {
            language: 'html',
            code: platformColFormContainerSrc,
            fileName: 'platform-form-container-columns-example',
            component: 'PlatformFormContainerBasicExampleComponent'
        }
    ];

    formContainerGroup: ExampleFile[] = [
        {
            language: 'html',
            code: platformGFormContainerSrc,
            fileName: 'platform-form-container-grouping-example',
            component: 'PlatformFormContainerGroupExampleComponent'
        }
    ];

    formFieldColumnLayout: ExampleFile[] = [
        {
            language: 'html',
            code: platformFormFieldLayoutSrc,
            fileName: 'platform-field-column-change-example',
            component: 'PlatformFieldColumnChangeExampleComponent'
        },
        {
            language: 'typescript',
            code: platformFormFieldLayoutTsCode,
            fileName: 'platform-field-column-change-example',
            component: 'PlatformFieldColumnChangeExampleComponent'
        }
    ];

    formFieldInlineLayout: ExampleFile[] = [
        {
            language: 'html',
            code: platformFormFieldInlineLayoutSrc,
            fileName: 'platform-field-isinline-change-example',
            component: 'PlatformFieldIsInlineChangeExampleComponent'
        },
        {
            language: 'typescript',
            code: platformFormFieldInlineLayoutTsCode,
            fileName: 'platform-field-isinline-change-example',
            component: 'PlatformFieldIsInlineChangeExampleComponent'
        }
    ];
}
