import { Component, signal } from '@angular/core';
import { ColorPalette } from '@fundamental-ngx/ui5-webcomponents/color-palette';
import { ColorPaletteItem } from '@fundamental-ngx/ui5-webcomponents/color-palette-item';
import { UI5CustomEvent } from '@ui5/webcomponents-base';
import { default as _ColorPaletteItem } from '@ui5/webcomponents/dist/ColorPaletteItem.js';

@Component({
    selector: 'ui5-item-click-color-palette-sample',
    imports: [ColorPalette, ColorPaletteItem],
    templateUrl: './item-click-sample.html'
})
export class ItemClickColorPaletteSample {
    clickedColor = signal<string>('None');

    onItemClick(event: UI5CustomEvent<_ColorPaletteItem, 'click'>): void {
        this.clickedColor.set((event.target as _ColorPaletteItem).value);
    }
}
