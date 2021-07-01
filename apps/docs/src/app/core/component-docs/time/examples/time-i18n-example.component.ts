import { Component, Injectable, LOCALE_ID } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { TimeI18n } from '@fundamental-ngx/core/time';

// Aria labels i18n
@Injectable()
export class CustomI18nLabels extends TimeI18n {
    increaseHoursLabel = 'Aumentar horas';

    hoursLabel = 'Horas';

    decreaseHoursLabel = 'Disminuir horas';

    increaseMinutesLabel = 'Aumentar minutos';

    minutesLabel = 'Minutos';

    decreaseMinutesLabel = 'Disminuir minutos';

    increaseSecondsLabel = 'Aumentar segundos';

    secondsLabel = 'Segundos';

    decreaseSecondsLabel = 'Disminuir segundos';

    periodLabel = 'Período';
}

@Component({
    selector: 'fd-time-i18n-example',
    template: `
        <fd-time [(ngModel)]="time"></fd-time>
        <br />
        Selected Time: {{ time.hour }}h {{ time.minute }}m {{ time.second }}s
    `,
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        {
            provide: LOCALE_ID,
            useValue: 'es'
        },
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: TimeI18n,
            useClass: CustomI18nLabels
        }
    ]
})
export class TimeI18nExampleComponent {
    time = new FdDate().setTime(12, 0, 0);
}
