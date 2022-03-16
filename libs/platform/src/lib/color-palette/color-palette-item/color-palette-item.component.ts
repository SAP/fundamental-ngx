import { Component, Input } from '@angular/core';
import '@ui5/webcomponents/dist/ColorPaletteItem.js';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-color-palette-item]',
    template: `<ng-content></ng-content>`,
    host: {
        '[value]': 'value'
    }
})
export class ColorPaletteItemComponent {
    /**
     * value of the color
     */
    @Input()
    value: string;
}
