import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformTimePickerComponent } from './time-picker.component';
import { TimePickerModule } from '@fundamental-ngx/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [PlatformTimePickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TimePickerModule
    ]
})
export class PlatformTimePickerModule {
}
