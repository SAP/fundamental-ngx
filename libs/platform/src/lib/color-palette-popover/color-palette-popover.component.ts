import { Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseColorInput } from '@fundamental-ngx/platform/shared';
import { ColorPaletteItemComponent } from '@fundamental-ngx/platform/color-palette';

@Component({
    selector: 'fdp-color-palette-popover',
    templateUrl: './color-palette-popover.component.html',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ColorPalettePopoverComponent extends BaseColorInput {
    /** @hidden */
    @ViewChild('colorPalettePopover') popoverComponent: ElementRef;

    @ContentChildren(ColorPaletteItemComponent)
    items: QueryList<ColorPaletteItemComponent>;

    /* Show the color palette popover */
    showPopover(element: ElementRef): void {
        this.popoverComponent.nativeElement.showAt(element);
    }
}
