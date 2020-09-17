import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as dynamicPageBasicExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-example.component.html';

import * as dynamicPageTabbedExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-tabbed.component.html';
@Component({
    selector: 'app-dynamic-page',
    templateUrl: './platform-dynamic-page-docs.component.html'
})
export class PlatformDynamicPageDocsComponent {
    dynamicPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageBasicExample,
            fileName: 'platform-dynamic-page-example'
        }
    ];
    dynamicPageTabbed: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageTabbedExample,
            fileName: 'platform-dynamic-page-tabbed'
        }
    ];
}
