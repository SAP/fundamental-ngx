import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-allow-null-example',
    templateUrl: './time-picker-allow-null-example.component.html',
    providers: [provideDateTimeFormats()],
    standalone: true,
    imports: [TimePickerModule, FormsModule, ReactiveFormsModule, NgIf, ButtonModule, DatePipe]
})
export class TimePickerAllowNullExampleComponent {
    timeObject = new FormControl(new FdDate().setTime(12, 0, 0));

    setNull(): void {
        this.timeObject.setValue(null);
    }

    setValid(): void {
        this.timeObject.setValue(new FdDate().setTime(12, 0, 0));
    }
}
