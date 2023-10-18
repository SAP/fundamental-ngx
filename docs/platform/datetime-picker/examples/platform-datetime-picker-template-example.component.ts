import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformDatetimePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-datetime-picker-template-example',
    templateUrl: './platform-datetime-picker-template-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    standalone: true,
    imports: [FdpFormGroupModule, PlatformDatetimePickerComponent, FormsModule, NgIf]
})
export class PlatformDatetimePickerTemplateExampleComponent {
    date: FdDate = FdDate.getNow();
}
