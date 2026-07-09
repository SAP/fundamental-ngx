import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { MOMENT_DATETIME_FORMATS, MomentDatetimeAdapter } from '@fundamental-ngx/moment-adapter';
import moment, { Moment } from 'moment';

@Component({
    selector: 'fd-datetime-adapters-moment-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './datetime-adapters-moment-example.component.html',
    providers: [
        { provide: DatetimeAdapter, useClass: MomentDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: MOMENT_DATETIME_FORMATS }
    ],
    imports: [DatePickerComponent, FormsModule]
})
export class DatetimeAdaptersMomentExampleComponent {
    date: Moment = moment();
}
