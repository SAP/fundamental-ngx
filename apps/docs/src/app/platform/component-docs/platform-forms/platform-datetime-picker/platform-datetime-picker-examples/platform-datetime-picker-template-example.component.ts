import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-datetime-picker-template-example',
    templateUrl: './platform-datetime-picker-template-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatetimePickerTemplateExampleComponent {
    date: FdDate = FdDate.getNow();
}
