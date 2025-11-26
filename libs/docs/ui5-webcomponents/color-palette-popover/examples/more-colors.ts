import { Component, signal, viewChild } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ColorPaletteItem } from '@fundamental-ngx/ui5-webcomponents/color-palette-item';
import { ColorPalettePopover } from '@fundamental-ngx/ui5-webcomponents/color-palette-popover';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-color-palette-popover-more-colors-sample',
    templateUrl: './more-colors.html',
    standalone: true,
    imports: [ColorPalettePopover, ColorPaletteItem, Button]
})
export class ColorPalettePopoverMoreColorsSample {
    readonly colorPalette = viewChild<ColorPalettePopover>('colorPalette');
    readonly selectedColor = signal<string>('#ff6699');

    readonly colors = ['#ff6699', '#ff0000', '#ff9900', '#ffff00', '#99ff00', '#00ff00', '#00ff99', '#00ffff'];

    paletteOpen = signal<boolean>(false);

    openColorPalette(): void {
        this.paletteOpen.set(!this.paletteOpen());
    }

    onItemClick(event: any): void {
        this.selectedColor.set(event.detail.color);
    }
}
