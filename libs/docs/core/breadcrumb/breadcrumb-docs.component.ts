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
    BreadcrumbRouterLinkExampleComponent,
    BreadcrumbSeparatorExampleComponent
} from './examples/breadcrumb-examples.component';

const breadcrumbHrefExample = 'breadcrumb-href-example.component.html';
const breadcrumbRouterLinkExample = 'breadcrumb-routerLink-example.component.html';
const breadcrumbSeparatorExample = 'breadcrumb-separator-example.component.html';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        BreadcrumbRouterLinkExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        BreadcrumbHrefExampleComponent,
        BreadcrumbSeparatorExampleComponent
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

    breadcrumbSeparatorHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(breadcrumbSeparatorExample),
            fileName: 'breadcrumb-separator-example'
        }
    ];
}
