import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TimeObject } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-time-picker-template-example',
    templateUrl: './platform-time-picker-template-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformTimePickerTemplateExampleComponent {
    time24h: TimeObject = { hour: 18, minute: 0, second: 0 };
    time12h: TimeObject = { hour: 18, minute: 0, second: 0 };
    timeWithoutSeconds: TimeObject = { hour: 12, minute: 0, second: 0 };
    timeCompact: TimeObject = { hour: 12, minute: 0, second: 0 };
    timeAllowNull: TimeObject = { hour: 12, minute: 0, second: 0 };
    timeDisabled: TimeObject = { hour: 12, minute: 0, second: 0 };

    setNull(): void {
        this.timeAllowNull = null;
    }

    setValid(): void {
        this.timeAllowNull = { hour: 12, minute: 0, second: 0 };
    }
}
