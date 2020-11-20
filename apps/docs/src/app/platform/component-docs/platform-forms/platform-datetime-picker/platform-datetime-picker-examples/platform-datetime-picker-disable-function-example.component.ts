import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FdDate, FdDatetime } from '@fundamental-ngx/core';
import { PlatformDatetimePickerComponent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-datetime-picker-disable-function-example',
    templateUrl: './platform-datetime-picker-disable-function-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatetimePickerDisableFunctionExampleComponent {
    @ViewChild(PlatformDatetimePickerComponent) datePicker: PlatformDatetimePickerComponent;

    datetimePickerForm = new FormGroup({});

    requiredDateValidator: ValidatorFn[] = [Validators.required];

    date = FdDatetime.getToday();

    disableFunction = (fdDate: FdDate): boolean => {
        return FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp();
    };
}
