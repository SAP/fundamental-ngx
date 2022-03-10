import { Component, ChangeDetectorRef, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette-popover',
    templateUrl: './color-palette-popover.component.html'
})
export class ColorPalettePopoverComponent extends BaseComponent implements AfterViewInit {
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

    color: string;

    @ViewChild('colorPalettePopover') popoverComponent: any;

    constructor(_cd: ChangeDetectorRef, private _elementRef: ElementRef) {
        super(_cd);
    }

    /**
     * @todo
     * WIP: gets the inital color from the palette
     */
    ngAfterViewInit(): void {
        this.color = this.popoverComponent.nativeElement._colorPalette().selectedColor;
    }

    openPopover(): void {
        this.popoverComponent.nativeElement.showAt(this._elementRef.nativeElement);
    }

    /**
     * @todo
     * Returns the selected color.
     */
    get selectedColor(): string {
        // return this.popoverComponent?.nativeElement._colorPalette()?.selectedColor;
        // if (this.popoverComponent) {
        //     console.log(this.popoverComponent.nativeElement._colorPalette().selectedColor);
        //     return this.popoverComponent.nativeElement._colorPalette().selectedColor;
        // }

        return this.color;
    }

    clickEvent(event): Event {
        this.color = event.detail.color;
        return event;
    }
}
