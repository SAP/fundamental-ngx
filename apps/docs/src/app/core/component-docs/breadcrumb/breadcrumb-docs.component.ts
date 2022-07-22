import { Component } from '@angular/core';

import breadcrumbHrefExample from '!./examples/breadcrumb-href-example.component.html?raw';
import breadcrumbRouterLinkExample from '!./examples/breadcrumb-routerLink-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent {
    breadcrumbRouterLinkHtml: ExampleFile[] = [
        {
            language: 'html',
            code: breadcrumbRouterLinkExample,
            fileName: 'breadcrumb-routerLink-example'
        }
    ];

    breadcrumbHrefHtml: ExampleFile[] = [
        {
            language: 'html',
            code: breadcrumbHrefExample,
            fileName: 'fd-breadcrumb-href-example'
        }
    ];
}
