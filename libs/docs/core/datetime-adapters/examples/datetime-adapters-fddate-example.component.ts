import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-datetime-adapters-fddate-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './datetime-adapters-fddate-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [DatePickerComponent, FormsModule]
})
export class DatetimeAdaptersFddateExampleComponent {
    date: FdDate | null = FdDate.getNow();
}
