import { Component, ChangeDetectorRef, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette-popover',
    templateUrl: './color-palette-popover.component.html',
    encapsulation: ViewEncapsulation.ShadowDom
    // styles: [':host { display: inline-block}']
})
export class ColorPalettePopoverComponent extends BaseComponent {
    /** selects the default color of the component
     * The default color should be a part of the ColorPalette colors
     */
    @Input()
    defaultColor?: string;

    /**
     * Defines whether the user can choose the default color from a button.
     */
    @Input()
    showDefaultColor = false;

    /**
     * Defines whether the user can choose a custom color from a component
     */
    @Input()
    showMoreColors = false;

    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     */
    @Input()
    showRecentColors = false;

    /** The color of the selected color item */
    color: string;

    @ViewChild('colorPalettePopover') popoverComponent: ElementRef;

    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }

    /* Show the color palette popover */
    showPopover(element: ElementRef): void {
        this.popoverComponent.nativeElement.showAt(element);
    }

    /* Returns the selected color. */
    get selectedColor(): string {
        return this.color;
    }

    /* sets color to the clicked on color item */
    clickEvent(event: any): Event {
        this.color = event.detail.color;
        return event;
    }
}
