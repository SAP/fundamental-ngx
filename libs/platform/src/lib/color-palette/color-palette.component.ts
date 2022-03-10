import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette',
    templateUrl: './color-palette.component.html'
})
export class ColorPaletteComponent extends BaseComponent {
    @ViewChild('colorPalette') colorPalette: any;

    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }

    /**
     * Returns the selected color.
     */
    get selectedColor(): string {
        return this.colorPalette?.nativeElement.selectedColor;
    }

    clickEvent(event): Event {
        return event;
    }
}
