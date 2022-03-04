import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ColorPickerComponent } from './color-picker.component';
import '@ui5/webcomponents/dist/ColorPicker.js';

@NgModule({
    declarations: [ColorPickerComponent],
    imports: [CommonModule, ButtonModule, PipeModule],
    exports: [ColorPickerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformColorPickerModule {}
