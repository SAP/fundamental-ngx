import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-position-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <fd-date-picker placement="top-end" [(ngModel)]="date"></fd-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() || 'null' }}</div>`
})
export class DatePickerPositionExampleComponent {
    date = FdDate.getNow();
}
