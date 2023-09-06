import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TimeModule } from '@fundamental-ngx/core/time';
import { I18nModule } from '@fundamental-ngx/i18n';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormMessageComponent } from '@fundamental-ngx/core/form';
import { TimePickerComponent } from './time-picker.component';

@NgModule({
    declarations: [TimePickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        PopoverModule,
        InputGroupModule,
        TimeModule,
        FormMessageComponent,
        ContentDensityModule,
        I18nModule
    ],
    exports: [TimePickerComponent, PopoverModule, InputGroupModule, TimeModule, ContentDensityModule]
})
export class TimePickerModule {}
