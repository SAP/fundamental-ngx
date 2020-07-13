import { Component, Injectable } from '@angular/core';
import { TimeI18nLabels } from '@fundamental-ngx/core';

// Aria labels i18n
@Injectable()
export class CustomI18nLabels extends TimeI18nLabels {
    increaseHoursLabel: string = 'Aumentar horas';

    hoursLabel: string = 'Horas';

    decreaseHoursLabel: string = 'Disminuir horas';

    increaseMinutesLabel: string = 'Aumentar minutos';

    minutesLabel: string = 'Minutos';

    decreaseMinutesLabel: string = 'Disminuir minutos';

    increaseSecondsLabel: string = 'Aumentar segundos';

    secondsLabel: string = 'Segundos';

    decreaseSecondsLabel: string = 'Disminuir segundos';

    meridianAm: string = 'vorm.';

    meridianPm: string = 'nachm.';
}

@Component({
    selector: 'fd-time-i18n-example',
    template: `
        <fd-time [meridian]="true" [(ngModel)]="timeObject"></fd-time>
        <br />
        Selected Time: {{ timeObject.hour }}h {{ timeObject.minute }}m {{ timeObject.second }}s
    `,
    // Note that this can be provided in the root of your application.
    providers: [
        {
            provide: TimeI18nLabels,
            useClass: CustomI18nLabels
        }
    ]
})
export class TimeI18nExampleComponent {
    timeObject = { hour: 12, minute: 0, second: 0 };
}
