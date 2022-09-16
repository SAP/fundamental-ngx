import { Component, ViewEncapsulation } from '@angular/core';

const buttonrc = 'button-example/button-example.component.html';
const buttonsecondaryrc = 'button-example/button-secondary-example.component.html';
const buttonemphasizedrc = 'button-example/button-emphasized-example.component.html';
const buttonpositiverc = 'button-example/button-positive-example.component.html';
const buttonlayoutrc = 'button-example/button-layout-example.component.html';
const buttonnegativerc = 'button-example/button-negative-example.component.html';
const buttoncriticalrc = 'button-example/button-negative-example.component.html';
const buttonstaterc = 'button-example/button-state-example.component.html';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-button',
    templateUrl: './button-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ButtonDocsComponent {
    buttonExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonrc),
            fileName: 'button-example'
        }
    ];

    buttonSecondaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonsecondaryrc),
            fileName: 'button-secondary-example'
        }
    ];

    buttonEmphasizedExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonemphasizedrc),
            fileName: 'button-flat-example'
        }
    ];

    buttonLayoutExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonlayoutrc),
            fileName: 'button-link-example'
        }
    ];

    buttonPositiveExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonpositiverc),
            fileName: 'button-outline-example'
        }
    ];

    buttonNegativeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonnegativerc),
            fileName: 'button-naked-example'
        }
    ];

    buttonCriticalExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttoncriticalrc),
            fileName: 'button-critical-example'
        }
    ];

    buttonStatesExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonstaterc),
            fileName: 'button-state-example'
        }
    ];
}
