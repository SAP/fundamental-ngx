import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as exampleScssCode from '!raw-loader!./examples/dynamic-side-content.component.scss';
import * as basicExampleHtmlCode from '!raw-loader!./examples/dynamic-side-content-basic-example.component.html';
import * as basicExampleTsCode from '!raw-loader!./examples/dynamic-side-content-basic-example.component.ts';
import * as positioningExampleHtmlCode from '!raw-loader!./examples/dynamic-side-content-positioning-example.component.html';
import * as positioningExampleTsCode from '!raw-loader!./examples/dynamic-side-content-positioning-example.component.ts';
import * as sizeExampleHtmlCode from '!raw-loader!./examples/dynamic-side-content-size-example.component.html';
import * as sizeExampleTsCode from '!raw-loader!./examples/dynamic-side-content-size-example.component.ts';

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
