import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as dynamicPageBasicExample from '!raw-loader!./dynamic-page-examples/dynamic-page-example.component.html';
import * as dynamicPageBasicExampleScss from '!raw-loader!./dynamic-page-examples/dynamic-page-example.component.scss';
import * as dynamicPageBasicExampleTsCode from '!raw-loader!./dynamic-page-examples/dynamic-page-example.component.js';


@Component({
    selector: 'app-dynamic-page',
    templateUrl: './dynamic-page-docs.component.html'
})
export class DynamicPageDocsComponent {
    dynamicPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageBasicExample,
            fileName: 'platform-dynamic-page-example',
            scssFileCode: dynamicPageBasicExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageBasicExampleTsCode,
            fileName: 'platform-dynamic-page-example',
            component: 'PlatformDynamicPageExampleComponent'
        }
    ];
}
