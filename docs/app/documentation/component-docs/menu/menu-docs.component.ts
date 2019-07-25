import { Component, OnInit } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/menu-example.component.html';
import * as menuGroupSrc from '!raw-loader!./examples/menu-group-example.component.html';
import * as menuKeyboardSrcH from '!raw-loader!./examples/menu-keyboard-support-example.component.html';
import * as menuKeyboardSrcT from '!raw-loader!./examples/menu-keyboard-support-example.component.ts';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent implements OnInit {
    menuHtml = menuSrc;

    menuGroupHtml = menuGroupSrc;

    menuKeyboardTs = menuKeyboardSrcT;
    menuKeyboardHtml = menuKeyboardSrcH;

    constructor() {}

    ngOnInit() {}
}
