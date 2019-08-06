import { Component } from '@angular/core';

import * as breadcrumbHrefExample from '!raw-loader!./examples/breadcrumb-href-example.component.html';
import * as breadcrumbRouterLinkExample from '!raw-loader!./examples/breadcrumb-routerLink-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent {

    breadcrumbRouterLinkHtml: ExampleFile[] = [{
        language: 'html',
        code: breadcrumbRouterLinkExample
    }];

    breadcrumbHrefHtml: ExampleFile[] = [{
        language: 'html',
        code: breadcrumbHrefExample
    }];

}
