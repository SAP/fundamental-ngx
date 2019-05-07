import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CalendarI18nLabels {

    readonly labelsChange: Subject<void> = new Subject<void>();

    yearSelectionLabel: string = 'Year selection';

    previousYearLabel: string = 'Previous year';

    nextYearLabel: string = 'Next year';

    monthSelectionLabel: string = 'Month selection';

    previousMonthLabel: string = 'Previous month';

    nextMonthLabel: string = 'Next month';

}
