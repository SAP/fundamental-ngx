import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TimeObject } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-time-picker-basic-example',
    templateUrl: './platform-time-picker-basic-example.component.html'
})
export class PlatformTimePickerBasicExampleComponent {
    allowNullTimeObject: TimeObject = { hour: 12, minute: 0, second: 0 };

    setNull(): void {
        this.allowNullTimeObject = null;
    }

    setValid(): void {
        this.allowNullTimeObject = { hour: 12, minute: 0, second: 0 };
    }
}
