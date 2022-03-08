import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ColorPaletteComponent } from './color-palette.component';
import { ColorPaletteItemComponent } from './color-palette-item/color-palette-item.component';
import '@ui5/webcomponents/dist/ColorPalette.js';

@NgModule({
    declarations: [ColorPaletteComponent, ColorPaletteItemComponent],
    imports: [CommonModule, ButtonModule, PipeModule],
    exports: [ColorPaletteComponent, ColorPaletteItemComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformColorPaletteModule {}
