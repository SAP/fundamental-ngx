import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { PlatformDatetimePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-datetime-picker-basic-example',
    templateUrl: './platform-datetime-picker-basic-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [PlatformDatetimePickerComponent, ContentDensityDirective, ButtonComponent]
})
export class PlatformDatetimePickerBasicExampleComponent {
    date1: FdDate = new FdDate(2020, 11, 27, 14, 30);

    date2: FdDate = FdDate.getToday();

    changeDay(): void {
        this.date1 = new FdDate(2018, 10, 10, 21, 35);
    }
}
