import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as breadcrumbHrefExample from '!raw-loader!./examples/breadcrumb-href-example.component.html';
import * as breadcrumbRouterLinkExample from '!raw-loader!./examples/breadcrumb-routerLink-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import * as breadcrumbTsCode from '!raw-loader!./examples/breadcrumb-examples.component.ts';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent implements OnInit {
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

    ngOnInit() { }
}
