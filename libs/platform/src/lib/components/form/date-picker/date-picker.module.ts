import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as FdFormModule, DatePickerModule } from '@fundamental-ngx/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
    imports: [CommonModule, DatePickerModule, FdFormModule, FormsModule, ReactiveFormsModule],
    exports: [DatePickerComponent],
    declarations: [DatePickerComponent]
})
export class PlatformDatePickerModule {}
