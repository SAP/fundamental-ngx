import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/mega-menu-example.component.html';
import * as menuGroupSrc from '!raw-loader!./examples/mega-menu-group-example.component.html';
import * as menuPositionSrc from '!raw-loader!./examples/mega-menu-position-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import * as megaMenuTsCode from '!raw-loader!./examples/mega-menu-examples.component.ts';
import * as menuPositionSrcScss from '!raw-loader!./examples/mega-menu-position-example.component.scss';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-mega-menu',
    templateUrl: './mega-menu-docs.component.html'
})
export class MegaMenuDocsComponent implements OnInit {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: menuSrc,
            fileName: 'mega-menu-example',
            secondFile: 'mega-menu-examples',
            typescriptFileCode: megaMenuTsCode,
            component: 'MegaMenuExampleComponent'
        }
    ];

    menuGroup: ExampleFile[] = [
        {
            language: 'html',
            code: menuGroupSrc,
            fileName: 'mega-menu-group-example',
            secondFile: 'mega-menu-examples',
            typescriptFileCode: megaMenuTsCode,
            component: 'MegaMenuGroupExampleComponent'
        }
    ];

    menuPosition: ExampleFile[] = [
        {
            language: 'html',
            code: menuPositionSrc,
            fileName: 'mega-menu-position-example',
            secondFile: 'mega-menu-examples',
            typescriptFileCode: megaMenuTsCode,
            component: 'MegaMenuPositionExampleComponent',
            scssFileCode: menuPositionSrcScss
        }
    ];

    ngOnInit() { }
}
