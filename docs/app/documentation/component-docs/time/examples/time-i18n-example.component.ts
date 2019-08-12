import { Component, Injectable } from '@angular/core';
import { TimeI18nLabels } from '../../../../../../library/src/lib/time/i18n/time-i18n-labels';
import { TimeI18n } from '../../../../../../library/src/lib/time/i18n/time-i18n';

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

}

@Injectable()
export class CustomI18n extends TimeI18n {

    meridianAm: string = 'vorm.';

    meridianPm: string = 'nachm.';

    meridianPlaceholder: string = 'vorm.';

    hoursPlaceholder: string = 'ss';

    minutesPlaceholder: string = 'mm';

    secondsPlaceholder: string = 'zz';

    meridianCaseSensitive: boolean = true;

}

@Component({
    selector: 'fd-time-i18n-example',
    template: `
        <fd-time [meridian]="true" [(ngModel)]="timeObject"></fd-time>
        <br />
        Selected Time: {{timeObject.hour}}h {{timeObject.minute}}m {{timeObject.second}}s
    `,
    // Note that this can be provided in the root of your application.
    providers: [
        {
            provide: TimeI18nLabels,
            useClass: CustomI18nLabels
        },
        {
            provide: TimeI18n,
            useClass: CustomI18n
        }
    ]
})
export class TimeI18nExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}
