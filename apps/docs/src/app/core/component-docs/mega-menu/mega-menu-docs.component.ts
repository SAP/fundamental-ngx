import { Component } from '@angular/core';

import * as menuSrc from '!raw-loader!./examples/mega-menu-example.component.html';
import * as menuGroupSrc from '!raw-loader!./examples/mega-menu-group-example.component.html';
import * as menuPositionSrc from '!raw-loader!./examples/mega-menu-position-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as menuPositionSrcScss from '!raw-loader!./examples/mega-menu-position-example.component.scss';

@Component({
    selector: 'app-mega-menu',
    templateUrl: './mega-menu-docs.component.html'
})
export class MegaMenuDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: menuSrc,
            fileName: 'mega-menu-example'
        }
    ];

    menuGroup: ExampleFile[] = [
        {
            language: 'html',
            code: menuGroupSrc,
            fileName: 'mega-menu-group-example'
        }
    ];

    menuPosition: ExampleFile[] = [
        {
            language: 'html',
            code: menuPositionSrc,
            fileName: 'mega-menu-position-example',
            scssFileCode: menuPositionSrcScss
        }
    ];
}
