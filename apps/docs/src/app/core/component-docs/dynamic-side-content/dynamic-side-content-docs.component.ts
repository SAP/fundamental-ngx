import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import exampleScssCode from '!./examples/dynamic-side-content.component.scss?raw';
import basicExampleHtmlCode from '!./examples/dynamic-side-content-basic-example.component.html?raw';
import basicExampleTsCode from '!./examples/dynamic-side-content-basic-example.component.ts?raw';
import positioningExampleHtmlCode from '!./examples/dynamic-side-content-positioning-example.component.html?raw';
import positioningExampleTsCode from '!./examples/dynamic-side-content-positioning-example.component.ts?raw';
import sizeExampleHtmlCode from '!./examples/dynamic-side-content-size-example.component.html?raw';
import sizeExampleTsCode from '!./examples/dynamic-side-content-size-example.component.ts?raw';

@Component({
    templateUrl: './dynamic-side-content-docs.component.html'
})
export class DynamicSideContentDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: basicExampleHtmlCode,
            fileName: 'dynamic-side-content-basic-example',
            component: 'DynamicSideContentBasicExampleComponent',
            typescriptFileCode: basicExampleTsCode,
            scssFileCode: exampleScssCode
        },
        {
            language: 'scss',
            code: exampleScssCode,
            fileName: 'dynamic-side-content',
            component: 'DynamicSideContentBasicExampleComponent',
            scssFileCode: exampleScssCode
        }
    ];

    positioning: ExampleFile[] = [
        {
            language: 'html',
            code: positioningExampleHtmlCode,
            fileName: 'dynamic-side-content-positioning-example',
            component: 'DynamicSideContentPositioningExampleComponent',
            typescriptFileCode: positioningExampleTsCode,
            scssFileCode: exampleScssCode
        },
        {
            language: 'scss',
            code: exampleScssCode,
            fileName: 'dynamic-side-content',
            component: 'DynamicSideContentPositioningExampleComponent',
            scssFileCode: exampleScssCode
        }
    ];

    size: ExampleFile[] = [
        {
            language: 'html',
            code: sizeExampleHtmlCode,
            fileName: 'dynamic-side-content-size-example',
            component: 'DynamicSideContentSizeExampleComponent',
            typescriptFileCode: sizeExampleTsCode,
            scssFileCode: exampleScssCode
        },
        {
            language: 'scss',
            code: exampleScssCode,
            fileName: 'dynamic-side-content',
            component: 'DynamicSideContentSizeExampleComponent',
            scssFileCode: exampleScssCode
        }
    ];
}
