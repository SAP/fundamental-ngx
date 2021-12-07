import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformBasicSfbSrc from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-basic-example.component.html';
import * as platformBasicSfbTsCode from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-basic-example.component.ts';

import * as platformSfbCustomDataSourceSrc from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-observable-example.component.html';
import * as platformSfbCustomDataSourceTsCode from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-observable-example.component.ts';

import * as platformSfbCustomFiltersSrc from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-custom-filter-example.component.html';
import * as platformSfbCustomFiltersTsCode from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-custom-filter-example.component.ts';

import * as platformSfbCustomLabelsSrc from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-custom-labels-example.component.html';
import * as platformSfbCustomLabelsTsCode from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-custom-labels-example.component.ts';

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
}
