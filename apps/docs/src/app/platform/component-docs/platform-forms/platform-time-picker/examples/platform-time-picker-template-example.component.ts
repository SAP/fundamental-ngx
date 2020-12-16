import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-time-picker-template-example',
    templateUrl: './platform-time-picker-template-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformTimePickerTemplateExampleComponent {
    time24h: FdDate = new FdDate().setTime(18, 0, 0)
    time12h: FdDate = new FdDate().setTime(18, 0, 0)
    timeWithoutSeconds: FdDate = new FdDate().setTime(12, 0, 0)
    timeCompact: FdDate = new FdDate().setTime(12, 0, 0)
    timeAllowNull: FdDate = new FdDate().setTime(12, 0, 0)
    timeDisabled: FdDate = new FdDate().setTime(12, 0, 0)

    setNull(): void {
        this.timeAllowNull = null;
    }

    setValid(): void {
        this.timeAllowNull = new FdDate().setTime(12, 0, 0)
    }
}
