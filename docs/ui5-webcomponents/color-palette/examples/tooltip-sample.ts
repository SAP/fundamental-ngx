import { Component } from '@angular/core';
import { ColorPalette } from '@fundamental-ngx/ui5-webcomponents/color-palette';
import { ColorPaletteItem } from '@fundamental-ngx/ui5-webcomponents/color-palette-item';

@Component({
    selector: 'ui5-tooltip-color-palette-sample',
    imports: [ColorPalette, ColorPaletteItem],
    templateUrl: './tooltip-sample.html'
})
export class TooltipColorPaletteSample {}
