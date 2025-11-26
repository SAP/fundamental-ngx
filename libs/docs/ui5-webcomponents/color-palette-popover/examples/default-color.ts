import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ColorPaletteItem } from '@fundamental-ngx/ui5-webcomponents/color-palette-item';
import { ColorPalettePopover } from '@fundamental-ngx/ui5-webcomponents/color-palette-popover';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-color-palette-popover-default-color-sample',
    templateUrl: './default-color.html',
    standalone: true,
    imports: [ColorPalettePopover, ColorPaletteItem, Button]
})
export class ColorPalettePopoverDefaultColorSample {
    readonly defaultColorValue = '#ff9900';
    readonly selectedColor = signal<string>(this.defaultColorValue);

    readonly colors = [
        '#ff6699',
        '#ff0000',
        '#ff9900',
        '#ffff00',
        '#99ff00',
        '#00ff00',
        '#00ff99',
        '#00ffff',
        '#0099ff',
        '#0000ff',
        '#9900ff',
        '#ff00ff'
    ];

    paletteOpen = signal<boolean>(false);

    openColorPalette(): void {
        this.paletteOpen.set(!this.paletteOpen());
    }

    onItemClick(event: any): void {
        this.selectedColor.set(event.detail.color);
    }
}
