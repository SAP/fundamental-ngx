import { Component, ChangeDetectorRef, ViewChild, Input, ElementRef } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette',
    templateUrl: './color-palette.component.html'
})
export class ColorPaletteComponent extends BaseComponent {
    /** selects the default color of the component
     * The default color should be a part of the ColorPalette colors
     */
    @Input()
    defaultColor?: string;

    /** Defines whether the user can choose the default color from a button. */
    @Input()
    showDefaultColor = true;

    /** Defines whether the user can choose a custom color from a component */
    @Input()
    showMoreColors = true;

    /** Defines whether the user can see the last used colors in the bottom of the component */
    @Input()
    showRecentColors = true;

    @ViewChild('colorPalette') colorPalette: ElementRef;

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
