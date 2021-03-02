import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as dynamicPageBasicExample from '!raw-loader!./dynamic-page-examples/dynamic-page-example.component.html';
import * as dynamicPageBasicExampleTsCode from '!raw-loader!./dynamic-page-examples/dynamic-page-example.component.ts';
import * as dynamicPageTabsExampleTsCode from '!raw-loader!./dynamic-page-examples/dynamic-page-tabs-example/dynamic-page-tabs-example.component.ts';
import * as dynamicPageTabsExampleHtmlCode from '!raw-loader!./dynamic-page-examples/dynamic-page-tabs-example/dynamic-page-tabs-example.component.html';
import * as dynamicPageColumnExampleTsCode from '!raw-loader!./dynamic-page-examples/dynamic-page-column-layout-example/dynamic-page-column-layout-example.component.ts';
import * as dynamicPageColumnExampleHtmlCode from '!raw-loader!./dynamic-page-examples/dynamic-page-column-layout-example/dynamic-page-column-layout-example.component.html'
import * as dynamicPageResponsiveExampleTsCode from '!raw-loader!./dynamic-page-examples/dynamic-page-responsive-example/dynamic-page-responsive-example.component.ts';
import * as dynamicPageResponsiveExampleHtmlCode from '!raw-loader!./dynamic-page-examples/dynamic-page-responsive-example/dynamic-page-responsive-example.component.html'


@Component({
    selector: 'app-dynamic-page',
    templateUrl: './dynamic-page-docs.component.html'
})
export class DynamicPageDocsComponent {
    dynamicPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageBasicExample,
            fileName: 'dynamic-page-basic-example',
        },
        {
            language: 'typescript',
            code: dynamicPageBasicExampleTsCode,
            fileName: 'dynamic-page-basic-example',
            component: 'DynamicPageExampleComponent'
        }
    ];

    dynamicPageTabs: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageTabsExampleHtmlCode,
            fileName: 'dynamic-page-tabs-example',
        },
        {
            language: 'typescript',
            code: dynamicPageTabsExampleTsCode,
            fileName: 'dynamic-page-tabs-example',
            component: 'DynamicPageTabsExampleComponent'
        }
    ];

    dynamicPageColumn: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageColumnExampleHtmlCode,
            fileName: 'dynamic-page-column-layout-example',
        },
        {
            language: 'typescript',
            code: dynamicPageColumnExampleTsCode,
            fileName: 'dynamic-page-column-layout-example',
            component: 'DynamicPageColumnLayoutExampleComponent'
        }
    ];

    dynamicPageResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageResponsiveExampleHtmlCode,
            fileName: 'dynamic-page-responsive-example',
        },
        {
            language: 'typescript',
            code: dynamicPageResponsiveExampleTsCode,
            fileName: 'dynamic-page-responsive-example',
            component: 'DynamicPageResponsiveExampleComponent'
        }
    ];
}
