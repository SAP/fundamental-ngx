import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/input-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/input-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/input-state-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/input-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/input-form-group-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-input',
    templateUrl: './input-docs.component.html'
})
export class InputDocsComponent implements OnInit, AfterViewInit {
    inputsFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml
        }
    ];
    inputsHelpFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formInlineHelpHtml
        }
    ];

    inputStatesFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formStateHtml
        }
    ];

    formGroupInput: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml
        },
        {
            language: 'typescript',
            code: formGroupInputTs
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
