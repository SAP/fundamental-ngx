import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PlatformColorPaletteModule } from '@fundamental-ngx/platform/color-palette';

import { ColorPalettePopoverComponent } from './color-palette-popover.component';
import '@ui5/webcomponents/dist/ColorPalettePopover.js';
import '@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js';

@NgModule({
    declarations: [ColorPalettePopoverComponent],
    imports: [CommonModule, ButtonModule, PipeModule],
    exports: [ColorPalettePopoverComponent, PlatformColorPaletteModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformColorPalettePopoverModule {}
