import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as shellbarBasicHTMLSrc from '!raw-loader!./examples/shellbar-basic-example.component.html';
import * as shellbarBasicTSSrc from '!raw-loader!./examples/shellbar-basic-example.component.ts';
import * as shellbarCollapsibleHTMLSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.html';
import * as shellbarCollapsibleTSSrc from '!raw-loader!./examples/shellbar-collapsible-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar-docs.component.html'
})
export class ShellbarDocsComponent implements OnInit, AfterViewInit {
    shellbarBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarBasicHTMLSrc
        },
        {
            language: 'typescript',
            code: shellbarBasicTSSrc
        }
    ];

    shellbarCollapsible: ExampleFile[] = [
        {
            language: 'html',
            code: shellbarCollapsibleHTMLSrc
        },
        {
            language: 'typescript',
            code: shellbarCollapsibleTSSrc
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
