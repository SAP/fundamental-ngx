import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fdp-platform-datetime-picker-disable-function-example',
    templateUrl: './platform-datetime-picker-disable-function-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class PlatformDatetimePickerDisableFunctionExampleComponent {
    datetimePickerForm = new FormGroup({});

    requiredDateValidator: ValidatorFn[] = [Validators.required];

    date = FdDate.getNow();

    disableFunction = (fdDate: FdDate): boolean => FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp();
}
