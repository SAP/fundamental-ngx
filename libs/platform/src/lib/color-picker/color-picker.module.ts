import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PlatformColorPickerComponent } from './color-picker.component';
import '@ui5/webcomponents/dist/ColorPicker.js';

@NgModule({
    declarations: [PlatformColorPickerComponent],
    imports: [CommonModule, ButtonModule, PipeModule],
    exports: [PlatformColorPickerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformColorPickerModule {}
