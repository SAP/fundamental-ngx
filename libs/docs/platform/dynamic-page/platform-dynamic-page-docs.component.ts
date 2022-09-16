import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformDynamicPagePageOverflowService } from './examples/platform-dynamic-page-page-overflow.service';

const dynamicPageBasicExample = 'platform-dynamic-page-example.component.html';
const dynamicPageBasicExampleScss = 'platform-dynamic-page-example.component.scss';
const dynamicPageBasicExampleTsCode = 'platform-dynamic-page-example.component.ts';

const dynamicPageTabbedExample = 'platform-dynamic-page-tabbed-example.component.html';
const dynamicPageTabbedExampleScss = 'platform-dynamic-page-tabbed-example.component.scss';
const dynamicPageTabbedExampleTsCode = 'platform-dynamic-page-tabbed-example.component.ts';

const dynamicPageSnapScrollExample = 'platform-dynamic-page-snap-scroll-example.component.html';
const dynamicPageSnapScrollExampleScss = 'platform-dynamic-page-snap-scroll-example.component.scss';
const dynamicPageSnapScrollExampleTsCode = 'platform-dynamic-page-snap-scroll-example.component.ts';

const dynamicPageResponsivePaddingExample = 'platform-dynamic-page-responsive-padding-example.component.html';
const dynamicPageResponsivePaddingExampleScss = 'platform-dynamic-page-responsive-padding-example.component.scss';
const dynamicPageResponsivePaddingExampleTsCode = 'platform-dynamic-page-responsive-padding-example.component.ts';

const dynamicPageNonCollapsibleExample = 'platform-dynamic-page-non-collapsible-example.component.html';
const dynamicPageNonCollapsibleExampleScss = 'platform-dynamic-page-non-collapsible-example.component.scss';
const dynamicPageNonCollapsibleExampleTsCode = 'platform-dynamic-page-non-collapsible-example.component.ts';

const dynamicPageFlexibleColumnExample = 'platform-dynamic-page-flexible-column-example.component.html';
const dynamicPageFlexibleColumnExampleScss = 'platform-dynamic-page-flexible-column-example.component.scss';
const dynamicPageFlexibleColumnExampleTsCode = 'platform-dynamic-page-flexible-column-example.component.ts';

const dynamicPageFacetsExample =
    'platform-dynamic-page-facets-example/platform-dynamic-page-facets-example.component.html';
const dynamicPageFacetsExampleScss =
    'platform-dynamic-page-facets-example/platform-dynamic-page-facets-example.component.scss';
const dynamicPageFacetsExampleTsCode =
    'platform-dynamic-page-facets-example/platform-dynamic-page-facets-example.component.ts';

const platformDynamicPagePageOverflowServiceTs = 'platform-dynamic-page-page-overflow.service.ts';

@Component({
    selector: 'app-dynamic-page',
    templateUrl: './platform-dynamic-page-docs.component.html'
})
export class PlatformDynamicPageDocsComponent implements OnInit, OnDestroy {
    private _subscription: Subscription;
    // service to change the overflow value for page-content class
    constructor(private _overflowHandlingService: PlatformDynamicPagePageOverflowService) {}

    dynamicPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageBasicExample),
            fileName: 'platform-dynamic-page-example',
            scssFileCode: getAssetFromModuleAssets(dynamicPageBasicExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageBasicExampleTsCode),
            fileName: 'platform-dynamic-page-example',
            component: 'PlatformDynamicPageExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: getAssetFromModuleAssets(platformDynamicPagePageOverflowServiceTs),
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageSnapScroll: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageSnapScrollExample),
            fileName: 'platform-dynamic-page-snap-scroll-example',
            scssFileCode: getAssetFromModuleAssets(dynamicPageSnapScrollExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageSnapScrollExampleTsCode),
            fileName: 'platform-dynamic-page-snap-scroll-example',
            component: 'PlatformDynamicPageSnapScrollExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: getAssetFromModuleAssets(platformDynamicPagePageOverflowServiceTs),
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageTabbed: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageTabbedExample),
            fileName: 'platform-dynamic-page-tabbed-example',
            scssFileCode: getAssetFromModuleAssets(dynamicPageTabbedExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageTabbedExampleTsCode),
            fileName: 'platform-dynamic-page-tabbed-example',
            component: 'PlatformDynamicPageTabbedExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: getAssetFromModuleAssets(platformDynamicPagePageOverflowServiceTs),
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageResponsivePadding: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageResponsivePaddingExample),
            fileName: 'platform-dynamic-page-responsive-padding-example',
            scssFileCode: getAssetFromModuleAssets(dynamicPageResponsivePaddingExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageResponsivePaddingExampleTsCode),
            fileName: 'platform-dynamic-page-responsive-padding-example',
            component: 'PlatformDynamicPageResponsivePaddingExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: getAssetFromModuleAssets(platformDynamicPagePageOverflowServiceTs),
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageNonCollapsible: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageNonCollapsibleExample),
            fileName: 'platform-dynamic-page-non-collapsible-example',
            scssFileCode: getAssetFromModuleAssets(dynamicPageNonCollapsibleExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageNonCollapsibleExampleTsCode),
            fileName: 'platform-dynamic-page-non-collapsible-example',
            component: 'PlatformDynamicPageNonCollapsibleExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: getAssetFromModuleAssets(platformDynamicPagePageOverflowServiceTs),
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageFlexibleColumn: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageFlexibleColumnExample),
            fileName: 'platform-dynamic-page-flexible-column-example',
            scssFileCode: getAssetFromModuleAssets(dynamicPageFlexibleColumnExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageFlexibleColumnExampleTsCode),
            fileName: 'platform-dynamic-page-flexible-column-example',
            component: 'PlatformDynamicPageFlexibleColumnExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: getAssetFromModuleAssets(platformDynamicPagePageOverflowServiceTs),
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageFacets: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageFacetsExample),
            fileName: 'platform-dynamic-page-facets-example',
            scssFileCode: getAssetFromModuleAssets(dynamicPageFacetsExampleScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageFacetsExampleTsCode),
            fileName: 'platform-dynamic-page-facets-example',
            component: 'PlatformDynamicPageFacetsExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: getAssetFromModuleAssets(platformDynamicPagePageOverflowServiceTs),
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    ngOnInit(): void {
        this._subscription = this._overflowHandlingService.isExampleOpened.subscribe((isExampleOpened) => {
            const content = document.getElementById('page-content');
            if (!content) {
                return;
            }
            if (isExampleOpened) {
                content.style.overflowY = 'hidden'; // hide the underlying page scrollbars
            } else {
                content.style.overflowY = '';
            }
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
