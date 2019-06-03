import { Component, Injectable } from '@angular/core';
import { TimeI18nLabels } from '../../../../../../library/src/lib/time/i18n/time-i18n-labels';

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

@Component({
    selector: 'fd-time-i18n-example',
    template: `<fd-time></fd-time>`,
    // Note that this can be provided in the root of your application.
    providers: [
        {
            provide: TimeI18nLabels,
            useClass: CustomI18nLabels
        }
    ]
})
export class TimeI18nExampleComponent {}
