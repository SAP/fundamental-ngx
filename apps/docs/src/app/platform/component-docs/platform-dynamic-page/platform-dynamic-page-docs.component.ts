import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as dynamicPageBasicExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-example.component.html';

import * as dynamicPageTabbedExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.html';
import * as dynamicPageTabbedExampleScss from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.scss';
import * as dynamicPageTabbedExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.ts';

import * as dynamicPageSnapScrollExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.html';
import * as dynamicPageSnapScrollExampleScss from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.scss';
import * as dynamicPageSnapScrollExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.ts';

import * as dynamicPageResponsivePaddingExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component.html';
import * as dynamicPageResponsivePaddingExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component.ts';

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
    dynamicPageSnapScroll: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageSnapScrollExample,
            fileName: 'platform-dynamic-page-snap-scroll',
            scssFileCode: dynamicPageSnapScrollExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageSnapScrollExampleTsCode,
            fileName: 'platform-dynamic-page-snap-scroll',
            component: 'PlatformDynamicPageSnapScrollComponent'
        },
        {
            language: 'scss',
            code: dynamicPageSnapScrollExampleScss,
            fileName: 'platform-dynamic-page-snap-scroll'
        }
    ];

    dynamicPageTabbed: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageTabbedExample,
            fileName: 'platform-dynamic-page-tabbed-example',
            scssFileCode: dynamicPageTabbedExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageTabbedExampleTsCode,
            fileName: 'platform-dynamic-page-tabbed-example',
            component: 'PlatformDynamicPageTabbedComponent'
        },
        {
            language: 'scss',
            code: dynamicPageTabbedExampleScss,
            fileName: 'platform-dynamic-page-tabbed-example'
        }
    ];

    dynamicPageResponsivePadding: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageResponsivePaddingExample,
            fileName: 'platform-dynamic-page-responsive-padding-example'
        },
        {
            language: 'typescript',
            code: dynamicPageResponsivePaddingExampleTsCode,
            fileName: 'platform-dynamic-page-responsive-padding-example',
            component: 'PlatformDynamicPageResponsivePaddingComponent'
        }
    ];
}
