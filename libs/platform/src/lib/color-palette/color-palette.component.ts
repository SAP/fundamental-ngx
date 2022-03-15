import { Component, ChangeDetectorRef, ViewChild, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette',
    templateUrl: './color-palette.component.html',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ColorPaletteComponent extends BaseComponent {
    /**
     * selects the default color of the component
     */
    @Input()
    defaultColor?: string;

    /**
     * Defines whether the user can choose the default color from a button.
     */
    @Input()
    showDefaultColor = false;

    /** 
    Defines whether the user can choose a custom color from a component 
*/
    @Input()
    showMoreColors = false;

    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     * */
    @Input()
    showRecentColors = false;

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
