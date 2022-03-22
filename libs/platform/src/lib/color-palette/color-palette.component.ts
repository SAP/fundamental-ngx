import { Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { BaseColorInput } from '@fundamental-ngx/platform/shared';
import { ColorPaletteItemComponent } from './color-palette-item/color-palette-item.component';

@Component({
    selector: 'fdp-color-palette',
    templateUrl: './color-palette.component.html',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ColorPaletteComponent extends BaseColorInput {
    @ContentChildren(ColorPaletteItemComponent)
    items: QueryList<ColorPaletteItemComponent>;
}
