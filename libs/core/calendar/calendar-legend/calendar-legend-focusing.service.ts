import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarLegendFocusingService {
    /** Subject to emit the focused element */
    focusedLegendItemSubject$ = new Subject<{
        legendId: string | null;
        specialDayNumber: number | null;
    }>();

    /** Clearing the focused element */
    clearFocusedElement(): void {
        this.focusedLegendItemSubject$.next({ legendId: null, specialDayNumber: null });
    }

    /** Setting the elements that are getting currently focused */
    _handleLegendItemFocus(legendId: string, specialDayNumber: number | null): void {
        this.focusedLegendItemSubject$.next({ legendId, specialDayNumber });
    }
}
