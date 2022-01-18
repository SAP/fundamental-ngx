import { Component, ViewEncapsulation } from '@angular/core';

import buttonrc from '!./examples/button-example/button-example.component.html?raw';
import buttonsecondaryrc from '!./examples/button-example/button-secondary-example.component.html?raw';
import buttonflatrc from '!./examples/button-example/button-flat-example.component.html?raw';
import buttonoutlinerc from '!./examples/button-example/button-outline-example.component.html?raw';
import buttonlinkrc from '!./examples/button-example/button-link-example.component.html?raw';
import buttonnakedrc from '!./examples/button-example/button-naked-example.component.html?raw';

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
