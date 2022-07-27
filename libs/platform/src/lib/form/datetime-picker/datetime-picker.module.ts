import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipeModule } from '@fundamental-ngx/core/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { PlatformDatetimePickerComponent } from './datetime-picker.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';

@NgModule({
    declarations: [PlatformDatetimePickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DatetimePickerModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [PlatformDatetimePickerComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformDatetimePickerModule {}
