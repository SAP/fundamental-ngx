import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformSearchFieldExampleScss = 'platform-search-field-example.component.scss';
const platformBasicSearchFieldSrc = 'platform-search-field-basic-example.component.html';
const platformBasicSearchFieldTsCode = 'platform-search-field-basic-example.component.ts';
const platformCategoriesSearchFieldSrc = 'platform-search-field-categories-example.component.html';
const platformCategoriesSearchFieldTsCode = 'platform-search-field-categories-example.component.ts';
const platformDataSourceSearchFieldSrc = 'platform-search-field-data-source-example.component.html';
const platformDataSourceSearchFieldTsCode = 'platform-search-field-data-source-example.component.ts';
const platformDataSourceSearchFieldServiceTsCode = 'platform-search-field-data-source-example.service.ts';
const platformSearchFieldMobileModeSrc =
    'platform-search-field-mobile/platform-search-field-mobile-example.component.html';
const platformSearchFieldMobileModeTsCode =
    'platform-search-field-mobile/platform-search-field-mobile-example.component.ts';

@Component({
    selector: 'app-search-field',
    templateUrl: './platform-search-field-docs.component.html'
})
export class PlatformSearchFieldDocsComponent {
    searchFieldBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformBasicSearchFieldSrc),
            fileName: 'platform-search-field-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformBasicSearchFieldTsCode),
            fileName: 'platform-search-field-basic-example',
            component: 'PlatformSearchFieldBasicExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformSearchFieldExampleScss)
        }
    ];

    searchFieldCategories: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformCategoriesSearchFieldSrc),
            fileName: 'platform-search-field-categories-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformCategoriesSearchFieldTsCode),
            fileName: 'platform-search-field-categories-example',
            component: 'PlatformSearchFieldCategoriesExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformSearchFieldExampleScss)
        }
    ];

    searchFieldDataSource: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformDataSourceSearchFieldSrc),
            fileName: 'platform-search-field-data-source-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformDataSourceSearchFieldTsCode),
            fileName: 'platform-search-field-data-source-example',
            component: 'PlatformSearchFieldDataSourceExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformSearchFieldExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformDataSourceSearchFieldServiceTsCode),
            fileName: 'platform-search-field-data-source-example',
            service: true,
            component: 'SearchFieldDataProvider'
        }
    ];

    searchFieldMobileMode: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformSearchFieldMobileModeSrc),
            fileName: 'platform-search-field-mobile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformSearchFieldMobileModeTsCode),
            fileName: 'platform-search-field-mobile-example',
            component: 'PlatformSearchFieldMobileExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformSearchFieldExampleScss)
        }
    ];
}
