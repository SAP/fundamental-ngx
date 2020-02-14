import { Component, OnInit } from '@angular/core';

import * as dropdownContextualMenuHtml from '!raw-loader!./examples/dropdown-contextual-menu-example.component.html';
import * as dropdownContextualMenuTs from '!raw-loader!./examples/dropdown-contextual-menu-example.component.ts';
import * as dropdownDefaultMenuHtml from '!raw-loader!./examples/dropdown-default-example.component.html';
import * as dropdownDefaultMenuTs from '!raw-loader!./examples/dropdown-default-example.component.ts';
import * as dropdownIconsMenuHtml from '!raw-loader!./examples/dropdown-icons-example.component.html';
import * as dropdownIconsMenuTs from '!raw-loader!./examples/dropdown-icons-example.component.ts';
import * as dropdownStateMenuHtml from '!raw-loader!./examples/dropdown-state-example.component.html';
import * as dropdownStateMenuTs from '!raw-loader!./examples/dropdown-state-example.component.ts';
import * as dropdownInfiniteScrollHtml from '!raw-loader!./examples/dropdown-infinite-scroll-example.component.html';
import * as dropdownInfiniteScrollTs from '!raw-loader!./examples/dropdown-infinite-scroll-example.component.ts';
import * as dropdownToolbarHtml from '!raw-loader!./examples/dropdown-toolbar-example.component.html';
import * as dropdownToolbarTs from '!raw-loader!./examples/dropdown-toolbar-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown-docs.component.html'
})
export class DropdownDocsComponent implements OnInit {
    textDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownDefaultMenuHtml,
            fileName: 'dropdown-default-example',
        },
        {
            language: 'typescript',
            code: dropdownDefaultMenuTs,
            fileName: 'dropdown-default-example',
            component: 'DropdownDefaultExampleComponent',
        }
    ];

    disabledDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownStateMenuHtml,
            fileName: 'dropdown-state-example',
        },
        {
            language: 'typescript',
            code: dropdownStateMenuTs,
            fileName: 'dropdown-state-example',
            component: 'DropdownStateExampleComponent',
        }
    ];

    iconDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownIconsMenuHtml,
            fileName: 'dropdown-icons-example',
        },
        {
            language: 'typescript',
            code: dropdownIconsMenuTs,
            fileName: 'dropdown-icons-example',
            component: 'DropdownIconsExampleComponent',
        }
    ];

    contextualMenuDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownContextualMenuHtml,
            fileName: 'dropdown-contextual-menu-example',
        },
        {
            language: 'typescript',
            code: dropdownContextualMenuTs,
            fileName: 'dropdown-contextual-menu-example',
            component: 'DropdownContextualMenuExampleComponent',
        }
    ];

    infiniteScrollHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownInfiniteScrollHtml,
            fileName: 'dropdown-infinite-scroll-example'
        },
        {
            language: 'typescript',
            code: dropdownInfiniteScrollTs,
            fileName: 'dropdown-infinite-scroll-example',
            component: 'DropdownInfiniteScrollExampleComponent'
        }
    ];

    toolbarDropdownHtml: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownToolbarHtml,
            fileName: 'dropdown-toolbar-example',
        },
        {
            language: 'typescript',
            code: dropdownToolbarTs,
            fileName: 'dropdown-toolbar-example',
            component: 'DropdownToolbarExampleComponent',
        }
    ];

    ngOnInit() { }
}
