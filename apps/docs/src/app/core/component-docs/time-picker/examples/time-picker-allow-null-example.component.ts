import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'fd-time-picker-allow-null-example',
    templateUrl: './time-picker-allow-null-example.component.html'
})
export class TimePickerAllowNullExampleComponent {
    timeObject = new FormControl({ hour: 12, minute: 0, second: 0 });

    setNull(): void {
        this.timeObject.setValue(null);
    }

    setValid(): void {
        this.timeObject.setValue({ hour: 12, minute: 0, second: 0 });
    }
}
