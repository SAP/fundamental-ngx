import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { PlatformDatetimePickerComponent } from './datetime-picker.component';

@NgModule({
    declarations: [PlatformDatetimePickerComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DatetimePickerModule, PipeModule, ContentDensityModule],
    exports: [PlatformDatetimePickerComponent, ContentDensityModule]
})
export class PlatformDatetimePickerModule {}
