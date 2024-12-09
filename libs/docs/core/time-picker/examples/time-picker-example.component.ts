import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-example',
    templateUrl: './time-picker-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [FormLabelComponent, TimePickerModule, FormsModule, DatePipe]
})
export class TimePickerExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
