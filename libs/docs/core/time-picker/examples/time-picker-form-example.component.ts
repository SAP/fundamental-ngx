import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-form-example',
    templateUrl: './time-picker-form-example.component.html',
    styleUrls: ['time-picker-form-example.component.scss'],
    providers: [provideDateTimeFormats()],
    imports: [FormsModule, ReactiveFormsModule, FormItemComponent, FormLabelComponent, TimePickerModule, DatePipe]
})
export class TimePickerFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl<FdDate | null>(null, Validators.required),
        disabledTime: new FormControl({ value: new FdDate().setTime(12, 34, 10), disabled: true })
    });
}
