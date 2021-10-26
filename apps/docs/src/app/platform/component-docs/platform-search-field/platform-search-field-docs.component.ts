import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformSearchFieldExampleScss from '!raw-loader!./platform-search-field-examples/platform-search-field-example.component.scss';
import * as platformBasicSearchFieldSrc from '!raw-loader!./platform-search-field-examples/platform-search-field-basic-example.component.html';
import * as platformBasicSearchFieldTsCode from '!raw-loader!./platform-search-field-examples/platform-search-field-basic-example.component';
import * as platformCategoriesSearchFieldSrc from '!raw-loader!./platform-search-field-examples/platform-search-field-categories-example.component.html';
import * as platformCategoriesSearchFieldTsCode from '!raw-loader!./platform-search-field-examples/platform-search-field-categories-example.component';
import * as platformDataSourceSearchFieldSrc from '!raw-loader!./platform-search-field-examples/platform-search-field-data-source-example.component.html';
import * as platformDataSourceSearchFieldTsCode from '!raw-loader!./platform-search-field-examples/platform-search-field-data-source-example.component';
import * as platformDataSourceSearchFieldServiceTsCode from '!raw-loader!./platform-search-field-examples/platform-search-field-data-source-example.service';
import * as platformSearchFieldMobileModeSrc from '!raw-loader!./platform-search-field-examples/platform-search-field-mobile/platform-search-field-mobile-example.component.html';
import * as platformSearchFieldMobileModeTsCode from '!raw-loader!./platform-search-field-examples/platform-search-field-mobile/platform-search-field-mobile-example.component.ts';

@Component({
    selector: 'app-search-field',
    templateUrl: './platform-search-field-docs.component.html'
})
export class PlatformSearchFieldDocsComponent {
    searchFieldBasic: ExampleFile[] = [
        {
            language: 'html',
            code: platformBasicSearchFieldSrc,
            fileName: 'platform-search-field-basic-example'
        },
        {
            language: 'typescript',
            code: platformBasicSearchFieldTsCode,
            fileName: 'platform-search-field-basic-example',
            component: 'PlatformSearchFieldBasicExampleComponent',
            scssFileCode: platformSearchFieldExampleScss
        }
    ];

    searchFieldCategories: ExampleFile[] = [
        {
            language: 'html',
            code: platformCategoriesSearchFieldSrc,
            fileName: 'platform-search-field-categories-example'
        },
        {
            language: 'typescript',
            code: platformCategoriesSearchFieldTsCode,
            fileName: 'platform-search-field-categories-example',
            component: 'PlatformSearchFieldCategoriesExampleComponent',
            scssFileCode: platformSearchFieldExampleScss
        }
    ];

    searchFieldDataSource: ExampleFile[] = [
        {
            language: 'html',
            code: platformDataSourceSearchFieldSrc,
            fileName: 'platform-search-field-data-source-example'
        },
        {
            language: 'typescript',
            code: platformDataSourceSearchFieldTsCode,
            fileName: 'platform-search-field-data-source-example',
            component: 'PlatformSearchFieldDataSourceExampleComponent',
            scssFileCode: platformSearchFieldExampleScss
        },
        {
            language: 'typescript',
            code: platformDataSourceSearchFieldServiceTsCode,
            fileName: 'platform-search-field-data-source-example',
            service: true,
            component: 'SearchFieldDataProvider'
        }
    ];

    searchFieldMobileMode: ExampleFile[] = [
        {
            language: 'html',
            code: platformSearchFieldMobileModeSrc,
            fileName: 'platform-search-field-mobile-example'
        },
        {
            language: 'typescript',
            code: platformSearchFieldMobileModeTsCode,
            fileName: 'platform-search-field-mobile-example',
            component: 'PlatformSearchFieldMobileExampleComponent',
            scssFileCode: platformSearchFieldExampleScss
        }
    ];
}
