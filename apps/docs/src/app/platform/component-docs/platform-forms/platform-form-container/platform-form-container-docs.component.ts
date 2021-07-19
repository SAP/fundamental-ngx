import { Component } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import * as platformFormLayoutContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-container-recommended-example.component.html';
import * as platformFormLayoutContainerTsCode from '!raw-loader!./platform-form-container-examples/platform-form-container-recommended-example.component.ts';
import * as platformPossibleFormContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-container-possible-example.component.html';
import * as platformPossibleFormContainerTsCode from '!raw-loader!./platform-form-container-examples/platform-form-container-possible-example.component.ts';
import * as platformNotRecommendedFormContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-container-not-recommended-example.component.html';
import * as platformNotRecommendedFormContainerTsCode from '!raw-loader!./platform-form-container-examples/platform-form-container-not-recommended-example.component.ts';
import * as platformComplexFormContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-container-complex-example.component.html';
import * as platformComplexFormContainerTsCode from '!raw-loader!./platform-form-container-examples/platform-form-container-complex-example.component.ts';
import * as platformColFormContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-basic/platform-form-basic-example.component.html';
import * as platformGFormContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-group/platform-form-group-example.component.html';
import * as platformFormFieldLayoutSrc from '!raw-loader!./platform-form-container-examples/platform-field-layout/platform-field-column-change-example.component.html';
import * as platformFormFieldLayoutTsCode from '!raw-loader!./platform-form-container-examples/platform-field-layout/platform-field-column-change-example.component.ts';
import * as platformFormFieldInlineLayoutSrc from '!raw-loader!./platform-form-container-examples/platform-field-layout/platform-field-isinline-change-example.component.html';
import * as platformFormFieldInlineLayoutTsCode from '!raw-loader!./platform-form-container-examples/platform-field-layout/platform-field-isinline-change-example.component.ts';

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
