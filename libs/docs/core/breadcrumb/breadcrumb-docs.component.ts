import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import {
    BreadcrumbHrefExampleComponent,
    BreadcrumbRouterLinkExampleComponent
} from './examples/breadcrumb-examples.component';
import { BreadcrumbClickProxyExampleComponent } from './examples/breadcrumb-click-proxy-example.component';

const breadcrumbHrefExample = 'breadcrumb-href-example.component.html';
const breadcrumbRouterLinkExample = 'breadcrumb-routerLink-example.component.html';
const breadcrumbClickProxyExample = 'breadcrumb-click-proxy-example.component.html';
const breadcrumbClickProxyExampleTs = 'breadcrumb-click-proxy-example.component.ts';



@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        BreadcrumbRouterLinkExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        BreadcrumbHrefExampleComponent,
        BreadcrumbClickProxyExampleComponent
    ]
})
export class BreadcrumbDocsComponent {
    breadcrumbRouterLinkHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(breadcrumbRouterLinkExample),
            fileName: 'breadcrumb-routerLink-example'
        }
    ];

    breadcrumbHrefHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(breadcrumbHrefExample),
            fileName: 'fd-breadcrumb-href-example'
        }
    ];

    breadcrumbClickProxyHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(breadcrumbClickProxyExample),
            fileName: 'fd-breadcrumb-click-proxy-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(breadcrumbClickProxyExampleTs),
            fileName: 'fd-breadcrumb-click-proxy-example',
            component: 'BreadcrumbClickProxyExampleComponent'
        }
    ];
}
