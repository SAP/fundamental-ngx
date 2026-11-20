import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { PlatformDatetimePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-datetime-picker-readonly-example',
    templateUrl: './platform-datetime-picker-readonly-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [PlatformDatetimePickerComponent, FormsModule, ReactiveFormsModule]
})
export class PlatformDatetimePickerReadonlyExampleComponent {
    ngModelDate: FdDate = new FdDate(2026, 11, 13, 19, 12);

    readonlyForm = new FormGroup({
        datetime: new FormControl<FdDate | null>(new FdDate(2026, 11, 13, 19, 12))
    });
}
