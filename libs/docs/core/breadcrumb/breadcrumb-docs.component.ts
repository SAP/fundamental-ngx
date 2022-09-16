import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const breadcrumbHrefExample = 'breadcrumb-href-example.component.html';
const breadcrumbRouterLinkExample = 'breadcrumb-routerLink-example.component.html';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
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
}
