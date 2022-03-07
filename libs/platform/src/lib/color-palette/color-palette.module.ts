import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ColorPaletteComponent } from './color-palette.component';
import '@ui5/webcomponents/dist/ColorPalette.js';

@NgModule({
    declarations: [ColorPaletteComponent],
    imports: [CommonModule, ButtonModule, PipeModule],
    exports: [ColorPaletteComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformColorPaletteModule {}
