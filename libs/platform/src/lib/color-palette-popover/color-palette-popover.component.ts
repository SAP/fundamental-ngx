import { Component, ChangeDetectorRef, Input, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette-popover',
    templateUrl: './color-palette-popover.component.html'
})
export class ColorPalettePopoverComponent extends BaseComponent {
    /** selects the default color of the component
     * The default color should be a part of the ColorPalette colors
     */
    @Input()
    defaultColor?: string;

    /** Defines whether the user can choose the default color from a button. */
    @Input()
    showDefaultColor = false;

    /** Defines whether the user can choose a custom color from a component */
    @Input()
    showMoreColors = false;

    /** Defines whether the user can see the last used colors in the bottom of the component */
    @Input()
    showRecentColors = false;

    /** @hidden */
    /** The currently selected color of the color palette */
    selectedColor: string;

    @ViewChild('colorPalettePopover') popoverComponent: any;

    constructor(_cd: ChangeDetectorRef, private _elementRef: ElementRef) {
        super(_cd);
    }

    openPopover(): void {
        this.popoverComponent.nativeElement.showAt(this._elementRef.nativeElement);
    }

    setColorSelected(event): void {
        this.selectedColor = event.detail.color;
    }
}
