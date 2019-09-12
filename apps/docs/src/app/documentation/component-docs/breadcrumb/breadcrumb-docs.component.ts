import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as breadcrumbHrefExample from '!raw-loader!./examples/breadcrumb-href-example.component.html';
import * as breadcrumbRouterLinkExample from '!raw-loader!./examples/breadcrumb-routerLink-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html'
})
export class BreadcrumbDocsComponent implements OnInit, AfterViewInit {
    breadcrumbRouterLinkHtml: ExampleFile[] = [
        {
            language: 'html',
            code: breadcrumbRouterLinkExample
        }
    ];

    breadcrumbHrefHtml: ExampleFile[] = [
        {
            language: 'html',
            code: breadcrumbHrefExample
        }
    ];

    private fragment: any;
    @ViewChildren(DocsSectionTitleComponent, { read: ElementRef }) myList: QueryList<ElementRef>;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.fragment.subscribe(fragment => {
            this.fragment = fragment;
        });
    }

    ngAfterViewInit(): void {
        const myArr = this.myList.toArray();
        for (let i = 0; i < myArr.length; i++) {
            if (myArr[i].nativeElement.firstChild.id === this.fragment) {
                myArr[i].nativeElement.scrollIntoView();
            }
        }
    }
}
