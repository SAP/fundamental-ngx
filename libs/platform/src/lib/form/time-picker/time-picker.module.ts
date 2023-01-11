import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimePickerModule } from '@fundamental-ngx/core/time-picker';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { PlatformTimePickerComponent } from './time-picker.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [PlatformTimePickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TimePickerModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [PlatformTimePickerComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformTimePickerModule {}
