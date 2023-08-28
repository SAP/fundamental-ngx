import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIf } from '@angular/common';
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
    selector: 'fdp-platform-time-picker-template-example',
    templateUrl: './platform-time-picker-template-example.component.html',
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
    ],
    standalone: true,
    imports: [FdpFormGroupModule, PlatformTimePickerModule, FormsModule, ContentDensityDirective, ButtonModule, NgIf]
})
export class PlatformTimePickerTemplateExampleComponent {
    time24h: FdDate = new FdDate().setTime(18, 0, 0);
    time12h: FdDate = new FdDate().setTime(18, 0, 0);
    timeWithoutSeconds: FdDate = new FdDate().setTime(12, 0, 0);
    timeCompact: FdDate = new FdDate().setTime(12, 0, 0);
    timeAllowNull: FdDate | null = new FdDate().setTime(12, 0, 0);
    timeDisabled: FdDate = new FdDate().setTime(12, 0, 0);
    displayFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false };

    setNull(): void {
        this.timeAllowNull = null;
    }

    setValid(): void {
        this.timeAllowNull = new FdDate().setTime(12, 0, 0);
    }
}
