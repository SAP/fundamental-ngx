import { Injectable } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarLegendFocusingService {
    /** Subject to emit the focused element */
    focusedLegendItemSubject$ = new Subject<{
        legendId: Nullable<string>;
        specialDayNumber: Nullable<number>;
    }>();

    /** Clearing the focused element */
    clearFocusedElement(): void {
        this.focusedLegendItemSubject$.next({ legendId: null, specialDayNumber: null });
    }

    /** Setting the elements that are getting currently focused */
    _handleLegendItemFocus(legendId: string, specialDayNumber: Nullable<number>): void {
        this.focusedLegendItemSubject$.next({ legendId, specialDayNumber });
    }
}
