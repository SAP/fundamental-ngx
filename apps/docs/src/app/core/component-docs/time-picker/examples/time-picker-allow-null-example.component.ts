import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-allow-null-example',
    templateUrl: './time-picker-allow-null-example.component.html'
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
