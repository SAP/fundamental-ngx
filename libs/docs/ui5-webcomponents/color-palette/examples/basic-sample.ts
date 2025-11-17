import { Component, signal } from '@angular/core';
import { ColorPalette } from '@fundamental-ngx/ui5-webcomponents/color-palette';
import { ColorPaletteItem } from '@fundamental-ngx/ui5-webcomponents/color-palette-item';

@Component({
    selector: 'ui5-basic-color-palette-sample',
    standalone: true,
    imports: [ColorPalette, ColorPaletteItem],
    templateUrl: './basic-sample.html'
})
export class BasicColorPaletteSample {
    selectedColor = signal<string>('None');

    onItemClick(event: any): void {
        this.selectedColor.set(event.detail.color);
    }
}
