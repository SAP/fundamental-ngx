import { Component, ChangeDetectorRef, Input } from '@angular/core';
import '@ui5/webcomponents/dist/ColorPalette.js';
// import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette-item',
    templateUrl: './color-palette-item.component.html'
})
export class ColorPaletteItemComponent {
    /** @hidden */
    constructor(private _cd: ChangeDetectorRef) {}

    /**
     * value of the color
     */
    @Input()
    value: string;
}
