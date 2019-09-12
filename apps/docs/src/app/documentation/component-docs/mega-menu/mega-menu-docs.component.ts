import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/mega-menu-example.component.html';
import * as menuGroupSrc from '!raw-loader!./examples/mega-menu-group-example.component.html';
import * as menuPositionSrc from '!raw-loader!./examples/mega-menu-position-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-mega-menu',
    templateUrl: './mega-menu-docs.component.html'
})
export class MegaMenuDocsComponent implements OnInit, AfterViewInit {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: menuSrc
        }
    ];

    menuGroup: ExampleFile[] = [
        {
            language: 'html',
            code: menuGroupSrc
        }
    ];

    menuPosition: ExampleFile[] = [
        {
            language: 'html',
            code: menuPositionSrc
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
