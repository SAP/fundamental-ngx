import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { FdDate, FdDatetime } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-datetime-picker-template-example',
    templateUrl: './platform-datetime-picker-template-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatetimePickerTemplateExampleComponent {
    storedDate: FdDatetime = FdDatetime.getToday();

    requiredDateValidator: ValidatorFn[];

    date = FdDatetime.getToday();

    templateDate = '';
    meredianDate = '';
    allowNullDate = '';
    simpleDate = '';

    constructor() {
        this.storedDate = new FdDatetime(new FdDate(2008, 2, 11), this.storedDate.time);
        this.requiredDateValidator = [Validators.required];
    }

    changeDay(): void {
        this.date = new FdDatetime(new FdDate(2018, 10, 10), this.date.time);
    }
}
