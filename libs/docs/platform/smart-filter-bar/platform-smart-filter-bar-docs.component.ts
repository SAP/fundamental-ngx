import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformBasicSfbSrc = 'platform-smart-filter-bar-basic-example.component.html';
const platformBasicSfbTsCode = 'platform-smart-filter-bar-basic-example.component.ts';

const platformSfbCustomDataSourceSrc = 'platform-smart-filter-bar-observable-example.component.html';
const platformSfbCustomDataSourceTsCode = 'platform-smart-filter-bar-observable-example.component.ts';

const platformSfbCustomFiltersSrc = 'platform-smart-filter-bar-custom-filter-example.component.html';
const platformSfbCustomFiltersTsCode = 'platform-smart-filter-bar-custom-filter-example.component.ts';

const platformSfbCustomLabelsSrc = 'platform-smart-filter-bar-custom-labels-example.component.html';
const platformSfbCustomLabelsTsCode = 'platform-smart-filter-bar-custom-labels-example.component.ts';

const platformSfbDynamicPageSrc = 'platform-smart-filter-bar-dynamic-page-example.component.html';
const platformSfbDynamicPageTsCode = 'platform-smart-filter-bar-dynamic-page-example.component.ts';

const platformLoadingSfbSrc = 'loading/platform-smart-filter-bar-loading-example.component.html';
const platformLoadingSfbTsCode = 'loading/platform-smart-filter-bar-loading-example.component.ts';

@Component({
    selector: 'app-smart-filter-bar',
    templateUrl: './platform-smart-filter-bar-docs.component.html'
})
export class PlatformSmartFilterBarDocsComponent {
    sfbBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformBasicSfbSrc),
            fileName: 'platform-smart-filter-bar-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformBasicSfbTsCode),
            fileName: 'platform-smart-filter-bar-basic-example',
            component: 'PlatformSmartFilterBarBasicExampleComponent'
        }
    ];

    sfbCustomDataSource: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformSfbCustomDataSourceSrc),
            fileName: 'platform-smart-filter-bar-observable-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformSfbCustomDataSourceTsCode),
            fileName: 'platform-smart-filter-bar-observable-example',
            component: 'PlatformSmartFilterBarObservableExampleComponent'
        }
    ];

    sfbCustomFilters: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformSfbCustomFiltersSrc),
            fileName: 'platform-smart-filter-bar-custom-filter-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformSfbCustomFiltersTsCode),
            fileName: 'platform-smart-filter-bar-custom-filter-example',
            component: 'PlatformSmartFilterBarCustomFilterExampleComponent'
        }
    ];

    sfbCustomLabels: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformSfbCustomLabelsSrc),
            fileName: 'platform-smart-filter-bar-custom-labels-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformSfbCustomLabelsTsCode),
            fileName: 'platform-smart-filter-bar-custom-labels-example',
            component: 'PlatformSmartFilterBarCustomLabelsExampleComponent'
        }
    ];

    sfbDynamicPage: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformSfbDynamicPageSrc),
            fileName: 'platform-smart-filter-bar-dynamic-page-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformSfbDynamicPageTsCode),
            fileName: 'platform-smart-filter-bar-dynamic-page-example',
            component: 'PlatformSmartFilterBarDynamicPageExampleComponent'
        }
    ];

    sfbLoading: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformLoadingSfbSrc),
            fileName: 'platform-smart-filter-bar-loading-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformLoadingSfbTsCode),
            fileName: 'platform-smart-filter-bar-loading-example',
            component: 'PlatformSmartFilterBarLoadingExampleComponent'
        }
    ];
}
