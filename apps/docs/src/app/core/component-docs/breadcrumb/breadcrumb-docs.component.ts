import { Component } from '@angular/core';

import * as breadcrumbHrefExample from '!raw-loader!./examples/breadcrumb-href-example.component.html';
import * as breadcrumbResponsiveExample from '!raw-loader!./examples/breadcrumb-responsive-example.component.html';
import * as breadcrumbRouterLinkExample from '!raw-loader!./examples/breadcrumb-routerLink-example.component.html';
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
            fileName: 'breadcrumb-routerLink-example',
        }
    ];

    breadcrumbHrefHtml: ExampleFile[] = [
        {
            language: 'html',
            code: breadcrumbHrefExample,
            fileName: 'fd-breadcrumb-href-example',
        }
    ];

    breadcrumbResponsiveHtml: ExampleFile[] = [
        {
            language: 'html',
            code: breadcrumbResponsiveExample,
            fileName: 'fd-breadcrumb-responsive-example'
        }
    ];
}
