import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ColorPaletteItem } from '@fundamental-ngx/ui5-webcomponents/color-palette-item';
import { ColorPalettePopover } from '@fundamental-ngx/ui5-webcomponents/color-palette-popover';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-color-palette-popover-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ColorPalettePopover, ColorPaletteItem, Button]
})
export class ColorPalettePopoverBasicSample {
    readonly selectedColor = signal<string>('#ff6699');

    readonly defaultColors = [
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

    onItemClick(event: UI5WrapperCustomEvent<ColorPalettePopover, 'ui5ItemClick'>): void {
        this.selectedColor.set(event.detail.color);
    }

    onPaletteClose(): void {
        this.paletteOpen.set(false);
    }
}
