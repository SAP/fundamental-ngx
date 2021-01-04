import { Component } from '@angular/core';

import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-time-picker-basic-example',
    templateUrl: './platform-time-picker-basic-example.component.html'
})
export class PlatformTimePickerBasicExampleComponent {
    allowNullTimeObject: FdDate = new FdDate().setTime(12, 0, 0);

    setNull(): void {
        this.allowNullTimeObject = null;
    }

    setValid(): void {
        this.allowNullTimeObject = new FdDate().setTime(12, 0, 0);
    }
}
