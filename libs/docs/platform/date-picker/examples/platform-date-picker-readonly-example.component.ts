import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformDatePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-date-picker-readonly-example',
    templateUrl: './platform-date-picker-readonly-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformDatePickerComponent, JsonPipe]
})
export class PlatformDatePickerReadonlyExampleComponent {
    birthday: FdDate = new FdDate(1990, 1, 2);
    singleDateTdModel: FdDate = new FdDate(1990, 1, 2);

    datePickerForm = new FormGroup({
        singleDate: new FormControl<FdDate | null>(new FdDate(1990, 1, 2))
    });
}
