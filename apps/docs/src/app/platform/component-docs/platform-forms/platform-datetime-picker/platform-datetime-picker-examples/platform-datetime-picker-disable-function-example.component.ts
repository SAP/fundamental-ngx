import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-datetime-picker-disable-function-example',
    templateUrl: './platform-datetime-picker-disable-function-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatetimePickerDisableFunctionExampleComponent {
    datetimePickerForm = new FormGroup({});

    requiredDateValidator: ValidatorFn[] = [Validators.required];

    date = FdDate.getNow();

    disableFunction = (fdDate: FdDate): boolean => {
        return FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp();
    };
}
