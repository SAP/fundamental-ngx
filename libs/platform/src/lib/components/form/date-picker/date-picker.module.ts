import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@fundamental-ngx/core';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
    imports: [CommonModule, DatePickerModule, FormsModule],
    exports: [DatePickerComponent],
    declarations: [DatePickerComponent]
})
export class PlatformDatePickerModule {}
