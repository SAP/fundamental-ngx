import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-datetime-picker-basic-example',
    templateUrl: './platform-datetime-picker-basic-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatetimePickerBasicExampleComponent {
    date1: FdDate = new FdDate(2020, 11, 27, 14, 30);

    date2: FdDate = FdDate.getToday();

    changeDay(): void {
        this.date1 = new FdDate(2018, 10, 10, 21, 35);
    }
}
