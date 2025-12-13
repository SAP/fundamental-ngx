import { Injectable, signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

@Injectable({
    providedIn: 'root'
})
export class CalendarLegendFocusingService {
    /** Signal to track the focused legend item */
    readonly focusedLegendItem = signal<{
        legendId: Nullable<string>;
        specialDayNumber: Nullable<number>;
    }>({ legendId: null, specialDayNumber: null });

    /** Clearing the focused element */
    clearFocusedElement(): void {
        this.focusedLegendItem.set({ legendId: null, specialDayNumber: null });
    }

    /** Setting the elements that are getting currently focused */
    _handleLegendItemFocus(legendId: string, specialDayNumber: Nullable<number>): void {
        this.focusedLegendItem.set({ legendId, specialDayNumber });
    }
}
