import { Component, ViewEncapsulation } from '@angular/core';

import * as buttonrc from '!raw-loader!./examples/button-example/button-example.component.html';
import * as buttonsecondaryrc from '!raw-loader!./examples/button-example/button-secondary-example.component.html';
import * as buttonflatrc from '!raw-loader!./examples/button-example/button-flat-example.component.html';
import * as buttonoutlinerc from '!raw-loader!./examples/button-example/button-outline-example.component.html';
import * as buttonlinkrc from '!raw-loader!./examples/button-example/button-link-example.component.html';
import * as buttonnakedrc from '!raw-loader!./examples/button-example/button-naked-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-button',
    templateUrl: './button-docs.component.html',
    styleUrls: ['button-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonDocsComponent {
    buttonExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonrc,
            fileName: 'button-example'
        }
    ];

    buttonSecondaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonsecondaryrc,
            fileName: 'button-secondary-example'
        }
    ];

    buttonFlatExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonflatrc,
            fileName: 'button-flat-example'
        }
    ];

    buttonLinkExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonlinkrc,
            fileName: 'button-link-example'
        }
    ];

    buttonOutlineExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonoutlinerc,
            fileName: 'button-outline-example'
        }
    ];

    buttonNakedExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonnakedrc,
            fileName: 'button-naked-example'
        }
    ];
}
