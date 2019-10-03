import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/menu-example.component.html';
import * as menuAddon from '!raw-loader!./examples/menu-addon-example.component.html';
import * as menuGroupSrc from '!raw-loader!./examples/menu-group-example.component.html';
import * as menuKeyboardSrcH from '!raw-loader!./examples/menu-keyboard-support-example.component.html';
import * as menuKeyboardSrcT from '!raw-loader!./examples/menu-keyboard-support-example.component.ts';
import * as menuSeparatorSrc from '!raw-loader!./examples/menu-separator-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent implements OnInit {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: menuSrc
        }
    ];
    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: menuAddon
        }
    ];

    menuGroup: ExampleFile[] = [
        {
            language: 'html',
            code: menuGroupSrc
        }
    ];

    menuKeyboard: ExampleFile[] = [
        {
            language: 'html',
            code: menuKeyboardSrcH
        },
        {
            language: 'typescript',
            code: menuKeyboardSrcT
        }
    ];

    menuSeparator: ExampleFile[] = [
        {
            language: 'html',
            code: menuSeparatorSrc
        }
    ];

    ngOnInit() {}
}
