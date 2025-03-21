import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { PlatformDatePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-date-picker-update-on-blur-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <label fd-form-label for="datePickerOnBlur">Date Picker</label>
        <fdp-date-picker
            id="datePickerOnBlur"
            name="datePickerOnBlur"
            [processInputOnBlur]="true"
            [(ngModel)]="date"
            dateInputLabel="date input mm/dd/yyy"
        ></fdp-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() || 'null' }}</div>`,
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [FormLabelComponent, PlatformDatePickerComponent, FormsModule]
})
export class PlatformDatePickerUpdateOnBlurExampleComponent {
    date: Nullable<FdDate> = FdDate.getNow();
}
