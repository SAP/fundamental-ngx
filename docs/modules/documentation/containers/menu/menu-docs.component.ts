import { Component, OnInit } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/menu-example.component.html';
import * as menuGroupSrc from '!raw-loader!./examples/menu-group-example.component.html';
import * as menuSeparatorSrc from '!raw-loader!./examples/menu-separator-example.component.html';
import * as menuAddonSrc from '!raw-loader!./examples/menu-addon-example.component.html';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent implements OnInit {
    menuHtml = menuSrc;

    menuGroupHtml = menuGroupSrc;

    menuSeparatorHtml = menuSeparatorSrc;

    menuAddonHtml = menuAddonSrc;

    constructor() {}

    ngOnInit() {}
}
