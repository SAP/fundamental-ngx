import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import platformBasicSfbSrc from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-basic-example.component.html?raw';
import platformBasicSfbTsCode from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-basic-example.component.ts?raw';

import platformSfbCustomDataSourceSrc from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-observable-example.component.html?raw';
import platformSfbCustomDataSourceTsCode from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-observable-example.component.ts?raw';

import platformSfbCustomFiltersSrc from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-custom-filter-example.component.html?raw';
import platformSfbCustomFiltersTsCode from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-custom-filter-example.component.ts?raw';

import platformSfbCustomLabelsSrc from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-custom-labels-example.component.html?raw';
import platformSfbCustomLabelsTsCode from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-custom-labels-example.component.ts?raw';

import platformSfbDynamicPageSrc from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-dynamic-page-example.component.html?raw';
import platformSfbDynamicPageTsCode from '!./platform-smart-filter-bar-examples/platform-smart-filter-bar-dynamic-page-example.component.ts?raw';

@Component({
    selector: 'app-smart-filter-bar',
    templateUrl: './platform-smart-filter-bar-docs.component.html'
})
export class PlatformSmartFilterBarDocsComponent {
    sfbBasic: ExampleFile[] = [
        {
            language: 'html',
            code: platformBasicSfbSrc,
            fileName: 'platform-smart-filter-bar-basic-example'
        },
        {
            language: 'typescript',
            code: platformBasicSfbTsCode,
            fileName: 'platform-smart-filter-bar-basic-example',
            component: 'PlatformSmartFilterBarBasicExampleComponent'
        }
    ];

    sfbCustomDataSource: ExampleFile[] = [
        {
            language: 'html',
            code: platformSfbCustomDataSourceSrc,
            fileName: 'platform-smart-filter-bar-observable-example'
        },
        {
            language: 'typescript',
            code: platformSfbCustomDataSourceTsCode,
            fileName: 'platform-smart-filter-bar-observable-example',
            component: 'PlatformSmartFilterBarObservableExampleComponent'
        }
    ];

    sfbCustomFilters: ExampleFile[] = [
        {
            language: 'html',
            code: platformSfbCustomFiltersSrc,
            fileName: 'platform-smart-filter-bar-custom-filter-example'
        },
        {
            language: 'typescript',
            code: platformSfbCustomFiltersTsCode,
            fileName: 'platform-smart-filter-bar-custom-filter-example',
            component: 'PlatformSmartFilterBarCustomFilterExampleComponent'
        }
    ];

    sfbCustomLabels: ExampleFile[] = [
        {
            language: 'html',
            code: platformSfbCustomLabelsSrc,
            fileName: 'platform-smart-filter-bar-custom-labels-example'
        },
        {
            language: 'typescript',
            code: platformSfbCustomLabelsTsCode,
            fileName: 'platform-smart-filter-bar-custom-labels-example',
            component: 'PlatformSmartFilterBarCustomLabelsExampleComponent'
        }
    ];

    sfbDynamicPage: ExampleFile[] = [
        {
            language: 'html',
            code: platformSfbDynamicPageSrc,
            fileName: 'platform-smart-filter-bar-dynamic-page-example'
        },
        {
            language: 'typescript',
            code: platformSfbDynamicPageTsCode,
            fileName: 'platform-smart-filter-bar-dynamic-page-example',
            component: 'PlatformSmartFilterBarDynamicPageExampleComponent'
        }
    ];
}
