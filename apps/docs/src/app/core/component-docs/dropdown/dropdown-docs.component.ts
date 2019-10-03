import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as dropdownContextualMenuHtml from '!raw-loader!./examples/dropdown-contextual-menu-example.component.html';
import * as dropdownDefaultMenuHtml from '!raw-loader!./examples/dropdown-default-example.component.html';
import * as dropdownIconsMenuHtml from '!raw-loader!./examples/dropdown-icons-example.component.html';
import * as dropdownStateMenuHtml from '!raw-loader!./examples/dropdown-state-example.component.html';
import * as dropdownInfiniteScrollHtml from '!raw-loader!./examples/dropdown-infinite-scroll-example.component.html';
import * as dropdownInfiniteScrollTs from '!raw-loader!./examples/dropdown-infinite-scroll-example.component.ts';
import * as dropdownToolbarHtml from '!raw-loader!./examples/dropdown-toolbar-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown-docs.component.html'
})
export class DropdownDocsComponent implements OnInit {
    textDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownDefaultMenuHtml
        }
    ];

    disabledDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownStateMenuHtml
        }
    ];

    iconDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownIconsMenuHtml
        }
    ];

    contextualMenuDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownContextualMenuHtml
        }
    ];

    infiniteScrollHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownInfiniteScrollHtml
        },
        {
            language: 'typescript',
            code: dropdownInfiniteScrollTs
        }
    ];

    toolbarDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownToolbarHtml
        }
    ];

    ngOnInit() {}
}
