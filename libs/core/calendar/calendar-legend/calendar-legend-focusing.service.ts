import { Injectable, signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

@Injectable()
export class CalendarLegendFocusingService {
    /** Signal to track the focused special day number. Only one legend item can have focus at a time. */
    readonly focusedSpecialDayNumber = signal<Nullable<number>>(null);

    /** Clearing the focused element */
    clearFocusedElement(): void {
        this.focusedSpecialDayNumber.set(null);
    }

    /** Setting the special day number that is currently focused */
    handleLegendItemFocus(specialDayNumber: Nullable<number>): void {
        this.focusedSpecialDayNumber.set(specialDayNumber);
    }
}
