import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformTimePickerModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-time-picker-basic-example',
    templateUrl: './platform-time-picker-basic-example.component.html',
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
    ],
    standalone: true,
    imports: [FdpFormGroupModule, PlatformTimePickerModule, ContentDensityDirective, FormsModule, ButtonModule]
})
export class PlatformTimePickerBasicExampleComponent {
    allowNullTimeObject: FdDate | null = new FdDate().setTime(12, 0, 0);
    displayFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false };

    setNull(): void {
        this.allowNullTimeObject = null;
    }

    setValid(): void {
        this.allowNullTimeObject = new FdDate().setTime(12, 0, 0);
    }
}
