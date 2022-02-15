import { Component, ViewEncapsulation } from '@angular/core';

import buttonrc from '!./examples/button-example/button-example.component.html?raw';
import buttonsecondaryrc from '!./examples/button-example/button-secondary-example.component.html?raw';
import buttonemphasizedrc from '!./examples/button-example/button-emphasized-example.component.html?raw';
import buttonpositiverc from '!./examples/button-example/button-positive-example.component.html?raw';
import buttonlayoutrc from '!./examples/button-example/button-layout-example.component.html?raw';
import buttonnegativerc from '!./examples/button-example/button-negative-example.component.html?raw';
import buttoncriticalrc from '!./examples/button-example/button-negative-example.component.html?raw';
import buttonstaterc from '!./examples/button-example/button-state-example.component.html?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-button',
    templateUrl: './button-docs.component.html',
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

    buttonEmphasizedExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonemphasizedrc,
            fileName: 'button-flat-example'
        }
    ];

    buttonLayoutExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonlayoutrc,
            fileName: 'button-link-example'
        }
    ];

    buttonPositiveExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonpositiverc,
            fileName: 'button-outline-example'
        }
    ];

    buttonNegativeExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonnegativerc,
            fileName: 'button-naked-example'
        }
    ];

    buttonCriticalExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttoncriticalrc,
            fileName: 'button-critical-example'
        }
    ];

    buttonStatesExample: ExampleFile[] = [
        {
            language: 'html',
            code: buttonstaterc,
            fileName: 'button-state-example'
        }
    ];
}
