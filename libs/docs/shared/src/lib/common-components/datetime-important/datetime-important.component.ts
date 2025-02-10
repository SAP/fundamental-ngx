import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';

@Component({
    selector: 'fd-datetime-important',
    templateUrl: './datetime-important.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MessageStripComponent, RouterLink]
})
export class DatetimeImportantComponent {
    @Input()
    componentName: string;
}
