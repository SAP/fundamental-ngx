import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import dynamicPageBasicExample from '!./dynamic-page-examples/dynamic-page-example.component.html?raw';
import dynamicPageBasicExampleTsCode from '!./dynamic-page-examples/dynamic-page-example.component.ts?raw';
import dynamicPageTabsExampleTsCode from '!./dynamic-page-examples/dynamic-page-tabs-example/dynamic-page-tabs-example.component.ts?raw';
import dynamicPageTabsExampleHtmlCode from '!./dynamic-page-examples/dynamic-page-tabs-example/dynamic-page-tabs-example.component.html?raw';
import dynamicPageColumnExampleTsCode from '!./dynamic-page-examples/dynamic-page-column-layout-example/dynamic-page-column-layout-example.component.ts?raw';
import dynamicPageColumnExampleHtmlCode from '!./dynamic-page-examples/dynamic-page-column-layout-example/dynamic-page-column-layout-example.component.html?raw';
import dynamicPageResponsiveExampleTsCode from '!./dynamic-page-examples/dynamic-page-responsive-example/dynamic-page-responsive-example.component.ts?raw';
import dynamicPageResponsiveExampleHtmlCode from '!./dynamic-page-examples/dynamic-page-responsive-example/dynamic-page-responsive-example.component.html?raw';
import dynamicPageFacetsExampleHtmlCode from '!./dynamic-page-examples/dynamic-page-facets-example/dynamic-page-facets-example.component.html?raw';
import dynamicPageFacetsExampleTsCode from '!./dynamic-page-examples/dynamic-page-facets-example/dynamic-page-facets-example.component.ts?raw';

@Component({
    selector: 'app-dynamic-page',
    templateUrl: './dynamic-page-docs.component.html'
})
export class DynamicPageDocsComponent {
    dynamicPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageBasicExample,
            fileName: 'dynamic-page-basic-example'
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
            fileName: 'dynamic-page-tabs-example'
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
            fileName: 'dynamic-page-column-layout-example'
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
            fileName: 'dynamic-page-responsive-example'
        },
        {
            language: 'typescript',
            code: dynamicPageResponsiveExampleTsCode,
            fileName: 'dynamic-page-responsive-example',
            component: 'DynamicPageResponsiveExampleComponent'
        }
    ];

    dynamicPageFacets: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageFacetsExampleHtmlCode,
            fileName: 'dynamic-page-responsive-example'
        },
        {
            language: 'typescript',
            code: dynamicPageFacetsExampleTsCode,
            fileName: 'dynamic-page-facets-example',
            component: 'DynamicPageFacetsExampleComponent'
        }
    ];
}
