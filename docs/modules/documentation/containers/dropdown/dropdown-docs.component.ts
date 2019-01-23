import { Component } from '@angular/core';

import * as dropdownContextualMenuHtml from '!raw-loader!./examples/dropdown-contextual-menu-example.component.html';
import * as dropdownDefaultMenuHtml from '!raw-loader!./examples/dropdown-default-example.component.html';
import * as dropdownIconsMenuHtml from '!raw-loader!./examples/dropdown-icons-example.component.html';
import * as dropdownStateMenuHtml from '!raw-loader!./examples/dropdown-state-example.component.html';
import * as dropdownInfiniteScrollHtml from '!raw-loader!./examples/dropdown-infinite-scroll-example.component.html';
import * as dropdownInfiniteScrollTs from '!raw-loader!./examples/dropdown-infinite-scroll-example.component.ts';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown-docs.component.html'
})
export class DropdownDocsComponent {
    textDropdownHtml = dropdownDefaultMenuHtml;

    disabledDropdownHtml = dropdownStateMenuHtml;

    iconDropdownHtml = dropdownIconsMenuHtml;

    contextualMenuDropdownHtml = dropdownContextualMenuHtml;

    infiniteScrollHtml = dropdownInfiniteScrollHtml;

    infiniteScrollTs = dropdownInfiniteScrollTs;

    constructor() {}
}
