import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FdDate, FdDatetime } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-datetime-picker-reactive-example',
    templateUrl: './platform-datetime-picker-reactive-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatetimePickerReactiveExampleComponent {
    storedDate: FdDatetime = FdDatetime.getToday();
    date = FdDatetime.getToday();

    datetimePickerForm = new FormGroup({});
    requiredDateValidator: ValidatorFn[] = [Validators.required];

    data: StoredDatetimeObject;

    constructor() {
        this.storedDate = new FdDatetime(new FdDate(2008, 2, 11), this.storedDate.time);
        this.data = new StoredDatetimeObject(this.storedDate);
    }

    onSubmit(): void {
        if (this.datetimePickerForm.valid) {
            alert('Form Value: ' + this.datetimePickerForm.value);
        } else {
            alert('Form invalid');
        }
    }
    changeDay(): void {
        this.date = new FdDatetime(new FdDate(2018, 10, 10), this.date.time);
    }

    onDateChange(datetime: FdDatetime): void {
        console.log('value changed to ' + datetime?.toLocaleDateString());
    }

    onOpenChanged(opened: boolean): void {
        console.log('the popover is opened?: ' + opened);
    }
}

class StoredDatetimeObject {
    constructor(public storedDate: FdDatetime) {}
}
