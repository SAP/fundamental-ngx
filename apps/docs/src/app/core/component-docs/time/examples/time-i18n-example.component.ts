import { Component, Injectable } from '@angular/core';
import { FdDate, TimeI18n } from '@fundamental-ngx/core';

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

    meridianAm = 'vorm.';

    meridianPm = 'nachm.';
}

@Component({
    selector: 'fd-time-i18n-example',
    template: `
        <fd-time [meridian]="true" [(ngModel)]="time"></fd-time>
        <br />
        Selected Time: {{ time.hour }}h {{ time.minute }}m {{ time.second }}s
    `,
    // Note that this can be provided in the root of your application.
    providers: [
        {
            provide: TimeI18n,
            useClass: CustomI18nLabels
        }
    ]
})
export class TimeI18nExampleComponent {
    time = new FdDate().setTime(12, 0, 0);
}
