import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeComponent } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-minute-steps',
    templateUrl: './time-minute-steps.html',
    providers: [provideDateTimeFormats()],
    imports: [TimeComponent, FormsModule]
})
export class TimeMinuteSteps {
    protected readonly minuteSteps = [
        {
            step: 1,
            time: new FdDate().setTime(14, 23, 0),
            title: 'Every Minute'
        },
        {
            step: 5,
            time: new FdDate().setTime(14, 25, 0),
            title: '5-Minute Intervals'
        },
        {
            step: 10,
            time: new FdDate().setTime(14, 30, 0),
            title: '10-Minute Intervals'
        },
        {
            step: 15,
            time: new FdDate().setTime(14, 30, 0),
            title: '15-Minute Intervals'
        },
        {
            step: 30,
            time: new FdDate().setTime(14, 30, 0),
            title: '30-Minute Intervals'
        }
    ];

    protected formatTime(time: FdDate): string {
        const hours = time.hour % 12 || 12;
        const minutes = time.minute.toString().padStart(2, '0');
        const period = time.hour >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes} ${period}`;
    }
}
