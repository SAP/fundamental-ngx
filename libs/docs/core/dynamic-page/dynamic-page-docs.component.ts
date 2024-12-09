import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DynamicPageColumnLayoutExampleComponent } from './examples/dynamic-page-column-layout-example/dynamic-page-column-layout-example.component';
import { DynamicPageDynamicContainerHeightExampleComponent } from './examples/dynamic-page-dynamic-container-height-example/dynamic-page-dynamic-container-height-example.component';
import { DynamicPageExampleComponent } from './examples/dynamic-page-example.component';
import { DynamicPageFacetsExampleComponent } from './examples/dynamic-page-facets-example/dynamic-page-facets-example.component';
import { DynamicPageResponsiveExampleComponent } from './examples/dynamic-page-responsive-example/dynamic-page-responsive-example.component';
import { DynamicPageRoutingExampleComponent } from './examples/dynamic-page-routing/dynamic-page-routing-example.component';
import { DynamicPageTabsExampleComponent } from './examples/dynamic-page-tabs-example/dynamic-page-tabs-example.component';

const dynamicPageBasicExample = 'dynamic-page-example.component.html';
const dynamicPageBasicExampleTsCode = 'dynamic-page-example.component.ts';
const dynamicPageTabsExampleTsCode = 'dynamic-page-tabs-example/dynamic-page-tabs-example.component.ts';
const dynamicPageTabsExampleHtmlCode = 'dynamic-page-tabs-example/dynamic-page-tabs-example.component.html';
const dynamicPageColumnExampleTsCode =
    'dynamic-page-column-layout-example/dynamic-page-column-layout-example.component.ts';
const dynamicPageColumnExampleHtmlCode =
    'dynamic-page-column-layout-example/dynamic-page-column-layout-example.component.html';
const dynamicPageResponsiveExampleTsCode =
    'dynamic-page-responsive-example/dynamic-page-responsive-example.component.ts';
const dynamicPageResponsiveExampleHtmlCode =
    'dynamic-page-responsive-example/dynamic-page-responsive-example.component.html';
const dynamicPageFacetsExampleHtmlCode = 'dynamic-page-facets-example/dynamic-page-facets-example.component.html';
const dynamicPageFacetsExampleTsCode = 'dynamic-page-facets-example/dynamic-page-facets-example.component.ts';

const dynamicPageRoutingHtmlCode = 'dynamic-page-routing/dynamic-page-routing-example.component.html';
const dynamicPageRoutingTsCode = 'dynamic-page-routing/dynamic-page-routing-example.component.ts';

@Component({
    selector: 'app-dynamic-page',
    templateUrl: './dynamic-page-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DynamicPageExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DynamicPageTabsExampleComponent,
        DynamicPageColumnLayoutExampleComponent,
        DynamicPageResponsiveExampleComponent,
        DynamicPageFacetsExampleComponent,
        DynamicPageDynamicContainerHeightExampleComponent,
        DynamicPageRoutingExampleComponent,
        RouterLink
    ]
})
export class DynamicPageDocsComponent {
    dynamicPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageBasicExample),
            fileName: 'dynamic-page-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageBasicExampleTsCode),
            fileName: 'dynamic-page-example',
            component: 'DynamicPageExampleComponent'
        }
    ];

    dynamicPageTabs: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageTabsExampleHtmlCode),
            fileName: 'dynamic-page-tabs-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageTabsExampleTsCode),
            fileName: 'dynamic-page-tabs-example',
            component: 'DynamicPageTabsExampleComponent'
        }
    ];

    dynamicPageColumn: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageColumnExampleHtmlCode),
            fileName: 'dynamic-page-column-layout-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageColumnExampleTsCode),
            fileName: 'dynamic-page-column-layout-example',
            component: 'DynamicPageColumnLayoutExampleComponent'
        }
    ];

    dynamicPageResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageResponsiveExampleHtmlCode),
            fileName: 'dynamic-page-responsive-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageResponsiveExampleTsCode),
            fileName: 'dynamic-page-responsive-example',
            component: 'DynamicPageResponsiveExampleComponent'
        }
    ];

    dynamicPageFacets: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageFacetsExampleHtmlCode),
            fileName: 'dynamic-page-facets-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageFacetsExampleTsCode),
            fileName: 'dynamic-page-facets-example',
            component: 'DynamicPageFacetsExampleComponent'
        }
    ];

    dynamicPageRouting: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicPageRoutingHtmlCode),
            fileName: 'dynamic-page-routing-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dynamicPageRoutingTsCode),
            fileName: 'dynamic-page-routing-example',
            component: 'DynamicPageRoutingExampleComponent'
        }
    ];
}
