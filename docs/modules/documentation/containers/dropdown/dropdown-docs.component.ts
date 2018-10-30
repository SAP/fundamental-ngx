import { Component } from '@angular/core';

import * as dropdownContextualMenuHtml from '!raw-loader!./examples/dropdown-contextual-menu-example.component.html';
import * as dropdownDefaultMenuHtml from '!raw-loader!./examples/dropdown-default-example.component.html';
import * as dropdownIconsMenuHtml from '!raw-loader!./examples/dropdown-icons-example.component.html';
import * as dropdownSizesMenuHtml from '!raw-loader!./examples/dropdown-sizes-example.component.html';
import * as dropdownStateMenuHtml from '!raw-loader!./examples/dropdown-state-example.component.html';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown-docs.component.html'
})
export class DropdownDocsComponent {
    textDropdownHtml = dropdownDefaultMenuHtml;

    disabledDropdownHtml = dropdownStateMenuHtml;

    iconDropdownHtml = dropdownIconsMenuHtml;

    dropdownSizeHtml = dropdownSizesMenuHtml;

    contextualMenuDropdownHtml = dropdownContextualMenuHtml;

    constructor() {}
}
