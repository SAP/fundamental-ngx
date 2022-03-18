import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseColorInput } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette-popover',
    templateUrl: './color-palette-popover.component.html',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ColorPalettePopoverComponent extends BaseColorInput {
    /** @hidden */
    @ViewChild('colorPalettePopover') popoverComponent: ElementRef;

    /* Show the color palette popover */
    showPopover(element: ElementRef): void {
        this.popoverComponent.nativeElement.showAt(element);
    }
}
