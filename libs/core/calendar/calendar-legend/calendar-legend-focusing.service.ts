import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CalendarLegendFocusingService {
    /** the current focused element */
    focusedElement: HTMLElement | null;

    /** Special Number */
    specialNumber: number | null;

    /** Setting the elements that are getting currently focused */
    setFocusOnCell(legendItem: HTMLElement, specialNumber?: number): void {
        this.focusedElement = legendItem;
        if (specialNumber) {
            this.specialNumber = specialNumber;
        }
    }

    /** Getting the elements that are getting currently focused */
    getFocusedElement(): number | null {
        return this.specialNumber;
    }

    /** Clearing the focused element */
    clearFocusedElement(): void {
        this.focusedElement = null;
        this.specialNumber = null;
    }
}
