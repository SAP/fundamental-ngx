import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformDatePickerComponent } from './date-picker.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

@NgModule({
    declarations: [PlatformDatePickerComponent],
    imports: [
        CommonModule,
        DatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [PlatformDatePickerComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformDatePickerModule {}
