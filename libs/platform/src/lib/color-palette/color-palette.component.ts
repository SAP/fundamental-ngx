import { Component, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette',
    templateUrl: './color-palette.component.html'
})
export class ColorPaletteComponent extends BaseComponent {
    /** @hidden */
    /** The currently selected color of the color palette */
    selectedColor: string;

    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }

    setColorSelected(event): void {
        this.selectedColor = event.detail.color;
    }
}
