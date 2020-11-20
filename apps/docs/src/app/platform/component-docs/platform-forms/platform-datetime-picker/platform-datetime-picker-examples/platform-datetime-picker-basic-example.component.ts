import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FdDate, FdDatetime } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-datetime-picker-basic-example',
    templateUrl: './platform-datetime-picker-basic-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatetimePickerBasicExampleComponent {
    storedDate: FdDatetime = FdDatetime.getToday();

    datetimePickerForm = new FormGroup({});

    requiredDateValidator: ValidatorFn[] = [Validators.required];

    date = FdDatetime.getToday();

    data: StoredDatetimeObject;

    constructor() {
        this.storedDate = new FdDatetime(new FdDate(2008, 2, 11), this.storedDate.time);
        this.data = new StoredDatetimeObject(this.storedDate);
    }

    save(value: any): void {
        alert('Form Value: ' + value);
    }

    changeDay(): void {
        this.date = new FdDatetime(new FdDate(2018, 10, 10), this.date.time);
    }
}

class StoredDatetimeObject {
    constructor(public storedDate: FdDatetime) {}
}
