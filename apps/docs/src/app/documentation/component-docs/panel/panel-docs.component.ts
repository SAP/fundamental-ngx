import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as panelColumnsSrc from '!raw-loader!./examples/panel-columns-example.component.html';
import * as panelEdgeBleedSrc from '!raw-loader!./examples/panel-edge-bleed-example.component.html';
import * as panelSrc from '!raw-loader!./examples/panel-example.component.html';
import * as panelGridSrc from '!raw-loader!./examples/panel-grid-example.component.html';
import * as panelGridNoGapSrc from '!raw-loader!./examples/panel-grid-nogap-example.component.html';
import * as panelRowColumnSrc from '!raw-loader!./examples/panel-grid-column-span-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html'
})
export class PanelDocsComponent implements OnInit, AfterViewInit {
    panelBasic: ExampleFile[] = [
        {
            language: 'html',
            code: panelSrc
        }
    ];

    tableBleed: ExampleFile[] = [
        {
            language: 'html',
            code: panelEdgeBleedSrc
        }
    ];

    defaultPanelGrid: ExampleFile[] = [
        {
            language: 'html',
            code: panelGridSrc
        }
    ];

    nogapPanelGrid: ExampleFile[] = [
        {
            language: 'html',
            code: panelGridNoGapSrc
        }
    ];

    twoColumnsPanelGrid: ExampleFile[] = [
        {
            language: 'html',
            code: panelColumnsSrc
        }
    ];

    columnSpanPanelGrid: ExampleFile[] = [
        {
            language: 'html',
            code: panelRowColumnSrc
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
