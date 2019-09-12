import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as loadingSpinnerHtml from '!raw-loader!./examples/loading-spinner-example.component.html';
import * as loadingSpinnerContainerHtml from '!raw-loader!./examples/loading-spinner-container-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-loading-spinner-docs',
    templateUrl: './loading-spinner-docs.component.html',
    styleUrls: ['./loading-spinner-docs.component.scss']
})
export class LoadingSpinnerDocsComponent implements OnInit, AfterViewInit {
    loadingSpinnerExample: ExampleFile[] = [
        {
            language: 'html',
            code: loadingSpinnerHtml
        }
    ];

    loadingSpinnerContainerExample: ExampleFile[] = [
        {
            language: 'html',
            code: loadingSpinnerContainerHtml
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
